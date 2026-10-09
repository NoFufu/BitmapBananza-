import { RotateCcw } from 'lucide-react';
import { DEFAULT_CONTROLS, type ControlDef, type ControlKey, type SliderDef } from '../lib/controls';
import { useStudio } from '../state/store';
import { cx } from './ui';

function Slider({ def }: { def: SliderDef }) {
  const key = def.key as ControlKey;
  const value = useStudio((s) => s.controls[key]) as number;
  const setControl = useStudio((s) => s.setControl);
  const commit = useStudio((s) => s.commit);
  const fallback = DEFAULT_CONTROLS[key] as number;
  const dirty = value !== fallback;
  const p = ((value - def.min) / (def.max - def.min || 1)) * 100;

  const reset = () => {
    if (!dirty) return;
    setControl(key, fallback as never);
    commit();
  };

  return (
    <div data-control={key} className="rounded-sm">
      <label htmlFor={`c-${key}`} className="mt-3.5 mb-1.5 flex items-baseline gap-1.5 text-[12.5px]">
        <span>{def.label}</span>
        {dirty && (
          <button
            type="button"
            onClick={reset}
            title={`Auf ${fallback}${def.unit ?? ''} zurücksetzen`}
            aria-label={`${def.label} zurücksetzen`}
            className="ml-auto inline-grid size-5 place-items-center self-center rounded text-muted hover:bg-panel-deep hover:text-ink"
          >
            <RotateCcw size={12} strokeWidth={2} />
          </button>
        )}
        <span className={cx('tabular font-semibold', !dirty && 'ml-auto')}>{value}{def.unit ?? ''}</span>
      </label>
      <input
        id={`c-${key}`}
        type="range"
        className={cx('range', def.tone && 'range-tone')}
        min={def.min}
        max={def.max}
        step={def.step ?? 1}
        value={value}
        style={{ ['--p' as string]: `${p}%` }}
        onChange={(e) => setControl(key, Number(e.target.value) as never)}
        onPointerUp={commit}
        onKeyUp={commit}
        onBlur={commit}
        onDoubleClick={reset}
      />
    </div>
  );
}

export function ControlField({ def }: { def: ControlDef }) {
  const key = def.key as ControlKey;
  const controls = useStudio((s) => s.controls);
  const setControl = useStudio((s) => s.setControl);
  const commit = useStudio((s) => s.commit);

  if (def.showIf && !def.showIf(controls)) return null;
  if (def.kind === 'slider') return <Slider def={def} />;

  if (def.kind === 'select') {
    const groups = Array.from(new Set(def.options.map((o) => o.group).filter(Boolean))) as string[];
    return (
      <div data-control={key} className="rounded-sm">
        <label htmlFor={`c-${key}`} className="mt-3.5 mb-1.5 block text-[12.5px]">{def.label}</label>
        <select
          id={`c-${key}`}
          className="field"
          value={controls[key] as string}
          onChange={(e) => { setControl(key, e.target.value as never); commit(); }}
        >
          {groups.length
            ? groups.map((g) => (
              <optgroup key={g} label={g}>
                {def.options.filter((o) => o.group === g).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </optgroup>
            ))
            : def.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        {def.hint && <p className="mt-1.5 text-[11.5px] leading-snug text-muted">{def.hint}</p>}
      </div>
    );
  }

  return (
    <label data-control={key} className="mt-2.5 flex cursor-pointer items-center gap-2 rounded-sm text-[12.5px]">
      <input
        id={`c-${key}`}
        type="checkbox"
        className="size-4 accent-ink"
        checked={controls[key] as boolean}
        onChange={(e) => { setControl(key, e.target.checked as never); commit(); }}
      />
      {def.label}
    </label>
  );
}
