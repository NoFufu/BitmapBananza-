import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { useStudio } from '../state/store';
import { MOD } from './TopBar';

const SHORTCUTS: [string[], string][] = [
  [[MOD, 'K'], 'Regler oder Aktion suchen'],
  [[MOD, 'O'], 'Bild öffnen'],
  [[MOD, 'S'], 'PNG exportieren'],
  [[MOD, 'Z'], 'Rückgängig'],
  [[MOD, '⇧', 'Z'], 'Wiederholen'],
  [['B'], 'gedrückt halten: Original zeigen'],
  [['S'], 'Vorher/Nachher teilen'],
  [['F'], 'Einpassen'],
  [['1'], '100 % Zoom'],
  [['+', '−'], 'Zoomen'],
  [['C'], 'Zuschneiden, Enter übernimmt'],
  [['E'], 'Radierer'],
  [['M'], 'Maske anzeigen'],
  [['Esc'], 'Werkzeug oder Dialog schließen']
];

export function ShortcutsDialog() {
  const open = useStudio((s) => s.shortcutsOpen);
  const set = useStudio((s) => s.set);
  const close = () => set({ shortcutsOpen: false });
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-[rgba(20,32,27,.45)] px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onPointerDown={(e) => { if (e.target === e.currentTarget) close(); }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="shortcuts-title"
            initial={{ y: -8 }}
            animate={{ y: 0 }}
            exit={{ y: -8 }}
            className="w-[min(520px,100%)] rounded-xl border border-ink bg-paper px-4.5 pt-4 pb-4.5"
          >
            <div className="mb-2.5 flex items-center justify-between">
              <h2 id="shortcuts-title" className="text-[16px] font-extrabold font-semiwide">Tastenkürzel</h2>
              <button type="button" autoFocus onClick={close} aria-label="Schließen" className="grid size-8 place-items-center rounded-md hover:bg-panel"><X size={17} /></button>
            </div>
            <dl className="grid grid-cols-[auto_1fr] items-center gap-x-4.5 gap-y-2">
              {SHORTCUTS.map(([keys, label]) => (
                <div key={label} className="contents">
                  <dt className="flex items-center gap-1">{keys.map((k) => <kbd key={k}>{k}</kbd>)}</dt>
                  <dd className="m-0">{label}</dd>
                </div>
              ))}
              <dt className="text-[12px] text-muted">Doppelklick</dt><dd className="m-0">auf einen Regler setzt ihn zurück</dd>
            </dl>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Toast() {
  const toast = useStudio((s) => s.toast);
  const set = useStudio((s) => s.set);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => set({ toast: null }), 3200);
    return () => clearTimeout(t);
  }, [toast, set]);
  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center px-4">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            className="max-w-[480px] rounded-lg bg-ink px-3.5 py-2.5 text-[13px] text-paper"
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
