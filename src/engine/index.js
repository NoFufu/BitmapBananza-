// Public API of the image engine. Everything here works on plain "controls"
// objects (the same shape the original app stored in looks and settings.json).
import {
  createCanvas,
  presets,
  getRenderSettingsFromPresetData,
  processFullDetailGraphic,
  processPixelBitmapClassic,
  createScaledSourceFromImage,
  analyzeProcessedCanvas,
  checkMonochrome,
  generateSVGFromCanvas,
  buildPrintReportText,
  createVariantDefinitions,
  sanitizeFileName,
  clamp
} from './core.js';

export {
  createCanvas,
  presets,
  createScaledSourceFromImage,
  analyzeProcessedCanvas,
  checkMonochrome,
  generateSVGFromCanvas,
  buildPrintReportText,
  createVariantDefinitions,
  sanitizeFileName,
  clamp
};

/** Render a controls object onto a new canvas. `strokes` are normalized eraser dabs. */
export function renderGraphic(controls, source, strokes = []) {
  const settings = getRenderSettingsFromPresetData(controls);
  const out = createCanvas();
  const ctx = out.getContext('2d', { willReadFrequently: true });
  if (settings.graphicMode === 'pixelBitmap') return processPixelBitmapClassic(settings, source, out, ctx, strokes);
  return processFullDetailGraphic(settings, source, out, ctx, strokes);
}

/** Same as the original export path: scale the source first, then render at that size. */
export function renderAtSize(controls, image, width, height, strokes = []) {
  const source = createScaledSourceFromImage(image, width, height);
  return renderGraphic(controls, source, strokes);
}

/** Paint eraser dabs onto an already rendered canvas (live feedback while brushing). */
export function eraseOnCanvas(canvas, strokes, makeTransparent) {
  if (!strokes.length) return;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = image.data;
  for (const stroke of strokes) {
    const cx = stroke.x * canvas.width;
    const cy = stroke.y * canvas.height;
    const radius = Math.max(2, stroke.r * Math.max(canvas.width, canvas.height));
    const r2 = radius * radius;
    const minX = Math.max(0, Math.floor(cx - radius));
    const maxX = Math.min(canvas.width - 1, Math.ceil(cx + radius));
    const minY = Math.max(0, Math.floor(cy - radius));
    const maxY = Math.min(canvas.height - 1, Math.ceil(cy + radius));
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const dx = x - cx;
        const dy = y - cy;
        if (dx * dx + dy * dy > r2) continue;
        const i = (y * canvas.width + x) * 4;
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
        data[i + 3] = makeTransparent ? 0 : 255;
      }
    }
  }
  ctx.putImageData(image, 0, 0);
}
