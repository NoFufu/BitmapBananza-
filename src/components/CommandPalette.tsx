import { AnimatePresence, motion } from 'motion/react';
import { Search } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { applyCrop, resetCrop, toggleMask, toggleSplit, toggleTool } from '../lib/actions';
import { CONTROL_DEFS, LOOKS, SECTIONS, STRUCTURES, getStructure, withStructure, type ControlKey } from '../lib/controls';
import { exportPack, exportPNG, exportSVG } from '../lib/exporter';
import { loadSampleImage, pickFiles } from '../lib/files';
import { STAGE_BACKGROUNDS, useStudio } from '../state/store';
import { MOD } from './TopBar';

interface Command {
  id: string;
  label: string;
  group: string;
  keys?: string;
  value?: () => string;
  control?: boolean;
  minQuery?: number;
  enabled: () => boolean;
  run: () => void;
}

const normalize = (t: string) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const sectionTitle = (id: string) => (id === 'output' ? 'Export' : SECTIONS.find((s) => s.id === id)?.title ?? '');

/** Open the control's section, scroll it into view, focus it and flash it once. */
export function revealControl(key: string, focus = true) {
  const def = CONTROL_DEFS.find((d) => d.key === key);
  if (!def) return;
  const store = useStudio.getState();
  store.toggleSection(def.section === 'output' ? 'export' : def.section, true);
  setTimeout(() => {
    const el = document.querySelector<HTMLElement>(`[data-control="${key}"]`);
    if (!el) return;
    el.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    el.classList.remove('flash');
    void el.offsetWidth;
    el.classList.add('flash');
    if (focus) document.getElementById(`c-${key}`)?.focus({ preventScroll: true });
  }, 260);
}

function buildCommands(): Command[] {
  const s = () => useStudio.getState();
  const hasImage = () => Boolean(s().image);
  const always = () => true;
  const list: Command[] = [
    { id: 'open', label: 'Bild öffnen', group: 'Datei', keys: `${MOD} O`, enabled: always, run: pickFiles },
    { id: 'sample', label: 'Beispielbild laden', group: 'Datei', enabled: always, run: loadSampleImage },
    { id: 'png', label: 'PNG exportieren', group: 'Export', keys: `${MOD} S`, enabled: hasImage, run: () => { exportPNG(); } },
    { id: 'zip', label: 'Export-Paket als ZIP', group: 'Export', enabled: hasImage, run: () => { exportPack(); } },
    { id: 'svg', label: 'SVG-Vektor exportieren', group: 'Export', enabled: hasImage, run: exportSVG },
    { id: 'undo', label: 'Rückgängig', group: 'Verlauf', keys: `${MOD} Z`, enabled: () => s().past.length > 0, run: () => s().undo() },
    { id: 'redo', label: 'Wiederholen', group: 'Verlauf', keys: `${MOD} ⇧ Z`, enabled: () => s().future.length > 0, run: () => s().redo() },
    { id: 'fit', label: 'Einpassen', group: 'Ansicht', keys: 'F', enabled: hasImage, run: () => s().requestFit() },
    { id: 'z100', label: 'Zoom 100 %', group: 'Ansicht', keys: '1', enabled: hasImage, run: () => s().setView({ zoom: 100 }) },
    { id: 'before', label: 'Vorher zeigen', group: 'Ansicht', enabled: hasImage, run: () => s().setView({ viewMode: 'original' }) },
    { id: 'split', label: 'Vorher/Nachher teilen', group: 'Ansicht', keys: 'S', enabled: hasImage, run: toggleSplit },
    { id: 'after', label: 'Nachher zeigen', group: 'Ansicht', enabled: hasImage, run: () => s().setView({ viewMode: 'processed' }) },
    { id: 'crop', label: 'Zuschneiden', group: 'Werkzeug', keys: 'C', enabled: hasImage, run: () => toggleTool('crop') },
    { id: 'cropApply', label: 'Zuschnitt übernehmen', group: 'Werkzeug', enabled: () => s().tool === 'crop', run: applyCrop },
    { id: 'cropReset', label: 'Original wiederherstellen', group: 'Werkzeug', enabled: () => Boolean(s().image && s().image!.working !== s().image!.full), run: resetCrop },
    { id: 'eraser', label: 'Radierer', group: 'Werkzeug', keys: 'E', enabled: hasImage, run: () => toggleTool('eraser') },
    { id: 'mask', label: 'Maske anzeigen', group: 'Werkzeug', keys: 'M', enabled: hasImage, run: toggleMask },
    { id: 'shirt', label: 'Shirt-fertig machen', group: 'Werkzeug', enabled: hasImage, run: () => s().applyShirtReady() },
    { id: 'reset', label: 'Alle Regler zurücksetzen', group: 'Regler', enabled: always, run: () => s().resetControls() },
    { id: 'keys', label: 'Tastenkürzel anzeigen', group: 'Hilfe', keys: '?', enabled: always, run: () => s().set({ shortcutsOpen: true }) },
    ...LOOKS.map((l) => ({ id: `look-${l.id}`, label: `Look: ${l.name}`, group: 'Looks', enabled: always, run: () => s().applyLook(l.id) })),
    ...STRUCTURES.map((st) => ({
      id: `structure-${st.value}`, label: `Struktur: ${st.label}`, group: 'Struktur', enabled: always,
      run: () => { s().setControls(withStructure(s().controls, st.value)); s().toggleSection('structure', true); }
    })),
    ...STAGE_BACKGROUNDS.map((b) => ({ id: `bg-${b.value}`, label: `Hintergrund: ${b.label}`, group: 'Ansicht', enabled: always, run: () => s().setStageBg(b.value) }))
  ];

  for (const def of CONTROL_DEFS) {
    const key = def.key as ControlKey;
    const group = sectionTitle(def.section);
    list.push({
      id: `c-${key}`,
      label: def.label,
      group,
      control: true,
      // Controls that have no effect in the current mode are hidden in the panel, so skip them here too.
      enabled: () => !def.showIf || def.showIf(s().controls),
      value: () => {
        const v = s().controls[key];
        if (def.kind === 'toggle') return v ? 'an' : 'aus';
        if (def.kind === 'select') return def.options.find((o) => o.value === v)?.label ?? String(v);
        return `${v}${def.kind === 'slider' && def.unit ? def.unit : ''}`;
      },
      run: () => revealControl(key)
    });
    if (def.kind === 'select' && def.options.length > 2) {
      for (const option of def.options) {
        list.push({
          id: `c-${key}-${option.value}`,
          label: `${def.label}: ${option.label}`,
          group,
          minQuery: 2,
          enabled: always,
          run: () => {
            let next = { ...s().controls, [key]: option.value };
            // Picking a dither type should make dithering visible, not stay hidden behind halftone.
            if (key === 'method' && getStructure(next) !== 'pixel') next = withStructure(next, option.value === 'threshold' ? 'flat' : 'dither');
            s().setControls(next);
            revealControl(key, false);
          }
        });
      }
    }
  }
  return list;
}

function score(c: Command, tokens: string[]) {
  const hay = normalize(`${c.label} ${c.group}`);
  let total = 0;
  for (const token of tokens) {
    const at = hay.indexOf(token);
    if (at < 0) return -1;
    total += at === 0 ? 3 : hay[at - 1] === ' ' || hay[at - 1] === ':' ? 2 : 1;
  }
  return total + (c.control ? 0.5 : 0);
}

function Highlight({ text, token }: { text: string; token?: string }) {
  if (!token) return <>{text}</>;
  const at = normalize(text).indexOf(token);
  if (at < 0) return <>{text}</>;
  return <>{text.slice(0, at)}<mark className="bg-transparent font-bold text-inherit underline underline-offset-2">{text.slice(at, at + token.length)}</mark>{text.slice(at + token.length)}</>;
}

export function CommandPalette() {
  const open = useStudio((s) => s.paletteOpen);
  const set = useStudio((s) => s.set);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const commands = useMemo(() => (open ? buildCommands() : []), [open]);

  useEffect(() => { if (open) { setQuery(''); setActive(0); } }, [open]);

  const tokens = normalize(query.trim()).split(/\s+/).filter(Boolean);
  const results = useMemo(() => {
    const q = normalize(query.trim());
    let r = commands
      .filter((c) => c.enabled() && (!c.minQuery || q.length >= c.minQuery))
      .map((c) => ({ c, s: tokens.length ? score(c, tokens) : c.control ? 0 : 1 }))
      .filter((x) => x.s >= 0)
      .sort((a, b) => b.s - a.s)
      .map((x) => x.c);
    if (!tokens.length) r = r.filter((c) => !c.control && c.group !== 'Looks').slice(0, 12);
    return r.slice(0, 40);
  }, [commands, query]);

  const close = () => set({ paletteOpen: false });
  const run = (c?: Command) => { if (!c) return; close(); c.run(); };

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-[rgba(20,32,27,.45)] px-4 pt-[12vh] pb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          onPointerDown={(e) => { if (e.target === e.currentTarget) close(); }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Befehle und Regler"
            initial={{ y: -8, scale: 0.985 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -8, scale: 0.985 }}
            transition={{ type: 'spring', stiffness: 520, damping: 36 }}
            className="w-[min(620px,100%)] overflow-hidden rounded-xl border border-ink bg-paper shadow-[0_24px_60px_-24px_rgba(0,0,0,.6)]"
          >
            <div className="flex items-center gap-2.5 border-b border-hair px-3.5">
              <Search size={18} className="text-muted" />
              <input
                ref={inputRef}
                autoFocus
                value={query}
                onChange={(e) => { setQuery(e.target.value); setActive(0); }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(results.length - 1, a + 1)); }
                  else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
                  else if (e.key === 'Enter') { e.preventDefault(); run(results[active]); }
                  else if (e.key === 'Escape') { e.preventDefault(); close(); }
                }}
                placeholder="Threshold, Halftone, Export …"
                autoComplete="off"
                spellCheck={false}
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={results[active] ? `pi-${results[active].id}` : undefined}
                className="h-[52px] flex-1 border-0 bg-transparent text-[16px] outline-none"
              />
              <kbd>Esc</kbd>
            </div>
            <ul ref={listRef} id="palette-list" role="listbox" className="max-h-[min(52vh,440px)] overflow-y-auto p-1.5">
              {!results.length && <li className="px-3 py-4.5 text-muted">Nichts gefunden. Versuch es mit einem Reglernamen wie „Körnung“ oder „Halftone“.</li>}
              {results.map((c, i) => (
                <li
                  key={c.id}
                  id={`pi-${c.id}`}
                  role="option"
                  aria-selected={i === active}
                  onPointerMove={() => setActive(i)}
                  onClick={() => run(c)}
                  className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 ${i === active ? 'bg-npb-tint shadow-[inset_3px_0_0_var(--color-npb-strong)]' : ''}`}
                >
                  <span className="min-w-0 flex-1 text-[13.5px]"><Highlight text={c.label} token={tokens[0]} /></span>
                  {c.value && <span className="font-semibold tabular">{c.value()}</span>}
                  <span className="whitespace-nowrap text-[11.5px] text-muted">{c.group}</span>
                  {c.keys && <kbd>{c.keys}</kbd>}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
