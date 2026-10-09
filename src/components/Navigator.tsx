import { useEffect, useRef } from 'react';
import { clamp } from '../engine';
import { processed, useStudio } from '../state/store';

const W = 156;
const H = 100;

/** Overview with the visible area in non-photo blue; drag it to pan. */
export function Navigator() {
  const ref = useRef<HTMLCanvasElement>(null);
  const renderVersion = useStudio((s) => s.renderVersion);
  const zoom = useStudio((s) => s.zoom);
  const panX = useStudio((s) => s.panX);
  const panY = useStudio((s) => s.panY);
  const tool = useStudio((s) => s.tool);

  const layout = () => {
    const src = processed.canvas!;
    const ratio = src.width / src.height;
    let w = W,
      h = H,
      x = 0,
      y = 0;
    if (ratio > W / H) {
      h = W / ratio;
      y = (H - h) / 2;
    } else {
      w = H * ratio;
      x = (W - w) / 2;
    }
    return { x, y, w, h };
  };

  useEffect(() => {
    const canvas = ref.current;
    const src = processed.canvas;
    const stage = document.getElementById('stage');
    const display = document.getElementById('display-canvas');
    if (!canvas || !src || !stage || !display) return;
    const g = canvas.getContext('2d')!;
    g.fillStyle = '#fff';
    g.fillRect(0, 0, W, H);
    const { x, y, w, h } = layout();
    g.drawImage(src, x, y, w, h);
    const s = stage.getBoundingClientRect();
    const d = display.getBoundingClientRect();
    if (!d.width || !d.height) return;
    const x1 = clamp((s.left - d.left) / d.width, 0, 1);
    const y1 = clamp((s.top - d.top) / d.height, 0, 1);
    const x2 = clamp((s.right - d.left) / d.width, 0, 1);
    const y2 = clamp((s.bottom - d.top) / d.height, 0, 1);
    g.strokeStyle = '#1f7fa8';
    g.lineWidth = 2;
    g.strokeRect(x + x1 * w, y + y1 * h, Math.max(4, (x2 - x1) * w), Math.max(4, (y2 - y1) * h));
  }, [renderVersion, zoom, panX, panY]);

  const panTo = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const src = processed.canvas;
    if (!src) return;
    const r = e.currentTarget.getBoundingClientRect();
    const { x, y, w, h } = layout();
    const nx = clamp((e.clientX - r.left - x) / w, 0, 1);
    const ny = clamp((e.clientY - r.top - y) / h, 0, 1);
    const s = useStudio.getState();
    const scale = s.zoom / 100;
    s.setView({ panX: -(nx - 0.5) * src.width * scale, panY: -(ny - 0.5) * src.height * scale });
  };

  if (tool === 'crop') return null;
  return (
    <div data-no-pan className="absolute top-3.5 right-3.5 z-[5] w-[170px] rounded-lg border border-ink bg-paper p-1.5 max-[1180px]:hidden">
      <div className="mx-0.5 mb-1 flex justify-between text-[11px] font-semibold text-muted tabular">
        <span>Übersicht</span>
        <span>{Math.round(zoom)}%</span>
      </div>
      <canvas
        ref={ref}
        width={W}
        height={H}
        className="block h-[100px] w-[156px] cursor-pointer rounded-[3px]"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          panTo(e);
        }}
        onPointerMove={(e) => {
          if (e.buttons) panTo(e);
        }}
      />
    </div>
  );
}
