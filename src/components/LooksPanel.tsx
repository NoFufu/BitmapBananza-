import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { createCanvas, presets, renderGraphic, type CanvasSource } from '../engine';
import { LOOKS } from '../lib/controls';
import { useStudio } from '../state/store';

const W = 240;
const H = 180;

function coverSource(image: CanvasSource) {
  const c = createCanvas(W, H);
  const g = c.getContext('2d')!;
  const scale = Math.max(W / image.width, H / image.height);
  const w = image.width * scale;
  const h = image.height * scale;
  g.imageSmoothingQuality = 'high';
  g.drawImage(image, (W - w) / 2, (H - h) / 2, w, h);
  return c;
}

// Before any image: a small procedural portrait so the grid is not blank.
function placeholderSource() {
  const c = createCanvas(W, H);
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(90, 70, 10, 120, 90, 160);
  grad.addColorStop(0, '#eee');
  grad.addColorStop(0.55, '#777');
  grad.addColorStop(1, '#111');
  g.fillStyle = grad;
  g.fillRect(0, 0, W, H);
  g.fillStyle = '#222';
  g.beginPath(); g.ellipse(120, 96, 52, 64, 0, 0, Math.PI * 2); g.fill();
  g.fillStyle = '#ddd';
  g.beginPath(); g.ellipse(108, 80, 26, 30, 0, 0, Math.PI * 2); g.fill();
  return c;
}

export function LooksPanel() {
  const preview = useStudio((s) => s.preview);
  const activeLook = useStudio((s) => s.activeLook);
  const applyLook = useStudio((s) => s.applyLook);
  const canvases = useRef<(HTMLCanvasElement | null)[]>([]);

  useEffect(() => {
    let cancelled = false;
    const source = preview ? coverSource(preview) : placeholderSource();
    // Pixel size is relative to the preview; scale it so the thumbnail shows the same block density.
    const pixelScale = preview ? Math.max(W / preview.width, H / preview.height) : 1;
    let i = 0;
    const next = () => {
      if (cancelled || i >= LOOKS.length) return;
      const look = LOOKS[i];
      const target = canvases.current[i++];
      if (target) {
        try {
          const preset = { ...presets[look.id] };
          if (preset.graphicMode === 'pixelBitmap') preset.pixelSize = Math.max(3, Math.round(Number(preset.pixelSize) * pixelScale));
          const out = renderGraphic(preset, source);
          const g = target.getContext('2d')!;
          g.fillStyle = '#fff';
          g.fillRect(0, 0, W, H);
          g.imageSmoothingEnabled = preset.graphicMode !== 'pixelBitmap';
          g.drawImage(out, 0, 0, W, H);
        } catch (error) {
          console.warn('Look thumbnail failed', look.id, error);
        }
      }
      window.setTimeout(next, 16);
    };
    next();
    return () => { cancelled = true; };
  }, [preview]);

  return (
    <section aria-labelledby="looks-title" className="border-b border-hair px-4 pt-3.5 pb-4">
      <div className="mb-2.5 flex items-baseline justify-between gap-2">
        <h2 id="looks-title" className="text-[14px] font-extrabold font-semiwide">Looks</h2>
        <span className="text-[11.5px] text-muted">{preview ? 'Vorschau mit deinem Bild' : 'Ein Klick setzt alle Regler'}</span>
      </div>
      <div className="grid grid-cols-2 gap-x-2.5 gap-y-3 max-[900px]:grid-cols-4 max-[520px]:grid-cols-3">
        {LOOKS.map((look, i) => {
          const active = activeLook === look.id;
          return (
            <button
              key={look.id}
              type="button"
              aria-pressed={active}
              onClick={() => applyLook(look.id)}
              className="group grid gap-px text-left"
            >
              <span className="relative mb-1.5 block">
                <canvas
                  ref={(el) => { canvases.current[i] = el; }}
                  width={W}
                  height={H}
                  className="block aspect-[4/3] h-auto w-full border border-hair bg-paper transition-colors group-hover:border-ink"
                />
                {active && (
                  <motion.span
                    layoutId="look-active"
                    className="pointer-events-none absolute -inset-[3px] border-2 border-ink"
                    transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                  />
                )}
              </span>
              <span className="text-[12.5px] font-bold leading-tight">{look.name}</span>
              <span className="text-[11.5px] leading-tight text-muted max-[900px]:hidden">{look.purpose}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
