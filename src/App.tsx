import { useEffect, useRef, useState } from 'react';
import { CommandPalette } from './components/CommandPalette';
import { LeftPanel } from './components/LeftPanel';
import { ShortcutsDialog, Toast } from './components/Overlays';
import { RightPanel } from './components/RightPanel';
import { Stage } from './components/Stage';
import { TopBar } from './components/TopBar';
import { Renderer } from './state/Renderer';
import { useShortcuts } from './state/useShortcuts';

const STORAGE = { left: 'levisBitmapBananzaLeftWidthV2', right: 'levisBitmapBananzaRightWidthV2' };

function readWidth(key: string, fallback: number) {
  try {
    const v = Number(localStorage.getItem(key));
    return Number.isFinite(v) && v > 0 ? v : fallback;
  } catch { return fallback; }
}

/** Drag handle between a sidebar and the stage; arrow keys work too. */
function Resizer({ side, width, onChange }: { side: 'left' | 'right'; width: number; onChange: (w: number) => void }) {
  const start = useRef<{ x: number; w: number } | null>(null);
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label={side === 'left' ? 'Linke Leiste skalieren' : 'Rechte Leiste skalieren'}
      aria-valuenow={Math.round(width)}
      tabIndex={0}
      className="group absolute inset-y-0 z-20 w-3 cursor-col-resize touch-none max-[900px]:hidden"
      style={side === 'left' ? { left: width - 6 } : { right: width - 6 }}
      onPointerDown={(e) => { start.current = { x: e.clientX, w: width }; e.currentTarget.setPointerCapture(e.pointerId); }}
      onPointerMove={(e) => {
        if (!start.current) return;
        const delta = e.clientX - start.current.x;
        onChange(start.current.w + (side === 'left' ? delta : -delta));
      }}
      onPointerUp={() => { start.current = null; }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') onChange(width + (side === 'left' ? -16 : 16));
        if (e.key === 'ArrowRight') onChange(width + (side === 'left' ? 16 : -16));
      }}
    >
      <span className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-npb opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
    </div>
  );
}

export default function App() {
  useShortcuts();
  const compact = typeof window !== 'undefined' && window.innerWidth < 1200;
  const [left, setLeft] = useState(() => readWidth(STORAGE.left, compact ? 240 : 264));
  const [right, setRight] = useState(() => readWidth(STORAGE.right, compact ? 236 : 252));

  const clampWidth = (w: number) => Math.min(520, Math.max(220, w));
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE.left, String(Math.round(left)));
      localStorage.setItem(STORAGE.right, String(Math.round(right)));
    } catch { /* storage blocked: widths just are not remembered */ }
  }, [left, right]);

  return (
    <div className="grid h-dvh grid-rows-[56px_minmax(0,1fr)] overflow-hidden max-[900px]:block max-[900px]:h-auto max-[900px]:overflow-visible">
      <TopBar />
      <main
        className="relative grid min-h-0 max-[900px]:flex max-[900px]:flex-col"
        style={{ gridTemplateColumns: `${left}px minmax(0,1fr) ${right}px` }}
      >
        <LeftPanel />
        <Stage />
        <RightPanel />
        <Resizer side="left" width={left} onChange={(w) => setLeft(clampWidth(w))} />
        <Resizer side="right" width={right} onChange={(w) => setRight(clampWidth(w))} />
      </main>
      <Renderer />
      <CommandPalette />
      <ShortcutsDialog />
      <Toast />
    </div>
  );
}
