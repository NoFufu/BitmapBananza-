// One schema for every image control. Sliders, the command palette, the
// "changed" markers and reset all read from here.

export type SectionId = 'basics' | 'structure' | 'wear' | 'edge' | 'cleanup' | 'pro' | 'output';

export interface Option {
  value: string;
  label: string;
  group?: string;
}

interface Base {
  key: string;
  label: string;
  section: SectionId;
  sub?: string;
  hint?: string;
  showIf?: (c: Controls) => boolean;
}
export interface SliderDef extends Base {
  kind: 'slider';
  min: number;
  max: number;
  step?: number;
  unit?: string;
  tone?: boolean;
}
export interface SelectDef extends Base {
  kind: 'select';
  options: Option[];
}
export interface ToggleDef extends Base {
  kind: 'toggle';
}
export type ControlDef = SliderDef | SelectDef | ToggleDef;

export type Controls = {
  graphicMode: string;
  thresholdMode: string;
  pixelSize: number;
  threshold: number;
  contrast: number;
  gamma: number;
  ditherStrength: number;
  noiseScale: number;
  method: string;
  blackAmount: number;
  whiteCleanup: number;
  midtonePush: number;
  shadowDetail: number;
  highlightDetail: number;
  edgeStrength: number;
  smoothness: number;
  sharpen: number;
  preBlur: number;
  adaptiveStrength: number;
  detailPreserve: number;
  halftoneMode: string;
  halftoneSize: number;
  halftoneStrength: number;
  halftoneAngle: number;
  halftoneGain: number;
  halftoneJitter: number;
  edgeRoughness: number;
  inkBleed: number;
  dustAmount: number;
  grainAmount: number;
  edgeFadeMode: string;
  edgeFadeWidth: number;
  edgeFadeStrength: number;
  edgeFadeNoise: number;
  removeSpeckles: number;
  fillHoles: number;
  expandBlack: number;
  shrinkBlack: number;
  smoothJagged: number;
  invert: boolean;
  transparent: boolean;
};

export type ControlKey = keyof Controls;

// Same defaults as the HTML inputs of the original tool.
export const DEFAULT_CONTROLS: Controls = {
  graphicMode: 'fullDetail',
  thresholdMode: 'global',
  pixelSize: 8,
  threshold: 128,
  contrast: 0,
  gamma: 100,
  ditherStrength: 100,
  noiseScale: 100,
  method: 'threshold',
  blackAmount: 50,
  whiteCleanup: 20,
  midtonePush: 0,
  shadowDetail: 35,
  highlightDetail: 30,
  edgeStrength: 35,
  smoothness: 10,
  sharpen: 20,
  preBlur: 0,
  adaptiveStrength: 55,
  detailPreserve: 45,
  halftoneMode: 'off',
  halftoneSize: 10,
  halftoneStrength: 100,
  halftoneAngle: 15,
  halftoneGain: 0,
  halftoneJitter: 0,
  edgeRoughness: 0,
  inkBleed: 0,
  dustAmount: 0,
  grainAmount: 0,
  edgeFadeMode: 'off',
  edgeFadeWidth: 18,
  edgeFadeStrength: 70,
  edgeFadeNoise: 35,
  removeSpeckles: 0,
  fillHoles: 0,
  expandBlack: 0,
  shrinkBlack: 0,
  smoothJagged: 0,
  invert: false,
  transparent: false
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

/** Left panel, in the order a person usually works: overall tone, how grey is drawn, wear, edges, cleanup. */
export const SECTIONS: { id: SectionId; title: string; subtitle: string; hint?: string }[] = [
  { id: 'basics', title: 'Grundlagen', subtitle: 'Wie viel vom Bild wird schwarz?' },
  { id: 'structure', title: 'Struktur', subtitle: 'Wie Grautöne gezeichnet werden' },
  { id: 'wear', title: 'Druck-Look', subtitle: 'Abnutzung wie Siebdruck oder Kopierer' },
  { id: 'edge', title: 'Rand und Shirt', subtitle: 'Bildrand ausblenden, radieren' },
  { id: 'cleanup', title: 'Aufräumen', subtitle: 'Flecken, Löcher und Linienstärke', hint: 'Hilft vor allem bei Logos und Scans.' },
  {
    id: 'pro',
    title: 'Profi-Einstellungen',
    subtitle: 'Feinsteuerung der Umwandlung',
    hint: 'Die Looks setzen diese Werte schon passend. Ändere sie nur, wenn Grundlagen nicht reichen.'
  }
];

export type Structure = 'flat' | 'dither' | 'halftone' | 'pixel';

/** What draws the grey tones right now. Halftone wins over dithering in the engine. */
export function getStructure(c: Controls): Structure {
  if (c.graphicMode === 'pixelBitmap') return 'pixel';
  if (c.halftoneMode !== 'off' || c.graphicMode === 'screenprintHalftone') return 'halftone';
  if (c.method !== 'threshold' && c.ditherStrength > 0) return 'dither';
  return 'flat';
}

export function withStructure(c: Controls, structure: Structure): Controls {
  const base = c.graphicMode === 'pixelBitmap' || c.graphicMode === 'screenprintHalftone' ? 'fullDetail' : c.graphicMode;
  if (structure === 'pixel') return { ...c, graphicMode: 'pixelBitmap' };
  if (structure === 'halftone') return { ...c, graphicMode: base, halftoneMode: c.halftoneMode === 'off' ? 'dotRound' : c.halftoneMode };
  if (structure === 'dither') {
    return {
      ...c,
      graphicMode: base,
      halftoneMode: 'off',
      method: c.method === 'threshold' ? 'floyd' : c.method,
      ditherStrength: c.ditherStrength > 0 ? c.ditherStrength : 100
    };
  }
  return { ...c, graphicMode: base, halftoneMode: 'off', method: 'threshold' };
}

export const STRUCTURES: { value: Structure; label: string; hint: string }[] = [
  { value: 'flat', label: 'Flächen', hint: 'Klare schwarze und weiße Flächen, ohne Raster.' },
  { value: 'dither', label: 'Dither', hint: 'Grautöne als Punktmuster oder Rauschen.' },
  { value: 'halftone', label: 'Raster', hint: 'Druckraster wie in Zeitung und Siebdruck.' },
  { value: 'pixel', label: 'Pixel', hint: 'Grobe Pixelblöcke. Hier wirken nur Schwelle, Kontrast und Struktur.' }
];

// Dither methods that use the scale slider; the others ignore it.
const SCALED_METHODS = new Set([
  'randomChunky',
  'noise',
  'blueNoise',
  'organicWorm',
  'maze',
  'clusterDot',
  'hatchH',
  'hatchV',
  'hatchDiag'
]);
const notPixel = (c: Controls) => c.graphicMode !== 'pixelBitmap';
const isDither = (c: Controls) => {
  const st = getStructure(c);
  return st === 'dither' || (st === 'pixel' && c.halftoneMode === 'off');
};

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
  {
    kind: 'slider',
    key: 'threshold',
    label: 'Schwelle',
    section: 'basics',
    min: 0,
    max: 255,
    tone: true,
    showIf: (c) => c.thresholdMode !== 'auto'
  },
  { kind: 'slider', key: 'blackAmount', label: 'Schwarzanteil', section: 'basics', min: 0, max: 100, showIf: notPixel },
  { kind: 'slider', key: 'contrast', label: 'Kontrast', section: 'basics', min: -100, max: 100 },
  { kind: 'slider', key: 'detailPreserve', label: 'Details', section: 'basics', min: 0, max: 100, showIf: notPixel },
  { kind: 'slider', key: 'smoothness', label: 'Glätten', section: 'basics', min: 0, max: 100, showIf: notPixel },

  { kind: 'select', key: 'method', label: 'Dither-Art', section: 'structure', options: methodOptions, showIf: isDither },
  {
    kind: 'slider',
    key: 'ditherStrength',
    label: 'Dither-Stärke',
    section: 'structure',
    min: 0,
    max: 250,
    showIf: (c) => isDither(c) && c.method !== 'threshold'
  },
  {
    kind: 'slider',
    key: 'noiseScale',
    label: 'Körnigkeit',
    section: 'structure',
    min: 20,
    max: 300,
    showIf: (c) => isDither(c) && SCALED_METHODS.has(c.method)
  },
  {
    kind: 'select',
    key: 'halftoneMode',
    label: 'Rasterform',
    section: 'structure',
    options: opts([
      ['off', 'Aus'],
      ['dotRound', 'Round Dots'],
      ['dotTiny', 'Tiny Newspaper Dots'],
      ['dotBig', 'Big Print Dots'],
      ['ellipse', 'Ellipse Dots'],
      ['line', 'Line Screen'],
      ['verticalLine', 'Vertical Lines'],
      ['diagonalLine', 'Diagonal Lines'],
      ['cross', 'Cross Hatch'],
      ['wave', 'Wave Lines'],
      ['square', 'Square Dots'],
      ['diamond', 'Diamond Dots'],
      ['ring', 'Ring Dots'],
      ['concentric', 'Concentric Rings'],
      ['plus', 'Plus Marks'],
      ['brick', 'Brick Pattern'],
      ['star', 'Star Dots']
    ]),
    showIf: (c) => getStructure(c) === 'halftone' || (getStructure(c) === 'pixel' && c.halftoneMode !== 'off')
  },
  {
    kind: 'slider',
    key: 'halftoneSize',
    label: 'Rastergröße',
    section: 'structure',
    min: 3,
    max: 50,
    showIf: (c) => c.halftoneMode !== 'off' || getStructure(c) === 'halftone'
  },
  {
    kind: 'slider',
    key: 'halftoneAngle',
    label: 'Winkel',
    section: 'structure',
    min: 0,
    max: 180,
    unit: '°',
    showIf: (c) => c.halftoneMode !== 'off' || getStructure(c) === 'halftone'
  },
  {
    kind: 'slider',
    key: 'halftoneGain',
    label: 'Punkte dicker / dünner',
    section: 'structure',
    min: -50,
    max: 100,
    showIf: (c) => c.halftoneMode !== 'off' || getStructure(c) === 'halftone'
  },
  {
    kind: 'slider',
    key: 'halftoneJitter',
    label: 'Unruhe',
    section: 'structure',
    min: 0,
    max: 100,
    showIf: (c) => c.halftoneMode !== 'off' || getStructure(c) === 'halftone'
  },
  {
    kind: 'slider',
    key: 'halftoneStrength',
    label: 'Rasteranteil',
    section: 'structure',
    min: 0,
    max: 100,
    showIf: (c) => c.halftoneMode !== 'off' || getStructure(c) === 'halftone'
  },
  {
    kind: 'slider',
    key: 'pixelSize',
    label: 'Pixelgröße',
    section: 'structure',
    min: 1,
    max: 40,
    showIf: (c) => c.graphicMode === 'pixelBitmap'
  },

  { kind: 'slider', key: 'edgeRoughness', label: 'Ausgefranste Kanten', section: 'wear', min: 0, max: 100 },
  { kind: 'slider', key: 'inkBleed', label: 'Farbe läuft aus', section: 'wear', min: 0, max: 6 },
  { kind: 'slider', key: 'dustAmount', label: 'Staub und Fehlstellen', section: 'wear', min: 0, max: 100 },
  { kind: 'slider', key: 'grainAmount', label: 'Körnung', section: 'wear', min: 0, max: 100 },

  {
    kind: 'select',
    key: 'edgeFadeMode',
    label: 'Randübergang',
    section: 'edge',
    options: opts([
      ['off', 'Aus'],
      ['smooth', 'Weich ausblenden'],
      ['torn', 'Gerissen'],
      ['dissolve', 'Zerbröselt'],
      ['burned', 'Verbrannt / Kopierer'],
      ['grunge', 'Grunge-Rahmen']
    ])
  },
  { kind: 'slider', key: 'edgeFadeWidth', label: 'Breite', section: 'edge', min: 0, max: 180, showIf: (c) => c.edgeFadeMode !== 'off' },
  { kind: 'slider', key: 'edgeFadeStrength', label: 'Stärke', section: 'edge', min: 0, max: 100, showIf: (c) => c.edgeFadeMode !== 'off' },
  { kind: 'slider', key: 'edgeFadeNoise', label: 'Rissigkeit', section: 'edge', min: 0, max: 100, showIf: (c) => c.edgeFadeMode !== 'off' },

  { kind: 'slider', key: 'removeSpeckles', label: 'Kleine Flecken entfernen', section: 'cleanup', min: 0, max: 100 },
  { kind: 'slider', key: 'fillHoles', label: 'Löcher füllen', section: 'cleanup', min: 0, max: 100 },
  { kind: 'slider', key: 'expandBlack', label: 'Linien dicker', section: 'cleanup', min: 0, max: 5 },
  { kind: 'slider', key: 'shrinkBlack', label: 'Linien dünner', section: 'cleanup', min: 0, max: 5 },
  { kind: 'slider', key: 'smoothJagged', label: 'Treppenkanten glätten', section: 'cleanup', min: 0, max: 100 },

  {
    kind: 'select',
    key: 'thresholdMode',
    label: 'Schwellen-Methode',
    section: 'pro',
    options: opts([
      ['global', 'Fest (Regler Schwelle)'],
      ['auto', 'Automatisch (Otsu)'],
      ['adaptive', 'Lokal, je Bildbereich'],
      ['edge', 'Lokal mit Kanten']
    ]),
    showIf: notPixel
  },
  {
    kind: 'slider',
    key: 'adaptiveStrength',
    label: 'Lokale Stärke',
    section: 'pro',
    min: 0,
    max: 100,
    showIf: (c) => notPixel(c) && (c.thresholdMode === 'adaptive' || c.thresholdMode === 'edge')
  },
  { kind: 'slider', key: 'edgeStrength', label: 'Konturen betonen', section: 'pro', min: 0, max: 100, showIf: notPixel },
  { kind: 'slider', key: 'sharpen', label: 'Schärfen', section: 'pro', min: 0, max: 100, showIf: notPixel },
  { kind: 'slider', key: 'preBlur', label: 'Vorab weichzeichnen', section: 'pro', min: 0, max: 100, showIf: notPixel },
  { kind: 'slider', key: 'gamma', label: 'Tonwertkurve', section: 'pro', min: 40, max: 220 },
  { kind: 'slider', key: 'midtonePush', label: 'Mitteltöne', section: 'pro', min: -100, max: 100, showIf: notPixel },
  { kind: 'slider', key: 'shadowDetail', label: 'Schattendetails', section: 'pro', min: 0, max: 100, showIf: notPixel },
  { kind: 'slider', key: 'highlightDetail', label: 'Lichterdetails', section: 'pro', min: 0, max: 100, showIf: notPixel },
  { kind: 'slider', key: 'whiteCleanup', label: 'Weiß aufräumen', section: 'pro', min: 0, max: 100, showIf: notPixel },
  {
    kind: 'select',
    key: 'graphicMode',
    label: 'Verarbeitung',
    section: 'pro',
    hint: 'Clean Cutout und Photo Poster glätten Flächen stärker. Simple setzt fast alle Effekte aus.',
    options: opts([
      ['fullDetail', 'Standard'],
      ['simpleBW', 'Simple Schwarz/Weiß'],
      ['cleanCutout', 'Clean Cutout'],
      ['photoPoster', 'Photo Poster'],
      ['highDetailInk', 'High Detail Ink'],
      ['screenprintHalftone', 'Screenprint Halftone'],
      ['dirtyXerox', 'Dirty Xerox'],
      ['pixelBitmap', 'Pixel Bitmap']
    ])
  },

  { kind: 'toggle', key: 'transparent', label: 'Weiß transparent', section: 'output' },
  { kind: 'toggle', key: 'invert', label: 'Invertieren', section: 'output' }
];

function isChanged(controls: Controls, key: ControlKey) {
  return controls[key] !== DEFAULT_CONTROLS[key];
}

export function sectionChanged(controls: Controls, section: SectionId) {
  return CONTROL_DEFS.some((d) => d.section === section && isChanged(controls, d.key as ControlKey));
}

export const EDGE_PRESETS: Record<string, { label: string; values: Partial<Controls> }> = {
  soft: {
    label: 'Weich',
    values: { edgeFadeMode: 'smooth', edgeFadeWidth: 18, edgeFadeStrength: 52, edgeFadeNoise: 18, transparent: true }
  },
  torn: {
    label: 'Gerissen',
    values: { edgeFadeMode: 'torn', edgeFadeWidth: 24, edgeFadeStrength: 70, edgeFadeNoise: 55, transparent: true }
  },
  heavy: {
    label: 'Heftig',
    values: { edgeFadeMode: 'dissolve', edgeFadeWidth: 42, edgeFadeStrength: 88, edgeFadeNoise: 78, transparent: true }
  }
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
