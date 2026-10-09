import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { renderGraphic } from '../engine';
import { analyzeImage, scaleForPreview, scaledCopy, type Suggestion } from '../lib/suggest';
import { useStudio } from '../state/store';
import { cx } from './ui';

const CARD = 560;
const SHOWN = 4;

/** Analyses every newly loaded (or cropped) image in the background. */
function useImageAnalysis() {
  const working = useStudio((s) => s.image?.working);
  useEffect(() => {
    const { preview, image } = useStudio.getState();
    if (!working || !preview || !image) return;
    let cancelled = false;
    analyzeImage(preview, { width: image.full.width, height: image.full.height }, () => cancelled)
      .then((analysis) => {
        if (cancelled || !analysis) return;
        const store = useStudio.getState();
        store.set({ analysis });
        // A look picked for the previous image stays, but in the version tuned to this one.
        if (store.activeLook) store.applyLook(store.activeLook);
      })
      .catch((error) => console.warn('Image analysis failed', error));
    return () => {
      cancelled = true;
    };
  }, [working]);
}

function Card({ suggestion, best, onPick }: { suggestion: Suggestion; best: boolean; onPick: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const preview = useStudio((s) => s.preview);
  const active = useStudio((s) => s.activeLook === suggestion.id);

  useEffect(() => {
    if (!preview) return;
    // Let the dialog animate in before the heavier renders start.
    const timer = window.setTimeout(() => {
      const target = ref.current;
      if (!target) return;
      try {
        const source = scaledCopy(preview, CARD);
        const out = renderGraphic(scaleForPreview(suggestion.controls, source.width / preview.width), source);
        target.width = out.width;
        target.height = out.height;
        const g = target.getContext('2d')!;
        g.fillStyle = '#fff';
        g.fillRect(0, 0, out.width, out.height);
        g.drawImage(out, 0, 0);
        setReady(true);
      } catch (error) {
        console.warn('Suggestion preview failed', suggestion.id, error);
      }
    }, 60);
    return () => window.clearTimeout(timer);
  }, [preview, suggestion]);

  return (
    <button
      type="button"
      onClick={onPick}
      aria-pressed={active}
      className="group grid content-start gap-1 rounded-lg p-1.5 text-left hover:bg-panel focus-visible:bg-panel"
    >
      <span className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-md border border-hair bg-paper transition-colors group-hover:border-ink">
        <canvas ref={ref} className={cx('max-h-full max-w-full transition-opacity duration-300', ready ? 'opacity-100' : 'opacity-0')} />
        {!ready && <span className="absolute inset-0 animate-pulse bg-panel-deep" />}
        {best && (
          <span className="absolute top-1.5 left-1.5 rounded-full bg-ink px-2 py-0.5 text-[11px] font-semibold text-paper ring-1 ring-paper">
            Passt am besten
          </span>
        )}
      </span>
      <span className="mt-1 text-[14px] leading-tight font-bold">{suggestion.name}</span>
      <span className="text-[12px] leading-snug text-muted">{suggestion.reason}</span>
    </button>
  );
}

/** Shown right after an image is loaded: a few looks that suit it, previewed on the image itself. */
export function SuggestionsDialog() {
  useImageAnalysis();
  const open = useStudio((s) => s.suggestOpen && Boolean(s.image));
  const analysis = useStudio((s) => s.analysis);
  const original = useStudio((s) => s.preview);
  const applyLook = useStudio((s) => s.applyLook);
  const set = useStudio((s) => s.set);
  const close = () => set({ suggestOpen: false });
  const scanRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') set({ suggestOpen: false });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, set]);

  // While analysing, show the photo itself under a moving scan line.
  useEffect(() => {
    const target = scanRef.current;
    if (!open || analysis || !original || !target) return;
    const copy = scaledCopy(original, 360);
    target.width = copy.width;
    target.height = copy.height;
    target.getContext('2d')!.drawImage(copy, 0, 0);
  }, [open, analysis, original]);

  const picks = analysis?.ranked.slice(0, SHOWN) ?? [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(20,32,27,.6)] p-4 max-[640px]:items-stretch max-[640px]:p-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onPointerDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="suggest-title"
            initial={{ y: 12, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            className="flex max-h-[calc(100dvh-32px)] w-[min(980px,100%)] flex-col rounded-xl border border-ink bg-paper max-[640px]:max-h-none max-[640px]:rounded-none max-[640px]:border-0"
          >
            <div className="flex items-start justify-between gap-3 px-4.5 pt-4 pb-2">
              <div className="grid gap-1.5">
                <h2 id="suggest-title" className="text-[20px] leading-tight font-extrabold font-compact">
                  {analysis ? 'Diese Looks passen zu deinem Bild' : 'Dein Bild wird analysiert …'}
                </h2>
                <div className="flex min-h-6 flex-wrap gap-1.5" aria-live="polite">
                  {analysis ? (
                    analysis.traits.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-hair bg-panel px-2 py-0.5 text-[11.5px] font-semibold">
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-[12.5px] text-muted">Helligkeit, Kontrast und Details werden geprüft.</span>
                  )}
                </div>
                {picks.some((s) => s.tuned) && (
                  <p className="text-[12px] text-muted">Helligkeit und Schwarzanteil sind schon an dein Bild angepasst.</p>
                )}
              </div>
              <button
                type="button"
                autoFocus
                onClick={close}
                aria-label="Schließen"
                className="grid size-8 shrink-0 place-items-center rounded-md hover:bg-panel"
              >
                <X size={17} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-2">
              {analysis ? (
                <div className="grid grid-cols-4 gap-1.5 max-[820px]:grid-cols-2">
                  {picks.map((s, i) => (
                    <Card
                      key={s.id}
                      suggestion={s}
                      best={i === 0}
                      onPick={() => {
                        applyLook(s.id);
                        close();
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid place-items-center py-8">
                  <div className="relative overflow-hidden rounded-md border border-hair">
                    <canvas ref={scanRef} className="block max-h-[46vh] max-w-full opacity-80 grayscale" />
                    <motion.span
                      aria-hidden
                      className="absolute inset-x-0 h-0.5 bg-npb shadow-[0_0_12px_2px_var(--color-npb)]"
                      initial={{ top: '0%' }}
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-hair px-4.5 py-3">
              <span className="text-[12px] text-muted">Alle Looks findest du weiterhin in der Looks-Leiste.</span>
              <button
                type="button"
                onClick={close}
                className="h-9 rounded-md border border-hair bg-paper px-3.5 text-[13px] font-semibold hover:border-ink"
              >
                Selbst einstellen
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
