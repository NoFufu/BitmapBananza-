import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';
import { useStudio } from '../state/store';

export function Section({ id, title, subtitle, changed, children }: { id: string; title: string; subtitle?: string; changed?: boolean; children: ReactNode }) {
  const open = useStudio((s) => Boolean(s.openSections[id]));
  const toggle = useStudio((s) => s.toggleSection);
  return (
    <section data-section={id} className="border-b border-hair">
      <h2>
        <button
          type="button"
          aria-expanded={open}
          onClick={() => toggle(id)}
          className="flex w-full items-center gap-2 px-3.5 py-3 text-left hover:bg-panel-deep"
        >
          <span className="min-w-0">
            <span className="flex items-center gap-2 text-[15px] leading-tight font-extrabold font-compact">
              {title}
              {changed && <span className="size-1.5 rounded-full bg-ink" title="Hier ist etwas verändert" />}
            </span>
            {subtitle && <span className="mt-0.5 block truncate text-[11.5px] font-normal text-muted">{subtitle}</span>}
          </span>
          <ChevronDown size={16} strokeWidth={2} className={`ml-auto transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>
      </h2>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-3.5 pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
