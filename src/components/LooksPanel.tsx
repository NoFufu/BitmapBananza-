import { motion } from 'motion/react';
import { Plus, Sparkles, X } from 'lucide-react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { createCanvas, presets, renderGraphic, type CanvasSource } from '../engine';
import { LOOKS, controlsFromPreset, type Controls } from '../lib/controls';
import { scaleForPreview } from '../lib/suggest';
import { SAMPLE_PHOTOS, loadPhoto } from '../lib/files';
import { useStudio } from '../state/store';
import { cx } from './ui';

const SIZE = 220;

// Before an image is loaded each look previews one of the sample photos.
const LOOK_PHOTO: Record<string, number> = {
  cleanPhoto: 0,
  hardPoster: 3,
  highDetailInk: 1,
  softNewspaper: 2,
  dirtyXerox: 0,
  shirtPrintGraphic: 1,
  logoCleanup: 3,
  pixelClassic: 2
};

/** Square crop, biased slightly upwards because portraits keep faces above centre. */
function squareSource(image: CanvasSource, focusY = 0.4) {
  const c = createCanvas(SIZE, SIZE);
  const g = c.getContext('2d')!;
  const scale = Math.max(SIZE / image.width, SIZE / image.height);
  const w = image.width * scale;
  const h = image.height * scale;
  g.imageSmoothingQuality = 'high';
  g.drawImage(image, (SIZE - w) / 2, Math.min(0, Math.max(SIZE - h, SIZE / 2 - h * focusY)), w, h);
  return c;
}

function drawLook(target: HTMLCanvasElement, controls: Controls, source: CanvasSource, pixelScale: number) {
  const preset = scaleForPreview(controls, pixelScale);
  const out = renderGraphic(preset, source);
  const g = target.getContext('2d')!;
  g.fillStyle = '#fff';
  g.fillRect(0, 0, SIZE, SIZE);
  g.imageSmoothingEnabled = preset.graphicMode !== 'pixelBitmap';
  g.drawImage(out, 0, 0, SIZE, SIZE);
}

const LOOK_STORAGE = 'levisGraphicLabCustomPresetsV1';
type SavedLooks = Record<string, Record<string, unknown>>;
function readLooks(): SavedLooks {
  try {
    return JSON.parse(localStorage.getItem(LOOK_STORAGE) || '{}') || {};
  } catch {
    return {};
  }
}

/** Your own looks live right under the built-in ones: save the current settings, load or delete them. */
function CustomLooks() {
  const [looks, setLooks] = useState<SavedLooks>(readLooks);
  const [naming, setNaming] = useState(false);
  const [name, setName] = useState('');
  const notify = useStudio((s) => s.notify);
  const setControls = useStudio((s) => s.setControls);

  const write = (next: SavedLooks) => {
    setLooks(next);
    try {
      localStorage.setItem(LOOK_STORAGE, JSON.stringify(next));
    } catch {
      notify('Speichern ist in diesem Browser blockiert.');
    }
  };
  const save = () => {
    const n = name.trim();
    if (!n) {
      notify('Gib deinem Look einen Namen.');
      return;
    }
    write({ ...looks, [n]: { ...useStudio.getState().controls } });
    notify(`Look „${n}“ gespeichert.`);
    setName('');
    setNaming(false);
  };

  return (
    <div className="mt-3.5 border-t border-dashed border-hair pt-3">
      <div className="flex flex-wrap items-center gap-1.5">
        {Object.keys(looks).map((n) => (
          <span key={n} className="inline-flex h-7 items-center rounded-full border border-hair bg-paper text-[12px] hover:border-ink">
            <button
              type="button"
              className="h-full pr-1 pl-2.5 font-semibold"
              onClick={() => {
                setControls(controlsFromPreset(looks[n]));
                notify(`Look „${n}“ geladen.`);
              }}
            >
              {n}
            </button>
            <button
              type="button"
              aria-label={`${n} löschen`}
              title="Löschen"
              className="mr-1 grid size-5 place-items-center rounded-full text-muted hover:bg-panel-deep hover:text-ink"
              onClick={() => {
                const next = { ...looks };
                delete next[n];
                write(next);
              }}
            >
              <X size={12} />
            </button>
          </span>
        ))}
        {!naming && (
          <button
            type="button"
            onClick={() => setNaming(true)}
            className="inline-flex h-7 items-center gap-1 rounded-full border border-dashed border-line px-2.5 text-[12px] text-muted hover:border-ink hover:text-ink"
          >
            <Plus size={13} /> Eigenen Look speichern
          </button>
        )}
      </div>
      {naming && (
        <form
          className="mt-2 flex gap-1.5"
          onSubmit={(e) => {
            e.preventDefault();
            save();
          }}
        >
          <input
            autoFocus
            className="field !h-8"
            placeholder="Name, z. B. Shirt Heavy Ink"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setNaming(false);
            }}
          />
          <button type="submit" className="h-8 shrink-0 rounded-md bg-ink px-3 text-[12.5px] font-semibold text-paper">
            Speichern
          </button>
        </form>
      )}
    </div>
  );
}

/** Number of looks that count as a good fit once the image is analysed. */
const FITTING = 4;

export function LooksPanel() {
  const preview = useStudio((s) => s.preview);
  const analysis = useStudio((s) => s.analysis);
  const activeLook = useStudio((s) => s.activeLook);
  const applyLook = useStudio((s) => s.applyLook);
  const set = useStudio((s) => s.set);
  const canvases = useRef<Record<string, HTMLCanvasElement | null>>({});

  // With an analysed image the looks are sorted by fit and use their tuned settings.
  const ranked = preview && analysis ? analysis.ranked : null;
  const looks = ranked ?? LOOKS.map((l) => ({ ...l, controls: controlsFromPreset(presets[l.id]) }));

  useEffect(() => {
    let cancelled = false;
    let i = 0;
    const run = (sourceFor: (id: string) => CanvasSource | null, pixelScale: number) => {
      const next = () => {
        if (cancelled || i >= looks.length) return;
        const look = looks[i++];
        const target = canvases.current[look.id];
        const source = sourceFor(look.id);
        if (target && source) {
          try {
            drawLook(target, look.controls, source, pixelScale);
          } catch (error) {
            console.warn('Look thumbnail failed', look.id, error);
          }
        }
        window.setTimeout(next, 16);
      };
      next();
    };

    if (preview) {
      const source = squareSource(preview, 0.5);
      run(() => source, Math.max(SIZE / preview.width, SIZE / preview.height));
    } else {
      Promise.all(SAMPLE_PHOTOS.map(loadPhoto))
        .then((photos) => {
          if (cancelled) return;
          const sources = photos.map((p) => squareSource(p));
          // Sample photos are about 1000 px; scale pixel blocks the same way.
          run((id) => sources[LOOK_PHOTO[id] ?? 0], SIZE / 1000);
        })
        .catch(() => {
          /* thumbnails stay blank */
        });
    }
    return () => {
      cancelled = true;
    };
    // `looks` is derived from preview and analysis.
  }, [preview, analysis]);

  return (
    <section aria-labelledby="looks-title" className="border-b border-hair px-3.5 pt-3 pb-3.5">
      <div className="mb-2.5 flex items-baseline justify-between gap-2">
        <h2 id="looks-title" className="text-[15px] font-extrabold font-compact">
          Looks
        </h2>
        {ranked ? (
          <button
            type="button"
            onClick={() => set({ suggestOpen: true })}
            className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-muted underline-offset-2 hover:text-ink hover:underline"
          >
            <Sparkles size={12} /> Vorschläge zeigen
          </button>
        ) : (
          <span className="text-[11.5px] text-muted">{preview ? 'Bild wird analysiert …' : 'Ein Klick setzt alle Regler'}</span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-2.5 max-[900px]:grid-cols-4 max-[520px]:grid-cols-3">
        {looks.map((look, i) => {
          const active = activeLook === look.id;
          const weaker = ranked && i >= FITTING;
          return (
            <Fragment key={look.id}>
              {ranked && i === FITTING && (
                <p className="col-span-full mt-1 border-t border-dashed border-hair pt-2 text-[11.5px] font-semibold text-muted">
                  Passt weniger gut zu diesem Bild
                </p>
              )}
              <button
                type="button"
                aria-pressed={active}
                onClick={() => applyLook(look.id)}
                className={cx(
                  'group grid content-start gap-px text-left transition-opacity',
                  weaker && !active && 'opacity-55 hover:opacity-100'
                )}
              >
                <span className="relative mb-1 block">
                  <canvas
                    ref={(el) => {
                      canvases.current[look.id] = el;
                    }}
                    width={SIZE}
                    height={SIZE}
                    className="block aspect-square h-auto w-full rounded-[3px] border border-hair bg-paper transition-colors group-hover:border-ink"
                  />
                  {active && (
                    <motion.span
                      layoutId="look-active"
                      className="pointer-events-none absolute -inset-[3px] rounded-[5px] border-2 border-ink"
                      transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                    />
                  )}
                </span>
                <span className={cx('text-[12.5px] leading-tight font-bold', active && 'underline underline-offset-2')}>{look.name}</span>
                <span className="text-[11px] leading-tight text-muted max-[900px]:hidden">{look.purpose}</span>
              </button>
            </Fragment>
          );
        })}
      </div>
      <CustomLooks />
    </section>
  );
}
