import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'motion/react';
import { CircleDot, Crop, Eraser, Keyboard, Maximize, Minus, Plus } from 'lucide-react';
import { useRef, type ReactNode } from 'react';
import { applyCrop, toggleMask, toggleTool } from '../lib/actions';
import { useStudio, type ViewMode } from '../state/store';
import { CROP_ASPECTS } from './CropOverlay';
import { stepZoom } from './Stage';
import { Button, Segmented, cx } from './ui';

/** Icon that grows as the pointer approaches (Aceternity "Floating Dock"), kept subtle. */
function MagnifyIcon({
  mouseX,
  label,
  pressed,
  disabled,
  onClick,
  children
}: {
  mouseX: MotionValue<number>;
  label: string;
  pressed?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const distance = useTransform(mouseX, (x) => {
    const r = ref.current?.getBoundingClientRect();
    return r ? x - (r.left + r.width / 2) : Infinity;
  });
  const size = useSpring(useTransform(distance, [-90, 0, 90], [32, 40, 32]), { stiffness: 380, damping: 26, mass: 0.2 });
  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={pressed}
      disabled={disabled}
      onClick={onClick}
      style={{ width: size, height: size }}
      className={cx(
        'grid shrink-0 place-items-center rounded-md disabled:opacity-35',
        pressed ? 'bg-ink text-paper' : 'hover:enabled:bg-panel'
      )}
    >
      {children}
    </motion.button>
  );
}

export function Dock() {
  const hasImage = useStudio((s) => Boolean(s.image));
  const viewMode = useStudio((s) => s.viewMode);
  const zoom = useStudio((s) => s.zoom);
  const tool = useStudio((s) => s.tool);
  const maskPreview = useStudio((s) => s.maskPreview);
  const setView = useStudio((s) => s.setView);
  const requestFit = useStudio((s) => s.requestFit);
  const set = useStudio((s) => s.set);
  const mouseX = useMotionValue(Infinity);

  return (
    <>
      <AnimatePresence>{tool === 'crop' && <CropBar />}</AnimatePresence>
      <div
        role="toolbar"
        aria-label="Ansicht und Werkzeuge"
        data-no-pan
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="absolute bottom-[18px] left-1/2 z-10 flex h-12 max-w-[calc(100%-24px)] -translate-x-1/2 items-center gap-1 overflow-x-auto rounded-[10px] border border-ink bg-paper px-1 shadow-[0_8px_24px_-10px_rgba(0,0,0,.5)] [scrollbar-width:none] max-[900px]:bottom-2.5"
      >
        <Segmented<ViewMode>
          id="view"
          value={viewMode}
          disabled={!hasImage}
          onChange={(v) => setView({ viewMode: v })}
          options={[
            { value: 'original', label: 'Vorher', title: 'Vorher (B gedrückt halten)' },
            { value: 'split', label: 'Teilen', title: 'Teilen (S)' },
            { value: 'processed', label: 'Nachher', title: 'Nachher' }
          ]}
        />
        <span className="mx-0.5 h-6 w-px shrink-0 bg-hair" />
        <div className="flex shrink-0 items-center gap-0.5">
          <button
            type="button"
            aria-label="Verkleinern"
            title="Verkleinern (−)"
            disabled={!hasImage}
            onClick={() => stepZoom(-1)}
            className="grid size-8 max-[1180px]:hidden place-items-center rounded-md hover:enabled:bg-panel disabled:opacity-35"
          >
            <Minus size={17} />
          </button>
          <button
            type="button"
            title="100 % (1)"
            disabled={!hasImage}
            onClick={() => setView({ zoom: 100 })}
            className="h-8 min-w-14 rounded-md text-[12.5px] font-semibold tabular hover:enabled:bg-panel disabled:opacity-35 max-[1180px]:min-w-12 max-[520px]:hidden"
          >
            {Math.round(zoom)}%
          </button>
          <button
            type="button"
            aria-label="Vergrößern"
            title="Vergrößern (+)"
            disabled={!hasImage}
            onClick={() => stepZoom(1)}
            className="grid size-8 max-[1180px]:hidden place-items-center rounded-md hover:enabled:bg-panel disabled:opacity-35"
          >
            <Plus size={17} />
          </button>
          <button
            type="button"
            aria-label="Einpassen"
            title="Einpassen (F)"
            disabled={!hasImage}
            onClick={requestFit}
            className="grid size-8 place-items-center rounded-md hover:enabled:bg-panel disabled:opacity-35"
          >
            <Maximize size={16} />
          </button>
        </div>
        <span className="mx-0.5 h-6 w-px shrink-0 bg-hair" />
        <div className="flex shrink-0 items-center gap-0.5">
          <MagnifyIcon
            mouseX={mouseX}
            label="Zuschneiden (C)"
            pressed={tool === 'crop'}
            disabled={!hasImage}
            onClick={() => toggleTool('crop')}
          >
            <Crop size={17} />
          </MagnifyIcon>
          <MagnifyIcon
            mouseX={mouseX}
            label="Radierer (E)"
            pressed={tool === 'eraser'}
            disabled={!hasImage}
            onClick={() => toggleTool('eraser')}
          >
            <Eraser size={17} />
          </MagnifyIcon>
          <MagnifyIcon mouseX={mouseX} label="Maske anzeigen (M)" pressed={maskPreview} disabled={!hasImage} onClick={toggleMask}>
            <CircleDot size={17} />
          </MagnifyIcon>
          <span className="max-[1180px]:hidden">
            <MagnifyIcon mouseX={mouseX} label="Tastenkürzel (?)" onClick={() => set({ shortcutsOpen: true })}>
              <Keyboard size={17} />
            </MagnifyIcon>
          </span>
        </div>
      </div>
    </>
  );
}

/** Crop mode hangs from the top edge of the stage like a notch. */
function CropBar() {
  const aspect = useStudio((s) => s.cropAspect);
  const set = useStudio((s) => s.set);
  const setTool = useStudio((s) => s.setTool);
  return (
    <motion.div
      data-no-pan
      initial={{ y: -48 }}
      animate={{ y: 0 }}
      exit={{ y: -48 }}
      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
      className="absolute inset-x-0 top-0 z-[11] mx-auto flex w-fit max-w-[calc(100%-16px)] items-center gap-2 rounded-b-[10px] border border-t-0 border-ink bg-paper py-1.5 pr-1.5 pl-2"
    >
      <Segmented
        id="aspect"
        size="sm"
        value={aspect}
        onChange={(v) => set({ cropAspect: v })}
        options={CROP_ASPECTS.map((a) => ({ value: a.value, label: a.label }))}
      />
      <Button variant="mini" className="!w-auto" onClick={() => setTool('none')}>
        Abbrechen
      </Button>
      <Button variant="mini" className="!w-auto !border-ink !bg-ink !text-paper" onClick={applyCrop}>
        Zuschneiden
      </Button>
    </motion.div>
  );
}
