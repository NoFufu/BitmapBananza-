// One schema for every image control. Sliders, the command palette, the
// "changed" markers and reset all read from here.

export type SectionId = 'conversion' | 'photo' | 'halftone' | 'distress' | 'edge' | 'output';

export interface Option { value: string; label: string; group?: string }

interface Base { key: string; label: string; section: SectionId; sub?: string }
export interface SliderDef extends Base { kind: 'slider'; min: number; max: number; step?: number; unit?: string; tone?: boolean; showIf?: (c: Controls) => boolean }
export interface SelectDef extends Base { kind: 'select'; options: Option[] }
export interface ToggleDef extends Base { kind: 'toggle' }
export type ControlDef = SliderDef | SelectDef | ToggleDef;

export type Controls = {
  graphicMode: string; thresholdMode: string; pixelSize: number; threshold: number; contrast: number; gamma: number;
  ditherStrength: number; noiseScale: number; method: string;
  blackAmount: number; whiteCleanup: number; midtonePush: number; shadowDetail: number; highlightDetail: number;
  edgeStrength: number; smoothness: number; sharpen: number; preBlur: number; adaptiveStrength: number; detailPreserve: number;
  halftoneMode: string; halftoneSize: number; halftoneStrength: number; halftoneAngle: number; halftoneGain: number; halftoneJitter: number;
  edgeRoughness: number; inkBleed: number; dustAmount: number; grainAmount: number;
  edgeFadeMode: string; edgeFadeWidth: number; edgeFadeStrength: number; edgeFadeNoise: number;
  removeSpeckles: number; fillHoles: number; expandBlack: number; shrinkBlack: number; smoothJagged: number;
  invert: boolean; transparent: boolean;
};

export type ControlKey = keyof Controls;

// Same defaults as the HTML inputs of the original tool.
export const DEFAULT_CONTROLS: Controls = {
  graphicMode: 'fullDetail', thresholdMode: 'global', pixelSize: 8, threshold: 128, contrast: 0, gamma: 100,
  ditherStrength: 100, noiseScale: 100, method: 'threshold',
  blackAmount: 50, whiteCleanup: 20, midtonePush: 0, shadowDetail: 35, highlightDetail: 30,
  edgeStrength: 35, smoothness: 10, sharpen: 20, preBlur: 0, adaptiveStrength: 55, detailPreserve: 45,
  halftoneMode: 'off', halftoneSize: 10, halftoneStrength: 100, halftoneAngle: 15, halftoneGain: 0, halftoneJitter: 0,
  edgeRoughness: 0, inkBleed: 0, dustAmount: 0, grainAmount: 0,
  edgeFadeMode: 'off', edgeFadeWidth: 18, edgeFadeStrength: 70, edgeFadeNoise: 35,
  removeSpeckles: 0, fillHoles: 0, expandBlack: 0, shrinkBlack: 0, smoothJagged: 0,
  invert: false, transparent: false
};

// The original setControlsFromPreset() fallbacks for keys a look leaves out.
const PRESET_FALLBACKS: Controls = { ...DEFAULT_CONTROLS };

export function controlsFromPreset(preset: Record<string, unknown>): Controls {
  const next = { ...PRESET_FALLBACKS } as Record<string, unknown>;
  for (const key of Object.keys(PRESET_FALLBACKS)) {
    if (preset[key] !== undefined && preset[key] !== null) next[key] = preset[key];
  }
  return next as Controls;
}

export const SECTIONS: { id: SectionId; title: string; hint?: string }[] = [
  { id: 'conversion', title: 'Konvertierung', hint: 'Pixelgröße gibt es nur im Modus Pixel Bitmap Classic. Alle anderen Modi rendern ohne Pixelblöcke.' },
  { id: 'photo', title: 'Foto-Feinschliff', hint: 'Wirkt vor Halftone, Distress und Maske. Adaptive Stärke greift nur bei adaptivem oder kantengestütztem Schwellenwert.' },
  { id: 'halftone', title: 'Halftone', hint: 'Dot Gain macht Punkte fetter oder dünner. Jitter bricht das Raster auf.' },
  { id: 'distress', title: 'Distress', hint: 'Ink Bleed lässt schwarze Flächen auslaufen, Staub stanzt Fehlstellen, Körnung legt feines Druckrauschen darüber.' },
  { id: 'edge', title: 'Maske und Shirt-Kante' }
];

const methodOptions: Option[] = [
  { value: 'threshold', label: 'Hard Threshold', group: 'Clean' },
  { value: 'random', label: 'Random Noise Dither', group: 'Noisy' },
  { value: 'randomFine', label: 'Fine Salt Noise', group: 'Noisy' },
  { value: 'randomChunky', label: 'Chunky Random Blocks', group: 'Noisy' },
  { value: 'blueNoise', label: 'Blue Noise Speckle', group: 'Noisy' },
  { value: 'noise', label: 'Organic Noise Dither', group: 'Organic' },
  { value: 'organicWorm', label: 'Organic Worm Texture', group: 'Organic' },
  { value: 'maze', label: 'Maze Texture', group: 'Organic' },
  { value: 'bayer2', label: 'Ordered Bayer 2x2', group: 'Raster' },
  { value: 'bayer4', label: 'Ordered Bayer 4x4', group: 'Raster' },
  { value: 'bayer8', label: 'Ordered Bayer 8x8', group: 'Raster' },
  { value: 'bayer16', label: 'Ordered Bayer 16x16', group: 'Raster' },
  { value: 'clusterDot', label: 'Cluster Dot Bitmap', group: 'Raster' },
  { value: 'checker', label: 'Checker Raster', group: 'Raster' },
  { value: 'hatchH', label: 'Horizontal Hatch', group: 'Raster' },
  { value: 'hatchV', label: 'Vertical Hatch', group: 'Raster' },
  { value: 'hatchDiag', label: 'Diagonal Hatch', group: 'Raster' },
  { value: 'scanline', label: 'Scanline Bitmap', group: 'Raster' },
  { value: 'floyd', label: 'Floyd-Steinberg', group: 'Error Diffusion' },
  { value: 'falseFloyd', label: 'False Floyd', group: 'Error Diffusion' },
  { value: 'atkinson', label: 'Atkinson', group: 'Error Diffusion' },
  { value: 'sierraLite', label: 'Sierra Lite', group: 'Error Diffusion' },
  { value: 'sierraTwoRow', label: 'Sierra Two Row', group: 'Error Diffusion' },
  { value: 'burkes', label: 'Burkes', group: 'Error Diffusion' },
  { value: 'stucki', label: 'Stucki', group: 'Error Diffusion' },
  { value: 'jarvis', label: 'Jarvis-Judice-Ninke', group: 'Error Diffusion' }
];

const opts = (pairs: [string, string][]): Option[] => pairs.map(([value, label]) => ({ value, label }));

export const CONTROL_DEFS: ControlDef[] = [
  { kind: 'select', key: 'graphicMode', label: 'Grafikmodus', section: 'conversion', options: opts([
    ['fullDetail', 'Full Detail Graphic'], ['simpleBW', 'Simple Black/White'], ['cleanCutout', 'Clean Cutout'], ['photoPoster', 'Photo Poster'],
    ['highDetailInk', 'High Detail Ink'], ['screenprintHalftone', 'Screenprint Halftone'], ['dirtyXerox', 'Dirty Xerox'], ['pixelBitmap', 'Pixel Bitmap Classic']
  ]) },
  { kind: 'select', key: 'thresholdMode', label: 'Schwellenwert-Modus', section: 'conversion', options: opts([
    ['global', 'Global'], ['auto', 'Automatisch (Otsu)'], ['adaptive', 'Adaptiv / lokal'], ['edge', 'Kantengestützt']
  ]) },
  { kind: 'slider', key: 'pixelSize', label: 'Pixelgröße', section: 'conversion', min: 1, max: 40, showIf: (c) => c.graphicMode === 'pixelBitmap' },
  { kind: 'slider', key: 'threshold', label: 'Threshold', section: 'conversion', min: 0, max: 255, tone: true },
  { kind: 'slider', key: 'contrast', label: 'Kontrast', section: 'conversion', min: -100, max: 100 },
  { kind: 'slider', key: 'gamma', label: 'Tonwertkurve', section: 'conversion', min: 40, max: 220 },
  { kind: 'select', key: 'method', label: 'Dithering', section: 'conversion', options: methodOptions },
  { kind: 'slider', key: 'ditherStrength', label: 'Dither-Stärke', section: 'conversion', min: 0, max: 250 },
  { kind: 'slider', key: 'noiseScale', label: 'Noise-Skalierung', section: 'conversion', min: 20, max: 300 },

  { kind: 'slider', key: 'blackAmount', label: 'Schwarzanteil', section: 'photo', min: 0, max: 100 },
  { kind: 'slider', key: 'whiteCleanup', label: 'Weiß aufräumen', section: 'photo', min: 0, max: 100 },
  { kind: 'slider', key: 'midtonePush', label: 'Mitteltöne', section: 'photo', min: -100, max: 100 },
  { kind: 'slider', key: 'shadowDetail', label: 'Schattendetails', section: 'photo', min: 0, max: 100 },
  { kind: 'slider', key: 'highlightDetail', label: 'Lichterdetails', section: 'photo', min: 0, max: 100 },
  { kind: 'slider', key: 'edgeStrength', label: 'Kantenstärke', section: 'photo', min: 0, max: 100 },
  { kind: 'slider', key: 'smoothness', label: 'Glätten', section: 'photo', min: 0, max: 100 },
  { kind: 'slider', key: 'sharpen', label: 'Schärfen', section: 'photo', min: 0, max: 100 },
  { kind: 'slider', key: 'preBlur', label: 'Vorab weichzeichnen', section: 'photo', min: 0, max: 100 },
  { kind: 'slider', key: 'adaptiveStrength', label: 'Adaptive Stärke', section: 'photo', min: 0, max: 100 },
  { kind: 'slider', key: 'detailPreserve', label: 'Details erhalten', section: 'photo', min: 0, max: 100 },

  { kind: 'select', key: 'halftoneMode', label: 'Raster', section: 'halftone', options: opts([
    ['off', 'Aus'], ['dotRound', 'Round Dots'], ['dotTiny', 'Tiny Newspaper Dots'], ['dotBig', 'Big Print Dots'], ['ellipse', 'Ellipse Dots'],
    ['line', 'Line Screen'], ['verticalLine', 'Vertical Lines'], ['diagonalLine', 'Diagonal Lines'], ['cross', 'Cross Hatch'], ['wave', 'Wave Lines'],
    ['square', 'Square Dots'], ['diamond', 'Diamond Dots'], ['ring', 'Ring Dots'], ['concentric', 'Concentric Rings'], ['plus', 'Plus Marks'],
    ['brick', 'Brick Pattern'], ['star', 'Star Dots']
  ]) },
  { kind: 'slider', key: 'halftoneSize', label: 'Rastergröße', section: 'halftone', min: 3, max: 50 },
  { kind: 'slider', key: 'halftoneStrength', label: 'Stärke', section: 'halftone', min: 0, max: 100 },
  { kind: 'slider', key: 'halftoneAngle', label: 'Winkel', section: 'halftone', min: 0, max: 180, unit: '°' },
  { kind: 'slider', key: 'halftoneGain', label: 'Dot Gain', section: 'halftone', min: -50, max: 100 },
  { kind: 'slider', key: 'halftoneJitter', label: 'Raster-Jitter', section: 'halftone', min: 0, max: 100 },

  { kind: 'slider', key: 'edgeRoughness', label: 'Gerissene Kanten', section: 'distress', min: 0, max: 100 },
  { kind: 'slider', key: 'inkBleed', label: 'Ink Bleed', section: 'distress', min: 0, max: 6 },
  { kind: 'slider', key: 'dustAmount', label: 'Staub / Aussetzer', section: 'distress', min: 0, max: 100 },
  { kind: 'slider', key: 'grainAmount', label: 'Körnung', section: 'distress', min: 0, max: 100 },

  { kind: 'select', key: 'edgeFadeMode', label: 'Randübergang', section: 'edge', options: opts([
    ['off', 'Aus'], ['smooth', 'Smooth Fade'], ['torn', 'Torn / Ripped'], ['dissolve', 'Dust Dissolve'], ['burned', 'Burned / Xerox Edge'], ['grunge', 'Grunge Frame']
  ]) },
  { kind: 'slider', key: 'edgeFadeWidth', label: 'Fade-Breite', section: 'edge', min: 0, max: 180 },
  { kind: 'slider', key: 'edgeFadeStrength', label: 'Fade-Stärke', section: 'edge', min: 0, max: 100 },
  { kind: 'slider', key: 'edgeFadeNoise', label: 'Rissigkeit', section: 'edge', min: 0, max: 100 },
  { kind: 'slider', key: 'removeSpeckles', label: 'Inseln entfernen', section: 'edge', sub: 'Aufräumen', min: 0, max: 100 },
  { kind: 'slider', key: 'fillHoles', label: 'Löcher schließen', section: 'edge', sub: 'Aufräumen', min: 0, max: 100 },
  { kind: 'slider', key: 'expandBlack', label: 'Kante nachziehen', section: 'edge', sub: 'Aufräumen', min: 0, max: 5 },
  { kind: 'slider', key: 'shrinkBlack', label: 'Kante zurücknehmen', section: 'edge', sub: 'Aufräumen', min: 0, max: 5 },
  { kind: 'slider', key: 'smoothJagged', label: 'Treppenstufen glätten', section: 'edge', sub: 'Aufräumen', min: 0, max: 100 },

  { kind: 'toggle', key: 'transparent', label: 'Weiß transparent', section: 'output' },
  { kind: 'toggle', key: 'invert', label: 'Invertieren', section: 'output' }
];

export const DEF_BY_KEY = Object.fromEntries(CONTROL_DEFS.map((d) => [d.key, d])) as Record<ControlKey, ControlDef>;

export function isChanged(controls: Controls, key: ControlKey) {
  return controls[key] !== DEFAULT_CONTROLS[key];
}

export function sectionChanged(controls: Controls, section: SectionId) {
  return CONTROL_DEFS.some((d) => d.section === section && isChanged(controls, d.key as ControlKey));
}

export const EDGE_PRESETS: Record<string, { label: string; values: Partial<Controls> }> = {
  soft: { label: 'Weich', values: { edgeFadeMode: 'smooth', edgeFadeWidth: 18, edgeFadeStrength: 52, edgeFadeNoise: 18, transparent: true } },
  torn: { label: 'Gerissen', values: { edgeFadeMode: 'torn', edgeFadeWidth: 24, edgeFadeStrength: 70, edgeFadeNoise: 55, transparent: true } },
  heavy: { label: 'Heftig', values: { edgeFadeMode: 'dissolve', edgeFadeWidth: 42, edgeFadeStrength: 88, edgeFadeNoise: 78, transparent: true } }
};

export const LOOKS: { id: string; name: string; purpose: string }[] = [
  { id: 'cleanPhoto', name: 'Clean Photo', purpose: 'Foto, sauber getrennt' },
  { id: 'hardPoster', name: 'Hard Poster', purpose: 'Große Flächen' },
  { id: 'highDetailInk', name: 'Detail Ink', purpose: 'Kanten und Feinheiten' },
  { id: 'softNewspaper', name: 'Newspaper', purpose: 'Feines Punktraster' },
  { id: 'dirtyXerox', name: 'Dirty Xerox', purpose: 'Kopierer-Dreck' },
  { id: 'shirtPrintGraphic', name: 'Shirt Print', purpose: 'Transparent, weicher Rand' },
  { id: 'logoCleanup', name: 'Logo Cleanup', purpose: 'Scan zu klarer Fläche' },
  { id: 'pixelClassic', name: 'Pixel Bitmap', purpose: 'Grobe Pixelblöcke' }
];

/** The original "Shirt-fertig" button, minus the export width (handled by the caller). */
export function shirtReady(c: Controls): Controls {
  return {
    ...c,
    transparent: true,
    edgeFadeMode: 'torn',
    edgeFadeWidth: 28,
    edgeFadeStrength: 76,
    edgeFadeNoise: 58,
    dustAmount: Math.max(c.dustAmount, 8),
    grainAmount: Math.max(c.grainAmount, 10),
    removeSpeckles: Math.max(c.removeSpeckles, 18),
    fillHoles: Math.max(c.fillHoles, 12)
  };
}
