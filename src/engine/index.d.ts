export type Controls = Record<string, string | number | boolean>;
export interface Stroke {
  x: number;
  y: number;
  r: number;
}
export type AnyCanvas = HTMLCanvasElement | OffscreenCanvas;
export type CanvasSource = CanvasImageSource & { width: number; height: number };
export interface PrintStats {
  inkCoverage: number;
  transparentCoverage: number;
  edgeHasInk: boolean;
  minClusterPx: number;
  minClusterMm: number;
}
export interface VariantDefinition {
  name: string;
  preset: Controls;
}

export const presets: Record<string, Controls>;
export function createCanvas(width?: number, height?: number): HTMLCanvasElement;
export function renderGraphic(controls: Controls, source: CanvasSource, strokes?: Stroke[]): HTMLCanvasElement;
export function renderAtSize(controls: Controls, image: CanvasSource, width: number, height: number, strokes?: Stroke[]): HTMLCanvasElement;
export function eraseOnCanvas(canvas: HTMLCanvasElement, strokes: Stroke[], makeTransparent: boolean): void;
export function createScaledSourceFromImage(image: CanvasSource, width: number, height: number): CanvasSource;
export function analyzeProcessedCanvas(canvas: HTMLCanvasElement, size: { width: number; height: number }): PrintStats | null;
export function checkMonochrome(canvas: HTMLCanvasElement): boolean;
export function generateSVGFromCanvas(canvas: HTMLCanvasElement, transparent: boolean): string;
export function buildPrintReportText(
  size: { width: number; height: number },
  stats: PrintStats | null,
  controls: Controls,
  appState: unknown
): string;
export function createVariantDefinitions(controls: Controls, count: number): VariantDefinition[];
export function sanitizeFileName(value: string): string;
export function clamp(value: number, min: number, max: number): number;
