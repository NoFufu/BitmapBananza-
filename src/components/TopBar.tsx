import { AnimatePresence, motion } from 'motion/react';
import { Check, Download, LoaderCircle, Redo2, Search, Undo2, Upload } from 'lucide-react';
import { useState } from 'react';
import { exportPNG } from '../lib/exporter';
import { pickFiles } from '../lib/files';
import { useStudio } from '../state/store';
import { Button, IconButton } from './ui';

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
export const MOD = isMac ? '⌘' : 'Strg';

/** Export button that shows its own progress and success. */
function ExportButton() {
  const hasImage = useStudio((s) => Boolean(s.image && s.renderVersion));
  const [state, setState] = useState<'idle' | 'busy' | 'done'>('idle');
  const run = async () => {
    setState('busy');
    await new Promise((r) => setTimeout(r, 30));
    try {
      await exportPNG();
      setState('done');
      setTimeout(() => setState('idle'), 1600);
    } catch (error) {
      console.error(error);
      useStudio.getState().notify('Export fehlgeschlagen. Versuch eine kleinere Auflösung.');
      setState('idle');
    }
  };
  const icon = state === 'busy' ? <LoaderCircle size={16} className="animate-spin" /> : state === 'done' ? <Check size={16} /> : <Download size={16} />;
  return (
    <Button variant="ink" disabled={!hasImage || state === 'busy'} onClick={run} title={`PNG exportieren (${MOD}+S)`} className="max-[900px]:w-10 max-[900px]:px-0">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={state} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} transition={{ duration: 0.12 }}>
          {icon}
        </motion.span>
      </AnimatePresence>
      <span className="max-[900px]:hidden">{state === 'done' ? 'Exportiert' : state === 'busy' ? 'Exportiere …' : 'PNG exportieren'}</span>
    </Button>
  );
}

/** The LBB mark, traced from Levi's logo. The second B's bowls cut into the third letter. */
function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="278 200 1219 500" className={className} fill="currentColor" fillRule="evenodd" aria-hidden>
      <path d="M278 203H457V578H580V700H278Z" />
      <path d="M580 200H971V700H716V578H580ZM750 315H874Q902 315 902 343V372Q902 400 874 400H750ZM750 503H879Q907 503 907 531V557Q907 585 879 585H750Z" />
      <path d="M975 200H1340C1424 200 1483 258 1483 330C1483 387 1444 430 1390 442C1452 455 1497 505 1497 572C1497 642 1440 700 1356 700H975V696C1044 690 1084 640 1084 570C1084 503 1044 456 986 442C1040 428 1078 388 1078 320C1078 257 1040 212 975 207ZM1143 315H1267Q1295 315 1295 343V372Q1295 400 1267 400H1143ZM1143 503H1272Q1300 503 1300 531V557Q1300 585 1272 585H1143Z" />
    </svg>
  );
}

export function TopBar() {
  const image = useStudio((s) => s.image);
  const canUndo = useStudio((s) => s.past.length > 0 || s.controls !== s.committed);
  const canRedo = useStudio((s) => s.future.length > 0);
  const undo = useStudio((s) => s.undo);
  const redo = useStudio((s) => s.redo);
  const set = useStudio((s) => s.set);

  return (
    <header className="flex h-14 min-w-0 items-center gap-4 border-b border-ink bg-paper pr-3 pl-4 max-[900px]:sticky max-[900px]:top-0 max-[900px]:z-30 max-[900px]:h-[52px] max-[900px]:gap-2 max-[900px]:pr-2 max-[900px]:pl-3">
      <a href="./" className="shrink-0 text-ink no-underline" aria-label="Levi's Bitmap Bananza, neu laden">
        <Logo className="block h-[26px] w-auto max-[900px]:h-6" />
      </a>

      {image && (
        <div className="flex min-w-0 items-baseline gap-2 border-l border-hair pl-4 text-muted max-[900px]:hidden">
          <span className="max-w-[28ch] truncate font-semibold text-ink" title={image.name}>{image.name}</span>
          <span className="whitespace-nowrap tabular max-[1180px]:hidden">{image.working.width} × {image.working.height} px</span>
        </div>
      )}

      <div className="ml-auto flex items-center gap-2">
        <div className="flex max-[900px]:hidden" role="group" aria-label="Verlauf">
          <IconButton label={`Rückgängig (${MOD}+Z)`} className="rounded-l-md" disabled={!canUndo} onClick={undo}><Undo2 size={17} /></IconButton>
          <IconButton label={`Wiederholen (${MOD}+⇧+Z)`} className="-ml-px rounded-r-md" disabled={!canRedo} onClick={redo}><Redo2 size={17} /></IconButton>
        </div>
        <button
          type="button"
          onClick={() => set({ paletteOpen: true })}
          className="flex h-9 w-[270px] items-center gap-2 rounded-md border border-hair bg-panel pr-1.5 pl-2.5 text-left text-muted hover:border-line max-[1180px]:w-10 max-[1180px]:justify-center max-[1180px]:p-0"
          aria-haspopup="dialog"
          aria-label="Regler oder Aktion suchen"
        >
          <Search size={16} />
          <span className="flex-1 truncate max-[1180px]:hidden">Regler oder Aktion suchen</span>
          <kbd className="max-[1180px]:!hidden">{MOD} K</kbd>
        </button>
        <Button variant="quiet" onClick={pickFiles} title={`Bild öffnen (${MOD}+O)`} className="max-[900px]:w-10 max-[900px]:px-0">
          <Upload size={16} /><span className="max-[900px]:hidden">Bild öffnen</span>
        </Button>
        <ExportButton />
      </div>
    </header>
  );
}
