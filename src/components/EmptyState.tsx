import { AnimatePresence, motion } from 'motion/react';
import { loadSampleImage, pickFiles } from '../lib/files';

// Step wedge from the logo: paper, four halftone steps, solid ink.
const WEDGE = [
  'bg-paper',
  '[background:radial-gradient(circle,#000_0_22%,transparent_26%)_0_0/4px_4px]',
  '[background:radial-gradient(circle,#000_0_34%,transparent_38%)_0_0/4px_4px]',
  '[background:radial-gradient(circle,#000_0_46%,transparent_50%)_0_0/4px_4px]',
  '[background:#000_radial-gradient(circle,#fff_0_34%,transparent_38%)_0_0/4px_4px]',
  '[background:#000_radial-gradient(circle,#fff_0_20%,transparent_24%)_0_0/4px_4px]',
  'bg-ink'
];

export function EmptyState({ dragOver, loading }: { dragOver: boolean; loading: boolean }) {
  return (
    <div className="relative">
      {/* A strip of tape holding the sheet to the mat. */}
      <span
        aria-hidden
        className="absolute -top-3.5 left-1/2 z-[1] h-7 w-[120px] -translate-x-1/2 -rotate-[2.5deg] bg-[rgba(236,233,220,.82)] shadow-[0_1px_2px_rgba(0,0,0,.12)] [clip-path:polygon(0_8%,4%_0,8%_10%,12%_0,100%_4%,97%_50%,100%_92%,94%_100%,90%_88%,85%_100%,0_96%,3%_50%)]"
      />
      <button
        type="button"
        onClick={pickFiles}
        disabled={loading}
        className="group grid w-[min(440px,calc(100vw-64px))] justify-items-center gap-2.5 px-10 pt-14 pb-11 text-center"
      >
        <span aria-hidden className="mb-3 grid h-[46px] grid-cols-[repeat(7,22px)] border border-ink">
          {WEDGE.map((cls, i) => (
            <motion.i
              key={i}
              className={`block ${cls}`}
              animate={dragOver ? { y: [0, -4, 0] } : { y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.04, repeat: dragOver ? Infinity : 0 }}
            />
          ))}
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={loading ? 'loading' : dragOver ? 'drop' : 'idle'}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className={`text-[32px] leading-[1.05] font-extrabold font-compact tracking-[-0.01em] group-hover:underline group-hover:decoration-2 group-hover:underline-offset-[5px] max-[900px]:text-[21px] ${dragOver ? 'text-npb-strong' : ''}`}
          >
            {loading ? 'Bild wird vorbereitet …' : dragOver ? 'Loslassen zum Laden' : 'Foto hier ablegen'}
          </motion.span>
        </AnimatePresence>
        <span className="max-w-[30ch] text-[13px] text-muted">
          oder klicken zum Auswählen. PNG, JPG oder WEBP, mehrere Dateien für Stapel-Export.
        </span>
      </button>
      {!loading && (
        <button
          type="button"
          onClick={loadSampleImage}
          className="absolute top-[calc(100%+40px)] left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1.5 text-[13px] text-[color:var(--on-stage)] underline underline-offset-4 hover:opacity-100"
        >
          Beispielbild ausprobieren
        </button>
      )}
    </div>
  );
}
