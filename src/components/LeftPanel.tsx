import { RotateCcw } from 'lucide-react';
import { CONTROL_DEFS, EDGE_PRESETS, SECTIONS, sectionChanged, type SectionId } from '../lib/controls';
import { useStudio } from '../state/store';
import { ControlField } from './ControlField';
import { LooksPanel } from './LooksPanel';
import { Section } from './Section';
import { Button, Hint } from './ui';

function Fields({ section, sub }: { section: SectionId; sub?: string }) {
  return (
    <>
      {CONTROL_DEFS.filter((d) => d.section === section && d.sub === sub).map((d) => <ControlField key={d.key} def={d} />)}
    </>
  );
}

function SubHead({ children }: { children: string }) {
  return <h3 className="mt-5 border-t border-dashed border-hair pt-3.5 text-[12.5px] font-bold font-semiwide">{children}</h3>;
}

function EdgeExtras() {
  const setControls = useStudio((s) => s.setControls);
  const controls = useStudio((s) => s.controls);
  return (
    <div className="mt-2.5 grid grid-flow-col auto-cols-fr" role="group" aria-label="Kanten-Vorlage">
      {Object.entries(EDGE_PRESETS).map(([id, p], i, all) => (
        <Button
          key={id}
          variant="mini"
          className={`-ml-px first:ml-0 hover:z-10 ${i === 0 ? 'rounded-r-none' : i === all.length - 1 ? 'rounded-l-none' : 'rounded-none'}`}
          onClick={() => setControls({ ...controls, ...p.values })}
        >
          {p.label}
        </Button>
      ))}
    </div>
  );
}

function EraserControls() {
  const tool = useStudio((s) => s.tool);
  const setTool = useStudio((s) => s.setTool);
  const eraserSize = useStudio((s) => s.eraserSize);
  const maskPreview = useStudio((s) => s.maskPreview);
  const hasImage = useStudio((s) => Boolean(s.image));
  const strokes = useStudio((s) => s.strokes.length);
  const set = useStudio((s) => s.set);
  const clearStrokes = useStudio((s) => s.clearStrokes);
  const applyShirtReady = useStudio((s) => s.applyShirtReady);
  return (
    <>
      <label className="mt-2.5 flex cursor-pointer items-center gap-2 text-[12.5px]">
        <input type="checkbox" className="size-4 accent-ink" disabled={!hasImage} checked={tool === 'eraser'} onChange={(e) => setTool(e.target.checked ? 'eraser' : 'none')} />
        Radierer aktiv <kbd>E</kbd>
      </label>
      <label htmlFor="eraser-size" className="mt-3.5 mb-1.5 flex items-baseline text-[12.5px]">
        Pinselgröße <span className="ml-auto font-semibold tabular">{eraserSize}</span>
      </label>
      <input
        id="eraser-size"
        type="range"
        className="range"
        min={6}
        max={140}
        value={eraserSize}
        style={{ ['--p' as string]: `${((eraserSize - 6) / 134) * 100}%` }}
        onChange={(e) => set({ eraserSize: Number(e.target.value) })}
      />
      <label className="mt-2.5 flex cursor-pointer items-center gap-2 text-[12.5px]">
        <input type="checkbox" className="size-4 accent-ink" disabled={!hasImage} checked={maskPreview} onChange={(e) => set({ maskPreview: e.target.checked })} />
        Maske anzeigen <kbd>M</kbd>
      </label>
      <div className="mt-2.5 grid grid-cols-2 gap-1.5">
        <Button variant="mini" disabled={!strokes} onClick={clearStrokes}>Radierung löschen</Button>
        <Button variant="mini" disabled={!hasImage} onClick={applyShirtReady}>Shirt-fertig machen</Button>
      </div>
      <Hint>Shirt-fertig setzt transparenten Hintergrund, gerissene Kante und 4096 px Export.</Hint>
    </>
  );
}

export function LeftPanel() {
  const controls = useStudio((s) => s.controls);
  const resetControls = useStudio((s) => s.resetControls);
  return (
    <aside aria-label="Looks und Effekte" className="scrollbar-thin min-h-0 overflow-y-auto overflow-x-hidden border-r border-ink bg-panel pb-6 max-[900px]:overflow-visible max-[900px]:border-r-0">
      <LooksPanel />
      {SECTIONS.map((section) => (
        <Section key={section.id} id={section.id} title={section.title} changed={sectionChanged(controls, section.id)}>
          {section.id === 'edge' && <EdgeExtras />}
          <Fields section={section.id} />
          {section.id === 'edge' && (
            <>
              <SubHead>Aufräumen</SubHead>
              <Fields section="edge" sub="Aufräumen" />
              <SubHead>Radierer</SubHead>
              <EraserControls />
            </>
          )}
          {section.hint && <Hint>{section.hint}</Hint>}
        </Section>
      ))}
      <button
        type="button"
        onClick={resetControls}
        className="mx-4 mt-4 flex items-center gap-1.5 py-1.5 text-[12.5px] text-muted hover:text-ink hover:underline hover:underline-offset-4"
      >
        <RotateCcw size={14} /> Alle Regler zurücksetzen
      </button>
    </aside>
  );
}
