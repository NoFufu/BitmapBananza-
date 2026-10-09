// Looks at a freshly loaded image and works out which looks suit it.
// Every look is also tuned to the image: if a preset would turn a dark photo
// almost completely black (or a bright one almost white), its threshold is
// moved until the result has a sensible amount of ink again.
import { createCanvas, presets, renderGraphic, type CanvasSource } from '../engine';
import { LOOKS, controlsFromPreset, type Controls } from './controls';

export interface ImageTraits {
  kind: 'photo' | 'graphic';
  /** Mean brightness, 0 (black) to 1 (white). */
  brightness: number;
  /** Spread of the tones, roughly 0 (flat grey) to 1 (only black and white). */
  contrast: number;
  /** Share of pixels that sit on an edge. */
  detail: number;
  plainBackground: boolean;
  transparent: boolean;
  small: boolean;
  /** Share of ink a faithful black and white version would have. */
  naturalInk: number;
  /** Short German labels for the dialog header. */
  tags: string[];
}

export interface Suggestion {
  id: string;
  name: string;
  purpose: string;
  controls: Controls;
  score: number;
  reason: string;
  /** Set when the preset had to be made lighter or darker for this image. */
  tuned: 'lighter' | 'darker' | null;
}

export interface Analysis {
  traits: ImageTraits;
  /** All looks, best fit first. */
  ranked: Suggestion[];
}

const SAMPLE = 160;
const CALIBRATE = 220;

const pause = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

/** Downscale `image` so its long side is `side` px. */
export function scaledCopy(image: CanvasSource, side: number) {
  const scale = Math.min(1, side / Math.max(image.width, image.height));
  const c = createCanvas(Math.max(1, Math.round(image.width * scale)), Math.max(1, Math.round(image.height * scale)));
  const g = c.getContext('2d')!;
  g.imageSmoothingQuality = 'high';
  g.drawImage(image, 0, 0, c.width, c.height);
  return c;
}

/**
 * Size-dependent controls (pixel blocks, halftone dots) are measured in preview
 * pixels. When rendering a smaller copy, shrink them by the same factor so the
 * copy looks like a scaled-down version of the real result.
 */
export function scaleForPreview(controls: Controls, factor: number): Controls {
  if (factor >= 1) return controls;
  return {
    ...controls,
    pixelSize: Math.max(2, Math.round(controls.pixelSize * factor)),
    halftoneSize: Math.max(3, Math.round(controls.halftoneSize * factor))
  };
}

function luminanceOf(canvas: HTMLCanvasElement) {
  const { width, height } = canvas;
  const data = canvas.getContext('2d', { willReadFrequently: true })!.getImageData(0, 0, width, height).data;
  const lum = new Float32Array(width * height);
  const alpha = new Uint8Array(width * height);
  for (let i = 0; i < lum.length; i++) {
    const d = i * 4;
    alpha[i] = data[d + 3];
    // Transparent pixels count as paper.
    const a = data[d + 3] / 255;
    lum[i] = (0.299 * data[d] + 0.587 * data[d + 1] + 0.114 * data[d + 2]) * a + 255 * (1 - a);
  }
  return { lum, alpha, data, width, height };
}

function percentile(hist: Uint32Array, total: number, p: number) {
  let seen = 0;
  for (let i = 0; i < hist.length; i++) {
    seen += hist[i];
    if (seen >= total * p) return i;
  }
  return hist.length - 1;
}

export function measureImage(image: CanvasSource, fullSize: { width: number; height: number }): ImageTraits {
  const c = scaledCopy(image, SAMPLE);
  const { lum, alpha, data, width, height } = luminanceOf(c);
  const hist = new Uint32Array(256);
  let total = 0;
  let sum = 0;
  let sumSq = 0;
  let seeThrough = 0;
  for (let i = 0; i < lum.length; i++) {
    if (alpha[i] < 250) seeThrough++;
    if (alpha[i] < 128) continue;
    const v = lum[i];
    hist[Math.round(v)]++;
    total++;
    sum += v;
    sumSq += v * v;
  }
  total = Math.max(1, total);
  const mean = sum / total;
  const std = Math.sqrt(Math.max(0, sumSq / total - mean * mean));
  const lo = percentile(hist, total, 0.02);
  const hi = percentile(hist, total, 0.98);

  // How many colours cover 90 % of the picture: a logo needs a handful, a photo
  // hundreds. Colours are stretched to the full range first, otherwise a dark
  // or washed-out photo would look like it only had a few.
  const stretch = 255 / Math.max(24, hi - lo);
  const level = (v: number) => Math.min(15, Math.max(0, Math.round(((v - lo) * stretch) / 17)));
  const colours = new Map<number, number>();
  for (let i = 0; i < lum.length; i++) {
    if (alpha[i] < 128) continue;
    const d = i * 4;
    const key = (level(data[d]) << 8) | (level(data[d + 1]) << 4) | level(data[d + 2]);
    colours.set(key, (colours.get(key) ?? 0) + 1);
  }
  const counts = [...colours.values()].sort((a, b) => b - a);
  let covered = 0;
  let colourCount = 0;
  for (const n of counts) {
    covered += n;
    colourCount++;
    if (covered >= total * 0.9) break;
  }

  // Edge share: neighbouring pixels that differ clearly.
  let edges = 0;
  let pairs = 0;
  for (let y = 0; y < height - 1; y++) {
    for (let x = 0; x < width - 1; x++) {
      const i = y * width + x;
      const g = (Math.abs(lum[i] - lum[i + 1]) + Math.abs(lum[i] - lum[i + width])) * stretch;
      pairs++;
      if (g > 40) edges++;
    }
  }
  const detail = edges / Math.max(1, pairs);

  // A calm border (one colour or transparent) means the motif can be cut out.
  let bSum = 0;
  let bSq = 0;
  let bN = 0;
  let bClear = 0;
  const ring = Math.max(2, Math.round(Math.min(width, height) * 0.04));
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (x >= ring && y >= ring && x < width - ring && y < height - ring) continue;
      const i = y * width + x;
      if (alpha[i] < 128) {
        bClear++;
        continue;
      }
      bSum += lum[i];
      bSq += lum[i] * lum[i];
      bN++;
    }
  }
  const bMean = bSum / Math.max(1, bN);
  const bStd = Math.sqrt(Math.max(0, bSq / Math.max(1, bN) - bMean * bMean));
  const plainBackground = bClear > (bN + bClear) * 0.6 || (bN > 0 && bStd < 14);

  const transparent = seeThrough > lum.length * 0.01;
  const kind: ImageTraits['kind'] = colourCount <= 40 || (transparent && colourCount <= 120) ? 'graphic' : 'photo';

  // Ink share of a faithful conversion: pixels darker than the middle of the image's own range.
  // Measured over the whole canvas: transparent areas count as paper, like in inkShare().
  const mid = kind === 'graphic' ? 128 : (lo + hi) / 2;
  let dark = 0;
  for (let i = 0; i < lum.length; i++) if (lum[i] < mid) dark++;
  const naturalInk = dark / lum.length;

  const brightness = mean / 255;
  const contrast = Math.min(1, std / 110);
  const small = Math.max(fullSize.width, fullSize.height) < 700;

  const tags = [kind === 'graphic' ? 'Grafik oder Logo' : 'Foto'];
  if (brightness < 0.36) tags.push('eher dunkel');
  else if (brightness > 0.68) tags.push('eher hell');
  if (contrast < 0.4) tags.push('wenig Kontrast');
  else if (contrast > 0.72) tags.push('starker Kontrast');
  if (kind === 'photo') tags.push(detail > 0.14 ? 'viele Details' : detail < 0.05 ? 'ruhige Flächen' : 'mittlere Details');
  if (transparent) tags.push('mit Transparenz');
  else if (plainBackground) tags.push('ruhiger Hintergrund');
  if (small) tags.push('kleines Bild');

  return { kind, brightness, contrast, detail, plainBackground, transparent, small, naturalInk, tags };
}

/** Share of the rendered picture that is ink. */
function inkShare(canvas: HTMLCanvasElement) {
  const data = canvas.getContext('2d', { willReadFrequently: true })!.getImageData(0, 0, canvas.width, canvas.height).data;
  let ink = 0;
  const n = data.length / 4;
  for (let i = 0; i < data.length; i += 4) if (data[i + 3] > 127 && data[i] < 128) ink++;
  return ink / Math.max(1, n);
}

/**
 * How well the rendered result still shows the picture: both are shrunk to a
 * thumbnail (which averages dots and dither back into grey) and compared.
 */
function likeness(rendered: HTMLCanvasElement, source: HTMLCanvasElement) {
  const a = luminanceOf(scaledCopy(rendered, 40)).lum;
  const b = luminanceOf(scaledCopy(source, 40)).lum;
  const n = Math.min(a.length, b.length);
  let ma = 0;
  let mb = 0;
  for (let i = 0; i < n; i++) {
    ma += a[i];
    mb += b[i];
  }
  ma /= n;
  mb /= n;
  let cov = 0;
  let va = 0;
  let vb = 0;
  for (let i = 0; i < n; i++) {
    cov += (a[i] - ma) * (b[i] - mb);
    va += (a[i] - ma) ** 2;
    vb += (b[i] - mb) ** 2;
  }
  if (va < 1 || vb < 1) return 0;
  return Math.max(0, cov / Math.sqrt(va * vb));
}

function inkBand(t: ImageTraits): [number, number] {
  if (t.kind === 'graphic') return [Math.max(0.01, t.naturalInk - 0.1), Math.min(0.95, t.naturalInk + 0.1)];
  return [Math.min(0.5, Math.max(0.18, t.naturalInk - 0.15)), Math.max(0.34, Math.min(0.64, t.naturalInk + 0.15))];
}

/** Move the look's threshold until the ink share lands inside `band`. */
async function tune(controls: Controls, source: HTMLCanvasElement, factor: number, band: [number, number]) {
  // "Automatisch" ignores the threshold slider, so those looks shift it with "Schwarzanteil".
  const key = controls.thresholdMode === 'auto' && controls.graphicMode !== 'pixelBitmap' ? 'blackAmount' : 'threshold';
  const max = key === 'threshold' ? 255 : 100;
  const render = (c: Controls) => renderGraphic(scaleForPreview(c, factor), source);
  let out = render(controls);
  const ink = inkShare(out);
  if (ink >= band[0] && ink <= band[1]) return { controls, out, tuned: null, miss: 0 };

  const target = ink < band[0] ? band[0] + 0.03 : band[1] - 0.03;
  let lo = 0;
  let hi = max;
  let best = { controls, out, error: Math.abs(ink - target) };
  for (let step = 0; step < 7; step++) {
    const value = Math.round((lo + hi) / 2);
    const next = { ...controls, [key]: value };
    await pause();
    const rendered = render(next);
    const share = inkShare(rendered);
    const error = Math.abs(share - target);
    if (error < best.error) best = { controls: next, out: rendered, error };
    if (share < target) lo = value;
    else hi = value;
    if (hi - lo <= 1) break;
  }
  out = best.out;
  const tuned = best.controls === controls ? null : ink > target ? 'lighter' : 'darker';
  return { controls: best.controls, out, tuned, miss: Math.max(0, best.error - 0.05) } as const;
}

/** How well a look suits the image before looking at the result, 0 to 1. */
function prior(id: string, t: ImageTraits) {
  const detailed = t.detail > 0.12 ? 1 : 0;
  const calm = t.detail < 0.06 ? 1 : 0;
  const flat = t.contrast < 0.4 ? 1 : 0;
  const punchy = t.contrast > 0.68 ? 1 : 0;
  const plain = t.plainBackground || t.transparent ? 1 : 0;
  const small = t.small ? 1 : 0;
  if (t.kind === 'graphic') {
    const g: Record<string, number> = {
      logoCleanup: 0.95,
      hardPoster: 0.7,
      shirtPrintGraphic: 0.62,
      pixelClassic: 0.45 + 0.2 * small,
      cleanPhoto: 0.45,
      highDetailInk: 0.35,
      dirtyXerox: 0.3,
      softNewspaper: 0.15
    };
    return g[id] ?? 0.3;
  }
  const p: Record<string, number> = {
    cleanPhoto: 0.8,
    highDetailInk: 0.55 + 0.3 * detailed - 0.25 * small - 0.15 * calm,
    softNewspaper: 0.55 + 0.25 * flat + 0.1 * calm - 0.3 * small,
    hardPoster: 0.5 + 0.25 * punchy - 0.2 * flat + 0.1 * calm,
    dirtyXerox: 0.42 + 0.1 * punchy - 0.1 * small,
    shirtPrintGraphic: 0.48 + 0.25 * plain,
    logoCleanup: 0.12 + 0.35 * plain,
    pixelClassic: 0.32 + 0.4 * small
  };
  return p[id] ?? 0.3;
}

function reasonFor(id: string, t: ImageTraits) {
  const photo = t.kind === 'photo';
  const map: Record<string, string> = {
    cleanPhoto: photo ? 'Trennt Motiv und Hintergrund sauber, gut für Gesichter' : 'Saubere Schwarzweiß-Version',
    hardPoster: t.contrast > 0.68 ? 'Dein Bild hat starke Kontraste, ideal für klare Flächen' : 'Macht große, ruhige Flächen daraus',
    highDetailInk: t.detail > 0.12 ? 'Dein Bild hat viele feine Details, die bleiben erhalten' : 'Betont Kanten und Linien',
    softNewspaper: t.contrast < 0.4 ? 'Weiche Übergänge werden zu feinen Punkten' : 'Graustufen als Punktraster',
    dirtyXerox: 'Rauer Kopierer-Look mit Körnung',
    shirtPrintGraphic:
      t.plainBackground || t.transparent
        ? 'Ruhiger Hintergrund, lässt sich gut freistellen'
        : 'Transparent und mit weichem Rand, bereit für das Shirt',
    logoCleanup: photo ? 'Klare Flächen ohne Krümel' : 'Wenige Farben wie bei einem Logo, wird gestochen scharf',
    pixelClassic: t.small ? 'Kleines Bild, grobe Pixel machen daraus einen Stil' : 'Grobe Pixelblöcke im Retro-Stil'
  };
  return map[id] ?? '';
}

/**
 * Measures `preview`, tunes every look to it and ranks them. Runs in small
 * steps so the page stays responsive; `isCancelled` stops it early.
 */
export async function analyzeImage(
  preview: CanvasSource,
  fullSize: { width: number; height: number },
  isCancelled: () => boolean = () => false
): Promise<Analysis | null> {
  const traits = measureImage(preview, fullSize);
  const source = scaledCopy(preview, CALIBRATE);
  const factor = source.width / preview.width;
  const band = inkBand(traits);
  const ranked: Suggestion[] = [];
  for (const look of LOOKS) {
    await pause();
    if (isCancelled()) return null;
    try {
      const base = controlsFromPreset(presets[look.id]);
      const { controls, out, tuned, miss } = await tune(base, source, factor, band);
      // A look that cannot reach a sensible amount of ink even after tuning drops down the list.
      const score = prior(look.id, traits) * 0.6 + likeness(out, source) * 0.4 - miss * 2;
      ranked.push({ ...look, controls, score, tuned, reason: reasonFor(look.id, traits) });
    } catch (error) {
      console.warn('Look analysis failed', look.id, error);
    }
  }
  if (isCancelled()) return null;
  ranked.sort((a, b) => b.score - a.score);
  return { traits, ranked };
}
