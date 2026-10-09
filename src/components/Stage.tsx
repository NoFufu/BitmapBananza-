import { motion } from 'motion/react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { clamp, eraseOnCanvas } from '../engine';
import { openFiles } from '../lib/files';
import { processed, useStudio } from '../state/store';
import { CropOverlay } from './CropOverlay';
import { Dock } from './Dock';
import { EmptyState } from './EmptyState';
import { Navigator } from './Navigator';
import { cx } from './ui';

const ZOOM_MIN = 10;
const ZOOM_MAX = 1000;
const BAYER8 = [
  [0, 32, 8, 40, 2, 34, 10, 42], [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38], [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41], [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37], [63, 31, 55, 23, 61, 29, 53, 21]
];
const REVEAL_MS = 750;

/** Ordered-dither mask: cells whose Bayer rank is above t stay opaque. */
function bayerTile(t: number, cell: number) {
  const tile = document.createElement('canvas');
  tile.width = tile.height = cell * 8;
  const g = tile.getContext('2d')!;
  g.fillStyle = '#000';
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) if (BAYER8[y][x] / 64 >= t) g.fillRect(x * cell, y * cell, cell, cell);
  return tile;
}

export function zoomAt(newZoom: number, clientX?: number, clientY?: number) {
  const s = useStudio.getState();
  const canvas = document.getElementById('display-canvas') as HTMLCanvasElement | null;
  const zoom = clamp(Math.round(newZoom), ZOOM_MIN, ZOOM_MAX);
  if (!canvas || clientX === undefined || clientY === undefined || zoom === s.zoom) { s.setView({ zoom }); return; }
  const rect = canvas.getBoundingClientRect();
  const relX = rect.width ? clamp((clientX - rect.left) / rect.width, 0, 1) : 0.5;
  const relY = rect.height ? clamp((clientY - rect.top) / rect.height, 0, 1) : 0.5;
  const w = canvas.width * zoom / 100;
  const h = canvas.height * zoom / 100;
  s.setView({ zoom, panX: s.panX - (w - rect.width) * (relX - 0.5), panY: s.panY - (h - rect.height) * (relY - 0.5) });
}

export function stepZoom(direction: 1 | -1) {
  zoomAt(useStudio.getState().zoom * Math.pow(1.25, direction));
}

export function Stage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealRef = useRef<{ start: number; id: number } | null>(null);
  const lastRevealId = useRef(0);
  const [dragOver, setDragOver] = useState(false);

  const image = useStudio((s) => s.image);
  const renderVersion = useStudio((s) => s.renderVersion);
  const rendering = useStudio((s) => s.rendering);
  const viewMode = useStudio((s) => s.viewMode);
  const split = useStudio((s) => s.split);
  const maskPreview = useStudio((s) => s.maskPreview);
  const zoom = useStudio((s) => s.zoom);
  const panX = useStudio((s) => s.panX);
  const panY = useStudio((s) => s.panY);
  const fitRequest = useStudio((s) => s.fitRequest);
  const tool = useStudio((s) => s.tool);
  const transparent = useStudio((s) => s.controls.transparent);
  const pixel = useStudio((s) => s.controls.graphicMode === 'pixelBitmap');
  const revealId = useStudio((s) => s.revealId);
  const preview = useStudio((s) => s.preview);

  const draw = useCallback(() => {
    const out = canvasRef.current;
    const src = processed.canvas;
    const state = useStudio.getState();
    if (!out || !src || !state.preview) return;
    if (out.width !== src.width || out.height !== src.height) { out.width = src.width; out.height = src.height; }
    const ctx = out.getContext('2d')!;
    ctx.clearRect(0, 0, out.width, out.height);
    ctx.imageSmoothingEnabled = !pixel;

    if (state.maskPreview) {
      ctx.drawImage(src, 0, 0);
      const data = ctx.getImageData(0, 0, out.width, out.height);
      const px = data.data;
      for (let i = 0; i < px.length; i += 4) {
        const keep = px[i + 3] > 0 && px[i] < 245;
        px[i] = px[i + 1] = px[i + 2] = keep ? 0 : 255;
        px[i + 3] = 255;
      }
      ctx.putImageData(data, 0, 0);
      return;
    }

    if (state.viewMode === 'original') {
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(state.preview, 0, 0, out.width, out.height);
      return;
    }

    ctx.drawImage(src, 0, 0);
    if (state.viewMode === 'split') {
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, Math.round(out.width * state.split), out.height);
      ctx.clip();
      ctx.clearRect(0, 0, out.width, out.height);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(state.preview, 0, 0, out.width, out.height);
      ctx.restore();
    }

    // Load reveal: the photo dissolves into the graphic through an 8x8 Bayer matrix.
    const reveal = revealRef.current;
    if (reveal) {
      const t = (performance.now() - reveal.start) / REVEAL_MS;
      if (t >= 1) { revealRef.current = null; return; }
      const tmp = document.createElement('canvas');
      tmp.width = out.width;
      tmp.height = out.height;
      const tg = tmp.getContext('2d')!;
      tg.drawImage(state.preview, 0, 0, out.width, out.height);
      tg.globalCompositeOperation = 'destination-in';
      tg.fillStyle = tg.createPattern(bayerTile(t, Math.max(3, Math.round(out.width / 160))), 'repeat')!;
      tg.fillRect(0, 0, out.width, out.height);
      ctx.drawImage(tmp, 0, 0);
      requestAnimationFrame(draw);
    }
  }, [pixel]);

  // Fit on new images and on request.
  const fit = useCallback(() => {
    const stage = stageRef.current;
    const src = processed.canvas;
    if (!stage || !src) return;
    const availW = Math.max(160, stage.clientWidth - 72);
    const availH = Math.max(160, stage.clientHeight - 150);
    const value = Math.floor((Math.min(availW / src.width, availH / src.height) * 100) / 5) * 5;
    useStudio.getState().setView({ zoom: clamp(value, ZOOM_MIN, ZOOM_MAX), panX: 0, panY: 0 });
  }, []);

  useLayoutEffect(() => {
    const s = useStudio.getState();
    if (!processed.canvas || !s.image) return;
    if (s.pendingFit) {
      useStudio.setState({ pendingFit: false });
      fit();
      if (revealId !== lastRevealId.current && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        lastRevealId.current = revealId;
        revealRef.current = { start: performance.now(), id: revealId };
      }
    }
    draw();
  }, [renderVersion, viewMode, split, maskPreview, draw, fit, revealId, preview]);

  useEffect(() => { if (fitRequest) fit(); }, [fitRequest, fit]);

  // ---------- Pan, wheel zoom, pinch ----------
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const panStart = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const pinchStart = useRef<{ dist: number; zoom: number } | null>(null);
  const erasing = useRef(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onWheel = (e: WheelEvent) => {
      if (!useStudio.getState().image) return;
      e.preventDefault();
      const factor = Math.exp(-clamp(e.deltaY, -120, 120) * 0.0018);
      zoomAt(useStudio.getState().zoom * factor, e.clientX, e.clientY);
    };
    stage.addEventListener('wheel', onWheel, { passive: false });
    return () => stage.removeEventListener('wheel', onWheel);
  }, []);

  const eraseAt = (e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    const src = processed.canvas;
    if (!canvas || !src) return;
    const rect = canvas.getBoundingClientRect();
    const s = useStudio.getState();
    const stroke = {
      x: clamp((e.clientX - rect.left) / rect.width, 0, 1),
      y: clamp((e.clientY - rect.top) / rect.height, 0, 1),
      r: s.eraserSize / Math.max(src.width, src.height)
    };
    s.addStroke(stroke);
    eraseOnCanvas(src, [stroke], s.controls.transparent);
    draw();
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = useStudio.getState();
    if (!s.image || e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest('button, [data-no-pan], input, select')) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    stageRef.current?.setPointerCapture(e.pointerId);

    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinchStart.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), zoom: s.zoom };
      panStart.current = null;
      erasing.current = false;
      return;
    }
    if (s.tool === 'eraser' && target === canvasRef.current) {
      erasing.current = true;
      eraseAt(e);
      return;
    }
    if (s.tool === 'crop') return;
    panStart.current = { x: e.clientX, y: e.clientY, panX: s.panX, panY: s.panY };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pinchStart.current && pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      zoomAt(pinchStart.current.zoom * (dist / pinchStart.current.dist), (a.x + b.x) / 2, (a.y + b.y) / 2);
      return;
    }
    if (erasing.current) { eraseAt(e); return; }
    if (panStart.current) {
      useStudio.getState().setView({
        panX: panStart.current.panX + e.clientX - panStart.current.x,
        panY: panStart.current.panY + e.clientY - panStart.current.y
      });
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinchStart.current = null;
    if (!pointers.current.size) { panStart.current = null; erasing.current = false; }
  };

  // ---------- Drop ----------
  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragOver(true); };
  const onDragLeave = (e: React.DragEvent) => { if (!stageRef.current?.contains(e.relatedTarget as Node)) setDragOver(false); };
  const onDrop = (e: React.DragEvent) => { e.preventDefault(); setDragOver(false); openFiles(e.dataTransfer.files); };

  const width = processed.canvas ? Math.max(1, Math.round(processed.canvas.width * zoom / 100)) : 0;
  const height = processed.canvas ? Math.max(1, Math.round(processed.canvas.height * zoom / 100)) : 0;
  const hasCanvas = Boolean(image && processed.canvas && renderVersion);
  const panning = Boolean(panStart.current);

  return (
    <section
      ref={stageRef}
      id="stage"
      aria-label="Arbeitsfläche"
      className={cx(
        'mat relative min-w-0 touch-none overflow-hidden select-none',
        image && tool === 'none' && (panning ? 'cursor-grabbing' : 'cursor-grab'),
        'max-[900px]:sticky max-[900px]:top-[52px] max-[900px]:z-20 max-[900px]:order-first max-[900px]:h-[52vh] max-[900px]:min-h-80 max-[900px]:border-b max-[900px]:border-ink'
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onDragOver={onDragOver}
      onDragEnter={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div
        className="absolute top-[calc(50%-26px)] left-1/2 z-[2]"
        style={{ transform: `translate(calc(-50% + ${panX}px), calc(-50% + ${panY}px))` }}
      >
      <motion.div
        className={cx('relative bg-paper', rendering && 'is-rendering', transparent && hasCanvas && 'checker')}
        style={{ boxShadow: '0 1px 0 rgba(0,0,0,.25), 0 18px 40px -18px rgba(0,0,0,.55)' }}
        animate={dragOver ? { scale: 1.02, rotate: -0.6 } : { scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        <span aria-hidden className="crop-marks pointer-events-none absolute -inset-[18px]" />
        {dragOver && <span aria-hidden className="pointer-events-none absolute -inset-2.5 outline-3 outline-npb" />}
        {!hasCanvas && <EmptyState dragOver={dragOver} loading={Boolean(image)} />}
        <canvas
          id="display-canvas"
          ref={canvasRef}
          hidden={!hasCanvas}
          className={cx('block', tool === 'eraser' && 'cursor-cell', tool === 'crop' && 'cursor-crosshair')}
          style={{ width, height, imageRendering: pixel ? 'pixelated' : 'auto' }}
        />
        {hasCanvas && viewMode === 'split' && !maskPreview && tool !== 'crop' && <SplitHandle canvasRef={canvasRef} onMove={draw} />}
        {hasCanvas && tool === 'crop' && <CropOverlay />}
        <div aria-hidden className="scan-line pointer-events-none absolute inset-x-0 top-0 z-[6] h-0.5 bg-npb shadow-[0_0_12px_2px_rgba(138,207,232,.8)]" />
      </motion.div>
      </div>

      <Dock />
      {hasCanvas && <Navigator />}
    </section>
  );
}

function SplitHandle({ canvasRef, onMove }: { canvasRef: React.RefObject<HTMLCanvasElement | null>; onMove: () => void }) {
  const split = useStudio((s) => s.split);
  const setView = useStudio((s) => s.setView);
  const update = (clientX: number) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    setView({ split: clamp((clientX - rect.left) / rect.width, 0, 1) });
    requestAnimationFrame(onMove);
  };
  return (
    <div
      data-no-pan
      role="slider"
      tabIndex={0}
      aria-label="Vorher/Nachher-Teilung"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(split * 100)}
      className="absolute inset-y-0 z-[7] -ml-3 w-6 cursor-ew-resize touch-none"
      style={{ left: `${split * 100}%` }}
      onPointerDown={(e) => { e.stopPropagation(); (e.target as HTMLElement).setPointerCapture(e.pointerId); }}
      onPointerMove={(e) => { if (e.buttons) update(e.clientX); }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') setView({ split: clamp(split - 0.02, 0, 1) });
        if (e.key === 'ArrowRight') setView({ split: clamp(split + 0.02, 0, 1) });
      }}
    >
      <span className="absolute inset-y-0 left-[11px] w-0.5 bg-npb" />
      <span className="absolute top-1/2 left-0.5 h-8 w-5 -translate-y-1/2 rounded-[10px] border-2 border-npb-strong bg-paper" />
    </div>
  );
}
