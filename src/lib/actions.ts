import { createCanvas } from '../engine';
import { useStudio } from '../state/store';

export function applyCrop() {
  const s = useStudio.getState();
  if (!s.image || !s.cropRect) return;
  const src = s.image.working;
  const r = s.cropRect;
  const sx = Math.round(r.x * src.width);
  const sy = Math.round(r.y * src.height);
  const sw = Math.max(1, Math.round(r.w * src.width));
  const sh = Math.max(1, Math.round(r.h * src.height));
  const out = createCanvas(sw, sh);
  out.getContext('2d')!.drawImage(src, sx, sy, sw, sh, 0, 0, sw, sh);
  s.setWorking(out);
  s.notify(`Zugeschnitten auf ${sw} × ${sh} px.`);
}

export function resetCrop() {
  const s = useStudio.getState();
  if (!s.image || s.image.working === s.image.full) return;
  s.setWorking(s.image.full);
  s.notify('Original wiederhergestellt.');
}

export function toggleTool(tool: 'crop' | 'eraser') {
  const s = useStudio.getState();
  if (!s.image) return;
  s.setTool(s.tool === tool ? 'none' : tool);
}

export function toggleSplit() {
  const s = useStudio.getState();
  if (!s.image) return;
  s.setView({ viewMode: s.viewMode === 'split' ? 'processed' : 'split' });
}

export function toggleMask() {
  const s = useStudio.getState();
  if (!s.image) return;
  s.setView({ maskPreview: !s.maskPreview });
}
