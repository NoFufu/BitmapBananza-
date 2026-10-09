import { useEffect, useMemo, useRef, useState } from 'react';
import { createVariantDefinitions, createScaledSourceFromImage, renderGraphic, type VariantDefinition } from '../engine';
import { applyCrop, resetCrop, toggleTool } from '../lib/actions';
import { CONTROL_DEFS, controlsFromPreset, type Controls } from '../lib/controls';
import { computePrintCheck, currentExportSize, exportBatch, exportPack, exportSVG } from '../lib/exporter';
import { processed, useStudio, type ExportMode, type PreviewQuality } from '../state/store';
import { CompareModal } from './CompareModal';
import { ControlField } from './ControlField';
import { CROP_ASPECTS } from './CropOverlay';
import { Section } from './Section';
import { Button, Hint, Pill } from './ui';

const fieldLabel = 'mt-3.5 mb-1.5 block text-[12.5px]';

function ExportSection() {
  const hasImage = useStudio((s) => Boolean(s.image));
  const exportMode = useStudio((s) => s.exportMode);
  const customWidth = useStudio((s) => s.customWidth);
  const exportName = useStudio((s) => s.exportName);
  const controls = useStudio((s) => s.controls);
  const renderVersion = useStudio((s) => s.renderVersion);
  const set = useStudio((s) => s.set);
  const [busy, setBusy] = useState<string | null>(null);

  const size = useMemo(() => (hasImage && renderVersion ? currentExportSize() : null), [hasImage, renderVersion, exportMode, customWidth]);
  const check = useMemo(() => (size ? computePrintCheck(controls, size) : null), [size, controls, renderVersion]);

  const run = async (key: string, fn: () => Promise<void> | void) => {
    setBusy(key);
    await new Promise((r) => setTimeout(r, 30));
    try { await fn(); } finally { setBusy(null); }
  };

  return (
    <Section id="export" title="Export">
      <div className="flex flex-wrap gap-x-4">
        {CONTROL_DEFS.filter((d) => d.section === 'output').map((d) => <ControlField key={d.key} def={d} />)}
      </div>

      <label htmlFor="export-mode" className={fieldLabel}>Auflösung</label>
      <select id="export-mode" className="field" value={exportMode} onChange={(e) => set({ exportMode: e.target.value as ExportMode })}>
        <option value="current">Aktuelle Vorschaugröße</option>
        <option value="2x">2x größer</option>
        <option value="4x">4x größer</option>
        <option value="original">Original-Bildgröße</option>
        <option value="custom">Eigene Breite</option>
      </select>

      {exportMode === 'custom' && (
        <>
          <label htmlFor="custom-width" className="mt-3.5 mb-1.5 flex items-baseline text-[12.5px]">
            Breite in px <span className="ml-auto font-semibold tabular">{customWidth}</span>
          </label>
          <input
            id="custom-width"
            type="range"
            className="range"
            min={256}
            max={8000}
            step={64}
            value={customWidth}
            style={{ ['--p' as string]: `${((customWidth - 256) / (8000 - 256)) * 100}%` }}
            onChange={(e) => set({ customWidth: Number(e.target.value) })}
          />
          <div className="mt-2.5 grid grid-cols-3">
            {[2048, 3000, 4096].map((w, i) => (
              <Button key={w} variant="mini" className={`-ml-px first:ml-0 ${i === 0 ? 'rounded-r-none' : i === 2 ? 'rounded-l-none' : 'rounded-none'} ${customWidth === w ? '!border-ink !bg-ink !text-paper' : ''}`} onClick={() => set({ customWidth: w })}>{w}</Button>
            ))}
          </div>
        </>
      )}

      <label htmlFor="export-name" className={fieldLabel}>Dateiname</label>
      <input id="export-name" className="field" type="text" spellCheck={false} value={exportName} onChange={(e) => set({ exportName: e.target.value })} />
      <Hint>{size ? `PNG mit ${size.width} × ${size.height} px, ${controls.transparent ? 'transparenter' : 'weißer'} Hintergrund.` : 'Lade ein Bild, um die Exportgröße zu sehen.'}</Hint>

      <div className="mt-3 rounded-md border border-ink bg-paper px-3 py-2.5 text-[12px]">
        {check ? (
          <>
            <div className="grid grid-cols-[1fr_auto] items-center gap-x-2.5 gap-y-1.5">
              <span className="text-muted">Auflösung</span><Pill tone={check.largeEnough ? 'good' : 'warn'}>{check.size.width} × {check.size.height}</Pill>
              <span className="text-muted">Druckgröße bei 300 DPI</span><span className="text-right tabular">{check.cm.w.toFixed(1)} × {check.cm.h.toFixed(1)} cm</span>
              <span className="text-muted">Transparenz</span><Pill tone={check.transparent ? 'good' : 'warn'}>{check.transparent ? 'Ja' : 'Nein'}</Pill>
              <span className="text-muted">Nur Schwarz/Weiß</span><Pill tone={check.monochrome ? 'good' : 'warn'}>{check.monochrome ? 'Ja' : 'Prüfen'}</Pill>
              <span className="text-muted">Farbdeckung</span><Pill tone={check.coverage <= 72 ? 'good' : 'warn'}>{check.coverage}%</Pill>
              <span className="text-muted">Kleinste Insel</span><Pill tone={!check.minClusterMm || check.minClusterMm >= 0.22 ? 'good' : 'warn'}>{check.minClusterMm ? `${check.minClusterMm.toFixed(2)} mm` : 'n/a'}</Pill>
              <span className="text-muted">Kante</span><Pill tone={check.edgeHasInk ? 'warn' : 'good'}>{check.edgeHasInk ? 'Kontakt' : 'frei'}</Pill>
            </div>
            {check.warnings.length
              ? <ul className="mt-2.5 list-disc space-y-1 border-t border-dashed border-hair pt-2.5 pl-4 text-[11.5px] leading-snug text-muted">{check.warnings.map((w) => <li key={w}>{w}</li>)}</ul>
              : <p className="mt-2 text-[11.5px]">Sieht druckfertig aus.</p>}
          </>
        ) : (
          <div className="flex items-center justify-between"><span className="text-muted">Druck-Check</span><Pill tone="warn">Kein Bild</Pill></div>
        )}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-1.5">
        <Button variant="line" className="text-[12.5px]" disabled={!hasImage || busy !== null} onClick={() => run('zip', exportPack)}>{busy === 'zip' ? 'Packe …' : 'ZIP-Paket'}</Button>
        <Button variant="line" className="text-[12.5px]" disabled={!hasImage || busy !== null} onClick={() => run('svg', exportSVG)}>SVG</Button>
      </div>
      <Hint>Das Paket enthält PNG transparent, auf Schwarz und auf Weiß, Druckbericht und Einstellungen.</Hint>
    </Section>
  );
}

interface RenderedVariant extends VariantDefinition { canvas: HTMLCanvasElement }

function VariantsSection() {
  const hasImage = useStudio((s) => Boolean(s.image));
  const [count, setCount] = useState(4);
  const [items, setItems] = useState<RenderedVariant[]>([]);
  const [baseline, setBaseline] = useState<HTMLCanvasElement | null>(null);
  const [compare, setCompare] = useState<RenderedVariant | null>(null);
  const [status, setStatus] = useState('Rendert alternative Richtungen deines aktuellen Looks.');

  const generate = () => {
    const s = useStudio.getState();
    if (!s.preview || !processed.canvas) return;
    setStatus(`${count} Varianten werden gerendert …`);
    setTimeout(() => {
      const scale = Math.min(1, 520 / Math.max(s.preview!.width, s.preview!.height));
      const source = createScaledSourceFromImage(s.preview!, Math.max(1, Math.round(s.preview!.width * scale)), Math.max(1, Math.round(s.preview!.height * scale)));
      const base = document.createElement('canvas');
      base.width = processed.canvas!.width;
      base.height = processed.canvas!.height;
      base.getContext('2d')!.drawImage(processed.canvas!, 0, 0);
      const rendered = createVariantDefinitions(s.controls, count).map((v) => ({ ...v, canvas: renderGraphic(v.preset, source) }));
      setBaseline(base);
      setItems(rendered);
      setStatus('Klick eine Variante, um sie mit dem aktuellen Stand zu vergleichen.');
      setCompare(rendered[0] ?? null);
    }, 30);
  };

  return (
    <Section id="variants" title="Varianten vergleichen">
      <div className="mb-2.5 flex items-center gap-2.5">
        <label htmlFor="variant-count" className="text-[12.5px]">Anzahl</label>
        <select id="variant-count" className="field !w-20" value={count} onChange={(e) => setCount(Number(e.target.value))}>
          <option value={3}>3</option><option value={4}>4</option><option value={6}>6</option>
        </select>
      </div>
      <Button variant="line" disabled={!hasImage} onClick={generate}>Varianten rendern</Button>
      <p className="mt-2.5 text-[11.5px] text-muted">{status}</p>
      {items.length > 0 && (
        <div className="mt-2.5 grid grid-cols-2 gap-2.5">
          {items.map((v) => <VariantCard key={v.name} variant={v} onClick={() => setCompare(v)} />)}
        </div>
      )}
      {compare && baseline && (
        <CompareModal
          title={`Vergleich: ${compare.name}`}
          left={compare.canvas}
          right={baseline}
          leftLabel="Variante"
          rightLabel="Aktuell"
          onClose={() => setCompare(null)}
          onApply={() => { useStudio.getState().setControls(controlsFromPreset(compare.preset) as Controls); setCompare(null); }}
        />
      )}
    </Section>
  );
}

function VariantCard({ variant, onClick }: { variant: RenderedVariant; onClick: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    c.width = variant.canvas.width;
    c.height = variant.canvas.height;
    c.getContext('2d')!.drawImage(variant.canvas, 0, 0);
  }, [variant]);
  return (
    <button type="button" onClick={onClick} className="group grid gap-1 text-left text-[12px] font-semibold">
      <canvas ref={ref} className="aspect-[4/3] h-auto w-full border border-hair bg-paper object-contain group-hover:border-ink" />
      {variant.name}
    </button>
  );
}

function CropSection() {
  const hasImage = useStudio((s) => Boolean(s.image));
  const cropped = useStudio((s) => Boolean(s.image && s.image.working !== s.image.full));
  const tool = useStudio((s) => s.tool);
  const aspect = useStudio((s) => s.cropAspect);
  const set = useStudio((s) => s.set);
  return (
    <Section id="crop" title="Zuschneiden">
      <label htmlFor="crop-aspect" className={fieldLabel}>Seitenverhältnis</label>
      <select id="crop-aspect" className="field" value={aspect} onChange={(e) => set({ cropAspect: e.target.value })}>
        {CROP_ASPECTS.map((a) => <option key={a.value} value={a.value}>{a.value === 'free' ? 'Frei' : a.label}</option>)}
      </select>
      <div className="mt-2.5 grid grid-cols-2 gap-1.5">
        <Button variant="mini" disabled={!hasImage} onClick={() => toggleTool('crop')}>{tool === 'crop' ? 'Rahmen ausblenden' : 'Rahmen setzen'}</Button>
        <Button variant="mini" disabled={tool !== 'crop'} onClick={applyCrop}>Zuschneiden</Button>
      </div>
      <Button variant="mini" className="mt-1.5" disabled={!cropped} onClick={resetCrop}>Original wiederherstellen</Button>
    </Section>
  );
}

function BatchSection() {
  const files = useStudio((s) => s.batchFiles);
  const [progress, setProgress] = useState<string | null>(null);
  const names = files.slice(0, 3).map((f) => f.name).join(', ');
  return (
    <Section id="batch" title="Stapel-Export">
      <p className="mb-2.5 text-[11.5px] text-muted">
        {files.length ? `${files.length} Bild${files.length > 1 ? 'er' : ''}: ${names}${files.length > 3 ? ` und ${files.length - 3} weitere` : ''}` : 'Keine Bilder in der Warteschlange.'}
      </p>
      <Button
        variant="line"
        disabled={files.length < 2 || progress !== null}
        onClick={async () => {
          try { await exportBatch((done, total) => setProgress(`${done}/${total}`)); } finally { setProgress(null); }
        }}
      >
        {progress ? `Bild ${progress} …` : 'Alle als ZIP exportieren'}
      </Button>
      <Hint>Wähle beim Öffnen mehrere Bilder aus. Alle bekommen den aktuellen Look.</Hint>
    </Section>
  );
}

function PerformanceSection() {
  const quality = useStudio((s) => s.previewQuality);
  const useWorker = useStudio((s) => s.useWorker);
  const rendering = useStudio((s) => s.rendering);
  const setPreviewQuality = useStudio((s) => s.setPreviewQuality);
  const set = useStudio((s) => s.set);
  return (
    <Section id="performance" title="Vorschau-Leistung">
      <label htmlFor="preview-quality" className={fieldLabel}>Vorschauqualität</label>
      <select id="preview-quality" className="field" value={quality} onChange={(e) => setPreviewQuality(e.target.value as PreviewQuality)}>
        <option value="fast">Schnell (1100 px)</option>
        <option value="balanced">Ausgewogen (1800 px)</option>
        <option value="exportNear">Nah am Export (2800 px)</option>
      </select>
      <label className="mt-2.5 flex cursor-pointer items-center gap-2 text-[12.5px]">
        <input type="checkbox" className="size-4 accent-ink" checked={useWorker} onChange={(e) => set({ useWorker: e.target.checked })} />
        Im Hintergrund rendern (Web Worker)
      </label>
      <p className="mt-2.5 text-[11.5px] text-muted">{rendering ? 'Rendert …' : 'Bereit.'}</p>
      <Hint>Betrifft nur die Vorschau. Der Export rendert immer in voller Größe.</Hint>
    </Section>
  );
}

export function RightPanel() {
  return (
    <aside aria-label="Export und Workflow" className="scrollbar-thin min-h-0 overflow-y-auto overflow-x-hidden border-l border-ink bg-panel pb-6 max-[900px]:overflow-visible max-[900px]:border-t max-[900px]:border-l-0">
      <ExportSection />
      <VariantsSection />
      <CropSection />
      <BatchSection />
      <PerformanceSection />
    </aside>
  );
}
