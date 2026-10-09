import { create } from 'zustand';
import { presets, createScaledSourceFromImage, type CanvasSource, type Stroke } from '../engine';
import { DEFAULT_CONTROLS, controlsFromPreset, shirtReady, type ControlKey, type Controls, type SectionId } from '../lib/controls';

export type ViewMode = 'processed' | 'original' | 'split';
export type Tool = 'none' | 'crop' | 'eraser';
export type ExportMode = 'current' | '2x' | '4x' | 'original' | 'custom';
export type PreviewQuality = 'fast' | 'balanced' | 'exportNear';
export interface CropRect { x: number; y: number; w: number; h: number }

export interface LoadedImage {
  full: CanvasSource;
  working: CanvasSource;
  name: string;
}

const PREVIEW_MAX: Record<PreviewQuality, number> = { fast: 1100, balanced: 1800, exportNear: 2800 };
const HISTORY_LIMIT = 60;

/** The rendered preview lives outside React state: it is a large mutable canvas. */
export const processed: { canvas: HTMLCanvasElement | null } = { canvas: null };

function buildPreview(image: CanvasSource, quality: PreviewQuality): CanvasSource {
  const max = PREVIEW_MAX[quality];
  const side = Math.max(image.width, image.height);
  const scale = side > max ? max / side : 1;
  if (scale >= 1) return image;
  return createScaledSourceFromImage(image, Math.max(1, Math.round(image.width * scale)), Math.max(1, Math.round(image.height * scale)));
}

const sameControls = (a: Controls, b: Controls) => (Object.keys(a) as ControlKey[]).every((k) => a[k] === b[k]);

interface StudioState {
  controls: Controls;
  committed: Controls;
  past: Controls[];
  future: Controls[];
  activeLook: string | null;

  image: LoadedImage | null;
  preview: CanvasSource | null;
  previewId: number;
  strokes: Stroke[];
  strokesVersion: number;

  renderVersion: number;
  rendering: boolean;
  pendingFit: boolean;
  revealId: number;

  viewMode: ViewMode;
  split: number;
  maskPreview: boolean;
  zoom: number;
  panX: number;
  panY: number;
  fitRequest: number;

  tool: Tool;
  eraserSize: number;
  cropAspect: string;
  cropRect: CropRect | null;

  exportMode: ExportMode;
  customWidth: number;
  exportName: string;
  previewQuality: PreviewQuality;
  useWorker: boolean;
  batchFiles: File[];

  openSections: Record<string, boolean>;
  paletteOpen: boolean;
  shortcutsOpen: boolean;
  toast: { id: number; message: string } | null;

  setControl: <K extends ControlKey>(key: K, value: Controls[K]) => void;
  commit: () => void;
  setControls: (next: Controls, look?: string | null) => void;
  applyLook: (id: string) => void;
  applyShirtReady: () => void;
  resetControls: () => void;
  undo: () => void;
  redo: () => void;

  loadImage: (image: CanvasSource, name: string) => void;
  setWorking: (working: CanvasSource) => void;
  setPreviewQuality: (q: PreviewQuality) => void;
  addStroke: (stroke: Stroke) => void;
  clearStrokes: () => void;
  setRendered: (canvas: HTMLCanvasElement) => void;

  setView: (patch: Partial<Pick<StudioState, 'viewMode' | 'split' | 'maskPreview' | 'zoom' | 'panX' | 'panY'>>) => void;
  requestFit: () => void;
  setTool: (tool: Tool) => void;
  set: (patch: Partial<StudioState>) => void;
  toggleSection: (id: SectionId | string, open?: boolean) => void;
  notify: (message: string) => void;
}

export const useStudio = create<StudioState>((set, get) => ({
  controls: DEFAULT_CONTROLS,
  committed: DEFAULT_CONTROLS,
  past: [],
  future: [],
  activeLook: null,

  image: null,
  preview: null,
  previewId: 0,
  strokes: [],
  strokesVersion: 0,

  renderVersion: 0,
  rendering: false,
  pendingFit: false,
  revealId: 0,

  viewMode: 'processed',
  split: 0.5,
  maskPreview: false,
  zoom: 100,
  panX: 0,
  panY: 0,
  fitRequest: 0,

  tool: 'none',
  eraserSize: 34,
  cropAspect: 'free',
  cropRect: null,

  exportMode: 'current',
  customWidth: 3000,
  exportName: 'levis-bitmap-bananza',
  previewQuality: 'balanced',
  useWorker: true,
  batchFiles: [],

  openSections: { conversion: true, export: true },
  paletteOpen: false,
  shortcutsOpen: false,
  toast: null,

  // Live update while dragging; history is written by commit().
  setControl: (key, value) => set((s) => ({ controls: { ...s.controls, [key]: value }, activeLook: null })),

  commit: () => set((s) => {
    if (sameControls(s.controls, s.committed)) return {};
    return { past: [...s.past, s.committed].slice(-HISTORY_LIMIT), future: [], committed: s.controls };
  }),

  setControls: (next, look = null) => set((s) => {
    const base = sameControls(s.controls, s.committed) ? s.committed : s.controls;
    if (sameControls(next, base)) return { activeLook: look };
    return { controls: next, committed: next, past: [...s.past, base].slice(-HISTORY_LIMIT), future: [], activeLook: look };
  }),

  applyLook: (id) => {
    const preset = presets[id];
    if (!preset) return;
    get().setControls(controlsFromPreset(preset), id);
  },

  applyShirtReady: () => {
    get().setControls(shirtReady(get().controls));
    set({ exportMode: 'custom', customWidth: 4096 });
  },

  resetControls: () => {
    get().setControls(DEFAULT_CONTROLS);
    set({ strokes: [], strokesVersion: get().strokesVersion + 1, exportMode: 'current', customWidth: 3000, panX: 0, panY: 0 });
  },

  undo: () => {
    get().commit();
    const s = get();
    if (!s.past.length) return;
    const previous = s.past[s.past.length - 1];
    set({ past: s.past.slice(0, -1), future: [...s.future, s.controls], controls: previous, committed: previous, activeLook: null });
  },

  redo: () => {
    const s = get();
    if (!s.future.length) return;
    const next = s.future[s.future.length - 1];
    set({ future: s.future.slice(0, -1), past: [...s.past, s.controls], controls: next, committed: next, activeLook: null });
  },

  loadImage: (image, name) => {
    const quality = get().previewQuality;
    set((s) => ({
      image: { full: image, working: image, name },
      preview: buildPreview(image, quality),
      previewId: s.previewId + 1,
      strokes: [],
      strokesVersion: s.strokesVersion + 1,
      cropRect: null,
      tool: 'none',
      panX: 0,
      panY: 0,
      pendingFit: true,
      revealId: s.revealId + 1,
      past: [],
      future: [],
      committed: s.controls
    }));
  },

  setWorking: (working) => set((s) => {
    if (!s.image) return {};
    return {
      image: { ...s.image, working },
      preview: buildPreview(working, s.previewQuality),
      previewId: s.previewId + 1,
      strokes: [],
      strokesVersion: s.strokesVersion + 1,
      cropRect: null,
      tool: 'none',
      panX: 0,
      panY: 0,
      pendingFit: true
    };
  }),

  setPreviewQuality: (q) => set((s) => ({
    previewQuality: q,
    preview: s.image ? buildPreview(s.image.working, q) : null,
    previewId: s.previewId + 1,
    pendingFit: Boolean(s.image)
  })),

  // Strokes do not trigger a full re-render; the stage paints them directly.
  addStroke: (stroke) => set((s) => ({ strokes: [...s.strokes, stroke] })),
  clearStrokes: () => set((s) => ({ strokes: [], strokesVersion: s.strokesVersion + 1 })),

  setRendered: (canvas) => {
    processed.canvas = canvas;
    set((s) => ({ renderVersion: s.renderVersion + 1, rendering: false }));
  },

  setView: (patch) => set(patch),
  requestFit: () => set((s) => ({ fitRequest: s.fitRequest + 1 })),
  setTool: (tool) => set((s) => ({ tool, cropRect: tool === 'crop' ? (s.cropRect ?? { x: 0.1, y: 0.1, w: 0.8, h: 0.8 }) : s.cropRect })),
  set: (patch) => set(patch),
  toggleSection: (id, open) => set((s) => ({ openSections: { ...s.openSections, [id]: open ?? !s.openSections[id] } })),
  notify: (message) => set((s) => ({ toast: { id: (s.toast?.id ?? 0) + 1, message } }))
}));
