import { RotateCcw } from 'lucide-react';
import {
  CONTROL_DEFS,
  EDGE_PRESETS,
  SECTIONS,
  STRUCTURES,
  getStructure,
  sectionChanged,
  withStructure,
  type SectionId
} from '../lib/controls';
import { useStudio } from '../state/store';
import { ControlField } from './ControlField';
import { LooksPanel } from './LooksPanel';
import { Section } from './Section';
import { Button, Hint, Segmented } from './ui';

function Fields({ section }: { section: SectionId }) {
  return (
    <>
      {CONTROL_DEFS.filter((d) => d.section === section).map((d) => (
        <ControlField key={d.key} def={d} />
      ))}
    </>
  );
}

function SubHead({ children }: { children: string }) {
  return <h3 className="mt-5 border-t border-dashed border-hair pt-3.5 text-[12.5px] font-bold">{children}</h3>;
}

/** "Automatisch" picks the threshold from the image histogram (Otsu). */
function AutoThreshold() {
  const mode = useStudio((s) => s.controls.thresholdMode);
  const pixel = useStudio((s) => s.controls.graphicMode === 'pixelBitmap');
  const controls = useStudio((s) => s.controls);
  const setControls = useStudio((s) => s.setControls);
  if (pixel) return null;
  return (
    <label className="mt-1 flex cursor-pointer items-center gap-2 text-[12.5px]">
      <input
        type="checkbox"
        className="size-4 accent-ink"
        checked={mode === 'auto'}
        onChange={(e) => setControls({ ...controls, thresholdMode: e.target.checked ? 'auto' : 'global' })}
      />
      Schwelle automatisch bestimmen
    </label>
  );
}

function StructurePicker() {
  const controls = useStudio((s) => s.controls);
  const setControls = useStudio((s) => s.setControls);
  const current = getStructure(controls);
  const info = STRUCTURES.find((s) => s.value === current);
  return (
    <>
      <div className="rounded-lg border border-hair bg-paper p-0.5">
        <Segmented
          id="structure"
          value={current}
          onChange={(v) => setControls(withStructure(controls, v))}
          options={STRUCTURES.map((s) => ({ value: s.value, label: s.label, title: s.hint }))}
          stretch
        />
      </div>
      {info && <p className="mt-2 text-[11.5px] leading-snug text-muted">{info.hint}</p>}
    </>
  );
}

function EdgePresets() {
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
        <input
          type="checkbox"
          className="size-4 accent-ink"
          disabled={!hasImage}
          checked={tool === 'eraser'}
          onChange={(e) => setTool(e.target.checked ? 'eraser' : 'none')}
        />
        Radierer aktiv <kbd>E</kbd>
      </label>
      {tool === 'eraser' && (
        <>
          <label htmlFor="eraser-size" className="mt-3 mb-1.5 flex items-baseline text-[12.5px]">
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
        </>
      )}
      <label className="mt-2.5 flex cursor-pointer items-center gap-2 text-[12.5px]">
        <input
          type="checkbox"
          className="size-4 accent-ink"
          disabled={!hasImage}
          checked={maskPreview}
          onChange={(e) => set({ maskPreview: e.target.checked })}
        />
        Maske anzeigen <kbd>M</kbd>
      </label>
      <div className="mt-2.5 grid grid-cols-2 gap-1.5">
        <Button variant="mini" disabled={!strokes} onClick={clearStrokes}>
          Radierung löschen
        </Button>
        <Button variant="mini" disabled={!hasImage} onClick={applyShirtReady}>
          Shirt-fertig
        </Button>
      </div>
      <Hint>Shirt-fertig setzt transparenten Hintergrund, gerissene Kante und 4096 px Export.</Hint>
    </>
  );
}

export function LeftPanel() {
  const controls = useStudio((s) => s.controls);
  const resetControls = useStudio((s) => s.resetControls);
  const pixel = controls.graphicMode === 'pixelBitmap';
  return (
    <aside
      aria-label="Looks und Effekte"
      className="scrollbar-thin min-h-0 overflow-y-auto overflow-x-hidden border-r border-ink bg-panel pb-6 max-[900px]:overflow-visible max-[900px]:border-r-0"
    >
      <LooksPanel />
      {SECTIONS.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          title={section.title}
          subtitle={section.subtitle}
          changed={
            section.id === 'structure'
              ? getStructure(controls) !== 'flat' || sectionChanged(controls, 'structure')
              : sectionChanged(controls, section.id)
          }
        >
          {section.id === 'basics' && <AutoThreshold />}
          {section.id === 'structure' && <StructurePicker />}
          {section.id === 'edge' && <EdgePresets />}
          <Fields section={section.id} />
          {section.id === 'basics' && pixel && <Hint>Im Pixel-Modus wirken hier nur Schwelle und Kontrast.</Hint>}
          {section.id === 'edge' && (
            <>
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
        className="mx-3.5 mt-4 flex items-center gap-1.5 py-1.5 text-[12.5px] text-muted hover:text-ink hover:underline hover:underline-offset-4"
      >
        <RotateCcw size={14} /> Alle Regler zurücksetzen
      </button>
    </aside>
  );
}
