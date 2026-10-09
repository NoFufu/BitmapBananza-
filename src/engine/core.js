// Image engine, ported verbatim from the original single-file app (js/app.js).
// Only DOM reads were replaced by explicit parameters; the pixel math is unchanged.
/* eslint-disable */

// document canvas on the main thread, OffscreenCanvas inside a worker.
export function createCanvas(width = 1, height = 1) {
  if (typeof document !== 'undefined') {
    const c = document.createElement('canvas');
    c.width = width;
    c.height = height;
    return c;
  }
  return new OffscreenCanvas(width, height);
}

const presets = {
  cleanPhoto: { graphicMode: 'fullDetail', thresholdMode: 'auto', pixelSize: 8, threshold: 128, contrast: 18, gamma: 96, ditherStrength: 0, noiseScale: 100, method: 'threshold', blackAmount: 52, whiteCleanup: 24, midtonePush: 18, shadowDetail: 45, highlightDetail: 36, edgeStrength: 34, smoothness: 16, sharpen: 24, preBlur: 2, adaptiveStrength: 35, detailPreserve: 52, halftoneMode: 'off', halftoneSize: 10, halftoneStrength: 100, halftoneAngle: 15, halftoneGain: 0, halftoneJitter: 0, glyphMode: false, glyphPreset: 'ascii', glyphCharset: ' .:-=+*#%@', glyphRenderMode: 'shade', glyphFont: 'impact', glyphReverse: false, glyphSize: 14, glyphSpacing: 100, glyphDensity: 95, glyphWeight: 900, glyphRandomness: 8, glyphRotation: 0, invert: false, transparent: false, edgeRoughness: 0, inkBleed: 0, dustAmount: 0, grainAmount: 2, edgeFadeMode: 'off', edgeFadeWidth: 18, edgeFadeStrength: 70, edgeFadeNoise: 35 },
  hardPoster: { graphicMode: 'photoPoster', thresholdMode: 'global', pixelSize: 8, threshold: 136, contrast: 38, gamma: 94, ditherStrength: 0, noiseScale: 100, method: 'threshold', blackAmount: 62, whiteCleanup: 44, midtonePush: 34, shadowDetail: 12, highlightDetail: 18, edgeStrength: 18, smoothness: 38, sharpen: 8, preBlur: 8, adaptiveStrength: 18, detailPreserve: 18, halftoneMode: 'off', halftoneSize: 10, halftoneStrength: 100, halftoneAngle: 15, halftoneGain: 0, halftoneJitter: 0, glyphMode: false, glyphPreset: 'ascii', glyphCharset: ' .:-=+*#%@', glyphRenderMode: 'shade', glyphFont: 'impact', glyphReverse: false, glyphSize: 14, glyphSpacing: 100, glyphDensity: 95, glyphWeight: 900, glyphRandomness: 8, glyphRotation: 0, invert: false, transparent: false, edgeRoughness: 3, inkBleed: 0, dustAmount: 0, grainAmount: 0, edgeFadeMode: 'off', edgeFadeWidth: 18, edgeFadeStrength: 70, edgeFadeNoise: 35 },
  highDetailInk: { graphicMode: 'highDetailInk', thresholdMode: 'edge', pixelSize: 8, threshold: 126, contrast: 26, gamma: 92, ditherStrength: 0, noiseScale: 100, method: 'threshold', blackAmount: 50, whiteCleanup: 15, midtonePush: 26, shadowDetail: 62, highlightDetail: 58, edgeStrength: 78, smoothness: 4, sharpen: 58, preBlur: 0, adaptiveStrength: 48, detailPreserve: 82, halftoneMode: 'off', halftoneSize: 10, halftoneStrength: 100, halftoneAngle: 15, halftoneGain: 0, halftoneJitter: 0, glyphMode: false, glyphPreset: 'ascii', glyphCharset: ' .:-=+*#%@', glyphRenderMode: 'shade', glyphFont: 'impact', glyphReverse: false, glyphSize: 14, glyphSpacing: 100, glyphDensity: 95, glyphWeight: 900, glyphRandomness: 8, glyphRotation: 0, invert: false, transparent: false, edgeRoughness: 2, inkBleed: 0, dustAmount: 0, grainAmount: 4, edgeFadeMode: 'off', edgeFadeWidth: 18, edgeFadeStrength: 70, edgeFadeNoise: 35 },
  softNewspaper: { graphicMode: 'screenprintHalftone', thresholdMode: 'auto', pixelSize: 8, threshold: 132, contrast: 12, gamma: 96, ditherStrength: 0, noiseScale: 100, method: 'threshold', blackAmount: 56, whiteCleanup: 18, midtonePush: 12, shadowDetail: 45, highlightDetail: 32, edgeStrength: 18, smoothness: 12, sharpen: 10, preBlur: 4, adaptiveStrength: 28, detailPreserve: 38, halftoneMode: 'dotTiny', halftoneSize: 8, halftoneStrength: 92, halftoneAngle: 15, halftoneGain: 6, halftoneJitter: 6, glyphMode: false, glyphPreset: 'ascii', glyphCharset: ' .:-=+*#%@', glyphRenderMode: 'shade', glyphFont: 'impact', glyphReverse: false, glyphSize: 14, glyphSpacing: 100, glyphDensity: 95, glyphWeight: 900, glyphRandomness: 8, glyphRotation: 0, invert: false, transparent: false, edgeRoughness: 6, inkBleed: 1, dustAmount: 3, grainAmount: 8, edgeFadeMode: 'off', edgeFadeWidth: 18, edgeFadeStrength: 70, edgeFadeNoise: 35 },
  dirtyXerox: { graphicMode: 'dirtyXerox', thresholdMode: 'adaptive', pixelSize: 8, threshold: 140, contrast: 30, gamma: 88, ditherStrength: 130, noiseScale: 135, method: 'noise', blackAmount: 66, whiteCleanup: 34, midtonePush: 42, shadowDetail: 20, highlightDetail: 20, edgeStrength: 54, smoothness: 4, sharpen: 36, preBlur: 0, adaptiveStrength: 76, detailPreserve: 48, halftoneMode: 'off', halftoneSize: 10, halftoneStrength: 100, halftoneAngle: 15, halftoneGain: 0, halftoneJitter: 0, glyphMode: false, glyphPreset: 'ascii', glyphCharset: ' .:-=+*#%@', glyphRenderMode: 'shade', glyphFont: 'impact', glyphReverse: false, glyphSize: 14, glyphSpacing: 100, glyphDensity: 95, glyphWeight: 900, glyphRandomness: 8, glyphRotation: 0, invert: false, transparent: false, edgeRoughness: 24, inkBleed: 2, dustAmount: 18, grainAmount: 30, edgeFadeMode: 'burned', edgeFadeWidth: 18, edgeFadeStrength: 62, edgeFadeNoise: 62 },
  shirtPrintGraphic: { graphicMode: 'fullDetail', thresholdMode: 'edge', pixelSize: 8, threshold: 134, contrast: 24, gamma: 94, ditherStrength: 0, noiseScale: 100, method: 'threshold', blackAmount: 58, whiteCleanup: 28, midtonePush: 22, shadowDetail: 44, highlightDetail: 36, edgeStrength: 48, smoothness: 12, sharpen: 32, preBlur: 2, adaptiveStrength: 54, detailPreserve: 58, halftoneMode: 'off', halftoneSize: 10, halftoneStrength: 100, halftoneAngle: 15, halftoneGain: 0, halftoneJitter: 0, glyphMode: false, glyphPreset: 'ascii', glyphCharset: ' .:-=+*#%@', glyphRenderMode: 'shade', glyphFont: 'impact', glyphReverse: false, glyphSize: 14, glyphSpacing: 100, glyphDensity: 95, glyphWeight: 900, glyphRandomness: 8, glyphRotation: 0, invert: false, transparent: true, edgeRoughness: 10, inkBleed: 1, dustAmount: 5, grainAmount: 8, edgeFadeMode: 'smooth', edgeFadeWidth: 16, edgeFadeStrength: 54, edgeFadeNoise: 18 },
  logoCleanup: { graphicMode: 'cleanCutout', thresholdMode: 'global', pixelSize: 8, threshold: 158, contrast: 42, gamma: 100, ditherStrength: 0, noiseScale: 100, method: 'threshold', blackAmount: 54, whiteCleanup: 72, midtonePush: 26, shadowDetail: 8, highlightDetail: 8, edgeStrength: 20, smoothness: 34, sharpen: 12, preBlur: 4, adaptiveStrength: 20, detailPreserve: 22, halftoneMode: 'off', halftoneSize: 10, halftoneStrength: 100, halftoneAngle: 15, halftoneGain: 0, halftoneJitter: 0, glyphMode: false, glyphPreset: 'ascii', glyphCharset: ' .:-=+*#%@', glyphRenderMode: 'shade', glyphFont: 'impact', glyphReverse: false, glyphSize: 14, glyphSpacing: 100, glyphDensity: 95, glyphWeight: 900, glyphRandomness: 8, glyphRotation: 0, invert: false, transparent: true, edgeRoughness: 0, inkBleed: 0, dustAmount: 0, grainAmount: 0, edgeFadeMode: 'off', edgeFadeWidth: 18, edgeFadeStrength: 70, edgeFadeNoise: 35, removeSpeckles: 48, fillHoles: 42, expandBlack: 0, shrinkBlack: 0, smoothJagged: 44 },
  pixelClassic: { graphicMode: 'pixelBitmap', thresholdMode: 'global', pixelSize: 10, threshold: 128, contrast: 28, gamma: 100, ditherStrength: 100, noiseScale: 100, method: 'threshold', blackAmount: 50, whiteCleanup: 20, midtonePush: 0, shadowDetail: 20, highlightDetail: 20, edgeStrength: 0, smoothness: 0, sharpen: 0, preBlur: 0, adaptiveStrength: 0, detailPreserve: 0, halftoneMode: 'off', halftoneSize: 10, halftoneStrength: 100, halftoneAngle: 15, halftoneGain: 0, halftoneJitter: 0, glyphMode: false, glyphPreset: 'ascii', glyphCharset: ' .:-=+*#%@', glyphRenderMode: 'shade', glyphFont: 'impact', glyphReverse: false, glyphSize: 14, glyphSpacing: 100, glyphDensity: 95, glyphWeight: 900, glyphRandomness: 8, glyphRotation: 0, invert: false, transparent: false, edgeRoughness: 4, inkBleed: 0, dustAmount: 0, grainAmount: 0, edgeFadeMode: 'off', edgeFadeWidth: 18, edgeFadeStrength: 70, edgeFadeNoise: 35 },
  xerox: { pixelSize: 4, threshold: 145, contrast: 12, gamma: 96, ditherStrength: 120, noiseScale: 100, method: 'floyd', halftoneMode: 'off', halftoneSize: 10, halftoneStrength: 100, halftoneAngle: 15, halftoneGain: 0, halftoneJitter: 0, glyphMode: false, glyphPreset: 'ascii', glyphCharset: ' .:-=+*#%@', glyphRenderMode: 'shade', glyphFont: 'impact', glyphReverse: false, glyphSize: 14, glyphSpacing: 100, glyphDensity: 95, glyphWeight: 900, glyphRandomness: 8, glyphRotation: 0, invert: false, transparent: false, edgeRoughness: 18, inkBleed: 1, dustAmount: 8, grainAmount: 18 , edgeFadeMode: 'off', edgeFadeWidth: 18, edgeFadeStrength: 70, edgeFadeNoise: 35 },
  hardBitmap: { pixelSize: 10, threshold: 128, contrast: 25, gamma: 100, ditherStrength: 100, noiseScale: 100, method: 'threshold', halftoneMode: 'off', halftoneSize: 10, halftoneStrength: 100, halftoneAngle: 15, halftoneGain: 0, halftoneJitter: 0, glyphMode: false, glyphPreset: 'ascii', glyphCharset: ' .:-=+*#%@', glyphRenderMode: 'shade', glyphFont: 'impact', glyphReverse: false, glyphSize: 14, glyphSpacing: 100, glyphDensity: 95, glyphWeight: 900, glyphRandomness: 8, glyphRotation: 0, invert: false, transparent: false, edgeRoughness: 4, inkBleed: 0, dustAmount: 0, grainAmount: 0 , edgeFadeMode: 'off', edgeFadeWidth: 18, edgeFadeStrength: 70, edgeFadeNoise: 35 },
  screenprint: { pixelSize: 6, threshold: 135, contrast: 10, gamma: 96, ditherStrength: 100, noiseScale: 100, method: 'bayer8', halftoneMode: 'dotRound', halftoneSize: 9, halftoneStrength: 85, halftoneAngle: 15, halftoneGain: 10, halftoneJitter: 8, glyphMode: false, glyphPreset: 'ascii', glyphCharset: ' .:-=+*#%@', glyphRenderMode: 'shade', glyphFont: 'impact', glyphReverse: false, glyphSize: 14, glyphSpacing: 100, glyphDensity: 95, glyphWeight: 900, glyphRandomness: 8, glyphRotation: 0, invert: false, transparent: true, edgeRoughness: 12, inkBleed: 2, dustAmount: 6, grainAmount: 10 , edgeFadeMode: 'smooth', edgeFadeWidth: 14, edgeFadeStrength: 55, edgeFadeNoise: 20 },
  dirtyHalftone: { pixelSize: 6, threshold: 120, contrast: 18, gamma: 90, ditherStrength: 135, noiseScale: 140, method: 'noise', halftoneMode: 'dotBig', halftoneSize: 13, halftoneStrength: 100, halftoneAngle: 25, halftoneGain: 24, halftoneJitter: 35, glyphMode: false, glyphPreset: 'ascii', glyphCharset: ' .:-=+*#%@', glyphRenderMode: 'shade', glyphFont: 'impact', glyphReverse: false, glyphSize: 14, glyphSpacing: 100, glyphDensity: 95, glyphWeight: 900, glyphRandomness: 8, glyphRotation: 0, invert: false, transparent: false, edgeRoughness: 28, inkBleed: 2, dustAmount: 18, grainAmount: 32 , edgeFadeMode: 'torn', edgeFadeWidth: 24, edgeFadeStrength: 72, edgeFadeNoise: 60 },
  logoCutout: { pixelSize: 12, threshold: 160, contrast: 35, gamma: 100, ditherStrength: 0, noiseScale: 100, method: 'threshold', halftoneMode: 'off', halftoneSize: 10, halftoneStrength: 100, halftoneAngle: 15, halftoneGain: 0, halftoneJitter: 0, glyphMode: false, glyphPreset: 'ascii', glyphCharset: ' .:-=+*#%@', glyphRenderMode: 'shade', glyphFont: 'impact', glyphReverse: false, glyphSize: 14, glyphSpacing: 100, glyphDensity: 95, glyphWeight: 900, glyphRandomness: 8, glyphRotation: 0, invert: false, transparent: true, edgeRoughness: 0, inkBleed: 0, dustAmount: 0, grainAmount: 0 , edgeFadeMode: 'off', edgeFadeWidth: 18, edgeFadeStrength: 70, edgeFadeNoise: 35 },
  shirtPrint: { pixelSize: 5, threshold: 140, contrast: 14, gamma: 95, ditherStrength: 110, noiseScale: 115, method: 'atkinson', halftoneMode: 'line', halftoneSize: 11, halftoneStrength: 55, halftoneAngle: 35, halftoneGain: 8, halftoneJitter: 12, glyphMode: false, glyphPreset: 'ascii', glyphCharset: ' .:-=+*#%@', glyphRenderMode: 'shade', glyphFont: 'impact', glyphReverse: false, glyphSize: 14, glyphSpacing: 100, glyphDensity: 95, glyphWeight: 900, glyphRandomness: 8, glyphRotation: 0, invert: false, transparent: true, edgeRoughness: 20, inkBleed: 2, dustAmount: 12, grainAmount: 18 , edgeFadeMode: 'torn', edgeFadeWidth: 22, edgeFadeStrength: 68, edgeFadeNoise: 48 },
  glyphPoster: { pixelSize: 6, threshold: 150, contrast: 25, gamma: 90, ditherStrength: 100, noiseScale: 100, method: 'threshold', halftoneMode: 'off', halftoneSize: 10, halftoneStrength: 100, halftoneAngle: 15, halftoneGain: 0, halftoneJitter: 0, glyphMode: true, glyphCharset: 'LEVI0123456789#@$%&*+=-:.', glyphSize: 13, glyphDensity: 88, glyphRandomness: 18, invert: false, transparent: true, edgeRoughness: 8, inkBleed: 1, dustAmount: 4, grainAmount: 10 , edgeFadeMode: 'dissolve', edgeFadeWidth: 18, edgeFadeStrength: 55, edgeFadeNoise: 45 }
};

const bayer2 = [[0, 2], [3, 1]];

const bayer4 = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];

const bayer8 = [
  [0, 32, 8, 40, 2, 34, 10, 42], [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38], [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41], [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37], [63, 31, 55, 23, 61, 29, 53, 21]
];

const diffusionKernels = {
  floyd: { divisor: 16, weights: [{ x: 1, y: 0, w: 7 }, { x: -1, y: 1, w: 3 }, { x: 0, y: 1, w: 5 }, { x: 1, y: 1, w: 1 }] },
  falseFloyd: { divisor: 8, weights: [{ x: 1, y: 0, w: 3 }, { x: 0, y: 1, w: 3 }, { x: 1, y: 1, w: 2 }] },
  atkinson: { divisor: 8, weights: [{ x: 1, y: 0, w: 1 }, { x: 2, y: 0, w: 1 }, { x: -1, y: 1, w: 1 }, { x: 0, y: 1, w: 1 }, { x: 1, y: 1, w: 1 }, { x: 0, y: 2, w: 1 }] },
  sierraLite: { divisor: 4, weights: [{ x: 1, y: 0, w: 2 }, { x: -1, y: 1, w: 1 }, { x: 0, y: 1, w: 1 }] },
  sierraTwoRow: { divisor: 16, weights: [{ x: 1, y: 0, w: 4 }, { x: 2, y: 0, w: 3 }, { x: -2, y: 1, w: 1 }, { x: -1, y: 1, w: 2 }, { x: 0, y: 1, w: 3 }, { x: 1, y: 1, w: 2 }, { x: 2, y: 1, w: 1 }] },
  burkes: { divisor: 32, weights: [{ x: 1, y: 0, w: 8 }, { x: 2, y: 0, w: 4 }, { x: -2, y: 1, w: 2 }, { x: -1, y: 1, w: 4 }, { x: 0, y: 1, w: 8 }, { x: 1, y: 1, w: 4 }, { x: 2, y: 1, w: 2 }] },
  stucki: { divisor: 42, weights: [{ x: 1, y: 0, w: 8 }, { x: 2, y: 0, w: 4 }, { x: -2, y: 1, w: 2 }, { x: -1, y: 1, w: 4 }, { x: 0, y: 1, w: 8 }, { x: 1, y: 1, w: 4 }, { x: 2, y: 1, w: 2 }, { x: -2, y: 2, w: 1 }, { x: -1, y: 2, w: 2 }, { x: 0, y: 2, w: 4 }, { x: 1, y: 2, w: 2 }, { x: 2, y: 2, w: 1 }] },
  jarvis: { divisor: 48, weights: [{ x: 1, y: 0, w: 7 }, { x: 2, y: 0, w: 5 }, { x: -2, y: 1, w: 3 }, { x: -1, y: 1, w: 5 }, { x: 0, y: 1, w: 7 }, { x: 1, y: 1, w: 5 }, { x: 2, y: 1, w: 3 }, { x: -2, y: 2, w: 1 }, { x: -1, y: 2, w: 3 }, { x: 0, y: 2, w: 5 }, { x: 1, y: 2, w: 3 }, { x: 2, y: 2, w: 1 }] }
};

function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }

function normalizeSimpleBlackWhiteSettings(settings) {
  settings.thresholdMode = 'global';
  settings.method = 'threshold';
  settings.ditherStrength = 0;
  settings.halftoneMode = 'off';
  settings.edgeStrength = 0;
  settings.smoothness = 0;
  settings.sharpen = 0;
  settings.preBlur = 0;
  settings.adaptiveStrength = 0;
  settings.detailPreserve = 0;
  settings.edgeRoughness = 0;
  settings.inkBleed = 0;
  settings.dustAmount = 0;
  settings.grainAmount = 0;
  settings.edgeFadeMode = 'off';
  settings.cleanup = { removeSpeckles: 0, fillHoles: 0, expandBlack: 0, shrinkBlack: 0, smoothJagged: 0 };
}

function processPixelBitmapClassic(settings, sourceImage, outputCanvas, outputCtx, eraseStrokes = []) {
  const {
    pixelSize, threshold, contrast, gamma, ditherStrength, noiseScale, method,
    halftoneMode, halftoneSize, halftoneStrength, halftoneAngle, halftoneGain, halftoneJitter,
    edgeRoughness, inkBleed, dustAmount, grainAmount,
    edgeFadeMode, edgeFadeWidth, edgeFadeStrength, edgeFadeNoise, cleanup, invert, makeTransparent
  } = settings;

  const smallWidth = Math.max(1, Math.floor(sourceImage.width / pixelSize));
  const smallHeight = Math.max(1, Math.floor(sourceImage.height / pixelSize));
  const tempCanvas = createCanvas();
  const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
  tempCanvas.width = smallWidth;
  tempCanvas.height = smallHeight;
  tempCtx.drawImage(sourceImage, 0, 0, smallWidth, smallHeight);
  const imageData = tempCtx.getImageData(0, 0, smallWidth, smallHeight);
  const data = imageData.data;
  applyPreTone(data, contrast, gamma);

  if (halftoneMode !== 'off') applyHalftonePattern(data, smallWidth, smallHeight, threshold, invert, makeTransparent, halftoneMode, halftoneSize, halftoneStrength, halftoneAngle, halftoneGain, halftoneJitter);
  else if (diffusionKernels[method]) applyErrorDiffusion(data, smallWidth, smallHeight, threshold, invert, makeTransparent, diffusionKernels[method], ditherStrength);
  else applyBasicBitmap(data, smallWidth, smallHeight, threshold, method, invert, makeTransparent, ditherStrength, noiseScale);
  if (grainAmount > 0) applyGrain(data, smallWidth, smallHeight, grainAmount, makeTransparent);
  if (inkBleed > 0) applyInkBleed(data, smallWidth, smallHeight, inkBleed, makeTransparent);
  if (edgeRoughness > 0) applyRoughEdges(data, smallWidth, smallHeight, edgeRoughness, makeTransparent);
  if (dustAmount > 0) applyDust(data, smallWidth, smallHeight, dustAmount, makeTransparent);
  if (edgeFadeMode !== 'off' && edgeFadeWidth > 0 && edgeFadeStrength > 0) applyEdgeTransition(data, smallWidth, smallHeight, edgeFadeMode, edgeFadeWidth, edgeFadeStrength, edgeFadeNoise, makeTransparent);
  applyCleanupTools(data, smallWidth, smallHeight, cleanup, makeTransparent);

  tempCtx.putImageData(imageData, 0, 0);
  outputCanvas.width = smallWidth * pixelSize;
  outputCanvas.height = smallHeight * pixelSize;
  outputCtx.imageSmoothingEnabled = false;
  outputCtx.clearRect(0, 0, outputCanvas.width, outputCanvas.height);
  outputCtx.drawImage(tempCanvas, 0, 0, outputCanvas.width, outputCanvas.height);
  applyManualEraserToCanvas(outputCanvas, outputCtx, eraseStrokes, makeTransparent);
  return outputCanvas;
}

function processFullDetailGraphic(settings, sourceImage, outputCanvas, outputCtx, eraseStrokes = []) {
  const width = sourceImage.width;
  const height = sourceImage.height;
  const workCanvas = createCanvas();
  const workCtx = workCanvas.getContext('2d', { willReadFrequently: true });
  workCanvas.width = width;
  workCanvas.height = height;
  workCtx.imageSmoothingEnabled = true;
  workCtx.drawImage(sourceImage, 0, 0, width, height);

  const imageData = workCtx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const luminance = new Float32Array(width * height);
  const alpha = new Uint8Array(width * height);

  for (let i = 0; i < luminance.length; i++) {
    const di = i * 4;
    alpha[i] = data[di + 3];
    luminance[i] = applyGraphicToneValue(0.299 * data[di] + 0.587 * data[di + 1] + 0.114 * data[di + 2], settings);
  }

  let workingLum = luminance;
  if (settings.preBlur > 0) workingLum = boxBlurFloat(workingLum, width, height, Math.max(1, Math.round(settings.preBlur / 18)), alpha);
  if (settings.smoothness > 0 && settings.graphicMode !== 'photoPoster') workingLum = boxBlurFloat(workingLum, width, height, Math.max(1, Math.round(settings.smoothness / 28)), alpha);
  if (settings.sharpen > 0 || settings.detailPreserve > 0) workingLum = sharpenFloat(workingLum, width, height, (settings.sharpen + settings.detailPreserve * 0.5) / 100, alpha);

  const edgeMap = buildEdgeMap(workingLum, width, height, alpha);
  const baseThreshold = resolveBaseThreshold(workingLum, alpha, settings);
  const mask = buildThresholdMask(workingLum, edgeMap, alpha, width, height, baseThreshold, settings);
  if (settings.edgeStrength > 0 || settings.detailPreserve > 0) applyEdgeInk(mask, workingLum, edgeMap, alpha, baseThreshold, settings);
  if (settings.smoothness > 0) smoothMask(mask, alpha, width, height, Math.round(settings.smoothness / 34), settings.graphicMode === 'cleanCutout' || settings.graphicMode === 'photoPoster');

  writeMaskToData(data, mask, alpha, settings.invert, settings.makeTransparent);

  if (settings.halftoneMode !== 'off') {
    writeLuminanceToData(data, workingLum, alpha);
    applyHalftonePattern(data, width, height, baseThreshold, settings.invert, settings.makeTransparent, settings.halftoneMode, settings.halftoneSize, settings.halftoneStrength, settings.halftoneAngle, settings.halftoneGain, settings.halftoneJitter);
  } else if (settings.method !== 'threshold' && settings.ditherStrength > 0) {
    writeLuminanceToData(data, workingLum, alpha);
    if (diffusionKernels[settings.method]) applyErrorDiffusion(data, width, height, baseThreshold, settings.invert, settings.makeTransparent, diffusionKernels[settings.method], settings.ditherStrength);
    else applyBasicBitmap(data, width, height, baseThreshold, settings.method, settings.invert, settings.makeTransparent, settings.ditherStrength, settings.noiseScale);
  }

  if (settings.grainAmount > 0) applyGrain(data, width, height, settings.grainAmount, settings.makeTransparent);
  if (settings.inkBleed > 0) applyInkBleed(data, width, height, settings.inkBleed, settings.makeTransparent);
  if (settings.edgeRoughness > 0) applyRoughEdges(data, width, height, settings.edgeRoughness, settings.makeTransparent);
  if (settings.dustAmount > 0) applyDust(data, width, height, settings.dustAmount, settings.makeTransparent);
  if (settings.edgeFadeMode !== 'off' && settings.edgeFadeWidth > 0 && settings.edgeFadeStrength > 0) applyEdgeTransition(data, width, height, settings.edgeFadeMode, settings.edgeFadeWidth, settings.edgeFadeStrength, settings.edgeFadeNoise, settings.makeTransparent);
  applyCleanupTools(data, width, height, settings.cleanup, settings.makeTransparent);

  outputCanvas.width = width;
  outputCanvas.height = height;
  outputCtx.imageSmoothingEnabled = true;
  outputCtx.clearRect(0, 0, width, height);
  outputCtx.putImageData(imageData, 0, 0);
  applyManualEraserToCanvas(outputCanvas, outputCtx, eraseStrokes, settings.makeTransparent);
  return outputCanvas;
}

function applyPreTone(data, contrast, gamma) {
  const contrastFactor = (259 * (contrast + 255)) / (255 * (259 - contrast));
  const gammaValue = Math.max(0.1, gamma / 100);
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) continue;
    for (let c = 0; c < 3; c++) {
      let value = data[i + c];
      value = contrastFactor * (value - 128) + 128;
      value = Math.pow(clamp(value, 0, 255) / 255, gammaValue) * 255;
      data[i + c] = clamp(value, 0, 255);
    }
  }
}

function applyGraphicToneValue(value, settings) {
  const contrastFactor = (259 * (settings.contrast + 255)) / (255 * (259 - settings.contrast));
  const gammaValue = Math.max(0.1, settings.gamma / 100);
  let v = contrastFactor * (value - 128) + 128;
  v = Math.pow(clamp(v, 0, 255) / 255, gammaValue) * 255;
  v = 128 + (v - 128) * (1 + settings.midtonePush / 140);
  if (v < 128) v += (128 - v) * (settings.shadowDetail / 100) * 0.38;
  if (v > 128) v -= (v - 128) * (settings.highlightDetail / 100) * 0.22;
  return clamp(v, 0, 255);
}

function resolveBaseThreshold(luminance, alpha, settings) {
  const manualOffset = (settings.blackAmount - 50) * 1.35 - settings.whiteCleanup * 0.72;
  const modeThreshold = settings.thresholdMode === 'auto' ? otsuThreshold(luminance, alpha) : settings.threshold;
  return clamp(modeThreshold + manualOffset, 0, 255);
}

function otsuThreshold(luminance, alpha) {
  const hist = new Uint32Array(256);
  let total = 0;
  for (let i = 0; i < luminance.length; i++) {
    if (alpha[i] === 0) continue;
    hist[Math.round(clamp(luminance[i], 0, 255))]++;
    total++;
  }
  if (!total) return 128;
  let sum = 0;
  for (let t = 0; t < 256; t++) sum += t * hist[t];
  let sumB = 0;
  let wB = 0;
  let maxVariance = -1;
  let threshold = 128;
  for (let t = 0; t < 256; t++) {
    wB += hist[t];
    if (!wB) continue;
    const wF = total - wB;
    if (!wF) break;
    sumB += t * hist[t];
    const mB = sumB / wB;
    const mF = (sum - sumB) / wF;
    const variance = wB * wF * (mB - mF) * (mB - mF);
    if (variance > maxVariance) {
      maxVariance = variance;
      threshold = t;
    }
  }
  return threshold;
}

function buildThresholdMask(luminance, edgeMap, alpha, width, height, baseThreshold, settings) {
  const mask = new Uint8Array(width * height);
  const useLocal = settings.thresholdMode === 'adaptive' || settings.thresholdMode === 'edge';
  const integral = useLocal ? buildIntegral(luminance, width, height) : null;
  const radius = Math.max(8, Math.round(Math.min(width, height) * 0.018 + settings.adaptiveStrength * 0.28));
  const localMix = useLocal ? clamp(settings.adaptiveStrength / 100, 0, 1) : 0;
  const edgeMix = settings.thresholdMode === 'edge' ? 1 : 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = y * width + x;
      if (alpha[index] === 0) continue;
      let localThreshold = baseThreshold;
      if (useLocal) {
        const mean = localMean(integral, width, height, x, y, radius);
        localThreshold = mean + (baseThreshold - 128) * 0.72;
      }
      let threshold = baseThreshold * (1 - localMix) + localThreshold * localMix;
      threshold += edgeMap[index] * (settings.edgeStrength / 100) * 58 * edgeMix;
      threshold += (noise2D(x * 0.93, y * 0.87) - 0.5) * settings.detailPreserve * 0.22;
      mask[index] = luminance[index] < threshold ? 1 : 0;
    }
  }
  return mask;
}

function buildIntegral(values, width, height) {
  const integral = new Float64Array((width + 1) * (height + 1));
  for (let y = 1; y <= height; y++) {
    let rowSum = 0;
    for (let x = 1; x <= width; x++) {
      rowSum += values[(y - 1) * width + (x - 1)];
      integral[y * (width + 1) + x] = integral[(y - 1) * (width + 1) + x] + rowSum;
    }
  }
  return integral;
}

function localMean(integral, width, height, x, y, radius) {
  const x1 = Math.max(0, x - radius);
  const y1 = Math.max(0, y - radius);
  const x2 = Math.min(width - 1, x + radius);
  const y2 = Math.min(height - 1, y + radius);
  const stride = width + 1;
  const sum = integral[(y2 + 1) * stride + (x2 + 1)] - integral[y1 * stride + (x2 + 1)] - integral[(y2 + 1) * stride + x1] + integral[y1 * stride + x1];
  return sum / ((x2 - x1 + 1) * (y2 - y1 + 1));
}

function buildEdgeMap(luminance, width, height, alpha) {
  const edges = new Float32Array(width * height);
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const index = y * width + x;
      if (alpha[index] === 0) continue;
      const gx = -luminance[index - width - 1] - 2 * luminance[index - 1] - luminance[index + width - 1] + luminance[index - width + 1] + 2 * luminance[index + 1] + luminance[index + width + 1];
      const gy = -luminance[index - width - 1] - 2 * luminance[index - width] - luminance[index - width + 1] + luminance[index + width - 1] + 2 * luminance[index + width] + luminance[index + width + 1];
      edges[index] = clamp(Math.sqrt(gx * gx + gy * gy) / 520, 0, 1);
    }
  }
  return edges;
}

function boxBlurFloat(source, width, height, radius, alpha) {
  if (radius <= 0) return source;
  const temp = new Float32Array(source.length);
  const out = new Float32Array(source.length);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sum = 0;
      let count = 0;
      for (let dx = -radius; dx <= radius; dx++) {
        const sx = clamp(x + dx, 0, width - 1);
        const index = y * width + sx;
        if (alpha[index] === 0) continue;
        sum += source[index];
        count++;
      }
      temp[y * width + x] = count ? sum / count : source[y * width + x];
    }
  }
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sum = 0;
      let count = 0;
      for (let dy = -radius; dy <= radius; dy++) {
        const sy = clamp(y + dy, 0, height - 1);
        const index = sy * width + x;
        if (alpha[index] === 0) continue;
        sum += temp[index];
        count++;
      }
      out[y * width + x] = count ? sum / count : temp[y * width + x];
    }
  }
  return out;
}

function sharpenFloat(source, width, height, amount, alpha) {
  const blurred = boxBlurFloat(source, width, height, 1, alpha);
  const out = new Float32Array(source.length);
  for (let i = 0; i < source.length; i++) {
    out[i] = alpha[i] === 0 ? source[i] : clamp(source[i] + (source[i] - blurred[i]) * amount, 0, 255);
  }
  return out;
}

function applyEdgeInk(mask, luminance, edgeMap, alpha, baseThreshold, settings) {
  const edgeGate = 0.18 + (1 - settings.edgeStrength / 100) * 0.22;
  for (let i = 0; i < mask.length; i++) {
    if (alpha[i] === 0) continue;
    const closeToInk = luminance[i] < baseThreshold + settings.detailPreserve * 0.85;
    if (edgeMap[i] > edgeGate && closeToInk) mask[i] = 1;
  }
}

function smoothMask(mask, alpha, width, height, passes, strong) {
  const safePasses = Math.max(0, Math.min(4, passes));
  const required = strong ? 5 : 6;
  for (let pass = 0; pass < safePasses; pass++) {
    const copy = new Uint8Array(mask);
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const index = y * width + x;
        if (alpha[index] === 0) continue;
        let count = 0;
        for (let ny = -1; ny <= 1; ny++) for (let nx = -1; nx <= 1; nx++) {
          if (copy[(y + ny) * width + (x + nx)]) count++;
        }
        if (count >= required) mask[index] = 1;
        if (count <= 2) mask[index] = 0;
      }
    }
  }
}

function writeLuminanceToData(data, luminance, alpha) {
  for (let i = 0; i < luminance.length; i++) {
    const di = i * 4;
    const v = alpha[i] === 0 ? 255 : Math.round(clamp(luminance[i], 0, 255));
    data[di] = v;
    data[di + 1] = v;
    data[di + 2] = v;
    data[di + 3] = alpha[i];
  }
}

function writeMaskToData(data, mask, alpha, invert, makeTransparent) {
  for (let i = 0; i < mask.length; i++) {
    const di = i * 4;
    if (alpha[i] === 0) {
      setTransparentPixel(data, di);
      continue;
    }
    let isBlack = mask[i] === 1;
    if (invert) isBlack = !isBlack;
    setPixel(data, di, isBlack, makeTransparent);
  }
}

function applyHalftonePattern(data, width, height, threshold, invert, makeTransparent, mode, scale, strength, angle, gain, jitter) {
  const radians = angle * Math.PI / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const centerX = width / 2;
  const centerY = height / 2;
  const safeScale = Math.max(3, scale);
  const strengthMix = clamp(strength / 100, 0, 1);
  const gainOffset = gain / 100;
  const jitterAmount = jitter / 100 * safeScale * 0.45;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      if (data[i + 3] === 0) continue;

      const brightness = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      const darkness = clamp((threshold - brightness + 128) / 255 + gainOffset, 0, 1);
      const baseIsBlack = brightness < threshold;

      const jitterX = jitterAmount ? (noise2D(x * 0.73, y * 0.61) - 0.5) * jitterAmount : 0;
      const jitterY = jitterAmount ? (noise2D(x * 0.51 + 8.2, y * 0.79 - 3.4) - 0.5) * jitterAmount : 0;
      const dx = x - centerX + jitterX;
      const dy = y - centerY + jitterY;
      const rx = dx * cos - dy * sin + centerX;
      const ry = dx * sin + dy * cos + centerY;
      const localX = getCellPosition(rx, safeScale) - 0.5;
      const localY = getCellPosition(ry, safeScale) - 0.5;
      const distance = Math.sqrt(localX * localX + localY * localY);

      let patternBlack = false;
      if (mode === 'dotRound' || mode === 'dotBig' || mode === 'dotTiny') {
        const dotBoost = mode === 'dotBig' ? 0.68 : mode === 'dotTiny' ? 0.42 : 0.54;
        const radius = Math.sqrt(darkness) * dotBoost;
        patternBlack = distance < radius;
      } else if (mode === 'ellipse') {
        const ex = localX / 0.72;
        const ey = localY / 0.38;
        patternBlack = Math.sqrt(ex * ex + ey * ey) < Math.sqrt(darkness) * 0.74;
      } else if (mode === 'line') {
        const lineWidth = darkness * 0.92;
        patternBlack = Math.abs(localY) < lineWidth / 2;
      } else if (mode === 'verticalLine') {
        const lineWidth = darkness * 0.92;
        patternBlack = Math.abs(localX) < lineWidth / 2;
      } else if (mode === 'diagonalLine') {
        const lineWidth = darkness * 0.88;
        patternBlack = Math.abs(localX + localY) < lineWidth / 2;
      } else if (mode === 'cross') {
        const lineWidth = darkness * 0.58;
        patternBlack = Math.abs(localX) < lineWidth / 2 || Math.abs(localY) < lineWidth / 2;
      } else if (mode === 'wave') {
        const wave = Math.sin((rx / safeScale) * Math.PI * 2) * 0.22;
        const waveY = getCellPosition(ry + wave * safeScale, safeScale) - 0.5;
        patternBlack = Math.abs(waveY) < darkness * 0.42;
      } else if (mode === 'square') {
        patternBlack = Math.max(Math.abs(localX), Math.abs(localY)) < darkness * 0.52;
      } else if (mode === 'diamond') {
        patternBlack = Math.abs(localX) + Math.abs(localY) < darkness * 0.72;
      } else if (mode === 'ring') {
        const radius = Math.sqrt(darkness) * 0.55;
        patternBlack = distance < radius && distance > radius * 0.55;
      } else if (mode === 'concentric') {
        const ring = Math.abs(Math.sin(distance * Math.PI * 7));
        patternBlack = ring > 1 - darkness * 0.8;
      } else if (mode === 'plus') {
        const arm = darkness * 0.52;
        patternBlack = (Math.abs(localX) < arm * 0.25 && Math.abs(localY) < arm) || (Math.abs(localY) < arm * 0.25 && Math.abs(localX) < arm);
      } else if (mode === 'brick') {
        const shiftedY = getCellPosition(ry + (Math.floor(rx / safeScale) % 2) * safeScale * 0.5, safeScale) - 0.5;
        patternBlack = Math.abs(localX) < darkness * 0.46 && Math.abs(shiftedY) < darkness * 0.31;
      } else if (mode === 'star') {
        const star = Math.min(Math.abs(localX), Math.abs(localY), Math.abs(localX + localY) * 0.72, Math.abs(localX - localY) * 0.72);
        patternBlack = star < darkness * 0.18 && distance < darkness * 0.62;
      }

      if (strengthMix < 1) {
        const mix = noise2D(x * 0.47 + 12.3, y * 0.41 - 3.2);
        patternBlack = mix < strengthMix ? patternBlack : baseIsBlack;
      }
      let isBlack = patternBlack;
      if (invert) isBlack = !isBlack;
      setPixel(data, i, isBlack, makeTransparent);
    }
  }
}

function getCellPosition(value, scale) {
  return ((value % scale) + scale) % scale / scale;
}

function applyBasicBitmap(data, width, height, threshold, method, invert, makeTransparent, ditherStrength, noiseScale) {
  const strength = ditherStrength / 100;
  const scale = Math.max(0.2, noiseScale / 100);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      if (data[i + 3] === 0) continue;
      const brightness = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      let adjustedThreshold = threshold;
      if (method === 'bayer2') adjustedThreshold += getOrderedOffset(bayer2, 2, x, y, 100 * strength);
      if (method === 'bayer4') adjustedThreshold += getOrderedOffset(bayer4, 4, x, y, 130 * strength);
      if (method === 'bayer8') adjustedThreshold += getOrderedOffset(bayer8, 8, x, y, 160 * strength);
      if (method === 'bayer16') adjustedThreshold += getOrderedOffsetDynamic(16, x, y, 190 * strength);
      if (method === 'random') adjustedThreshold += (Math.random() - 0.5) * 130 * strength;
      if (method === 'randomFine') adjustedThreshold += (noise2D(x * 9.7, y * 9.3) - 0.5) * 190 * strength;
      if (method === 'randomChunky') adjustedThreshold += (noise2D(Math.floor(x / (2 + scale * 4)) * 1.7, Math.floor(y / (2 + scale * 4)) * 1.9) - 0.5) * 180 * strength;
      if (method === 'noise') {
        const organic = noise2D(x * 0.75 / scale, y * 0.75 / scale) - 0.5;
        const fine = noise2D(x * 2.2 / scale + 17, y * 2.2 / scale - 9) - 0.5;
        adjustedThreshold += (organic * 120 + fine * 45) * strength;
      }
      if (method === 'blueNoise') {
        const a = noise2D(x * 6.21 + 4.1, y * 6.37 - 7.5) - 0.5;
        const b = noise2D((x + y) * 3.3, (y - x) * 3.1) - 0.5;
        adjustedThreshold += (a * 130 + b * 65) * strength;
      }
      if (method === 'organicWorm') {
        const worm = Math.sin((x * 0.33 / scale) + noise2D(y * 0.19, x * 0.11) * 8) * 0.5;
        const blobs = noise2D(x * 0.38 / scale, y * 0.38 / scale) - 0.5;
        adjustedThreshold += (worm * 90 + blobs * 100) * strength;
      }
      if (method === 'clusterDot') {
        const cell = Math.max(4, Math.round(6 * scale));
        const lx = getCellPosition(x, cell) - 0.5;
        const ly = getCellPosition(y, cell) - 0.5;
        const dist = Math.sqrt(lx * lx + ly * ly);
        adjustedThreshold += (dist - 0.25) * 280 * strength;
      }
      if (method === 'checker') adjustedThreshold += (((x + y) % 2 === 0 ? -1 : 1) * 90 * strength);
      if (method === 'hatchH') adjustedThreshold += ((y % Math.max(2, Math.round(6 * scale))) < Math.max(1, Math.round(2 * scale)) ? -95 : 55) * strength;
      if (method === 'hatchV') adjustedThreshold += ((x % Math.max(2, Math.round(6 * scale))) < Math.max(1, Math.round(2 * scale)) ? -95 : 55) * strength;
      if (method === 'hatchDiag') adjustedThreshold += (((x + y) % Math.max(3, Math.round(7 * scale))) < Math.max(1, Math.round(2 * scale)) ? -105 : 55) * strength;
      if (method === 'scanline') adjustedThreshold += (y % 2 === 0 ? -80 : 40) * strength;
      if (method === 'maze') {
        const maze = Math.sin(x * 0.55 / scale + Math.sin(y * 0.31 / scale) * 2.2) + Math.sin(y * 0.51 / scale + Math.sin(x * 0.29 / scale) * 2.2);
        adjustedThreshold += maze * 55 * strength;
      }
      let isBlack = brightness < adjustedThreshold;
      if (invert) isBlack = !isBlack;
      setPixel(data, i, isBlack, makeTransparent);
    }
  }
}

function getOrderedOffset(matrix, size, x, y, strength) {
  const matrixValue = matrix[y % size][x % size];
  const normalized = (matrixValue + 0.5) / (size * size);
  return (normalized - 0.5) * strength;
}

function getOrderedOffsetDynamic(size, x, y, strength) {
  const matrixValue = getBayerValue(x % size, y % size, size);
  const normalized = (matrixValue + 0.5) / (size * size);
  return (normalized - 0.5) * strength;
}

function getBayerValue(x, y, size) {
  if (size <= 1) return 0;
  const half = size / 2;
  const quadrant = (y >= half ? 2 : 0) + (x >= half ? 1 : 0);
  const base = [0, 2, 3, 1][quadrant];
  return 4 * getBayerValue(x % half, y % half, half) + base;
}

function applyErrorDiffusion(data, width, height, threshold, invert, makeTransparent, kernel, ditherStrength) {
  const diffusionAmount = clamp(ditherStrength / 100, 0, 2.5);
  const gray = new Float32Array(width * height);
  const alpha = new Uint8Array(width * height);
  for (let i = 0; i < gray.length; i++) {
    const di = i * 4;
    gray[i] = 0.299 * data[di] + 0.587 * data[di + 1] + 0.114 * data[di + 2];
    alpha[i] = data[di + 3];
  }
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = y * width + x;
      if (alpha[index] === 0) continue;
      const oldValue = gray[index];
      const newValue = oldValue < threshold ? 0 : 255;
      const error = (oldValue - newValue) * diffusionAmount;
      gray[index] = newValue;
      kernel.weights.forEach((item) => distributeError(gray, alpha, width, height, x + item.x, y + item.y, error * item.w / kernel.divisor));
    }
  }
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = y * width + x;
      const di = index * 4;
      if (alpha[index] === 0) { data[di + 3] = 0; continue; }
      let isBlack = gray[index] < 128;
      if (invert) isBlack = !isBlack;
      setPixel(data, di, isBlack, makeTransparent);
    }
  }
}

function distributeError(gray, alpha, width, height, x, y, error) {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const index = y * width + x;
  if (alpha[index] === 0) return;
  gray[index] += error;
}

function setPixel(data, index, isBlack, makeTransparent) {
  if (isBlack) setBlackPixel(data, index);
  else if (makeTransparent) setTransparentPixel(data, index);
  else setWhitePixel(data, index);
}

function isBlackPixel(data, index) { return data[index + 3] > 0 && data[index] < 128; }

function isTransparentPixel(data, index) { return data[index + 3] === 0; }

function setBlackPixel(data, index) { data[index] = 0; data[index + 1] = 0; data[index + 2] = 0; data[index + 3] = 255; }

function setWhitePixel(data, index) { data[index] = 255; data[index + 1] = 255; data[index + 2] = 255; data[index + 3] = 255; }

function setTransparentPixel(data, index) { data[index] = 255; data[index + 1] = 255; data[index + 2] = 255; data[index + 3] = 0; }

function noise2D(x, y) {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

function applyCleanupTools(data, width, height, settings, makeTransparent) {
  if (!settings) return;
  if (settings.expandBlack > 0) applyMorphology(data, width, height, settings.expandBlack, 'expand', makeTransparent);
  if (settings.shrinkBlack > 0) applyMorphology(data, width, height, settings.shrinkBlack, 'shrink', makeTransparent);
  if (settings.fillHoles > 0) applyFillHoles(data, width, height, settings.fillHoles);
  if (settings.removeSpeckles > 0) applyRemoveSpeckles(data, width, height, settings.removeSpeckles, makeTransparent);
  if (settings.smoothJagged > 0) {
    applyFillHoles(data, width, height, settings.smoothJagged * 0.65);
    applyRemoveSpeckles(data, width, height, settings.smoothJagged * 0.55, makeTransparent);
  }
}

function applyMorphology(data, width, height, passes, mode, makeTransparent) {
  const safePasses = Math.max(0, Math.min(5, Math.round(passes)));
  for (let pass = 0; pass < safePasses; pass++) {
    const copy = new Uint8ClampedArray(data);
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const i = (y * width + x) * 4;
        let blackNeighbors = 0;
        for (let ny = -1; ny <= 1; ny++) for (let nx = -1; nx <= 1; nx++) {
          const ni = ((y + ny) * width + (x + nx)) * 4;
          if (isBlackPixel(copy, ni)) blackNeighbors++;
        }
        if (mode === 'expand' && !isBlackPixel(copy, i) && blackNeighbors >= 2) setBlackPixel(data, i);
        if (mode === 'shrink' && isBlackPixel(copy, i) && blackNeighbors <= 5) {
          if (makeTransparent) setTransparentPixel(data, i);
          else setWhitePixel(data, i);
        }
      }
    }
  }
}

function applyRemoveSpeckles(data, width, height, amount, makeTransparent) {
  const copy = new Uint8ClampedArray(data);
  const thresholdNeighbors = amount > 70 ? 3 : amount > 35 ? 2 : 1;
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = (y * width + x) * 4;
      if (!isBlackPixel(copy, i)) continue;
      let blackNeighbors = 0;
      for (let ny = -1; ny <= 1; ny++) for (let nx = -1; nx <= 1; nx++) {
        if (nx === 0 && ny === 0) continue;
        const ni = ((y + ny) * width + (x + nx)) * 4;
        if (isBlackPixel(copy, ni)) blackNeighbors++;
      }
      if (blackNeighbors <= thresholdNeighbors) {
        if (makeTransparent) setTransparentPixel(data, i);
        else setWhitePixel(data, i);
      }
    }
  }
}

function applyFillHoles(data, width, height, amount) {
  const copy = new Uint8ClampedArray(data);
  const requiredNeighbors = amount > 70 ? 4 : amount > 35 ? 5 : 6;
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = (y * width + x) * 4;
      if (isBlackPixel(copy, i)) continue;
      let blackNeighbors = 0;
      for (let ny = -1; ny <= 1; ny++) for (let nx = -1; nx <= 1; nx++) {
        if (nx === 0 && ny === 0) continue;
        const ni = ((y + ny) * width + (x + nx)) * 4;
        if (isBlackPixel(copy, ni)) blackNeighbors++;
      }
      if (blackNeighbors >= requiredNeighbors) setBlackPixel(data, i);
    }
  }
}

function applyManualEraserToCanvas(targetCanvas, targetCtx, manualEraseStrokes, makeTransparent) {
  if (!manualEraseStrokes || !manualEraseStrokes.length || !targetCanvas.width) return;
  const imageData = targetCtx.getImageData(0, 0, targetCanvas.width, targetCanvas.height);
  const data = imageData.data;
  for (const stroke of manualEraseStrokes) {
    const cx = stroke.x * targetCanvas.width;
    const cy = stroke.y * targetCanvas.height;
    const radius = Math.max(2, stroke.r * Math.max(targetCanvas.width, targetCanvas.height));
    const r2 = radius * radius;
    const minX = Math.max(0, Math.floor(cx - radius));
    const maxX = Math.min(targetCanvas.width - 1, Math.ceil(cx + radius));
    const minY = Math.max(0, Math.floor(cy - radius));
    const maxY = Math.min(targetCanvas.height - 1, Math.ceil(cy + radius));
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const dx = x - cx;
        const dy = y - cy;
        if (dx * dx + dy * dy > r2) continue;
        const i = (y * targetCanvas.width + x) * 4;
        if (makeTransparent) setTransparentPixel(data, i);
        else setWhitePixel(data, i);
      }
    }
  }
  targetCtx.putImageData(imageData, 0, 0);
}

function applyInkBleed(data, width, height, strength, makeTransparent) {
  for (let pass = 0; pass < strength; pass++) {
    const copy = new Uint8ClampedArray(data);
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const i = (y * width + x) * 4;
        if (isBlackPixel(copy, i)) continue;
        let touchingBlack = 0;
        for (let ny = -1; ny <= 1; ny++) for (let nx = -1; nx <= 1; nx++) {
          if (nx === 0 && ny === 0) continue;
          const ni = ((y + ny) * width + (x + nx)) * 4;
          if (isBlackPixel(copy, ni)) touchingBlack++;
        }
        if (touchingBlack >= 2) setBlackPixel(data, i);
        else if (!makeTransparent && !isTransparentPixel(copy, i)) setWhitePixel(data, i);
      }
    }
  }
}

function applyRoughEdges(data, width, height, strength, makeTransparent) {
  const copy = new Uint8ClampedArray(data);
  const chance = strength / 100;
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = (y * width + x) * 4;
      const currentBlack = isBlackPixel(copy, i);
      let hasDifferentNeighbor = false;
      let blackNeighbors = 0;
      let transparentNeighbors = 0;
      for (let ny = -1; ny <= 1; ny++) for (let nx = -1; nx <= 1; nx++) {
        if (nx === 0 && ny === 0) continue;
        const ni = ((y + ny) * width + (x + nx)) * 4;
        const neighborBlack = isBlackPixel(copy, ni);
        const neighborTransparent = isTransparentPixel(copy, ni);
        if (neighborBlack) blackNeighbors++;
        if (neighborTransparent) transparentNeighbors++;
        if (neighborBlack !== currentBlack) hasDifferentNeighbor = true;
      }
      if (!hasDifferentNeighbor) continue;
      const n = noise2D(x, y);
      if (currentBlack) {
        if (n < chance * 0.18) {
          if (makeTransparent && transparentNeighbors > 0) setTransparentPixel(data, i);
          else setWhitePixel(data, i);
        }
      } else if (blackNeighbors >= 2 && n < chance * 0.22) setBlackPixel(data, i);
    }
  }
}

function applyGrain(data, width, height, amount, makeTransparent) {
  const copy = new Uint8ClampedArray(data);
  const strength = amount / 100;
  const removeChance = strength * 0.12;
  const addChance = strength * 0.055;
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = (y * width + x) * 4;
      const fine = noise2D(x * 4.31 + 19.9, y * 4.17 - 2.4);
      const soft = noise2D(x * 1.07 - 7.6, y * 0.96 + 13.1);
      const salt = noise2D(x * 8.73 + 1.2, y * 8.21 + 8.8);
      if (isBlackPixel(copy, i)) {
        if (fine < removeChance || (soft < removeChance * 0.75 && salt > 0.72)) {
          if (makeTransparent) setTransparentPixel(data, i);
          else setWhitePixel(data, i);
        }
      } else if (fine < addChance && soft > 0.48) setBlackPixel(data, i);
    }
  }
}

function applyDust(data, width, height, amount, makeTransparent) {
  const copy = new Uint8ClampedArray(data);
  const removeChance = amount / 100 * 0.16;
  const addChance = amount / 100 * 0.035;
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = (y * width + x) * 4;
      const n1 = noise2D(x * 1.23 + 3.1, y * 1.17 + 9.2);
      const n2 = noise2D(x * 3.41 + 11.7, y * 3.03 + 1.8);
      if (isBlackPixel(copy, i)) {
        if (n1 < removeChance || (n1 < removeChance * 1.7 && n2 > 0.82)) {
          if (makeTransparent) setTransparentPixel(data, i);
          else setWhitePixel(data, i);
        }
      } else if (n1 < addChance && n2 > 0.73) setBlackPixel(data, i);
    }
  }
}

function applyEdgeTransition(data, width, height, mode, fadeWidth, strength, noiseAmount, makeTransparent) {
  const copy = new Uint8ClampedArray(data);
  const maxFade = Math.max(1, Math.round(fadeWidth));
  const strengthNorm = clamp(strength / 100, 0, 1);
  const noiseNorm = clamp(noiseAmount / 100, 0, 1);
  const distanceMap = buildInkEdgeDistanceMap(copy, width, height, maxFade);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      if (!isBlackPixel(copy, i)) continue;

      const edgeDistance = distanceMap[y * width + x];
      if (edgeDistance >= maxFade) continue;

      const base = clamp(1 - edgeDistance / maxFade, 0, 1);
      const softNoise = noise2D(x * 0.41 + 7.7, y * 0.39 + 5.1);
      const fineNoise = noise2D(x * 1.31 - 2.4, y * 1.21 + 9.6);

      let local = base;
      if (mode === 'torn') {
        local = clamp(base + (softNoise - 0.5) * (0.65 + noiseNorm * 1.15), 0, 1);
      } else if (mode === 'dissolve') {
        local = clamp(base * 0.7 + (1 - fineNoise) * 0.45 + noiseNorm * 0.2, 0, 1);
      } else if (mode === 'burned') {
        local = clamp(base * 0.9 + Math.abs(softNoise - 0.5) * (0.6 + noiseNorm), 0, 1);
      } else if (mode === 'grunge') {
        local = clamp(base * 0.55 + (1 - softNoise) * 0.35 + (fineNoise > 0.7 ? 0.3 : 0), 0, 1);
      } else {
        local = clamp(base + (softNoise - 0.5) * (0.18 + noiseNorm * 0.25), 0, 1);
      }

      let removeChance = 0;
      if (mode === 'smooth') removeChance = Math.pow(local, 1.7) * strengthNorm;
      else if (mode === 'torn') removeChance = Math.pow(local, 1.15) * strengthNorm;
      else if (mode === 'dissolve') removeChance = Math.pow(local, 0.95) * strengthNorm;
      else if (mode === 'burned') removeChance = Math.pow(local, 1.05) * strengthNorm;
      else if (mode === 'grunge') removeChance = Math.pow(local, 0.85) * strengthNorm;

      const sample = noise2D(x * 2.73 + fineNoise * 13.7, y * 2.29 + softNoise * 9.9);
      if (sample < clamp(removeChance, 0, 1)) {
        if (makeTransparent) setTransparentPixel(data, i);
        else setWhitePixel(data, i);
      }
    }
  }
}

function buildInkEdgeDistanceMap(data, width, height, maxFade) {
  const cap = maxFade + 1;
  const distances = new Uint16Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = y * width + x;
      const i = index * 4;
      const touchesCanvasEdge = x === 0 || y === 0 || x === width - 1 || y === height - 1;
      distances[index] = isBlackPixel(data, i) && !touchesCanvasEdge ? cap : 0;
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = y * width + x;
      let best = distances[index];
      if (x > 0) best = Math.min(best, distances[index - 1] + 1);
      if (y > 0) best = Math.min(best, distances[index - width] + 1);
      if (x > 0 && y > 0) best = Math.min(best, distances[index - width - 1] + 1);
      if (x < width - 1 && y > 0) best = Math.min(best, distances[index - width + 1] + 1);
      distances[index] = Math.min(best, cap);
    }
  }

  for (let y = height - 1; y >= 0; y--) {
    for (let x = width - 1; x >= 0; x--) {
      const index = y * width + x;
      let best = distances[index];
      if (x < width - 1) best = Math.min(best, distances[index + 1] + 1);
      if (y < height - 1) best = Math.min(best, distances[index + width] + 1);
      if (x < width - 1 && y < height - 1) best = Math.min(best, distances[index + width + 1] + 1);
      if (x > 0 && y < height - 1) best = Math.min(best, distances[index + width - 1] + 1);
      distances[index] = Math.min(best, cap);
    }
  }
  return distances;
}

function createScaledSourceFromImage(image, width, height) {
  if (width === image.width && height === image.height) return image;
  const sourceCanvas = createCanvas();
  sourceCanvas.width = width;
  sourceCanvas.height = height;
  const sourceCtx = sourceCanvas.getContext('2d');
  sourceCtx.imageSmoothingEnabled = true;
  sourceCtx.imageSmoothingQuality = 'high';
  sourceCtx.drawImage(image, 0, 0, width, height);
  return sourceCanvas;
}

function analyzeProcessedCanvas(processedCanvas, size) {
  if (!processedCanvas.width || !processedCanvas.height) return null;
  const sampleMax = 240;
  const scale = Math.min(1, sampleMax / Math.max(processedCanvas.width, processedCanvas.height));
  const sampleW = Math.max(1, Math.round(processedCanvas.width * scale));
  const sampleH = Math.max(1, Math.round(processedCanvas.height * scale));
  const sampleCanvas = createCanvas();
  sampleCanvas.width = sampleW;
  sampleCanvas.height = sampleH;
  const sampleCtx = sampleCanvas.getContext('2d', { willReadFrequently: true });
  sampleCtx.imageSmoothingEnabled = false;
  sampleCtx.drawImage(processedCanvas, 0, 0, sampleW, sampleH);
  const pixels = sampleCtx.getImageData(0, 0, sampleW, sampleH).data;
  const black = new Uint8Array(sampleW * sampleH);
  let blackCount = 0;
  let visibleCount = 0;
  let transparentCount = 0;
  let edgeHasInk = false;
  for (let y = 0; y < sampleH; y++) {
    for (let x = 0; x < sampleW; x++) {
      const index = y * sampleW + x;
      const di = index * 4;
      const visible = pixels[di + 3] > 0;
      if (visible) visibleCount++;
      else transparentCount++;
      const isBlack = visible && pixels[di] < 128;
      if (isBlack) {
        black[index] = 1;
        blackCount++;
        if (x === 0 || y === 0 || x === sampleW - 1 || y === sampleH - 1) edgeHasInk = true;
      }
    }
  }
  const minClusterPixels = findSmallestBlackCluster(black, sampleW, sampleH);
  const exportScale = size && sampleW ? size.width / sampleW : processedCanvas.width / sampleW;
  const minClusterPx = minClusterPixels ? Math.sqrt(minClusterPixels) * exportScale : 0;
  return {
    // Share of the whole print area, so transparent white does not count as uncovered-but-missing.
    inkCoverage: (visibleCount + transparentCount) ? blackCount / (visibleCount + transparentCount) : 0,
    transparentCoverage: (visibleCount + transparentCount) ? transparentCount / (visibleCount + transparentCount) : 0,
    edgeHasInk,
    minClusterPx,
    minClusterMm: minClusterPx ? minClusterPx / 300 * 25.4 : 0
  };
}

function findSmallestBlackCluster(black, width, height) {
  const visited = new Uint8Array(black.length);
  let best = Infinity;
  const queue = [];
  for (let i = 0; i < black.length; i++) {
    if (!black[i] || visited[i]) continue;
    visited[i] = 1;
    queue.length = 0;
    queue.push(i);
    let count = 0;
    for (let q = 0; q < queue.length; q++) {
      const current = queue[q];
      count++;
      const x = current % width;
      const y = Math.floor(current / width);
      const neighbors = [
        x > 0 ? current - 1 : -1,
        x < width - 1 ? current + 1 : -1,
        y > 0 ? current - width : -1,
        y < height - 1 ? current + width : -1
      ];
      for (const next of neighbors) {
        if (next < 0 || visited[next] || !black[next]) continue;
        visited[next] = 1;
        queue.push(next);
      }
    }
    if (count > 0) best = Math.min(best, count);
  }
  return Number.isFinite(best) ? best : 0;
}

function generateSVGFromCanvas(sourceCanvas, transparent) {
  const maxSide = 1200;
  const scale = Math.min(1, maxSide / Math.max(sourceCanvas.width, sourceCanvas.height));
  const width = Math.max(1, Math.round(sourceCanvas.width * scale));
  const height = Math.max(1, Math.round(sourceCanvas.height * scale));
  const sampleCanvas = createCanvas();
  sampleCanvas.width = width;
  sampleCanvas.height = height;
  const sampleCtx = sampleCanvas.getContext('2d', { willReadFrequently: true });
  sampleCtx.imageSmoothingEnabled = false;
  sampleCtx.drawImage(sourceCanvas, 0, 0, width, height);
  const pixels = sampleCtx.getImageData(0, 0, width, height).data;
  const rects = [];
  const maxRects = 30000;
  for (let y = 0; y < height && rects.length < maxRects; y++) {
    let x = 0;
    while (x < width && rects.length < maxRects) {
      let index = (y * width + x) * 4;
      const isBlack = pixels[index + 3] > 0 && pixels[index] < 128;
      if (!isBlack) { x++; continue; }
      const start = x;
      while (x < width) {
        index = (y * width + x) * 4;
        if (!(pixels[index + 3] > 0 && pixels[index] < 128)) break;
        x++;
      }
      rects.push(`<rect x="${start}" y="${y}" width="${x - start}" height="1"/>`);
    }
  }
  const bg = transparent ? '' : `<rect width="${width}" height="${height}" fill="#fff"/>`;
  const note = rects.length >= maxRects ? '<!-- Simplified: max vector runs reached. -->' : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" shape-rendering="crispEdges">${bg}<g fill="#000">${rects.join('')}</g>${note}</svg>`;
}

function checkMonochrome(processedCanvas) {
  if (!processedCanvas.width) return false;
  const sampleW = Math.min(80, processedCanvas.width);
  const sampleH = Math.min(80, processedCanvas.height);
  const sampleCanvas = createCanvas();
  sampleCanvas.width = sampleW;
  sampleCanvas.height = sampleH;
  const sampleCtx = sampleCanvas.getContext('2d', { willReadFrequently: true });
  sampleCtx.imageSmoothingEnabled = false;
  sampleCtx.drawImage(processedCanvas, 0, 0, sampleW, sampleH);
  const pixels = sampleCtx.getImageData(0, 0, sampleW, sampleH).data;
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] === 0) continue;
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const nearBlack = r < 12 && g < 12 && b < 12;
    const nearWhite = r > 243 && g > 243 && b > 243;
    if (!nearBlack && !nearWhite) return false;
  }
  return true;
}

function buildPrintReportText(size, stats, controls, appState) {
  const cmW = size && size.width ? (size.width / 300 * 2.54).toFixed(1) : '0.0';
  const cmH = size && size.height ? (size.height / 300 * 2.54).toFixed(1) : '0.0';
  const coverage = stats ? `${Math.round(stats.inkCoverage * 100)}%` : 'n/a';
  const minMark = stats && stats.minClusterMm ? `${stats.minClusterMm.toFixed(2)} mm approx.` : 'n/a';
  return [
    "Levi's Bitmap Bananza - Print Report",
    `Export: ${size.width} x ${size.height} px`,
    `300 DPI: ${cmW} x ${cmH} cm`,
    `Ink Coverage: ${coverage}`,
    `Smallest Black Island: ${minMark}`,
    `Transparent White: ${controls.transparent ? 'yes' : 'no'}`,
    `Mode: ${controls.graphicMode}`,
    `Threshold: ${controls.threshold}`,
    `Halftone: ${controls.halftoneMode}`,
    '',
    'Settings:',
    JSON.stringify(appState, null, 2)
  ].join('\n');
}

function getRenderSettingsFromPresetData(preset) {
  const halftoneMode = preset.graphicMode === 'screenprintHalftone' && (preset.halftoneMode || 'off') === 'off'
    ? 'dotRound'
    : (preset.halftoneMode || 'off');
  const settings = {
    graphicMode: preset.graphicMode || 'fullDetail',
    thresholdMode: preset.thresholdMode || 'global',
    pixelSize: Number(preset.pixelSize ?? 8),
    threshold: Number(preset.threshold ?? 128),
    contrast: Number(preset.contrast ?? 0),
    gamma: Number(preset.gamma ?? 100),
    ditherStrength: Number(preset.ditherStrength ?? 0),
    noiseScale: Number(preset.noiseScale ?? 100),
    method: preset.method || 'threshold',
    blackAmount: Number(preset.blackAmount ?? 50),
    whiteCleanup: Number(preset.whiteCleanup ?? 20),
    midtonePush: Number(preset.midtonePush ?? 0),
    shadowDetail: Number(preset.shadowDetail ?? 35),
    highlightDetail: Number(preset.highlightDetail ?? 30),
    edgeStrength: Number(preset.edgeStrength ?? 35),
    smoothness: Number(preset.smoothness ?? 10),
    sharpen: Number(preset.sharpen ?? 20),
    preBlur: Number(preset.preBlur ?? 0),
    adaptiveStrength: Number(preset.adaptiveStrength ?? 55),
    detailPreserve: Number(preset.detailPreserve ?? 45),
    halftoneMode,
    halftoneSize: Number(preset.halftoneSize ?? 10),
    halftoneStrength: Number(preset.halftoneStrength ?? 100),
    halftoneAngle: Number(preset.halftoneAngle ?? 15),
    halftoneGain: Number(preset.halftoneGain ?? 0),
    halftoneJitter: Number(preset.halftoneJitter ?? 0),
    edgeRoughness: Number(preset.edgeRoughness ?? 0),
    inkBleed: Number(preset.inkBleed ?? 0),
    dustAmount: Number(preset.dustAmount ?? 0),
    grainAmount: Number(preset.grainAmount ?? 0),
    edgeFadeMode: preset.edgeFadeMode || 'off',
    edgeFadeWidth: Number(preset.edgeFadeWidth ?? 18),
    edgeFadeStrength: Number(preset.edgeFadeStrength ?? 70),
    edgeFadeNoise: Number(preset.edgeFadeNoise ?? 35),
    cleanup: {
      removeSpeckles: Number(preset.removeSpeckles ?? 0),
      fillHoles: Number(preset.fillHoles ?? 0),
      expandBlack: Number(preset.expandBlack ?? 0),
      shrinkBlack: Number(preset.shrinkBlack ?? 0),
      smoothJagged: Number(preset.smoothJagged ?? 0)
    },
    invert: Boolean(preset.invert),
    makeTransparent: Boolean(preset.transparent),
    glyphMode: false
  };
  if (settings.graphicMode === 'simpleBW') normalizeSimpleBlackWhiteSettings(settings);
  return settings;
}

function clonePresetData(preset) {
  return JSON.parse(JSON.stringify(preset));
}

function createVariantDefinitions(currentControls, count) {
  const base = clonePresetData(currentControls);
  if (base.graphicMode === 'pixelBitmap') base.graphicMode = 'fullDetail';
  const variants = [
    {
      name: 'Balanced',
      preset: { ...clonePresetData(base), thresholdMode: 'auto', blackAmount: clamp(base.blackAmount, 35, 70), whiteCleanup: clamp(base.whiteCleanup, 0, 45), method: 'threshold', ditherStrength: 0, halftoneMode: 'off' }
    },
    {
      name: 'Hard Poster',
      preset: { ...clonePresetData(base), graphicMode: 'photoPoster', thresholdMode: 'global', threshold: clamp(base.threshold + 10, 0, 255), blackAmount: clamp(base.blackAmount + 12, 0, 100), whiteCleanup: clamp(base.whiteCleanup + 22, 0, 100), smoothness: clamp(base.smoothness + 28, 0, 100), edgeStrength: clamp(base.edgeStrength - 8, 0, 100), halftoneMode: 'off' }
    },
    {
      name: 'Detail Ink',
      preset: { ...clonePresetData(base), graphicMode: 'highDetailInk', thresholdMode: 'edge', blackAmount: clamp(base.blackAmount - 4, 0, 100), whiteCleanup: clamp(base.whiteCleanup - 6, 0, 100), edgeStrength: clamp(base.edgeStrength + 28, 0, 100), sharpen: clamp(base.sharpen + 32, 0, 100), detailPreserve: clamp(base.detailPreserve + 30, 0, 100), halftoneMode: 'off' }
    },
    {
      name: 'Soft Halftone',
      preset: { ...clonePresetData(base), graphicMode: 'screenprintHalftone', thresholdMode: 'auto', halftoneMode: 'dotRound', halftoneSize: clamp(base.halftoneSize || 9, 7, 18), halftoneStrength: 88, halftoneGain: 6, edgeRoughness: clamp(base.edgeRoughness + 4, 0, 100), dustAmount: clamp(base.dustAmount + 2, 0, 100) }
    },
    {
      name: 'Dirty Xerox',
      preset: { ...clonePresetData(base), graphicMode: 'dirtyXerox', thresholdMode: 'adaptive', method: 'noise', ditherStrength: 120, blackAmount: clamp(base.blackAmount + 14, 0, 100), midtonePush: clamp(base.midtonePush + 28, 0, 100), edgeRoughness: clamp(base.edgeRoughness + 18, 0, 100), grainAmount: clamp(base.grainAmount + 24, 0, 100), dustAmount: clamp(base.dustAmount + 14, 0, 100), halftoneMode: 'off' }
    },
    {
      name: 'Shirt Ready',
      preset: { ...clonePresetData(base), thresholdMode: 'edge', transparent: true, blackAmount: clamp(base.blackAmount + 6, 0, 100), whiteCleanup: clamp(base.whiteCleanup + 18, 0, 100), edgeFadeMode: base.edgeFadeMode === 'off' ? 'smooth' : base.edgeFadeMode, edgeFadeWidth: clamp(base.edgeFadeWidth || 16, 8, 36), edgeFadeStrength: clamp(base.edgeFadeStrength || 54, 28, 88), removeSpeckles: clamp(base.removeSpeckles + 24, 0, 100), fillHoles: clamp(base.fillHoles + 12, 0, 100) }
    }
  ];
  return variants.slice(0, Number(count || 4));
}

function sanitizeFileName(value) {
  return String(value || '')
    .trim()
    .replace(/[\\/:*?"<>|]+/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

export {
  presets,
  diffusionKernels,
  clamp,
  normalizeSimpleBlackWhiteSettings,
  processPixelBitmapClassic,
  processFullDetailGraphic,
  applyPreTone,
  applyGraphicToneValue,
  resolveBaseThreshold,
  otsuThreshold,
  buildThresholdMask,
  buildIntegral,
  localMean,
  buildEdgeMap,
  boxBlurFloat,
  sharpenFloat,
  applyEdgeInk,
  smoothMask,
  writeLuminanceToData,
  writeMaskToData,
  applyHalftonePattern,
  getCellPosition,
  applyBasicBitmap,
  getOrderedOffset,
  getOrderedOffsetDynamic,
  getBayerValue,
  applyErrorDiffusion,
  distributeError,
  setPixel,
  isBlackPixel,
  isTransparentPixel,
  setBlackPixel,
  setWhitePixel,
  setTransparentPixel,
  noise2D,
  applyCleanupTools,
  applyMorphology,
  applyRemoveSpeckles,
  applyFillHoles,
  applyManualEraserToCanvas,
  applyInkBleed,
  applyRoughEdges,
  applyGrain,
  applyDust,
  applyEdgeTransition,
  buildInkEdgeDistanceMap,
  createScaledSourceFromImage,
  analyzeProcessedCanvas,
  findSmallestBlackCluster,
  generateSVGFromCanvas,
  checkMonochrome,
  buildPrintReportText,
  getRenderSettingsFromPresetData,
  clonePresetData,
  createVariantDefinitions,
  sanitizeFileName
};
