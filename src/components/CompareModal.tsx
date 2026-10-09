import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './ui';

/**
 * Before/after comparison in the spirit of Aceternity's "Compare": the divider
 * follows the pointer while hovering, and can be dragged or moved with arrow keys.
 */
export function CompareModal({ title, left, right, leftLabel, rightLabel, onClose, onApply }: {
  title: string;
  left: HTMLCanvasElement;
  right: HTMLCanvasElement;
  leftLabel: string;
  rightLabel: string;
  onClose: () => void;
  onApply: () => void;
}) {
  const leftRef = useRef<HTMLCanvasElement>(null);
  const rightRef = useRef<HTMLCanvasElement>(null);
  const [pos, setPos] = useState(0.5);

  useEffect(() => {
    const copy = (target: HTMLCanvasElement | null, src: HTMLCanvasElement) => {
      if (!target) return;
      target.width = src.width;
      target.height = src.height;
      target.getContext('2d')!.drawImage(src, 0, 0);
    };
    copy(leftRef.current, left);
    copy(rightRef.current, right);
  }, [left, right]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 0.02));
      if (e.key === 'ArrowRight') setPos((p) => Math.min(1, p + 0.02));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const follow = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPos(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)));
  };

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(20,32,27,.6)] p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onPointerDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ y: 12, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        className="flex w-[min(1100px,100%)] flex-col gap-2.5 rounded-xl border border-ink bg-paper p-3"
      >
        <div className="flex items-center justify-between gap-2.5 px-1">
          <strong className="text-[15px] font-extrabold font-compact">{title}</strong>
          <div className="flex gap-1.5">
            <Button variant="mini" className="!w-auto !border-ink !bg-ink !text-paper" onClick={onApply}>Variante übernehmen</Button>
            <Button variant="mini" className="!w-auto" onClick={onClose}>Schließen</Button>
          </div>
        </div>
        <div
          className="checker relative h-[min(560px,70vh)] cursor-ew-resize overflow-hidden rounded-md touch-none"
          onPointerMove={follow}
          onPointerDown={follow}
        >
          <canvas ref={rightRef} className="absolute inset-0 size-full object-contain" />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${(1 - pos) * 100}% 0 0)` }}>
            <canvas ref={leftRef} className="absolute inset-0 size-full object-contain" />
          </div>
          <span className="pointer-events-none absolute inset-y-0 w-0.5 bg-npb" style={{ left: `${pos * 100}%` }} />
          <span className="absolute bottom-2.5 left-2.5 rounded-full bg-paper px-2 py-0.5 text-[11.5px] font-semibold ring-1 ring-ink">{leftLabel}</span>
          <span className="absolute right-2.5 bottom-2.5 rounded-full bg-paper px-2 py-0.5 text-[11.5px] font-semibold ring-1 ring-ink">{rightLabel}</span>
        </div>
        <p className="px-1 text-[11.5px] text-muted">Maus über das Bild bewegen oder Pfeiltasten nutzen, um zu vergleichen.</p>
      </motion.div>
    </motion.div>,
    document.body
  );
}
