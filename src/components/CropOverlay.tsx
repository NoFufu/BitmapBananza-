import { useEffect, useRef } from 'react';
import { clamp } from '../engine';
import { processed, useStudio, type CropRect } from '../state/store';

export const CROP_ASPECTS: { value: string; label: string; ratio: number | null }[] = [
  { value: 'free', label: 'Frei', ratio: null },
  { value: '1:1', label: '1:1', ratio: 1 },
  { value: '4:5', label: '4:5', ratio: 4 / 5 },
  { value: '3:4', label: '3:4', ratio: 3 / 4 },
  { value: '2:3', label: '2:3', ratio: 2 / 3 }
];

const MIN = 0.02;

/** Fit a normalized rect to a pixel aspect ratio, keeping its centre, inside 0..1. */
function enforceAspect(rect: CropRect, ratio: number | null): CropRect {
  const canvas = processed.canvas;
  if (!ratio || !canvas) return rect;
  const imageRatio = canvas.width / canvas.height;
  let w = rect.w;
  let h = (w * imageRatio) / ratio;
  if (h > 1) {
    h = 1;
    w = (h * ratio) / imageRatio;
  }
  const cx = rect.x + rect.w / 2;
  const cy = rect.y + rect.h / 2;
  return { x: clamp(cx - w / 2, 0, 1 - w), y: clamp(cy - h / 2, 0, 1 - h), w, h };
}

type Drag =
  | { mode: 'move'; start: { x: number; y: number }; rect: CropRect }
  | { mode: 'resize'; anchor: { x: number; y: number } }
  | { mode: 'draw'; anchor: { x: number; y: number } };

export function CropOverlay() {
  const rect = useStudio((s) => s.cropRect);
  const aspect = useStudio((s) => s.cropAspect);
  const set = useStudio((s) => s.set);
  const layer = useRef<HTMLDivElement>(null);
  const drag = useRef<Drag | null>(null);
  const ratio = CROP_ASPECTS.find((a) => a.value === aspect)?.ratio ?? null;

  useEffect(() => {
    const current = useStudio.getState().cropRect;
    if (current) set({ cropRect: enforceAspect(current, ratio) });
  }, [ratio, set]);

  if (!rect) return null;

  const point = (e: React.PointerEvent) => {
    const r = layer.current!.getBoundingClientRect();
    return { x: clamp((e.clientX - r.left) / r.width, 0, 1), y: clamp((e.clientY - r.top) / r.height, 0, 1) };
  };

  const fromAnchor = (a: { x: number; y: number }, p: { x: number; y: number }): CropRect => {
    let w = Math.max(MIN, Math.abs(p.x - a.x));
    let h = Math.max(MIN, Math.abs(p.y - a.y));
    if (ratio && processed.canvas) {
      const imageRatio = processed.canvas.width / processed.canvas.height;
      h = (w * imageRatio) / ratio;
      const maxH = p.y < a.y ? a.y : 1 - a.y;
      if (h > maxH) {
        h = maxH;
        w = (h * ratio) / imageRatio;
      }
    }
    const x = p.x < a.x ? a.x - w : a.x;
    const y = p.y < a.y ? a.y - h : a.y;
    return { x: clamp(x, 0, 1 - w), y: clamp(y, 0, 1 - h), w: Math.min(w, 1), h: Math.min(h, 1) };
  };

  const onDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    layer.current!.setPointerCapture(e.pointerId);
    const p = point(e);
    const handle = (e.target as HTMLElement).dataset.handle;
    if (handle) {
      const anchor = { x: handle.includes('w') ? rect.x + rect.w : rect.x, y: handle.includes('n') ? rect.y + rect.h : rect.y };
      drag.current = { mode: 'resize', anchor };
    } else if (p.x >= rect.x && p.x <= rect.x + rect.w && p.y >= rect.y && p.y <= rect.y + rect.h) {
      drag.current = { mode: 'move', start: p, rect };
    } else {
      drag.current = { mode: 'draw', anchor: p };
    }
  };

  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const p = point(e);
    if (d.mode === 'move') {
      set({
        cropRect: {
          ...d.rect,
          x: clamp(d.rect.x + p.x - d.start.x, 0, 1 - d.rect.w),
          y: clamp(d.rect.y + p.y - d.start.y, 0, 1 - d.rect.h)
        }
      });
    } else {
      set({ cropRect: fromAnchor(d.anchor, p) });
    }
  };

  const handles = ['nw', 'ne', 'sw', 'se'];
  return (
    <div
      ref={layer}
      data-no-pan
      className="absolute inset-0 z-[8] cursor-crosshair touch-none"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={() => {
        drag.current = null;
      }}
      onPointerCancel={() => {
        drag.current = null;
      }}
    >
      <div
        className="absolute cursor-move border-2 border-npb shadow-[0_0_0_9999px_rgba(20,32,27,.55)]"
        style={{
          left: `${rect.x * 100}%`,
          top: `${rect.y * 100}%`,
          width: `${rect.w * 100}%`,
          height: `${rect.h * 100}%`,
          backgroundImage:
            'linear-gradient(90deg, transparent calc(33.33% - .5px), rgba(138,207,232,.7) calc(33.33% - .5px) calc(33.33% + .5px), transparent calc(33.33% + .5px) calc(66.66% - .5px), rgba(138,207,232,.7) calc(66.66% - .5px) calc(66.66% + .5px), transparent calc(66.66% + .5px)), linear-gradient(transparent calc(33.33% - .5px), rgba(138,207,232,.7) calc(33.33% - .5px) calc(33.33% + .5px), transparent calc(33.33% + .5px) calc(66.66% - .5px), rgba(138,207,232,.7) calc(66.66% - .5px) calc(66.66% + .5px), transparent calc(66.66% + .5px))'
        }}
      >
        {handles.map((h) => (
          <span
            key={h}
            data-handle={h}
            className="absolute size-3.5 border-2 border-npb-strong bg-paper"
            style={{
              left: h.includes('w') ? -8 : undefined,
              right: h.includes('e') ? -8 : undefined,
              top: h.includes('n') ? -8 : undefined,
              bottom: h.includes('s') ? -8 : undefined,
              cursor: h === 'nw' || h === 'se' ? 'nwse-resize' : 'nesw-resize'
            }}
          />
        ))}
      </div>
    </div>
  );
}
