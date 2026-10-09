import {
  analyzeProcessedCanvas,
  buildPrintReportText,
  checkMonochrome,
  createCanvas,
  generateSVGFromCanvas,
  renderAtSize,
  sanitizeFileName,
  type CanvasSource
} from '../engine';
import { processed, useStudio, type ExportMode } from '../state/store';
import { canvasToBlob, downloadBlob, loadImageElement } from './files';
import type { Controls } from './controls';

export interface Size {
  width: number;
  height: number;
}

const APP = "Levi's Bitmap Bananza";

// JSZip is only needed for ZIP exports, so it loads on first use.
const loadZip = async () => new (await import('jszip')).default();
const VERSION = '5.0';

/** Same rules as the original getExportSize(). */
function exportSizeFor(base: Size, mode: ExportMode, customWidth: number, original?: Size): Size {
  let { width, height } = base;
  if (mode === '2x') {
    width = base.width * 2;
    height = base.height * 2;
  }
  if (mode === '4x') {
    width = base.width * 4;
    height = base.height * 4;
  }
  if (mode === 'original' && original) {
    width = original.width;
    height = original.height;
  }
  if (mode === 'custom') {
    width = customWidth;
    height = Math.round((customWidth * base.height) / base.width);
  }
  return { width: Math.max(1, Math.round(width)), height: Math.max(1, Math.round(height)) };
}

export function currentExportSize(): Size | null {
  const s = useStudio.getState();
  const canvas = processed.canvas;
  if (!s.image || !canvas) return null;
  return exportSizeFor(canvas, s.exportMode, s.customWidth, s.image.working);
}

function baseName() {
  return sanitizeFileName(useStudio.getState().exportName) || 'levis-bitmap-bananza';
}

function withBackground(source: HTMLCanvasElement, background: string | null, pixel: boolean) {
  const out = createCanvas(source.width, source.height);
  const ctx = out.getContext('2d')!;
  ctx.imageSmoothingEnabled = !pixel;
  if (background) {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, out.width, out.height);
  }
  ctx.drawImage(source, 0, 0, out.width, out.height);
  return out;
}

function appState() {
  const s = useStudio.getState();
  return { controls: s.controls, exportMode: s.exportMode, customWidth: s.customWidth, viewMode: s.viewMode };
}

function renderFullSize(size: Size) {
  const s = useStudio.getState();
  return renderAtSize(s.controls, s.image!.working, size.width, size.height, s.strokes);
}

export async function exportPNG() {
  const size = currentExportSize();
  if (!size) return;
  const s = useStudio.getState();
  const rendered = renderFullSize(size);
  const blob = await canvasToBlob(withBackground(rendered, null, s.controls.graphicMode === 'pixelBitmap'));
  const name = `${baseName()}-export.png`;
  downloadBlob(blob, name);
  s.notify(`${name} exportiert (${size.width} × ${size.height} px).`);
}

export async function exportPack() {
  const size = currentExportSize();
  if (!size) return;
  const s = useStudio.getState();
  const pixel = s.controls.graphicMode === 'pixelBitmap';
  const rendered = renderFullSize(size);
  const name = baseName();
  const zip = await loadZip();
  zip.file(`${name}-transparent.png`, await canvasToBlob(withBackground(rendered, null, pixel)));
  zip.file(`${name}-black-bg.png`, await canvasToBlob(withBackground(rendered, '#000000', pixel)));
  zip.file(`${name}-white-bg.png`, await canvasToBlob(withBackground(rendered, '#ffffff', pixel)));
  const stats = processed.canvas ? analyzeProcessedCanvas(processed.canvas, size) : null;
  zip.file(`${name}-print-report.txt`, buildPrintReportText(size, stats, s.controls, appState()));
  zip.file(
    `${name}-settings.json`,
    JSON.stringify(
      {
        app: APP,
        version: VERSION,
        exportSize: size,
        settings: appState(),
        cropActive: s.image!.working !== s.image!.full,
        manualEraseStrokes: s.strokes.length
      },
      null,
      2
    )
  );
  downloadBlob(await zip.generateAsync({ type: 'blob' }), `${name}-export-pack.zip`);
  s.notify('Export-Paket erstellt.');
}

export function exportSVG() {
  const s = useStudio.getState();
  if (!processed.canvas) return;
  const svg = generateSVGFromCanvas(processed.canvas, s.controls.transparent);
  downloadBlob(new Blob([svg], { type: 'image/svg+xml' }), `${baseName()}-vector.svg`);
  s.notify('SVG exportiert.');
}

/** Every queued file with the current look, without eraser strokes (they belong to one image). */
export async function exportBatch(onProgress: (done: number, total: number) => void) {
  const s = useStudio.getState();
  const files = s.batchFiles;
  if (!files.length) return;
  const name = baseName();
  const zip = await loadZip();
  for (let i = 0; i < files.length; i++) {
    onProgress(i, files.length);
    const img = await loadImageElement(files[i]);
    const size = exportSizeFor(img, s.exportMode === 'original' ? 'current' : s.exportMode, s.customWidth);
    const rendered = renderAtSize(s.controls, img as CanvasSource, size.width, size.height, []);
    const fileBase = sanitizeFileName(files[i].name.replace(/\.[^.]+$/, '')) || `image-${i + 1}`;
    zip.file(
      `${name}-${String(i + 1).padStart(2, '0')}-${fileBase}.png`,
      await canvasToBlob(withBackground(rendered, null, s.controls.graphicMode === 'pixelBitmap'))
    );
  }
  zip.file(
    `${name}-batch-settings.json`,
    JSON.stringify({ app: APP, version: VERSION, settings: appState(), files: files.map((f) => f.name) }, null, 2)
  );
  onProgress(files.length, files.length);
  downloadBlob(await zip.generateAsync({ type: 'blob' }), `${name}-batch-export.zip`);
  s.notify(`${files.length} Bilder als ZIP exportiert.`);
}

export interface PrintCheck {
  size: Size;
  cm: { w: number; h: number };
  largeEnough: boolean;
  transparent: boolean;
  monochrome: boolean;
  coverage: number;
  minClusterMm: number;
  edgeHasInk: boolean;
  warnings: string[];
}

export function computePrintCheck(controls: Controls, size: Size): PrintCheck | null {
  const canvas = processed.canvas;
  if (!canvas) return null;
  const stats = analyzeProcessedCanvas(canvas, size);
  const coverage = stats ? Math.round(stats.inkCoverage * 100) : 0;
  const minClusterMm = stats ? stats.minClusterMm : 0;
  const largeEnough = size.width >= 3000 || size.height >= 3000;
  const halftoneDotMm = controls.halftoneMode !== 'off' ? (controls.halftoneSize / 300) * 25.4 : 0;
  const warnings: string[] = [];
  if (!largeEnough) warnings.push('Unter 3000 px: Für große Shirt-Prints lieber 3000 oder 4096 px exportieren.');
  if (!controls.transparent) warnings.push('Weiß transparent ist aus: Für schwarze Shirts meistens aktivieren.');
  if (controls.halftoneSize <= 5 && controls.halftoneMode !== 'off') warnings.push('Sehr feines Raster: Kann im Siebdruck zulaufen.');
  if (controls.grainAmount > 65 || controls.dustAmount > 70)
    warnings.push('Sehr viel Körnung oder Staub: vor dem Druck einmal groß prüfen.');
  if (stats && stats.edgeHasInk) warnings.push('Motiv berührt die Exportkante: für Shirts lieber etwas Rand lassen oder zuschneiden.');
  if (minClusterMm > 0 && minClusterMm < 0.22) warnings.push('Sehr kleine schwarze Inseln: können im Druck verloren gehen.');
  if (halftoneDotMm > 0 && halftoneDotMm < 0.25) warnings.push('Halftone-Punkte unter ca. 0,25 mm: Druckbarkeit testen.');
  if (coverage > 72) warnings.push('Hohe Flächendeckung: kann auf dem Shirt schwer wirken.');
  return {
    size,
    cm: { w: (size.width / 300) * 2.54, h: (size.height / 300) * 2.54 },
    largeEnough,
    transparent: controls.transparent,
    monochrome: checkMonochrome(canvas),
    coverage,
    minClusterMm,
    edgeHasInk: Boolean(stats && stats.edgeHasInk),
    warnings
  };
}
