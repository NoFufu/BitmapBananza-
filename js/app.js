const upload = document.getElementById('upload');
const batchQueueHint = document.getElementById('batchQueueHint');
const exportBatchButton = document.getElementById('exportBatch');
const graphicModeInput = document.getElementById('graphicMode');
const thresholdModeInput = document.getElementById('thresholdMode');
const pixelSizeControl = document.getElementById('pixelSizeControl');
const pixelSizeInput = document.getElementById('pixelSize');
const thresholdInput = document.getElementById('threshold');
const contrastInput = document.getElementById('contrast');
const gammaInput = document.getElementById('gamma');
const ditherStrengthInput = document.getElementById('ditherStrength');
const noiseScaleInput = document.getElementById('noiseScale');
const methodInput = document.getElementById('method');
const blackAmountInput = document.getElementById('blackAmount');
const whiteCleanupInput = document.getElementById('whiteCleanup');
const midtonePushInput = document.getElementById('midtonePush');
const shadowDetailInput = document.getElementById('shadowDetail');
const highlightDetailInput = document.getElementById('highlightDetail');
const edgeStrengthInput = document.getElementById('edgeStrength');
const smoothnessInput = document.getElementById('smoothness');
const sharpenInput = document.getElementById('sharpen');
const preBlurInput = document.getElementById('preBlur');
const adaptiveStrengthInput = document.getElementById('adaptiveStrength');
const detailPreserveInput = document.getElementById('detailPreserve');
const halftoneModeInput = document.getElementById('halftoneMode');
const halftoneSizeInput = document.getElementById('halftoneSize');
const halftoneStrengthInput = document.getElementById('halftoneStrength');
const halftoneAngleInput = document.getElementById('halftoneAngle');
const halftoneGainInput = document.getElementById('halftoneGain');
const halftoneJitterInput = document.getElementById('halftoneJitter');
const glyphModeInput = document.getElementById('glyphMode');
const glyphPresetInput = document.getElementById('glyphPreset');
const glyphCharsetInput = document.getElementById('glyphCharset');
const glyphRenderModeInput = document.getElementById('glyphRenderMode');
const glyphFontInput = document.getElementById('glyphFont');
const glyphReverseInput = document.getElementById('glyphReverse');
const glyphSizeInput = document.getElementById('glyphSize');
const glyphSpacingInput = document.getElementById('glyphSpacing');
const glyphDensityInput = document.getElementById('glyphDensity');
const glyphWeightInput = document.getElementById('glyphWeight');
const glyphRandomnessInput = document.getElementById('glyphRandomness');
const glyphRotationInput = document.getElementById('glyphRotation');
const edgeRoughnessInput = document.getElementById('edgeRoughness');
const inkBleedInput = document.getElementById('inkBleed');
const dustAmountInput = document.getElementById('dustAmount');
const grainAmountInput = document.getElementById('grainAmount');
const edgeFadeModeInput = document.getElementById('edgeFadeMode');
const edgeFadeWidthInput = document.getElementById('edgeFadeWidth');
const edgeFadeStrengthInput = document.getElementById('edgeFadeStrength');
const edgeFadeNoiseInput = document.getElementById('edgeFadeNoise');
const manualEraserInput = document.getElementById('manualEraser');
const eraserSizeInput = document.getElementById('eraserSize');
const clearEraserButton = document.getElementById('clearEraser');
const makeShirtReadyButton = document.getElementById('makeShirtReady');
const maskPreviewInput = document.getElementById('maskPreview');
const removeSpecklesInput = document.getElementById('removeSpeckles');
const fillHolesInput = document.getElementById('fillHoles');
const expandBlackInput = document.getElementById('expandBlack');
const shrinkBlackInput = document.getElementById('shrinkBlack');
const smoothJaggedInput = document.getElementById('smoothJagged');
const invertInput = document.getElementById('invert');
const transparentInput = document.getElementById('transparent');
const viewModeInput = document.getElementById('viewMode');

const zoomInput = document.getElementById('zoom');
const zoomOutButton = document.getElementById('zoomOut');
const zoomResetButton = document.getElementById('zoomReset');
const zoomInButton = document.getElementById('zoomIn');
const zoomFitButton = document.getElementById('zoomFit');
const panResetButton = document.getElementById('panReset');

const viewProcessedButton = document.getElementById('viewProcessed');
const viewOriginalButton = document.getElementById('viewOriginal');
const viewSplitButton = document.getElementById('viewSplit');

const exportModeInput = document.getElementById('exportMode');
const exportNameInput = document.getElementById('exportName');
const customExportWidthInput = document.getElementById('customExportWidth');
const downloadZipButton = document.getElementById('downloadZip');
const downloadSvgButton = document.getElementById('downloadSvg');
const printCheck = document.getElementById('printCheck');
const downloadButton = document.getElementById('download');
const resetButton = document.getElementById('reset');
const resetAllTopButton = document.getElementById('resetAllTop');
const presetButtons = document.querySelectorAll('.preset-button');
const edgePresetButtons = document.querySelectorAll('[data-edge-preset]');
const quickExportButtons = document.querySelectorAll('[data-export-width]');

const savePresetButton = document.getElementById('savePreset');
const deletePresetButton = document.getElementById('deletePreset');
const loadPresetButton = document.getElementById('loadPreset');
const customPresetNameInput = document.getElementById('customPresetName');
const customPresetSelect = document.getElementById('customPresetSelect');
const previewQualityInput = document.getElementById('previewQuality');
const workerPreviewEnabledInput = document.getElementById('workerPreviewEnabled');
const renderStatus = document.getElementById('renderStatus');
const variantCountInput = document.getElementById('variantCount');
const generateVariantsButton = document.getElementById('generateVariants');
const variantGrid = document.getElementById('variantGrid');
const variantStatus = document.getElementById('variantStatus');

const cropAspectInput = document.getElementById('cropAspect');
const startCropButton = document.getElementById('startCrop');
const applyCropButton = document.getElementById('applyCrop');
const resetCropButton = document.getElementById('resetCrop');
const undoButton = document.getElementById('undoButton');
const redoButton = document.getElementById('redoButton');
const saveSnapshotButton = document.getElementById('saveSnapshot');
const loadSnapshotButton = document.getElementById('loadSnapshot');
const toggleSnapshotButton = document.getElementById('toggleSnapshot');
const snapshotSelect = document.getElementById('snapshotSelect');

const pixelSizeValue = document.getElementById('pixelSizeValue');
const thresholdValue = document.getElementById('thresholdValue');
const contrastValue = document.getElementById('contrastValue');
const gammaValue = document.getElementById('gammaValue');
const ditherStrengthValue = document.getElementById('ditherStrengthValue');
const noiseScaleValue = document.getElementById('noiseScaleValue');
const blackAmountValue = document.getElementById('blackAmountValue');
const whiteCleanupValue = document.getElementById('whiteCleanupValue');
const midtonePushValue = document.getElementById('midtonePushValue');
const shadowDetailValue = document.getElementById('shadowDetailValue');
const highlightDetailValue = document.getElementById('highlightDetailValue');
const edgeStrengthValue = document.getElementById('edgeStrengthValue');
const smoothnessValue = document.getElementById('smoothnessValue');
const sharpenValue = document.getElementById('sharpenValue');
const preBlurValue = document.getElementById('preBlurValue');
const adaptiveStrengthValue = document.getElementById('adaptiveStrengthValue');
const detailPreserveValue = document.getElementById('detailPreserveValue');
const halftoneSizeValue = document.getElementById('halftoneSizeValue');
const halftoneStrengthValue = document.getElementById('halftoneStrengthValue');
const halftoneAngleValue = document.getElementById('halftoneAngleValue');
const halftoneGainValue = document.getElementById('halftoneGainValue');
const halftoneJitterValue = document.getElementById('halftoneJitterValue');
const glyphSizeValue = document.getElementById('glyphSizeValue');
const glyphSpacingValue = document.getElementById('glyphSpacingValue');
const glyphDensityValue = document.getElementById('glyphDensityValue');
const glyphWeightValue = document.getElementById('glyphWeightValue');
const glyphRandomnessValue = document.getElementById('glyphRandomnessValue');
const glyphRotationValue = document.getElementById('glyphRotationValue');
const edgeRoughnessValue = document.getElementById('edgeRoughnessValue');
const inkBleedValue = document.getElementById('inkBleedValue');
const dustAmountValue = document.getElementById('dustAmountValue');
const grainAmountValue = document.getElementById('grainAmountValue');
const edgeFadeWidthValue = document.getElementById('edgeFadeWidthValue');
const edgeFadeStrengthValue = document.getElementById('edgeFadeStrengthValue');
const edgeFadeNoiseValue = document.getElementById('edgeFadeNoiseValue');
const eraserSizeValue = document.getElementById('eraserSizeValue');
const removeSpecklesValue = document.getElementById('removeSpecklesValue');
const fillHolesValue = document.getElementById('fillHolesValue');
const expandBlackValue = document.getElementById('expandBlackValue');
const shrinkBlackValue = document.getElementById('shrinkBlackValue');
const smoothJaggedValue = document.getElementById('smoothJaggedValue');
const zoomValue = document.getElementById('zoomValue');
const customExportWidthValue = document.getElementById('customExportWidthValue');
const exportSizeHint = document.getElementById('exportSizeHint');
const customExportGroup = document.getElementById('customExportGroup');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
const emptyState = document.getElementById('emptyState');
const canvasWrap = document.getElementById('canvasWrap');
const appShell = document.getElementById('appShell');
const stage = document.getElementById('stage');
const leftSidebarResizer = document.getElementById('leftSidebarResizer');
const rightSidebarResizer = document.getElementById('rightSidebarResizer');
const navigator = document.getElementById('navigator');
const navigatorCanvas = document.getElementById('navigatorCanvas');
const navigatorCtx = navigatorCanvas.getContext('2d');
const navigatorZoom = document.getElementById('navigatorZoom');
const cropLayer = document.getElementById('cropLayer');
const cropBox = document.getElementById('cropBox');

const processedCanvas = document.createElement('canvas');
const processedCtx = processedCanvas.getContext('2d');

const previewMaxSideDefault = 1800;
let originalImage = null;
let fullOriginalImage = null;
let previewImage = null;
let previewScale = 1;
let batchFiles = [];
let renderJobId = 0;
let activeRenderWorker = null;
let activePreset = null;
let panX = 0;
let panY = 0;
let isPanning = false;
let panStartX = 0;
let panStartY = 0;
let startPanX = 0;
let startPanY = 0;
let cropActive = false;
let cropRectNorm = null;
let cropDragMode = null;
let cropDragHandle = null;
let cropStartPoint = null;
let cropStartRect = null;
let eraserActive = false;
let isErasing = false;
let manualEraseStrokes = [];
let historyStack = [];
let redoStack = [];
let lastHistoryState = null;
let isRestoringState = false;
let snapshots = [];
let snapshotPreviewImage = null;
let isViewingSnapshot = false;
let processFrame = null;
let processTimer = null;
let pendingFit = false;
let splitPosition = 0.5;
const customPresetStorageKey = 'levisGraphicLabCustomPresetsV1';

const glyphSets = {
  ascii: ' .:-=+*#%@',
  lbb: ' LBBLEVIS0123456789#@$%&*+=-:.',
  numbers: ' 0123456789',
  symbols: ' .·:-+*#@$%&!?/\[]{}<>',
  binary: ' 01',
  blocks: ' ░▒▓█'
};

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

upload.addEventListener('change', handleUpload);
exportBatchButton.addEventListener('click', downloadBatchExport);
graphicModeInput.addEventListener('change', updateAndProcess);
thresholdModeInput.addEventListener('change', updateAndProcess);
pixelSizeInput.addEventListener('input', updateAndProcess);
thresholdInput.addEventListener('input', updateAndProcess);
contrastInput.addEventListener('input', updateAndProcess);
gammaInput.addEventListener('input', updateAndProcess);
ditherStrengthInput.addEventListener('input', updateAndProcess);
noiseScaleInput.addEventListener('input', updateAndProcess);
methodInput.addEventListener('change', updateAndProcess);
blackAmountInput.addEventListener('input', updateAndProcess);
whiteCleanupInput.addEventListener('input', updateAndProcess);
midtonePushInput.addEventListener('input', updateAndProcess);
shadowDetailInput.addEventListener('input', updateAndProcess);
highlightDetailInput.addEventListener('input', updateAndProcess);
edgeStrengthInput.addEventListener('input', updateAndProcess);
smoothnessInput.addEventListener('input', updateAndProcess);
sharpenInput.addEventListener('input', updateAndProcess);
preBlurInput.addEventListener('input', updateAndProcess);
adaptiveStrengthInput.addEventListener('input', updateAndProcess);
detailPreserveInput.addEventListener('input', updateAndProcess);
halftoneModeInput.addEventListener('change', updateAndProcess);
halftoneSizeInput.addEventListener('input', updateAndProcess);
halftoneStrengthInput.addEventListener('input', updateAndProcess);
halftoneAngleInput.addEventListener('input', updateAndProcess);
halftoneGainInput.addEventListener('input', updateAndProcess);
halftoneJitterInput.addEventListener('input', updateAndProcess);
glyphModeInput.addEventListener('change', updateAndProcess);
glyphPresetInput.addEventListener('change', () => {
  const selected = glyphPresetInput.value;
  if (glyphSets[selected]) glyphCharsetInput.value = glyphSets[selected];
  updateAndProcess();
});
glyphCharsetInput.addEventListener('input', () => { glyphPresetInput.value = 'custom'; updateAndProcess(); });
glyphRenderModeInput.addEventListener('change', updateAndProcess);
glyphFontInput.addEventListener('change', updateAndProcess);
glyphReverseInput.addEventListener('change', updateAndProcess);
glyphSizeInput.addEventListener('input', updateAndProcess);
glyphSpacingInput.addEventListener('input', updateAndProcess);
glyphDensityInput.addEventListener('input', updateAndProcess);
glyphWeightInput.addEventListener('input', updateAndProcess);
glyphRandomnessInput.addEventListener('input', updateAndProcess);
glyphRotationInput.addEventListener('input', updateAndProcess);
edgeRoughnessInput.addEventListener('input', updateAndProcess);
inkBleedInput.addEventListener('input', updateAndProcess);
dustAmountInput.addEventListener('input', updateAndProcess);
grainAmountInput.addEventListener('input', updateAndProcess);
edgeFadeModeInput.addEventListener('change', updateAndProcess);
edgeFadeWidthInput.addEventListener('input', updateAndProcess);
edgeFadeStrengthInput.addEventListener('input', updateAndProcess);
edgeFadeNoiseInput.addEventListener('input', updateAndProcess);
manualEraserInput.addEventListener('change', toggleEraserMode);
eraserSizeInput.addEventListener('input', updateValues);
clearEraserButton.addEventListener('click', clearManualEraser);
makeShirtReadyButton.addEventListener('click', makeShirtReady);
maskPreviewInput.addEventListener('change', redrawDisplayCanvas);
removeSpecklesInput.addEventListener('input', updateAndProcess);
fillHolesInput.addEventListener('input', updateAndProcess);
expandBlackInput.addEventListener('input', updateAndProcess);
shrinkBlackInput.addEventListener('input', updateAndProcess);
smoothJaggedInput.addEventListener('input', updateAndProcess);
invertInput.addEventListener('change', updateAndProcess);
transparentInput.addEventListener('change', updateAndProcess);
viewModeInput.addEventListener('change', () => setViewMode(viewModeInput.value));
zoomInput.addEventListener('input', () => setZoom(Number(zoomInput.value)));
previewQualityInput.addEventListener('change', () => {
  rebuildPreviewImage();
  updateAndProcess();
});
workerPreviewEnabledInput.addEventListener('change', scheduleProcessImage);
exportModeInput.addEventListener('change', updateExportUI);
exportNameInput.addEventListener('input', updateExportUI);
customExportWidthInput.addEventListener('input', updateExportUI);
downloadZipButton.addEventListener('click', downloadExportPack);
downloadSvgButton.addEventListener('click', downloadSVG);
downloadButton.addEventListener('click', downloadPNG);
resetButton.addEventListener('click', resetControls);
resetAllTopButton.addEventListener('click', resetControls);
edgePresetButtons.forEach((button) => button.addEventListener('click', () => applyEdgePreset(button.dataset.edgePreset)));

zoomOutButton.addEventListener('click', () => stepZoom(-1));
zoomResetButton.addEventListener('click', () => setZoom(100));
zoomInButton.addEventListener('click', () => stepZoom(1));
zoomFitButton.addEventListener('click', fitZoomToScreen);
panResetButton.addEventListener('click', resetPan);

startCropButton.addEventListener('click', startCropMode);
applyCropButton.addEventListener('click', applyCropSelection);
resetCropButton.addEventListener('click', resetCropToOriginal);
cropAspectInput.addEventListener('change', () => { enforceCropAspect(); updateCropLayer(); });
undoButton.addEventListener('click', undoState);
redoButton.addEventListener('click', redoState);
saveSnapshotButton.addEventListener('click', saveSnapshot);
loadSnapshotButton.addEventListener('click', loadSnapshotState);
toggleSnapshotButton.addEventListener('click', toggleSnapshotPreview);

viewProcessedButton.addEventListener('click', () => setViewMode('processed'));
viewOriginalButton.addEventListener('click', () => setViewMode('original'));
viewSplitButton.addEventListener('click', () => setViewMode('split'));
generateVariantsButton.addEventListener('click', generateVariantComparison);

presetButtons.forEach((button) => button.addEventListener('click', () => applyPreset(button.dataset.preset)));
quickExportButtons.forEach((button) => button.addEventListener('click', () => { exportModeInput.value = 'custom'; customExportWidthInput.value = button.dataset.exportWidth; updateExportUI(); }));

savePresetButton.addEventListener('click', saveCustomPreset);
loadPresetButton.addEventListener('click', loadSelectedCustomPreset);
deletePresetButton.addEventListener('click', deleteSelectedCustomPreset);
customPresetSelect.addEventListener('change', () => { customPresetNameInput.value = customPresetSelect.value; });

collapseControlGroupsOnLoad();
setupDragAndDrop();
setupPanAndWheelZoom();
setupCropInteractions();
setupManualEraserInteractions();
setupSliderResetButtons();
setupSidebarResize();
loadCustomPresetList();
updateValues();
updateExportUI();
updatePan();
lastHistoryState = getAppState();

window.addEventListener('resize', () => updateNavigator());

function handleUpload(event) {
  const files = Array.from(event.target.files || []).filter((file) => file.type.startsWith('image/'));
  setBatchFiles(files);
  const file = files[0];
  if (!file) return;
  loadImageFromFile(file);
}

function loadImageFromFile(file) {
  if (!file.type.startsWith('image/')) return;
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    URL.revokeObjectURL(url);
    originalImage = img;
    fullOriginalImage = img;
    rebuildPreviewImage();
    manualEraseStrokes = [];
    cropRectNorm = null;
    stopCropMode();
    historyStack = [];
    redoStack = [];
    lastHistoryState = getAppState();
    emptyState.hidden = true;
    canvas.hidden = false;
    navigator.classList.add('visible');
    downloadButton.disabled = false;
    downloadZipButton.disabled = false;
    downloadSvgButton.disabled = false;
    stage.classList.add('is-pannable');
    pendingFit = true;
    resetPan();
    processImage();
    updateHistoryButtons();
    uiHook('onImageLoaded', file, img);
  };
  img.onerror = () => {
    URL.revokeObjectURL(url);
    notify('Dieses Bild konnte nicht geladen werden. Unterstützt werden PNG, JPG und WEBP.');
  };
  img.src = url;
}

function rebuildPreviewImage() {
  if (!originalImage) {
    previewImage = null;
    previewScale = 1;
    return;
  }
  const previewMaxSide = getPreviewMaxSide();
  const maxSide = Math.max(originalImage.width, originalImage.height);
  previewScale = maxSide > previewMaxSide ? previewMaxSide / maxSide : 1;
  if (previewScale >= 1) {
    previewImage = originalImage;
    return;
  }
  const previewCanvas = document.createElement('canvas');
  previewCanvas.width = Math.max(1, Math.round(originalImage.width * previewScale));
  previewCanvas.height = Math.max(1, Math.round(originalImage.height * previewScale));
  const previewCtx = previewCanvas.getContext('2d');
  previewCtx.imageSmoothingEnabled = true;
  previewCtx.imageSmoothingQuality = 'high';
  previewCtx.drawImage(originalImage, 0, 0, previewCanvas.width, previewCanvas.height);
  previewImage = previewCanvas;
}

function getPreviewMaxSide() {
  const quality = previewQualityInput ? previewQualityInput.value : 'balanced';
  if (quality === 'fast') return 1100;
  if (quality === 'exportNear') return 2800;
  return previewMaxSideDefault;
}

function setupDragAndDrop() {
  ['dragenter', 'dragover'].forEach((eventName) => {
    canvasWrap.addEventListener(eventName, (e) => { e.preventDefault(); e.stopPropagation(); canvasWrap.classList.add('dragover'); });
  });
  ['dragleave', 'drop'].forEach((eventName) => {
    canvasWrap.addEventListener(eventName, (e) => { e.preventDefault(); e.stopPropagation(); canvasWrap.classList.remove('dragover'); });
  });
  canvasWrap.addEventListener('drop', (e) => {
    const files = Array.from(e.dataTransfer.files || []).filter((file) => file.type.startsWith('image/'));
    setBatchFiles(files);
    if (files[0]) loadImageFromFile(files[0]);
  });
}

function setBatchFiles(files) {
  batchFiles = files || [];
  updateBatchUI();
}

function updateBatchUI() {
  if (!batchQueueHint || !exportBatchButton) return;
  if (!batchFiles.length) {
    batchQueueHint.textContent = 'Batch: keine Bilder in der Warteschlange.';
    exportBatchButton.disabled = true;
    return;
  }
  const names = batchFiles.slice(0, 3).map((file) => file.name).join(', ');
  const extra = batchFiles.length > 3 ? ` + ${batchFiles.length - 3} weitere` : '';
  batchQueueHint.textContent = `Batch: ${batchFiles.length} Bild(er) - ${names}${extra}`;
  exportBatchButton.disabled = batchFiles.length < 2;
}

function collapseControlGroupsOnLoad() {
  document.querySelectorAll('details.control-group').forEach((group) => {
    group.open = group.hasAttribute('data-open-on-load');
  });
}

function setupSidebarResize() {
  if (!appShell || !leftSidebarResizer || !rightSidebarResizer) return;

  const storageKeys = {
    left: 'levisBitmapBananzaLeftSidebarWidth',
    right: 'levisBitmapBananzaRightSidebarWidth'
  };
  const compact = window.innerWidth < 1200;
  const defaults = { left: compact ? 280 : 320, right: compact ? 270 : 300 };
  const mins = { left: 240, right: 230 };
  const maxs = { left: 560, right: 520 };
  const minStageWidth = 340;
  const sidebarWidths = {
    left: readStoredSidebarWidth('left', defaults.left),
    right: readStoredSidebarWidth('right', defaults.right)
  };
  let activeResizeSide = null;

  applySidebarWidths(false);
  attachSidebarHandle(leftSidebarResizer, 'left');
  attachSidebarHandle(rightSidebarResizer, 'right');
  window.addEventListener('resize', () => applySidebarWidths(false));

  function readStoredSidebarWidth(side, fallback) {
    try {
      const stored = Number(localStorage.getItem(storageKeys[side]));
      return Number.isFinite(stored) && stored > 0 ? stored : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function getSidebarMax(side) {
    const rect = appShell.getBoundingClientRect();
    const otherSide = side === 'left' ? 'right' : 'left';
    const available = Math.max(mins[side], rect.width - sidebarWidths[otherSide] - minStageWidth);
    return Math.min(maxs[side], available);
  }

  function setSidebarWidth(side, width, shouldPersist) {
    sidebarWidths[side] = clamp(width, mins[side], getSidebarMax(side));
    applySidebarWidths(shouldPersist);
  }

  function applySidebarWidths(shouldPersist) {
    sidebarWidths.left = clamp(sidebarWidths.left, mins.left, getSidebarMax('left'));
    sidebarWidths.right = clamp(sidebarWidths.right, mins.right, getSidebarMax('right'));
    document.documentElement.style.setProperty('--left-sidebar-width', `${Math.round(sidebarWidths.left)}px`);
    document.documentElement.style.setProperty('--right-sidebar-width', `${Math.round(sidebarWidths.right)}px`);
    leftSidebarResizer.setAttribute('aria-valuenow', String(Math.round(sidebarWidths.left)));
    rightSidebarResizer.setAttribute('aria-valuenow', String(Math.round(sidebarWidths.right)));
    leftSidebarResizer.setAttribute('aria-valuemax', String(Math.round(getSidebarMax('left'))));
    rightSidebarResizer.setAttribute('aria-valuemax', String(Math.round(getSidebarMax('right'))));
    if (shouldPersist) {
      try {
        localStorage.setItem(storageKeys.left, String(Math.round(sidebarWidths.left)));
        localStorage.setItem(storageKeys.right, String(Math.round(sidebarWidths.right)));
      } catch (_) {}
    }
    updateNavigator();
    if (cropActive) updateCropLayer();
  }

  function attachSidebarHandle(handle, side) {
    handle.setAttribute('aria-valuemin', String(mins[side]));
    handle.setAttribute('aria-valuemax', String(maxs[side]));

    handle.addEventListener('pointerdown', (e) => {
      if (window.matchMedia('(max-width: 960px)').matches) return;
      e.preventDefault();
      activeResizeSide = side;
      handle.classList.add('dragging');
      document.body.classList.add('is-resizing');
      try { handle.setPointerCapture(e.pointerId); } catch (_) {}
    });

    handle.addEventListener('pointermove', (e) => {
      if (activeResizeSide !== side) return;
      const rect = appShell.getBoundingClientRect();
      const nextWidth = side === 'left' ? e.clientX - rect.left : rect.right - e.clientX;
      setSidebarWidth(side, nextWidth, true);
    });

    const stopResize = () => {
      if (activeResizeSide !== side) return;
      activeResizeSide = null;
      handle.classList.remove('dragging');
      document.body.classList.remove('is-resizing');
    };

    handle.addEventListener('pointerup', stopResize);
    handle.addEventListener('lostpointercapture', stopResize);

    handle.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      const direction = e.key === 'ArrowRight' ? 1 : -1;
      const signedStep = side === 'left' ? direction * 16 : direction * -16;
      setSidebarWidth(side, sidebarWidths[side] + signedStep, true);
    });
  }
}

function setupPanAndWheelZoom() {
  stage.addEventListener('wheel', (e) => {
    if (!originalImage) return;
    e.preventDefault();
    // Proportional to the scroll distance, so trackpads and mouse wheels feel the same.
    const factor = Math.exp(-clamp(e.deltaY, -120, 120) * 0.0018);
    zoomAtPoint(Math.round(Number(zoomInput.value) * factor), e.clientX, e.clientY);
  }, { passive: false });

  stage.addEventListener('pointerdown', (e) => {
    if (cropActive || eraserActive) return;
    if (!originalImage || e.button !== 0) return;
    if (e.target.closest('button, .dock, .crop-bar, .navigator, .split-handle')) return;
    isPanning = true;
    panStartX = e.clientX;
    panStartY = e.clientY;
    startPanX = panX;
    startPanY = panY;
    stage.classList.add('is-panning');
    try { stage.setPointerCapture(e.pointerId); } catch (_) {}
  });

  stage.addEventListener('pointermove', (e) => {
    if (!isPanning) return;
    panX = startPanX + (e.clientX - panStartX);
    panY = startPanY + (e.clientY - panStartY);
    updatePan();
  });

  stage.addEventListener('pointerup', endPan);
  stage.addEventListener('pointercancel', endPan);
  stage.addEventListener('pointerleave', () => { if (isPanning) endPan(); });
}

function endPan() {
  isPanning = false;
  stage.classList.remove('is-panning');
}

function updateAndProcess() {
  recordHistoryChange();
  activePreset = null;
  isViewingSnapshot = false;
  updatePresetButtons();
  updateValues();
  scheduleProcessImage();
}

function scheduleProcessImage() {
  if (processFrame) cancelAnimationFrame(processFrame);
  if (processTimer) clearTimeout(processTimer);
  if (activeRenderWorker) {
    activeRenderWorker.terminate();
    activeRenderWorker = null;
  }
  const jobId = ++renderJobId;
  setRenderStatus('Render: queued...');
  processTimer = setTimeout(() => {
    processTimer = null;
    processFrame = requestAnimationFrame(() => {
      processFrame = null;
      processImage(jobId);
    });
  }, 48);
}

function setRenderStatus(text) {
  const busy = !/fertig|bereit/i.test(text);
  if (renderStatus) renderStatus.textContent = busy ? 'Rendert …' : 'Bereit.';
  stage.classList.toggle('is-rendering', busy && Boolean(originalImage));
}

// UI hooks implemented in ui.js; safe no-ops if it is missing.
function notify(message) {
  if (window.ui && window.ui.toast) window.ui.toast(message);
  else console.warn(message);
}

function uiHook(name, ...args) {
  if (window.ui && typeof window.ui[name] === 'function') window.ui[name](...args);
}

function updateHistoryButtons() {
  undoButton.disabled = !historyStack.length;
  redoButton.disabled = !redoStack.length;
}

function updateValues() {
  pixelSizeValue.textContent = pixelSizeInput.value;
  thresholdValue.textContent = thresholdInput.value;
  contrastValue.textContent = contrastInput.value;
  gammaValue.textContent = gammaInput.value;
  ditherStrengthValue.textContent = ditherStrengthInput.value;
  noiseScaleValue.textContent = noiseScaleInput.value;
  blackAmountValue.textContent = blackAmountInput.value;
  whiteCleanupValue.textContent = whiteCleanupInput.value;
  midtonePushValue.textContent = midtonePushInput.value;
  shadowDetailValue.textContent = shadowDetailInput.value;
  highlightDetailValue.textContent = highlightDetailInput.value;
  edgeStrengthValue.textContent = edgeStrengthInput.value;
  smoothnessValue.textContent = smoothnessInput.value;
  sharpenValue.textContent = sharpenInput.value;
  preBlurValue.textContent = preBlurInput.value;
  adaptiveStrengthValue.textContent = adaptiveStrengthInput.value;
  detailPreserveValue.textContent = detailPreserveInput.value;
  halftoneSizeValue.textContent = halftoneSizeInput.value;
  halftoneStrengthValue.textContent = halftoneStrengthInput.value;
  halftoneAngleValue.textContent = `${halftoneAngleInput.value}°`;
  halftoneGainValue.textContent = halftoneGainInput.value;
  halftoneJitterValue.textContent = halftoneJitterInput.value;
  glyphSizeValue.textContent = glyphSizeInput.value;
  glyphSpacingValue.textContent = glyphSpacingInput.value;
  glyphDensityValue.textContent = glyphDensityInput.value;
  glyphWeightValue.textContent = glyphWeightInput.value;
  glyphRandomnessValue.textContent = glyphRandomnessInput.value;
  glyphRotationValue.textContent = `${glyphRotationInput.value}°`;
  edgeRoughnessValue.textContent = edgeRoughnessInput.value;
  inkBleedValue.textContent = inkBleedInput.value;
  dustAmountValue.textContent = dustAmountInput.value;
  grainAmountValue.textContent = grainAmountInput.value;
  edgeFadeWidthValue.textContent = edgeFadeWidthInput.value;
  edgeFadeStrengthValue.textContent = edgeFadeStrengthInput.value;
  edgeFadeNoiseValue.textContent = edgeFadeNoiseInput.value;
  eraserSizeValue.textContent = eraserSizeInput.value;
  removeSpecklesValue.textContent = removeSpecklesInput.value;
  fillHolesValue.textContent = fillHolesInput.value;
  expandBlackValue.textContent = expandBlackInput.value;
  shrinkBlackValue.textContent = shrinkBlackInput.value;
  smoothJaggedValue.textContent = smoothJaggedInput.value;
  zoomValue.textContent = `${zoomInput.value}%`;
  customExportWidthValue.textContent = customExportWidthInput.value;
  updateModeUI();
  uiHook('onValuesChanged');
}

function updateModeUI() {
  const isPixelMode = graphicModeInput.value === 'pixelBitmap';
  pixelSizeControl.classList.toggle('is-hidden', !isPixelMode);
}

function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }

function setupSliderResetButtons() {
  document.querySelectorAll('.control-group input[type="range"]').forEach((input) => {
    if (input.dataset.hasResetButton === 'true') return;
    input.dataset.hasResetButton = 'true';
    const reset = () => {
      if (input.value === input.defaultValue) return;
      input.value = input.defaultValue;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      if (input.id === 'customExportWidth') updateExportUI();
    };
    input.addEventListener('dblclick', reset);
    const label = document.querySelector(`label[for="${input.id}"]`);
    if (!label) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'slider-reset';
    button.title = `Auf ${input.defaultValue} zurücksetzen`;
    button.setAttribute('aria-label', `${label.firstChild.textContent.trim()} zurücksetzen`);
    button.innerHTML = '<svg aria-hidden="true"><use href="#i-reset" /></svg>';
    button.addEventListener('click', (e) => { e.preventDefault(); reset(); });
    const value = label.querySelector('.value');
    if (value) value.insertAdjacentElement('beforebegin', button);
    else label.appendChild(button);
  });
}

function setZoom(value) {
  const clamped = clamp(value, Number(zoomInput.min), Number(zoomInput.max));
  zoomInput.value = clamped;
  zoomValue.textContent = `${Math.round(clamped)}%`;
  navigatorZoom.textContent = `${Math.round(clamped)}%`;
  if (!canvas.width || !canvas.height || canvas.hidden) return;
  canvas.style.width = `${Math.max(1, Math.round(canvas.width * clamped / 100))}px`;
  canvas.style.height = `${Math.max(1, Math.round(canvas.height * clamped / 100))}px`;
  updateCropLayer();
  updateNavigator();
  uiHook('onViewportChanged');
}

function changeZoom(delta) { setZoom(Number(zoomInput.value) + delta); }

// One step is 25 % of the current zoom, so steps feel even at 30 % and at 800 %.
function stepZoom(direction) { setZoom(Math.round(Number(zoomInput.value) * Math.pow(1.25, direction))); }

function zoomAtPoint(newZoom, clientX, clientY) {
  if (!canvas.width || !canvas.height || canvas.hidden) { setZoom(newZoom); return; }
  const oldZoom = Number(zoomInput.value);
  const clamped = clamp(newZoom, Number(zoomInput.min), Number(zoomInput.max));
  if (clamped === oldZoom) return;
  const rect = canvas.getBoundingClientRect();
  let relX = 0.5;
  let relY = 0.5;
  if (rect.width > 0 && rect.height > 0) {
    relX = clamp((clientX - rect.left) / rect.width, 0, 1);
    relY = clamp((clientY - rect.top) / rect.height, 0, 1);
  }
  const newDisplayW = canvas.width * clamped / 100;
  const newDisplayH = canvas.height * clamped / 100;
  panX -= (newDisplayW - rect.width) * (relX - 0.5);
  panY -= (newDisplayH - rect.height) * (relY - 0.5);
  setZoom(clamped);
  updatePan();
}

function fitZoomToScreen() {
  if (!canvas.width || !canvas.height || canvas.hidden) { setZoom(100); return; }
  const availableWidth = Math.max(160, stage.clientWidth - 72);
  const availableHeight = Math.max(160, stage.clientHeight - 150);
  const fit = Math.min(availableWidth / canvas.width, availableHeight / canvas.height) * 100;
  const rounded = Math.floor(fit / 5) * 5;
  setZoom(clamp(rounded, Number(zoomInput.min), Number(zoomInput.max)));
  resetPan();
  lastHistoryState = getAppState();
}

function resetPan() {
  panX = 0;
  panY = 0;
  updatePan();
}

function updatePan() {
  canvasWrap.style.transform = `translate(calc(-50% + ${panX}px), calc(-50% + ${panY}px))`;
  updateCropLayer();
  updateNavigator();
  uiHook('onViewportChanged');
}

function setViewMode(mode) {
  viewModeInput.value = mode;
  viewProcessedButton.classList.toggle('active', mode === 'processed');
  viewOriginalButton.classList.toggle('active', mode === 'original');
  viewSplitButton.classList.toggle('active', mode === 'split');
  redrawDisplayCanvas();
  uiHook('onToolsChanged');
}

function applyPreset(name) {
  const preset = presets[name];
  if (!preset) return;
  recordHistoryChange();
  activePreset = name;
  setControlsFromPreset(preset);
  updateValues();
  updatePresetButtons();
  processImage();
  recordHistoryChange();
}

function setControlsFromPreset(preset) {
  graphicModeInput.value = preset.graphicMode ?? 'fullDetail';
  thresholdModeInput.value = preset.thresholdMode ?? 'global';
  pixelSizeInput.value = preset.pixelSize ?? 8;
  thresholdInput.value = preset.threshold ?? 128;
  contrastInput.value = preset.contrast ?? 0;
  gammaInput.value = preset.gamma ?? 100;
  ditherStrengthInput.value = preset.ditherStrength ?? 100;
  noiseScaleInput.value = preset.noiseScale ?? 100;
  methodInput.value = preset.method ?? 'threshold';
  blackAmountInput.value = preset.blackAmount ?? 50;
  whiteCleanupInput.value = preset.whiteCleanup ?? 20;
  midtonePushInput.value = preset.midtonePush ?? 0;
  shadowDetailInput.value = preset.shadowDetail ?? 35;
  highlightDetailInput.value = preset.highlightDetail ?? 30;
  edgeStrengthInput.value = preset.edgeStrength ?? 35;
  smoothnessInput.value = preset.smoothness ?? 10;
  sharpenInput.value = preset.sharpen ?? 20;
  preBlurInput.value = preset.preBlur ?? 0;
  adaptiveStrengthInput.value = preset.adaptiveStrength ?? 55;
  detailPreserveInput.value = preset.detailPreserve ?? 45;
  halftoneModeInput.value = preset.halftoneMode ?? 'off';
  halftoneSizeInput.value = preset.halftoneSize ?? 10;
  halftoneStrengthInput.value = preset.halftoneStrength ?? 100;
  halftoneAngleInput.value = preset.halftoneAngle ?? 15;
  halftoneGainInput.value = preset.halftoneGain ?? 0;
  halftoneJitterInput.value = preset.halftoneJitter ?? 0;
  glyphModeInput.checked = preset.glyphMode ?? false;
  glyphPresetInput.value = preset.glyphPreset ?? 'ascii';
  glyphCharsetInput.value = preset.glyphCharset ?? glyphSets.ascii;
  glyphRenderModeInput.value = preset.glyphRenderMode ?? 'shade';
  glyphFontInput.value = preset.glyphFont ?? 'impact';
  glyphReverseInput.checked = preset.glyphReverse ?? false;
  glyphSizeInput.value = preset.glyphSize ?? 14;
  glyphSpacingInput.value = preset.glyphSpacing ?? 100;
  glyphDensityInput.value = preset.glyphDensity ?? 95;
  glyphWeightInput.value = preset.glyphWeight ?? 900;
  glyphRandomnessInput.value = preset.glyphRandomness ?? 8;
  glyphRotationInput.value = preset.glyphRotation ?? 0;
  invertInput.checked = preset.invert ?? false;
  transparentInput.checked = preset.transparent ?? false;
  edgeRoughnessInput.value = preset.edgeRoughness ?? 0;
  inkBleedInput.value = preset.inkBleed ?? 0;
  dustAmountInput.value = preset.dustAmount ?? 0;
  grainAmountInput.value = preset.grainAmount ?? 0;
  edgeFadeModeInput.value = preset.edgeFadeMode ?? 'off';
  edgeFadeWidthInput.value = preset.edgeFadeWidth ?? 18;
  edgeFadeStrengthInput.value = preset.edgeFadeStrength ?? 70;
  edgeFadeNoiseInput.value = preset.edgeFadeNoise ?? 35;
  removeSpecklesInput.value = preset.removeSpeckles ?? 0;
  fillHolesInput.value = preset.fillHoles ?? 0;
  expandBlackInput.value = preset.expandBlack ?? 0;
  shrinkBlackInput.value = preset.shrinkBlack ?? 0;
  smoothJaggedInput.value = preset.smoothJagged ?? 0;
  updateModeUI();
}

function getCurrentPresetData() {
  return {
    graphicMode: graphicModeInput.value,
    thresholdMode: thresholdModeInput.value,
    pixelSize: Number(pixelSizeInput.value),
    threshold: Number(thresholdInput.value),
    contrast: Number(contrastInput.value),
    gamma: Number(gammaInput.value),
    ditherStrength: Number(ditherStrengthInput.value),
    noiseScale: Number(noiseScaleInput.value),
    method: methodInput.value,
    blackAmount: Number(blackAmountInput.value),
    whiteCleanup: Number(whiteCleanupInput.value),
    midtonePush: Number(midtonePushInput.value),
    shadowDetail: Number(shadowDetailInput.value),
    highlightDetail: Number(highlightDetailInput.value),
    edgeStrength: Number(edgeStrengthInput.value),
    smoothness: Number(smoothnessInput.value),
    sharpen: Number(sharpenInput.value),
    preBlur: Number(preBlurInput.value),
    adaptiveStrength: Number(adaptiveStrengthInput.value),
    detailPreserve: Number(detailPreserveInput.value),
    halftoneMode: halftoneModeInput.value,
    halftoneSize: Number(halftoneSizeInput.value),
    halftoneStrength: Number(halftoneStrengthInput.value),
    halftoneAngle: Number(halftoneAngleInput.value),
    halftoneGain: Number(halftoneGainInput.value),
    halftoneJitter: Number(halftoneJitterInput.value),
    glyphMode: glyphModeInput.checked,
    glyphPreset: glyphPresetInput.value,
    glyphCharset: glyphCharsetInput.value,
    glyphRenderMode: glyphRenderModeInput.value,
    glyphFont: glyphFontInput.value,
    glyphReverse: glyphReverseInput.checked,
    glyphSize: Number(glyphSizeInput.value),
    glyphSpacing: Number(glyphSpacingInput.value),
    glyphDensity: Number(glyphDensityInput.value),
    glyphWeight: Number(glyphWeightInput.value),
    glyphRandomness: Number(glyphRandomnessInput.value),
    glyphRotation: Number(glyphRotationInput.value),
    invert: invertInput.checked,
    transparent: transparentInput.checked,
    edgeRoughness: Number(edgeRoughnessInput.value),
    inkBleed: Number(inkBleedInput.value),
    dustAmount: Number(dustAmountInput.value),
    grainAmount: Number(grainAmountInput.value),
    edgeFadeMode: edgeFadeModeInput.value,
    edgeFadeWidth: Number(edgeFadeWidthInput.value),
    edgeFadeStrength: Number(edgeFadeStrengthInput.value),
    edgeFadeNoise: Number(edgeFadeNoiseInput.value),
    removeSpeckles: Number(removeSpecklesInput.value),
    fillHoles: Number(fillHolesInput.value),
    expandBlack: Number(expandBlackInput.value),
    shrinkBlack: Number(shrinkBlackInput.value),
    smoothJagged: Number(smoothJaggedInput.value)
  };
}


function getAppState() {
  return {
    controls: getCurrentPresetData(),
    exportMode: exportModeInput.value,
    customExportWidth: Number(customExportWidthInput.value),
    viewMode: viewModeInput.value
  };
}

function setAppState(state) {
  if (!state || !state.controls) return;
  isRestoringState = true;
  activePreset = null;
  setControlsFromPreset(state.controls);
  exportModeInput.value = state.exportMode || 'current';
  customExportWidthInput.value = state.customExportWidth || customExportWidthInput.defaultValue;
  viewModeInput.value = state.viewMode || 'processed';
  setViewMode(viewModeInput.value);
  updatePresetButtons();
  updateValues();
  processImage();
  updateExportUI();
  isRestoringState = false;
  lastHistoryState = getAppState();
}

function statesEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function recordHistoryChange() {
  if (isRestoringState) return;
  const current = getAppState();
  if (!lastHistoryState) {
    lastHistoryState = current;
    return;
  }
  if (!statesEqual(current, lastHistoryState)) {
    historyStack.push(lastHistoryState);
    if (historyStack.length > 60) historyStack.shift();
    redoStack = [];
    lastHistoryState = current;
  }
  updateHistoryButtons();
}

function undoState() {
  if (!historyStack.length) return;
  const current = getAppState();
  redoStack.push(current);
  const previous = historyStack.pop();
  setAppState(previous);
  updateHistoryButtons();
}

function redoState() {
  if (!redoStack.length) return;
  historyStack.push(getAppState());
  const next = redoStack.pop();
  setAppState(next);
  updateHistoryButtons();
}

function updateSnapshotList() {
  snapshotSelect.innerHTML = '';
  if (!snapshots.length) {
    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'Keine Snapshots';
    snapshotSelect.appendChild(option);
    return;
  }
  snapshots.forEach((snap, index) => {
    const option = document.createElement('option');
    option.value = String(index);
    option.textContent = snap.name;
    snapshotSelect.appendChild(option);
  });
}

function saveSnapshot() {
  if (!processedCanvas.width) return;
  const number = snapshots.length + 1;
  snapshots.push({
    name: `Snapshot ${number}`,
    state: getAppState(),
    image: processedCanvas.toDataURL('image/png')
  });
  updateSnapshotList();
  snapshotSelect.value = String(snapshots.length - 1);
}

function loadSnapshotState() {
  const index = Number(snapshotSelect.value);
  if (!snapshots[index]) return;
  setAppState(snapshots[index].state);
  isViewingSnapshot = false;
}

function toggleSnapshotPreview() {
  const index = Number(snapshotSelect.value);
  if (!snapshots[index]) return;
  isViewingSnapshot = !isViewingSnapshot;
  if (!isViewingSnapshot) {
    snapshotPreviewImage = null;
    redrawDisplayCanvas();
    return;
  }
  const img = new Image();
  img.onload = () => {
    snapshotPreviewImage = img;
    redrawDisplayCanvas();
  };
  img.src = snapshots[index].image;
}

function updatePresetButtons() {
  presetButtons.forEach((button) => button.classList.toggle('active', button.dataset.preset === activePreset));
}

function applySimpleBlackWhite() {
  recordHistoryChange();
  activePreset = null;
  graphicModeInput.value = 'simpleBW';
  thresholdModeInput.value = 'global';
  thresholdInput.value = 128;
  contrastInput.value = 0;
  gammaInput.value = 100;
  ditherStrengthInput.value = 0;
  methodInput.value = 'threshold';
  blackAmountInput.value = 50;
  whiteCleanupInput.value = 0;
  midtonePushInput.value = 0;
  shadowDetailInput.value = 0;
  highlightDetailInput.value = 0;
  edgeStrengthInput.value = 0;
  smoothnessInput.value = 0;
  sharpenInput.value = 0;
  preBlurInput.value = 0;
  adaptiveStrengthInput.value = 0;
  detailPreserveInput.value = 0;
  halftoneModeInput.value = 'off';
  edgeRoughnessInput.value = 0;
  inkBleedInput.value = 0;
  dustAmountInput.value = 0;
  grainAmountInput.value = 0;
  edgeFadeModeInput.value = 'off';
  removeSpecklesInput.value = 0;
  fillHolesInput.value = 0;
  expandBlackInput.value = 0;
  shrinkBlackInput.value = 0;
  smoothJaggedInput.value = 0;
  updateValues();
  processImage();
  updateExportUI();
  recordHistoryChange();
}

function applyEdgePreset(name) {
  const edgePresets = {
    soft: { mode: 'smooth', width: 18, strength: 52, noise: 18 },
    torn: { mode: 'torn', width: 24, strength: 70, noise: 55 },
    heavy: { mode: 'dissolve', width: 42, strength: 88, noise: 78 }
  };
  const preset = edgePresets[name] || edgePresets.torn;
  edgeFadeModeInput.value = preset.mode;
  edgeFadeWidthInput.value = preset.width;
  edgeFadeStrengthInput.value = preset.strength;
  edgeFadeNoiseInput.value = preset.noise;
  transparentInput.checked = true;
  updateAndProcess();
}

function getCustomPresets() {
  try { return JSON.parse(localStorage.getItem(customPresetStorageKey)) || {}; }
  catch (_) { return {}; }
}

function setCustomPresets(data) {
  localStorage.setItem(customPresetStorageKey, JSON.stringify(data));
}

function loadCustomPresetList() {
  const data = getCustomPresets();
  const names = Object.keys(data).sort((a, b) => a.localeCompare(b));
  customPresetSelect.innerHTML = '';
  if (!names.length) {
    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'Keine eigenen Looks';
    customPresetSelect.appendChild(option);
    return;
  }
  names.forEach((name) => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    customPresetSelect.appendChild(option);
  });
}

function saveCustomPreset() {
  const name = customPresetNameInput.value.trim();
  if (!name) {
    notify('Gib deinem Look zuerst einen Namen.');
    customPresetNameInput.focus();
    return;
  }
  const data = getCustomPresets();
  data[name] = getCurrentPresetData();
  setCustomPresets(data);
  loadCustomPresetList();
  customPresetSelect.value = name;
}

function loadSelectedCustomPreset() {
  const name = customPresetSelect.value;
  if (!name) return;
  const data = getCustomPresets();
  if (!data[name]) return;
  activePreset = null;
  setControlsFromPreset(data[name]);
  customPresetNameInput.value = name;
  updatePresetButtons();
  updateValues();
  processImage();
}

function deleteSelectedCustomPreset() {
  const name = customPresetSelect.value;
  if (!name) return;
  const data = getCustomPresets();
  delete data[name];
  setCustomPresets(data);
  loadCustomPresetList();
  customPresetNameInput.value = '';
}

function resetControls() {
  recordHistoryChange();
  activePreset = null;
  graphicModeInput.value = 'fullDetail';
  thresholdModeInput.value = 'global';
  pixelSizeInput.value = pixelSizeInput.defaultValue;
  thresholdInput.value = thresholdInput.defaultValue;
  contrastInput.value = contrastInput.defaultValue;
  gammaInput.value = gammaInput.defaultValue;
  ditherStrengthInput.value = ditherStrengthInput.defaultValue;
  noiseScaleInput.value = noiseScaleInput.defaultValue;
  methodInput.value = 'threshold';
  blackAmountInput.value = blackAmountInput.defaultValue;
  whiteCleanupInput.value = whiteCleanupInput.defaultValue;
  midtonePushInput.value = midtonePushInput.defaultValue;
  shadowDetailInput.value = shadowDetailInput.defaultValue;
  highlightDetailInput.value = highlightDetailInput.defaultValue;
  edgeStrengthInput.value = edgeStrengthInput.defaultValue;
  smoothnessInput.value = smoothnessInput.defaultValue;
  sharpenInput.value = sharpenInput.defaultValue;
  preBlurInput.value = preBlurInput.defaultValue;
  adaptiveStrengthInput.value = adaptiveStrengthInput.defaultValue;
  detailPreserveInput.value = detailPreserveInput.defaultValue;
  halftoneModeInput.value = 'off';
  halftoneSizeInput.value = halftoneSizeInput.defaultValue;
  halftoneStrengthInput.value = halftoneStrengthInput.defaultValue;
  halftoneAngleInput.value = halftoneAngleInput.defaultValue;
  halftoneGainInput.value = halftoneGainInput.defaultValue;
  halftoneJitterInput.value = halftoneJitterInput.defaultValue;
  glyphModeInput.checked = false;
  glyphPresetInput.value = 'ascii';
  glyphCharsetInput.value = glyphCharsetInput.defaultValue;
  glyphRenderModeInput.value = 'shade';
  glyphFontInput.value = 'impact';
  glyphReverseInput.checked = false;
  glyphSizeInput.value = glyphSizeInput.defaultValue;
  glyphSpacingInput.value = glyphSpacingInput.defaultValue;
  glyphDensityInput.value = glyphDensityInput.defaultValue;
  glyphWeightInput.value = glyphWeightInput.defaultValue;
  glyphRandomnessInput.value = glyphRandomnessInput.defaultValue;
  glyphRotationInput.value = glyphRotationInput.defaultValue;
  edgeRoughnessInput.value = edgeRoughnessInput.defaultValue;
  inkBleedInput.value = inkBleedInput.defaultValue;
  dustAmountInput.value = dustAmountInput.defaultValue;
  grainAmountInput.value = grainAmountInput.defaultValue;
  edgeFadeModeInput.value = 'off';
  edgeFadeWidthInput.value = edgeFadeWidthInput.defaultValue;
  edgeFadeStrengthInput.value = edgeFadeStrengthInput.defaultValue;
  edgeFadeNoiseInput.value = edgeFadeNoiseInput.defaultValue;
  manualEraserInput.checked = false;
  eraserActive = false;
  stage.classList.remove('is-erasing');
  maskPreviewInput.checked = false;
  removeSpecklesInput.value = removeSpecklesInput.defaultValue;
  fillHolesInput.value = fillHolesInput.defaultValue;
  expandBlackInput.value = expandBlackInput.defaultValue;
  shrinkBlackInput.value = shrinkBlackInput.defaultValue;
  smoothJaggedInput.value = smoothJaggedInput.defaultValue;
  invertInput.checked = false;
  transparentInput.checked = false;
  exportModeInput.value = 'current';
  customExportWidthInput.value = customExportWidthInput.defaultValue;
  manualEraseStrokes = [];
  isViewingSnapshot = false;
  updatePresetButtons();
  updateValues();
  processImage();
  updateExportUI();
  resetPan();
  recordHistoryChange();
}

function processImage(jobId = ++renderJobId) {
  if (!originalImage) return;
  const settings = getRenderSettings();
  if (settings.graphicMode === 'simpleBW') normalizeSimpleBlackWhiteSettings(settings);
  if (settings.glyphMode) {
    setRenderStatus('Render: glyph fallback...');
    processGlyphImage(settings.threshold, settings.contrast, settings.gamma, settings.invert, settings.makeTransparent, settings.edgeRoughness, settings.inkBleed, settings.dustAmount, settings.grainAmount, settings.edgeFadeMode, settings.edgeFadeWidth, settings.edgeFadeStrength, settings.edgeFadeNoise);
    setRenderStatus('Render: fertig.');
    return;
  }
  const sourceImage = previewImage || originalImage;
  if (tryWorkerPreview(settings, sourceImage, jobId)) return;
  setRenderStatus('Render: main thread...');
  if (settings.graphicMode === 'pixelBitmap') processPixelBitmapClassic(settings, sourceImage, processedCanvas, processedCtx, true);
  else processFullDetailGraphic(settings, sourceImage, processedCanvas, processedCtx, true);
  if (jobId === renderJobId) setRenderStatus('Render: fertig.');
}

function canUseWorkerPreview(settings) {
  if (!workerPreviewEnabledInput || !workerPreviewEnabledInput.checked) return false;
  if (typeof Worker === 'undefined') return false;
  if (settings.graphicMode === 'pixelBitmap' || settings.glyphMode) return false;
  if (settings.halftoneMode !== 'off') return false;
  if (settings.method !== 'threshold' && settings.ditherStrength > 0) return false;
  if (settings.edgeRoughness || settings.inkBleed || settings.dustAmount || settings.grainAmount) return false;
  if (settings.edgeFadeMode !== 'off') return false;
  if (settings.cleanup && settings.cleanup.smoothJagged > 0) return false;
  return !manualEraseStrokes.length;
}

function tryWorkerPreview(settings, sourceImage, jobId) {
  if (!canUseWorkerPreview(settings)) return false;
  if (activeRenderWorker) activeRenderWorker.terminate();
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = sourceImage.width;
  tempCanvas.height = sourceImage.height;
  const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
  tempCtx.imageSmoothingEnabled = true;
  tempCtx.drawImage(sourceImage, 0, 0, tempCanvas.width, tempCanvas.height);
  const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
  const worker = createRenderWorker();
  activeRenderWorker = worker;
  setRenderStatus('Render: worker...');
  worker.onmessage = (event) => {
    if (jobId !== renderJobId) {
      worker.terminate();
      return;
    }
    const result = event.data;
    const pixels = new Uint8ClampedArray(result.buffer);
    processedCanvas.width = result.width;
    processedCanvas.height = result.height;
    processedCtx.putImageData(new ImageData(pixels, result.width, result.height), 0, 0);
    activeRenderWorker = null;
    worker.terminate();
    redrawDisplayCanvas();
    updateExportUI();
    setRenderStatus('Render: worker fertig.');
  };
  worker.onerror = () => {
    if (jobId !== renderJobId) return;
    activeRenderWorker = null;
    worker.terminate();
    setRenderStatus('Render: worker fallback...');
    if (settings.graphicMode === 'pixelBitmap') processPixelBitmapClassic(settings, sourceImage, processedCanvas, processedCtx, true);
    else processFullDetailGraphic(settings, sourceImage, processedCanvas, processedCtx, true);
    setRenderStatus('Render: fertig.');
  };
  worker.postMessage({ width: imageData.width, height: imageData.height, buffer: imageData.data.buffer, settings }, [imageData.data.buffer]);
  return true;
}

function createRenderWorker() {
  const workerCode = `
    self.onmessage = function(event) {
      const width = event.data.width;
      const height = event.data.height;
      const settings = event.data.settings;
      const data = new Uint8ClampedArray(event.data.buffer);
      const length = width * height;
      const luminance = new Float32Array(length);
      const alpha = new Uint8Array(length);
      for (let i = 0; i < length; i++) {
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
      applyCleanupTools(data, width, height, settings.cleanup, settings.makeTransparent);
      self.postMessage({ width, height, buffer: data.buffer }, [data.buffer]);
    };
    function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
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
      for (let i = 0; i < source.length; i++) out[i] = alpha[i] === 0 ? source[i] : clamp(source[i] + (source[i] - blurred[i]) * amount, 0, 255);
      return out;
    }
    function applyEdgeInk(mask, luminance, edgeMap, alpha, baseThreshold, settings) {
      const edgeGate = 0.18 + (1 - settings.edgeStrength / 100) * 0.22;
      for (let i = 0; i < mask.length; i++) {
        if (alpha[i] === 0) continue;
        if (edgeMap[i] > edgeGate && luminance[i] < baseThreshold + settings.detailPreserve * 0.85) mask[i] = 1;
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
            for (let ny = -1; ny <= 1; ny++) for (let nx = -1; nx <= 1; nx++) if (copy[(y + ny) * width + (x + nx)]) count++;
            if (count >= required) mask[index] = 1;
            if (count <= 2) mask[index] = 0;
          }
        }
      }
    }
    function writeMaskToData(data, mask, alpha, invert, makeTransparent) {
      for (let i = 0; i < mask.length; i++) {
        const di = i * 4;
        if (alpha[i] === 0) { setTransparentPixel(data, di); continue; }
        let isBlack = mask[i] === 1;
        if (invert) isBlack = !isBlack;
        setPixel(data, di, isBlack, makeTransparent);
      }
    }
    function applyCleanupTools(data, width, height, settings, makeTransparent) {
      if (!settings) return;
      if (settings.expandBlack > 0) applyMorphology(data, width, height, settings.expandBlack, 'expand', makeTransparent);
      if (settings.shrinkBlack > 0) applyMorphology(data, width, height, settings.shrinkBlack, 'shrink', makeTransparent);
      if (settings.fillHoles > 0) applyFillHoles(data, width, height, settings.fillHoles);
      if (settings.removeSpeckles > 0) applyRemoveSpeckles(data, width, height, settings.removeSpeckles, makeTransparent);
    }
    function applyMorphology(data, width, height, passes, mode, makeTransparent) {
      const safePasses = Math.max(0, Math.min(5, Math.round(passes)));
      for (let pass = 0; pass < safePasses; pass++) {
        const copy = new Uint8ClampedArray(data);
        for (let y = 1; y < height - 1; y++) {
          for (let x = 1; x < width - 1; x++) {
            const i = (y * width + x) * 4;
            let blackNeighbors = 0;
            for (let ny = -1; ny <= 1; ny++) for (let nx = -1; nx <= 1; nx++) if (isBlackPixel(copy, ((y + ny) * width + (x + nx)) * 4)) blackNeighbors++;
            if (mode === 'expand' && !isBlackPixel(copy, i) && blackNeighbors >= 2) setBlackPixel(data, i);
            if (mode === 'shrink' && isBlackPixel(copy, i) && blackNeighbors <= 5) makeTransparent ? setTransparentPixel(data, i) : setWhitePixel(data, i);
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
            if (isBlackPixel(copy, ((y + ny) * width + (x + nx)) * 4)) blackNeighbors++;
          }
          if (blackNeighbors <= thresholdNeighbors) makeTransparent ? setTransparentPixel(data, i) : setWhitePixel(data, i);
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
            if (isBlackPixel(copy, ((y + ny) * width + (x + nx)) * 4)) blackNeighbors++;
          }
          if (blackNeighbors >= requiredNeighbors) setBlackPixel(data, i);
        }
      }
    }
    function setPixel(data, index, isBlack, makeTransparent) { if (isBlack) setBlackPixel(data, index); else if (makeTransparent) setTransparentPixel(data, index); else setWhitePixel(data, index); }
    function isBlackPixel(data, index) { return data[index + 3] > 0 && data[index] < 128; }
    function setBlackPixel(data, index) { data[index] = 0; data[index + 1] = 0; data[index + 2] = 0; data[index + 3] = 255; }
    function setWhitePixel(data, index) { data[index] = 255; data[index + 1] = 255; data[index + 2] = 255; data[index + 3] = 255; }
    function setTransparentPixel(data, index) { data[index] = 255; data[index + 1] = 255; data[index + 2] = 255; data[index + 3] = 0; }
    function noise2D(x, y) { const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453; return n - Math.floor(n); }
  `;
  const workerUrl = URL.createObjectURL(new Blob([workerCode], { type: 'application/javascript' }));
  const worker = new Worker(workerUrl);
  URL.revokeObjectURL(workerUrl);
  return worker;
}

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

function getRenderSettings() {
  const halftoneMode = graphicModeInput.value === 'screenprintHalftone' && halftoneModeInput.value === 'off'
    ? 'dotRound'
    : halftoneModeInput.value;
  return {
    graphicMode: graphicModeInput.value,
    thresholdMode: thresholdModeInput.value,
    pixelSize: Number(pixelSizeInput.value),
    threshold: Number(thresholdInput.value),
    contrast: Number(contrastInput.value),
    gamma: Number(gammaInput.value),
    ditherStrength: Number(ditherStrengthInput.value),
    noiseScale: Number(noiseScaleInput.value),
    method: methodInput.value,
    blackAmount: Number(blackAmountInput.value),
    whiteCleanup: Number(whiteCleanupInput.value),
    midtonePush: Number(midtonePushInput.value),
    shadowDetail: Number(shadowDetailInput.value),
    highlightDetail: Number(highlightDetailInput.value),
    edgeStrength: Number(edgeStrengthInput.value),
    smoothness: Number(smoothnessInput.value),
    sharpen: Number(sharpenInput.value),
    preBlur: Number(preBlurInput.value),
    adaptiveStrength: Number(adaptiveStrengthInput.value),
    detailPreserve: Number(detailPreserveInput.value),
    halftoneMode,
    halftoneSize: Number(halftoneSizeInput.value),
    halftoneStrength: Number(halftoneStrengthInput.value),
    halftoneAngle: Number(halftoneAngleInput.value),
    halftoneGain: Number(halftoneGainInput.value),
    halftoneJitter: Number(halftoneJitterInput.value),
    edgeRoughness: Number(edgeRoughnessInput.value),
    inkBleed: Number(inkBleedInput.value),
    dustAmount: Number(dustAmountInput.value),
    grainAmount: Number(grainAmountInput.value),
    edgeFadeMode: edgeFadeModeInput.value,
    edgeFadeWidth: Number(edgeFadeWidthInput.value),
    edgeFadeStrength: Number(edgeFadeStrengthInput.value),
    edgeFadeNoise: Number(edgeFadeNoiseInput.value),
    cleanup: getCleanupSettings(),
    invert: invertInput.checked,
    makeTransparent: transparentInput.checked,
    glyphMode: glyphModeInput.checked
  };
}

function processPixelBitmapClassic(settings, sourceImage = previewImage || originalImage, outputCanvas = processedCanvas, outputCtx = processedCtx, updateDisplay = true) {
  const pixelSize = Number(pixelSizeInput.value);
  const threshold = Number(thresholdInput.value);
  const contrast = Number(contrastInput.value);
  const gamma = Number(gammaInput.value);
  const ditherStrength = Number(ditherStrengthInput.value);
  const noiseScale = Number(noiseScaleInput.value);
  const method = methodInput.value;
  const halftoneMode = halftoneModeInput.value;
  const halftoneSize = Number(halftoneSizeInput.value);
  const halftoneStrength = Number(halftoneStrengthInput.value);
  const halftoneAngle = Number(halftoneAngleInput.value);
  const halftoneGain = Number(halftoneGainInput.value);
  const halftoneJitter = Number(halftoneJitterInput.value);
  const edgeRoughness = Number(edgeRoughnessInput.value);
  const inkBleed = Number(inkBleedInput.value);
  const dustAmount = Number(dustAmountInput.value);
  const grainAmount = Number(grainAmountInput.value);
  const edgeFadeMode = edgeFadeModeInput.value;
  const edgeFadeWidth = Number(edgeFadeWidthInput.value);
  const edgeFadeStrength = Number(edgeFadeStrengthInput.value);
  const edgeFadeNoise = Number(edgeFadeNoiseInput.value);
  const cleanup = getCleanupSettings();
  const invert = invertInput.checked;
  const makeTransparent = transparentInput.checked;

  const smallWidth = Math.max(1, Math.floor(sourceImage.width / pixelSize));
  const smallHeight = Math.max(1, Math.floor(sourceImage.height / pixelSize));
  const tempCanvas = document.createElement('canvas');
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
  applyManualEraserToCanvas(outputCanvas, outputCtx);
  if (updateDisplay) {
    redrawDisplayCanvas();
    updateExportUI();
  }
  return outputCanvas;
}

function processFullDetailGraphic(settings, sourceImage = previewImage || originalImage, outputCanvas = processedCanvas, outputCtx = processedCtx, updateDisplay = true) {
  const width = sourceImage.width;
  const height = sourceImage.height;
  const workCanvas = document.createElement('canvas');
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
  applyManualEraserToCanvas(outputCanvas, outputCtx);
  if (updateDisplay) {
    redrawDisplayCanvas();
    updateExportUI();
  }
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

function processGlyphImage(threshold, contrast, gamma, invert, makeTransparent, edgeRoughness, inkBleed, dustAmount, grainAmount, edgeFadeMode, edgeFadeWidth, edgeFadeStrength, edgeFadeNoise) {
  const fontSize = Number(glyphSizeInput.value);
  const spacingRatio = Number(glyphSpacingInput.value) / 100;
  const cellSize = Math.max(2, Math.round(fontSize * spacingRatio));
  const density = Number(glyphDensityInput.value) / 100;
  const randomness = Number(glyphRandomnessInput.value) / 100;
  const rotationMax = Number(glyphRotationInput.value) * Math.PI / 180;
  const weight = Number(glyphWeightInput.value);
  const renderMode = glyphRenderModeInput.value;
  const reverseMap = glyphReverseInput.checked;
  const charsetRaw = glyphCharsetInput.value || glyphSets.ascii;
  let charset = Array.from(charsetRaw);
  if (!charset.length) charset = Array.from(glyphSets.ascii);
  if (reverseMap) charset = charset.slice().reverse();

  const gridWidth = Math.max(1, Math.floor(originalImage.width / cellSize));
  const gridHeight = Math.max(1, Math.floor(originalImage.height / cellSize));
  const sampleCanvas = document.createElement('canvas');
  const sampleCtx = sampleCanvas.getContext('2d', { willReadFrequently: true });
  sampleCanvas.width = gridWidth;
  sampleCanvas.height = gridHeight;
  sampleCtx.drawImage(originalImage, 0, 0, gridWidth, gridHeight);
  const sampleImageData = sampleCtx.getImageData(0, 0, gridWidth, gridHeight);
  applyPreTone(sampleImageData.data, contrast, gamma);
  const source = sampleImageData.data;
  const brightnessMap = new Float32Array(gridWidth * gridHeight);
  const alphaMap = new Uint8Array(gridWidth * gridHeight);
  for (let i = 0; i < brightnessMap.length; i++) {
    const di = i * 4;
    brightnessMap[i] = 0.299 * source[di] + 0.587 * source[di + 1] + 0.114 * source[di + 2];
    alphaMap[i] = source[di + 3];
  }

  processedCanvas.width = gridWidth * cellSize;
  processedCanvas.height = gridHeight * cellSize;
  processedCtx.imageSmoothingEnabled = false;
  processedCtx.clearRect(0, 0, processedCanvas.width, processedCanvas.height);
  if (!makeTransparent) {
    processedCtx.fillStyle = invert ? '#000' : '#fff';
    processedCtx.fillRect(0, 0, processedCanvas.width, processedCanvas.height);
  }

  const fontMap = {
    impact: 'Impact, Haettenschweiler, Arial Narrow, sans-serif',
    arialBlack: 'Arial Black, Arial, sans-serif',
    mono: 'Courier New, Courier, monospace',
    serif: 'Georgia, Times New Roman, serif'
  };
  processedCtx.font = `${weight} ${Math.max(5, Math.round(fontSize))}px ${fontMap[glyphFontInput.value] || fontMap.impact}`;
  processedCtx.textAlign = 'center';
  processedCtx.textBaseline = 'middle';
  processedCtx.fillStyle = invert ? '#fff' : '#000';

  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      const index = y * gridWidth + x;
      if (alphaMap[index] === 0) continue;
      const brightness = brightnessMap[index];
      let darkness = clamp((threshold - brightness + 128) / 255, 0, 1);

      const left = x > 0 ? brightnessMap[index - 1] : brightness;
      const right = x < gridWidth - 1 ? brightnessMap[index + 1] : brightness;
      const up = y > 0 ? brightnessMap[index - gridWidth] : brightness;
      const down = y < gridHeight - 1 ? brightnessMap[index + gridWidth] : brightness;
      const edgeStrength = clamp((Math.abs(left - right) + Math.abs(up - down)) / 220, 0, 1);
      const nearThreshold = 1 - clamp(Math.abs(brightness - threshold) / 90, 0, 1);

      let visibleChance = 0;
      if (renderMode === 'threshold') visibleChance = brightness < threshold ? density : 0;
      else if (renderMode === 'outline') visibleChance = nearThreshold * density;
      else if (renderMode === 'edges') visibleChance = edgeStrength * density * 1.45;
      else if (renderMode === 'poster') visibleChance = clamp((darkness * 0.78 + edgeStrength * 0.38 + nearThreshold * 0.18) * density, 0, 1);
      else visibleChance = clamp((darkness * density) + 0.02, 0, 1);

      const gateNoise = noise2D(x * 4.7 + 13.1, y * 4.3 - 2.7);
      if (gateNoise > visibleChance) continue;

      if (renderMode === 'outline') darkness = clamp(nearThreshold, 0, 1);
      if (renderMode === 'edges') darkness = clamp(edgeStrength, 0, 1);
      if (renderMode === 'threshold') darkness = brightness < threshold ? 1 : 0;
      if (renderMode === 'poster') darkness = clamp(darkness * 0.78 + edgeStrength * 0.32, 0, 1);

      const randomShift = Math.round((noise2D(x * 2.1, y * 2.4) - 0.5) * randomness * charset.length);
      const charIndex = clamp(Math.round(darkness * (charset.length - 1)) + randomShift, 0, charset.length - 1);
      const ch = charset[charIndex];
      if (!ch || ch === ' ') continue;

      const jitterX = (noise2D(x * 8.1, y * 7.7) - 0.5) * randomness * cellSize * 0.65;
      const jitterY = (noise2D(x * 7.4 + 6.2, y * 8.5 - 1.1) - 0.5) * randomness * cellSize * 0.65;
      const rot = (noise2D(x * 5.9 - 1.7, y * 5.4 + 2.6) - 0.5) * 2 * rotationMax;
      const px = x * cellSize + cellSize / 2 + jitterX;
      const py = y * cellSize + cellSize / 2 + jitterY;

      processedCtx.save();
      processedCtx.translate(px, py);
      if (rot) processedCtx.rotate(rot);
      processedCtx.fillText(ch, 0, 0);
      processedCtx.restore();
    }
  }

  const glyphImageData = processedCtx.getImageData(0, 0, processedCanvas.width, processedCanvas.height);
  const data = glyphImageData.data;
  if (grainAmount > 0) applyGrain(data, processedCanvas.width, processedCanvas.height, grainAmount, makeTransparent);
  if (inkBleed > 0) applyInkBleed(data, processedCanvas.width, processedCanvas.height, inkBleed, makeTransparent);
  if (edgeRoughness > 0) applyRoughEdges(data, processedCanvas.width, processedCanvas.height, edgeRoughness, makeTransparent);
  if (dustAmount > 0) applyDust(data, processedCanvas.width, processedCanvas.height, dustAmount, makeTransparent);
  if (edgeFadeMode !== 'off' && edgeFadeWidth > 0 && edgeFadeStrength > 0) applyEdgeTransition(data, processedCanvas.width, processedCanvas.height, edgeFadeMode, edgeFadeWidth, edgeFadeStrength, edgeFadeNoise, makeTransparent);
  applyCleanupTools(data, processedCanvas.width, processedCanvas.height, getCleanupSettings(), makeTransparent);
  processedCtx.putImageData(glyphImageData, 0, 0);
  applyManualEraserToProcessed();
  redrawDisplayCanvas();
  updateExportUI();
}

function redrawDisplayCanvas() {
  if (!processedCanvas.width || !processedCanvas.height) return;
  canvas.width = processedCanvas.width;
  canvas.height = processedCanvas.height;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const pixelDisplay = graphicModeInput.value === 'pixelBitmap';
  canvas.style.imageRendering = pixelDisplay ? 'pixelated' : 'auto';
  ctx.imageSmoothingEnabled = !pixelDisplay;

  if (isViewingSnapshot && snapshotPreviewImage) {
    ctx.drawImage(snapshotPreviewImage, 0, 0, canvas.width, canvas.height);
  } else if (maskPreviewInput.checked) {
    drawMaskPreviewToCanvas();
  } else {
    const mode = viewModeInput.value;
    if (mode === 'original') {
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
    } else if (mode === 'split') {
      ctx.drawImage(processedCanvas, 0, 0);
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, Math.round(canvas.width * splitPosition), canvas.height);
      ctx.clip();
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
      ctx.restore();
    } else {
      ctx.imageSmoothingEnabled = !pixelDisplay;
      ctx.drawImage(processedCanvas, 0, 0);
    }
  }

  if (pendingFit) {
    pendingFit = false;
    fitZoomToScreen();
  } else {
    setZoom(Number(zoomInput.value));
  }
  updateNavigator();
  if (!activeRenderWorker && !processTimer) stage.classList.remove('is-rendering');
  uiHook('onRedraw');
}

function drawMaskPreviewToCanvas() {
  const data = processedCtx.getImageData(0, 0, processedCanvas.width, processedCanvas.height);
  const pixels = data.data;
  for (let i = 0; i < pixels.length; i += 4) {
    const keep = pixels[i + 3] > 0 && pixels[i] < 245;
    pixels[i] = keep ? 0 : 255;
    pixels[i + 1] = keep ? 0 : 255;
    pixels[i + 2] = keep ? 0 : 255;
    pixels[i + 3] = 255;
  }
  ctx.putImageData(data, 0, 0);
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


function getCleanupSettings() {
  return {
    removeSpeckles: Number(removeSpecklesInput.value),
    fillHoles: Number(fillHolesInput.value),
    expandBlack: Number(expandBlackInput.value),
    shrinkBlack: Number(shrinkBlackInput.value),
    smoothJagged: Number(smoothJaggedInput.value)
  };
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

function toggleEraserMode() {
  eraserActive = manualEraserInput.checked;
  if (eraserActive) stopCropMode();
  stage.classList.toggle('is-erasing', eraserActive);
  uiHook('onToolsChanged');
}

function setupManualEraserInteractions() {
  canvas.addEventListener('pointerdown', (e) => {
    if (!eraserActive || !processedCanvas.width || e.button !== 0) return;
    e.preventDefault();
    isErasing = true;
    eraseAtPointer(e);
    try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!isErasing || !eraserActive) return;
    e.preventDefault();
    eraseAtPointer(e);
  });
  canvas.addEventListener('pointerup', () => { isErasing = false; });
  canvas.addEventListener('pointercancel', () => { isErasing = false; });
}

function eraseAtPointer(e) {
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
  const y = clamp((e.clientY - rect.top) / rect.height, 0, 1);
  const radiusNorm = Number(eraserSizeInput.value) / Math.max(processedCanvas.width, processedCanvas.height);
  manualEraseStrokes.push({ x, y, r: radiusNorm });
  applyManualEraserToProcessed();
  redrawDisplayCanvas();
}

function applyManualEraserToProcessed() {
  applyManualEraserToCanvas(processedCanvas, processedCtx);
}

function applyManualEraserToCanvas(targetCanvas, targetCtx) {
  if (!manualEraseStrokes.length || !targetCanvas.width) return;
  const imageData = targetCtx.getImageData(0, 0, targetCanvas.width, targetCanvas.height);
  const data = imageData.data;
  const makeTransparent = transparentInput.checked;
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

function clearManualEraser() {
  manualEraseStrokes = [];
  processImage();
}

function startCropMode() {
  if (!originalImage || canvas.hidden) return;
  manualEraserInput.checked = false;
  toggleEraserMode();
  cropActive = true;
  stage.classList.add('is-cropping');
  cropLayer.classList.add('active');
  cropLayer.setAttribute('aria-hidden', 'false');
  if (!cropRectNorm) cropRectNorm = { x: 0.1, y: 0.1, w: 0.8, h: 0.8 };
  enforceCropAspect();
  updateCropLayer();
  applyCropButton.disabled = false;
  uiHook('onToolsChanged');
}

function stopCropMode() {
  cropActive = false;
  cropDragMode = null;
  cropLayer.classList.remove('active');
  cropLayer.setAttribute('aria-hidden', 'true');
  stage.classList.remove('is-cropping');
  applyCropButton.disabled = true;
  uiHook('onToolsChanged');
}

function setupCropInteractions() {
  cropLayer.addEventListener('pointerdown', (e) => {
    if (!cropActive || !originalImage) return;
    e.preventDefault();
    const point = getCropPoint(e);
    cropStartPoint = point;
    cropStartRect = cropRectNorm ? { ...cropRectNorm } : { x: point.x, y: point.y, w: 0, h: 0 };
    if (e.target.dataset && e.target.dataset.handle) {
      cropDragMode = 'resize';
      cropDragHandle = e.target.dataset.handle;
    } else if (e.target === cropBox) {
      cropDragMode = 'move';
    } else {
      cropDragMode = 'draw';
      cropRectNorm = { x: point.x, y: point.y, w: 0.01, h: 0.01 };
    }
    try { cropLayer.setPointerCapture(e.pointerId); } catch (_) {}
  });

  cropLayer.addEventListener('pointermove', (e) => {
    if (!cropDragMode || !cropActive) return;
    e.preventDefault();
    const point = getCropPoint(e);
    if (cropDragMode === 'move') moveCropRect(point);
    if (cropDragMode === 'draw') drawCropRect(point);
    if (cropDragMode === 'resize') resizeCropRect(point);
    enforceCropAspect();
    updateCropLayer();
  });

  const stop = () => { cropDragMode = null; cropDragHandle = null; };
  cropLayer.addEventListener('pointerup', stop);
  cropLayer.addEventListener('pointercancel', stop);
}

function getCropPoint(e) {
  const rect = cropLayer.getBoundingClientRect();
  return {
    x: clamp((e.clientX - rect.left) / Math.max(1, rect.width), 0, 1),
    y: clamp((e.clientY - rect.top) / Math.max(1, rect.height), 0, 1)
  };
}

function drawCropRect(point) {
  const x1 = cropStartPoint.x;
  const y1 = cropStartPoint.y;
  cropRectNorm = {
    x: Math.min(x1, point.x),
    y: Math.min(y1, point.y),
    w: Math.max(0.01, Math.abs(point.x - x1)),
    h: Math.max(0.01, Math.abs(point.y - y1))
  };
}

function moveCropRect(point) {
  const dx = point.x - cropStartPoint.x;
  const dy = point.y - cropStartPoint.y;
  cropRectNorm = {
    x: clamp(cropStartRect.x + dx, 0, 1 - cropStartRect.w),
    y: clamp(cropStartRect.y + dy, 0, 1 - cropStartRect.h),
    w: cropStartRect.w,
    h: cropStartRect.h
  };
}

function resizeCropRect(point) {
  let left = cropStartRect.x;
  let top = cropStartRect.y;
  let right = cropStartRect.x + cropStartRect.w;
  let bottom = cropStartRect.y + cropStartRect.h;
  if (cropDragHandle.includes('w')) left = point.x;
  if (cropDragHandle.includes('e')) right = point.x;
  if (cropDragHandle.includes('n')) top = point.y;
  if (cropDragHandle.includes('s')) bottom = point.y;
  cropRectNorm = {
    x: clamp(Math.min(left, right), 0, 0.99),
    y: clamp(Math.min(top, bottom), 0, 0.99),
    w: clamp(Math.abs(right - left), 0.01, 1),
    h: clamp(Math.abs(bottom - top), 0.01, 1)
  };
  cropRectNorm.w = Math.min(cropRectNorm.w, 1 - cropRectNorm.x);
  cropRectNorm.h = Math.min(cropRectNorm.h, 1 - cropRectNorm.y);
}

function getAspectRatioValue() {
  const value = cropAspectInput.value;
  if (value === 'free') return null;
  if (value === 'shirt') return 1;
  const parts = value.split(':').map(Number);
  if (parts.length === 2 && parts[0] > 0 && parts[1] > 0) return parts[0] / parts[1];
  return null;
}

function enforceCropAspect() {
  if (!cropRectNorm) return;
  const aspect = getAspectRatioValue();
  if (!aspect) return;
  const displayRatio = canvas.clientWidth / Math.max(1, canvas.clientHeight);
  let pixelW = cropRectNorm.w * canvas.clientWidth;
  let pixelH = pixelW / aspect;
  let normH = pixelH / Math.max(1, canvas.clientHeight);
  if (cropRectNorm.y + normH > 1) {
    normH = 1 - cropRectNorm.y;
    pixelH = normH * canvas.clientHeight;
    pixelW = pixelH * aspect;
  }
  let normW = pixelW / Math.max(1, canvas.clientWidth);
  if (cropRectNorm.x + normW > 1) normW = 1 - cropRectNorm.x;
  cropRectNorm.w = clamp(normW, 0.01, 1 - cropRectNorm.x);
  cropRectNorm.h = clamp(normH, 0.01, 1 - cropRectNorm.y);
}

function updateCropLayer() {
  if (!cropLayer || canvas.hidden || !canvas.clientWidth || !canvas.clientHeight) return;
  cropLayer.style.left = `${canvas.offsetLeft}px`;
  cropLayer.style.top = `${canvas.offsetTop}px`;
  cropLayer.style.width = `${canvas.clientWidth}px`;
  cropLayer.style.height = `${canvas.clientHeight}px`;
  if (!cropRectNorm) return;
  cropBox.style.left = `${cropRectNorm.x * canvas.clientWidth}px`;
  cropBox.style.top = `${cropRectNorm.y * canvas.clientHeight}px`;
  cropBox.style.width = `${cropRectNorm.w * canvas.clientWidth}px`;
  cropBox.style.height = `${cropRectNorm.h * canvas.clientHeight}px`;
}

function applyCropSelection() {
  if (!originalImage || !cropRectNorm) return;
  recordHistoryChange();
  const sx = Math.round(cropRectNorm.x * originalImage.width);
  const sy = Math.round(cropRectNorm.y * originalImage.height);
  const sw = Math.max(1, Math.round(cropRectNorm.w * originalImage.width));
  const sh = Math.max(1, Math.round(cropRectNorm.h * originalImage.height));
  const cropCanvas = document.createElement('canvas');
  cropCanvas.width = sw;
  cropCanvas.height = sh;
  const cropCtx = cropCanvas.getContext('2d');
  cropCtx.drawImage(originalImage, sx, sy, sw, sh, 0, 0, sw, sh);
  const img = new Image();
  img.onload = () => {
    originalImage = img;
    rebuildPreviewImage();
    cropRectNorm = null;
    manualEraseStrokes = [];
    stopCropMode();
    pendingFit = true;
    resetPan();
    processImage();
    lastHistoryState = getAppState();
    uiHook('onImageChanged');
  };
  img.src = cropCanvas.toDataURL('image/png');
}

function resetCropToOriginal() {
  if (!fullOriginalImage) return;
  recordHistoryChange();
  originalImage = fullOriginalImage;
  rebuildPreviewImage();
  cropRectNorm = null;
  manualEraseStrokes = [];
  stopCropMode();
  pendingFit = true;
  resetPan();
  processImage();
  lastHistoryState = getAppState();
  uiHook('onImageChanged');
}

function makeShirtReady() {
  recordHistoryChange();
  transparentInput.checked = true;
  edgeFadeModeInput.value = 'torn';
  edgeFadeWidthInput.value = 28;
  edgeFadeStrengthInput.value = 76;
  edgeFadeNoiseInput.value = 58;
  dustAmountInput.value = Math.max(Number(dustAmountInput.value), 8);
  grainAmountInput.value = Math.max(Number(grainAmountInput.value), 10);
  removeSpecklesInput.value = Math.max(Number(removeSpecklesInput.value), 18);
  fillHolesInput.value = Math.max(Number(fillHolesInput.value), 12);
  exportModeInput.value = 'custom';
  customExportWidthInput.value = 4096;
  updateValues();
  processImage();
  updateExportUI();
  recordHistoryChange();
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

function getExportSize() {
  if (!processedCanvas.width || !processedCanvas.height) return { width: 0, height: 0 };
  const mode = exportModeInput.value;
  let width = processedCanvas.width;
  let height = processedCanvas.height;
  if (mode === '2x') { width = processedCanvas.width * 2; height = processedCanvas.height * 2; }
  if (mode === '4x') { width = processedCanvas.width * 4; height = processedCanvas.height * 4; }
  if (mode === 'original' && originalImage) { width = originalImage.width; height = originalImage.height; }
  if (mode === 'custom') { width = Number(customExportWidthInput.value); height = Math.round(width * processedCanvas.height / processedCanvas.width); }
  return { width: Math.max(1, Math.round(width)), height: Math.max(1, Math.round(height)) };
}

function createExportSource(width, height) {
  return createScaledSourceFromImage(originalImage, width, height);
}

function createScaledSourceFromImage(image, width, height) {
  if (width === image.width && height === image.height) return image;
  const sourceCanvas = document.createElement('canvas');
  sourceCanvas.width = width;
  sourceCanvas.height = height;
  const sourceCtx = sourceCanvas.getContext('2d');
  sourceCtx.imageSmoothingEnabled = true;
  sourceCtx.imageSmoothingQuality = 'high';
  sourceCtx.drawImage(image, 0, 0, width, height);
  return sourceCanvas;
}

function renderProcessedForExport(width, height) {
  const settings = getRenderSettings();
  return renderProcessedFromImageForExport(originalImage, width, height, settings);
}

function renderProcessedFromImageForExport(image, width, height, settings) {
  const exportSettings = {
    ...settings,
    cleanup: { ...(settings.cleanup || {}) }
  };
  if (exportSettings.graphicMode === 'simpleBW') normalizeSimpleBlackWhiteSettings(exportSettings);
  const sourceImage = createScaledSourceFromImage(image, width, height);
  const exportProcessedCanvas = document.createElement('canvas');
  const exportProcessedCtx = exportProcessedCanvas.getContext('2d', { willReadFrequently: true });
  if (exportSettings.graphicMode === 'pixelBitmap') return processPixelBitmapClassic(exportSettings, sourceImage, exportProcessedCanvas, exportProcessedCtx, false);
  return processFullDetailGraphic(exportSettings, sourceImage, exportProcessedCanvas, exportProcessedCtx, false);
}

function getExportSizeForImage(image) {
  const mode = exportModeInput.value;
  let width = image.width;
  let height = image.height;
  if (mode === '2x') { width = image.width * 2; height = image.height * 2; }
  if (mode === '4x') { width = image.width * 4; height = image.height * 4; }
  if (mode === 'custom') { width = Number(customExportWidthInput.value); height = Math.round(width * image.height / image.width); }
  return { width: Math.max(1, Math.round(width)), height: Math.max(1, Math.round(height)) };
}

function getExportBaseName(fallback = 'levis-bitmap-bananza') {
  const raw = exportNameInput && exportNameInput.value ? exportNameInput.value : fallback;
  return sanitizeFileName(raw) || fallback;
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

function loadImageElementFromFile(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Image load failed'));
    };
    img.src = url;
  });
}

function buildPrintReportText(size, stats = analyzeProcessedCanvas(size)) {
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
    `Transparent White: ${transparentInput.checked ? 'yes' : 'no'}`,
    `Mode: ${graphicModeInput.value}`,
    `Threshold: ${thresholdInput.value}`,
    `Halftone: ${halftoneModeInput.value}`,
    '',
    'Settings:',
    JSON.stringify(getAppState(), null, 2)
  ].join('\n');
}

function analyzeProcessedCanvas(size) {
  if (!processedCanvas.width || !processedCanvas.height) return null;
  const sampleMax = 240;
  const scale = Math.min(1, sampleMax / Math.max(processedCanvas.width, processedCanvas.height));
  const sampleW = Math.max(1, Math.round(processedCanvas.width * scale));
  const sampleH = Math.max(1, Math.round(processedCanvas.height * scale));
  const sampleCanvas = document.createElement('canvas');
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

function generateSVGFromCanvas(sourceCanvas) {
  const maxSide = 1200;
  const scale = Math.min(1, maxSide / Math.max(sourceCanvas.width, sourceCanvas.height));
  const width = Math.max(1, Math.round(sourceCanvas.width * scale));
  const height = Math.max(1, Math.round(sourceCanvas.height * scale));
  const sampleCanvas = document.createElement('canvas');
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
  const bg = transparentInput.checked ? '' : `<rect width="${width}" height="${height}" fill="#fff"/>`;
  const note = rects.length >= maxRects ? '<!-- Simplified: max vector runs reached. -->' : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" shape-rendering="crispEdges">${bg}<g fill="#000">${rects.join('')}</g>${note}</svg>`;
}

function downloadSVG() {
  if (!processedCanvas.width) return;
  const svg = generateSVGFromCanvas(processedCanvas);
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const link = document.createElement('a');
  link.download = `${getExportBaseName()}-vector.svg`;
  link.href = URL.createObjectURL(blob);
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1500);
}

function checkMonochrome() {
  if (!processedCanvas.width) return false;
  const sampleW = Math.min(80, processedCanvas.width);
  const sampleH = Math.min(80, processedCanvas.height);
  const sampleCanvas = document.createElement('canvas');
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

function createExportCanvas(width, height, background = null, sourceCanvas = null) {
  const processedSource = sourceCanvas || renderProcessedForExport(width, height);
  const exportCanvas = document.createElement('canvas');
  const exportCtx = exportCanvas.getContext('2d');
  exportCanvas.width = width;
  exportCanvas.height = height;
  exportCtx.imageSmoothingEnabled = graphicModeInput.value !== 'pixelBitmap';
  exportCtx.clearRect(0, 0, width, height);
  if (background) {
    exportCtx.fillStyle = background;
    exportCtx.fillRect(0, 0, width, height);
  }
  exportCtx.drawImage(processedSource, 0, 0, width, height);
  return exportCanvas;
}

function canvasToBlob(canvasElement) {
  return new Promise((resolve) => canvasElement.toBlob((blob) => resolve(blob), 'image/png'));
}

function updateExportUI() {
  customExportGroup.style.display = exportModeInput.value === 'custom' ? 'block' : 'none';
  customExportWidthValue.textContent = customExportWidthInput.value;
  if (downloadSvgButton) downloadSvgButton.disabled = !originalImage;
  if (!originalImage || !processedCanvas.width || !processedCanvas.height) {
    exportSizeHint.textContent = 'Lade ein Bild, um die Exportgröße zu sehen.';
    updatePrintCheck(null);
    return;
  }
  const size = getExportSize();
  const transparencyStatus = transparentInput.checked ? 'transparenter Hintergrund' : 'weißer Hintergrund';
  exportSizeHint.textContent = `PNG mit ${size.width} × ${size.height} px, ${transparencyStatus}.`;
  updatePrintCheck(size);
}

function updatePrintCheck(size) {
  if (!printCheck) return;
  if (!size || !originalImage || !processedCanvas.width) {
    printCheck.innerHTML = '<div class="info-grid"><b>Druck-Check</b><span class="status-pill warn">Kein Bild</span></div>';
    return;
  }
  const cmW = size.width / 300 * 2.54;
  const cmH = size.height / 300 * 2.54;
  const isLargeEnough = size.width >= 3000 || size.height >= 3000;
  const transparency = transparentInput.checked;
  const monochrome = checkMonochrome();
  const stats = analyzeProcessedCanvas(size);
  const inkCoverage = stats ? Math.round(stats.inkCoverage * 100) : 0;
  const minClusterMm = stats ? stats.minClusterMm : 0;
  const halftoneDotMm = halftoneModeInput.value !== 'off' ? Number(halftoneSizeInput.value) / 300 * 25.4 : 0;
  const warnings = [];
  if (!isLargeEnough) warnings.push('Unter 3000 px: Für große Shirt-Prints lieber 3000 oder 4096 px exportieren.');
  if (!transparency) warnings.push('Weiß transparent ist aus: Für schwarze Shirts meistens aktivieren.');
  if (Number(halftoneSizeInput.value) <= 5 && halftoneModeInput.value !== 'off') warnings.push('Sehr feines Raster: Kann im Siebdruck zulaufen.');
  if (Number(grainAmountInput.value) > 65 || Number(dustAmountInput.value) > 70) warnings.push('Sehr viel Körnung oder Staub: vor dem Druck einmal groß prüfen.');
  if (stats && stats.edgeHasInk) warnings.push('Motiv berührt die Exportkante: für Shirts lieber etwas Rand lassen oder zuschneiden.');
  if (minClusterMm > 0 && minClusterMm < 0.22) warnings.push('Sehr kleine schwarze Inseln: können im Druck verloren gehen.');
  if (halftoneDotMm > 0 && halftoneDotMm < 0.25) warnings.push('Halftone-Punkte unter ca. 0.25 mm: Druckbarkeit testen.');
  if (inkCoverage > 72) warnings.push('Hohe Flächendeckung: kann auf dem Shirt schwer wirken.');
  printCheck.innerHTML = `
    <div class="info-grid">
      <b>Auflösung</b><span class="status-pill ${isLargeEnough ? 'good' : 'warn'}">${size.width} x ${size.height}</span>
      <b>Druckgröße bei 300 DPI</b><span>${cmW.toFixed(1)} x ${cmH.toFixed(1)} cm</span>
      <b>Transparenz</b><span class="status-pill ${transparency ? 'good' : 'warn'}">${transparency ? 'Ja' : 'Nein'}</span>
      <b>Nur Schwarz/Weiß</b><span class="status-pill ${monochrome ? 'good' : 'warn'}">${monochrome ? 'Ja' : 'Prüfen'}</span>
      <b>Farbdeckung</b><span class="status-pill ${inkCoverage <= 72 ? 'good' : 'warn'}">${inkCoverage}%</span>
      <b>Kleinste Insel</b><span class="status-pill ${!minClusterMm || minClusterMm >= 0.22 ? 'good' : 'warn'}">${minClusterMm ? minClusterMm.toFixed(2) + ' mm' : 'n/a'}</span>
      <b>Kante</b><span class="status-pill ${stats && stats.edgeHasInk ? 'warn' : 'good'}">${stats && stats.edgeHasInk ? 'Kontakt' : 'frei'}</span>
    </div>
    ${warnings.length ? `<ul class="warning-list">${warnings.map((item) => `<li>${item}</li>`).join('')}</ul>` : '<p class="hint print-ok">Sieht druckfertig aus.</p>'}
  `;
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

function createVariantDefinitions() {
  const base = getCurrentPresetData();
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
  return variants.slice(0, Number(variantCountInput.value || 4));
}

function createVariantSource() {
  const maxSide = 520;
  const source = previewImage || originalImage;
  const scale = Math.min(1, maxSide / Math.max(source.width, source.height));
  return createScaledSourceFromImage(source, Math.max(1, Math.round(source.width * scale)), Math.max(1, Math.round(source.height * scale)));
}

function renderVariantCanvas(preset, source) {
  const settings = getRenderSettingsFromPresetData(preset);
  const out = document.createElement('canvas');
  const outCtx = out.getContext('2d', { willReadFrequently: true });
  processFullDetailGraphic(settings, source, out, outCtx, false);
  return out;
}

function generateVariantComparison() {
  if (!originalImage || !variantGrid) return;
  const variants = createVariantDefinitions();
  const source = createVariantSource();
  variantGrid.innerHTML = '';
  if (variantStatus) variantStatus.textContent = `${variants.length} Varianten werden gerendert …`;
  requestAnimationFrame(() => {
    let first = true;
    // capture baseline for comparison
    const baselineCanvas = document.createElement('canvas');
    baselineCanvas.width = processedCanvas.width || (previewImage ? previewImage.width : 1);
    baselineCanvas.height = processedCanvas.height || (previewImage ? previewImage.height : 1);
    const baselineCtx = baselineCanvas.getContext('2d');
    if (processedCanvas.width) baselineCtx.drawImage(processedCanvas, 0, 0);
    else if (originalImage) baselineCtx.drawImage(originalImage, 0, 0, baselineCanvas.width, baselineCanvas.height);

    variants.forEach((variant) => {
      const rendered = renderVariantCanvas(variant.preset, source);
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'variant-card';
      card.title = `${variant.name} vergleichen`;
      const thumb = document.createElement('canvas');
      thumb.width = rendered.width;
      thumb.height = rendered.height;
      const thumbCtx = thumb.getContext('2d');
      thumbCtx.drawImage(rendered, 0, 0);
      const label = document.createElement('span');
      label.textContent = variant.name;
      card.appendChild(thumb);
      card.appendChild(label);
      card.addEventListener('click', () => {
        showABComparison(baselineCanvas, rendered, variant.name, variant.preset);
      });
      variantGrid.appendChild(card);
      // auto-open first variant comparison
      if (first) {
        first = false;
        showABComparison(baselineCanvas, rendered, variant.name, variant.preset);
      }
    });
    if (variantStatus) variantStatus.textContent = 'Klick eine Variante, um sie mit dem aktuellen Stand zu vergleichen.';
  });
}

// --- A/B Compare helpers ---
const abCompare = document.getElementById('abCompare');
const abBaseCanvas = document.getElementById('abBaseCanvas');
const abTopCanvas = document.getElementById('abTopCanvas');
const abTopWrap = document.querySelector('.ab-top-canvas-wrap');
const abTitle = document.getElementById('abCompareTitle');
const abSlider = document.getElementById('abSlider');
const abApply = document.getElementById('abApply');
const abClose = document.getElementById('abClose');
let abSelectedPreset = null;

function showABComparison(baseCanvas, variantCanvas, name, presetData) {
  if (!abCompare) return;
  abCompare.classList.remove('is-hidden');
  abCompare.setAttribute('aria-hidden', 'false');
  abTitle.textContent = `Vergleich: ${name}`;
  // fit canvases to container size
  const wrap = document.querySelector('.ab-compare-canvas-wrap');
  const w = wrap.clientWidth;
  const h = wrap.clientHeight;
  // prepare base
  abBaseCanvas.width = baseCanvas.width;
  abBaseCanvas.height = baseCanvas.height;
  abBaseCanvas.style.width = `${w}px`;
  abBaseCanvas.style.height = `${h}px`;
  const bctx = abBaseCanvas.getContext('2d');
  bctx.clearRect(0,0,abBaseCanvas.width,abBaseCanvas.height);
  bctx.drawImage(baseCanvas, 0, 0, abBaseCanvas.width, abBaseCanvas.height);
  // prepare top
  abTopCanvas.width = variantCanvas.width;
  abTopCanvas.height = variantCanvas.height;
  abTopCanvas.style.width = `${w}px`;
  abTopCanvas.style.height = `${h}px`;
  const tctx = abTopCanvas.getContext('2d');
  tctx.clearRect(0,0,abTopCanvas.width,abTopCanvas.height);
  tctx.drawImage(variantCanvas, 0, 0, abTopCanvas.width, abTopCanvas.height);
  // save preset data for apply
  abSelectedPreset = presetData || null;
  // reset slider
  updateABSlider(Number(abSlider.value));
}

function hideABComparison() {
  if (!abCompare) return;
  abCompare.classList.add('is-hidden');
  abCompare.setAttribute('aria-hidden', 'true');
  abSelectedPreset = null;
}

function updateABSlider(value) {
  if (!abTopWrap) return;
  const pct = clamp(Number(value) / 100, 0, 1);
  abTopWrap.style.width = `${Math.round(pct * 100)}%`;
}

abSlider.addEventListener('input', (e) => updateABSlider(e.target.value));
abClose.addEventListener('click', hideABComparison);
abApply.addEventListener('click', () => {
  if (!abSelectedPreset) return;
  recordHistoryChange();
  activePreset = null;
  setControlsFromPreset(abSelectedPreset);
  updatePresetButtons();
  updateValues();
  scheduleProcessImage();
  recordHistoryChange();
  hideABComparison();
});

function downloadPNG() {
  if (!originalImage || !processedCanvas.width) return;
  const size = getExportSize();
  const exportProcessed = renderProcessedForExport(size.width, size.height);
  const exportCanvas = createExportCanvas(size.width, size.height, null, exportProcessed);
  const fileName = `${getExportBaseName()}-export.png`;
  canvasToBlob(exportCanvas).then((blob) => {
    const link = document.createElement('a');
    link.download = fileName;
    link.href = URL.createObjectURL(blob);
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1500);
    notify(`${fileName} exportiert (${size.width} × ${size.height} px).`);
  });
}

async function downloadExportPack() {
  if (!originalImage || !processedCanvas.width) return;
  if (typeof JSZip === 'undefined') {
    notify('ZIP-Export ist gerade nicht verfügbar. Es wird stattdessen ein PNG exportiert.');
    downloadPNG();
    return;
  }
  const size = getExportSize();
  const baseName = getExportBaseName();
  const zip = new JSZip();
  const exportProcessed = renderProcessedForExport(size.width, size.height);
  const transparentCanvas = createExportCanvas(size.width, size.height, null, exportProcessed);
  const blackBgCanvas = createExportCanvas(size.width, size.height, '#000000', exportProcessed);
  const whiteBgCanvas = createExportCanvas(size.width, size.height, '#ffffff', exportProcessed);
  zip.file(`${baseName}-transparent.png`, await canvasToBlob(transparentCanvas));
  zip.file(`${baseName}-black-bg.png`, await canvasToBlob(blackBgCanvas));
  zip.file(`${baseName}-white-bg.png`, await canvasToBlob(whiteBgCanvas));
  zip.file(`${baseName}-print-report.txt`, buildPrintReportText(size));
  zip.file(`${baseName}-settings.json`, JSON.stringify({
    app: "Levi's Bitmap Bananza",
    version: '4.1',
    exportSize: size,
    settings: getAppState(),
    cropActive: Boolean(cropRectNorm),
    manualEraseStrokes: manualEraseStrokes.length
  }, null, 2));
  const blob = await zip.generateAsync({ type: 'blob' });
  const link = document.createElement('a');
  link.download = `${baseName}-export-pack.zip`;
  link.href = URL.createObjectURL(blob);
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1500);
}

async function downloadBatchExport() {
  if (!batchFiles.length) return;
  if (typeof JSZip === 'undefined') {
    notify('ZIP-Export ist gerade nicht verfügbar. Exportiere die Bilder einzeln als PNG.');
    return;
  }
  const baseName = getExportBaseName();
  const settings = getRenderSettings();
  const zip = new JSZip();
  exportBatchButton.disabled = true;
  const oldText = exportBatchButton.textContent;
  const savedManualEraseStrokes = manualEraseStrokes;
  try {
    manualEraseStrokes = [];
    for (let i = 0; i < batchFiles.length; i++) {
      const file = batchFiles[i];
      exportBatchButton.textContent = `Batch ${i + 1}/${batchFiles.length}`;
      const img = await loadImageElementFromFile(file);
      const size = getExportSizeForImage(img);
      const rendered = renderProcessedFromImageForExport(img, size.width, size.height, settings);
      const exportCanvas = createExportCanvas(size.width, size.height, null, rendered);
      const fileBase = sanitizeFileName(file.name.replace(/\.[^.]+$/, '')) || `image-${i + 1}`;
      zip.file(`${baseName}-${String(i + 1).padStart(2, '0')}-${fileBase}.png`, await canvasToBlob(exportCanvas));
    }
    zip.file(`${baseName}-batch-print-report.txt`, buildPrintReportText(getExportSize()));
    zip.file(`${baseName}-batch-settings.json`, JSON.stringify({
      app: "Levi's Bitmap Bananza",
      version: '4.1',
      settings: getAppState(),
      files: batchFiles.map((file) => file.name)
    }, null, 2));
    const blob = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.download = `${baseName}-batch-export.zip`;
    link.href = URL.createObjectURL(blob);
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1500);
  } finally {
    manualEraseStrokes = savedManualEraseStrokes;
    exportBatchButton.textContent = oldText;
    updateBatchUI();
  }
}

function updateNavigator() {
  if (!processedCanvas.width || !processedCanvas.height || canvas.hidden) return;
  const w = navigatorCanvas.width;
  const h = navigatorCanvas.height;
  navigatorCtx.clearRect(0, 0, w, h);
  navigatorCtx.fillStyle = '#fff';
  navigatorCtx.fillRect(0, 0, w, h);

  const imageRatio = processedCanvas.width / processedCanvas.height;
  const navRatio = w / h;
  let drawW = w;
  let drawH = h;
  let drawX = 0;
  let drawY = 0;
  if (imageRatio > navRatio) {
    drawH = w / imageRatio;
    drawY = (h - drawH) / 2;
  } else {
    drawW = h * imageRatio;
    drawX = (w - drawW) / 2;
  }

  navigatorCtx.imageSmoothingEnabled = graphicModeInput.value !== 'pixelBitmap';
  navigatorCtx.drawImage(processedCanvas, drawX, drawY, drawW, drawH);

  const stageRect = stage.getBoundingClientRect();
  const canvasRect = canvas.getBoundingClientRect();
  if (canvasRect.width <= 0 || canvasRect.height <= 0) return;

  const x1 = clamp((stageRect.left - canvasRect.left) / canvasRect.width, 0, 1);
  const y1 = clamp((stageRect.top - canvasRect.top) / canvasRect.height, 0, 1);
  const x2 = clamp((stageRect.right - canvasRect.left) / canvasRect.width, 0, 1);
  const y2 = clamp((stageRect.bottom - canvasRect.top) / canvasRect.height, 0, 1);

  navigatorCtx.strokeStyle = '#1f7fa8';
  navigatorCtx.lineWidth = 2;
  navigatorCtx.strokeRect(drawX + x1 * drawW, drawY + y1 * drawH, Math.max(4, (x2 - x1) * drawW), Math.max(4, (y2 - y1) * drawH));
}
