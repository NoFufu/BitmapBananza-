import { useStudio } from '../state/store';

export const ACCEPTED = ['image/png', 'image/jpeg', 'image/webp'];

export function loadImageElement(file: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Image load failed')); };
    img.src = url;
  });
}

/** Opens the first image and queues all of them for batch export. */
export async function openFiles(list: FileList | File[] | null | undefined) {
  const files = Array.from(list ?? []).filter((f) => f.type.startsWith('image/'));
  const store = useStudio.getState();
  if (!files.length) {
    if (list && Array.from(list).length) store.notify('Das ist kein Bild. Unterstützt werden PNG, JPG und WEBP.');
    return;
  }
  store.set({ batchFiles: files });
  try {
    const img = await loadImageElement(files[0]);
    store.loadImage(img, files[0].name);
    const base = files[0].name.replace(/\.[^.]+$/, '');
    if (base) store.set({ exportName: base.toLowerCase().replace(/[^a-z0-9äöüß]+/gi, '-').replace(/^-|-$/g, '') || 'levis-bitmap-bananza' });
  } catch {
    store.notify('Dieses Bild konnte nicht geladen werden. Unterstützt werden PNG, JPG und WEBP.');
  }
}

let picker: HTMLInputElement | null = null;
export function pickFiles() {
  if (!picker) {
    picker = document.createElement('input');
    picker.type = 'file';
    picker.accept = ACCEPTED.join(',');
    picker.multiple = true;
    picker.hidden = true;
    picker.addEventListener('change', () => { openFiles(picker!.files); picker!.value = ''; });
    // Some browsers only open the dialog for inputs that are in the document.
    document.body.appendChild(picker);
  }
  picker.click();
}

/** A generated portrait with soft gradients, hard shapes and type, so every look has something to work on. */
export function loadSampleImage() {
  const c = document.createElement('canvas');
  c.width = 1400;
  c.height = 1050;
  const g = c.getContext('2d')!;
  const bg = g.createRadialGradient(420, 300, 40, 600, 520, 900);
  bg.addColorStop(0, '#fbe9d2');
  bg.addColorStop(0.45, '#a87850');
  bg.addColorStop(1, '#1e150f');
  g.fillStyle = bg;
  g.fillRect(0, 0, c.width, c.height);
  for (let i = 0; i < 14; i++) {
    g.strokeStyle = `rgba(255,255,255,${0.04 + i * 0.012})`;
    g.lineWidth = 3;
    g.beginPath();
    g.arc(1150, 180, 60 + i * 26, 0, Math.PI * 2);
    g.stroke();
  }
  const face = g.createRadialGradient(640, 430, 30, 700, 520, 330);
  face.addColorStop(0, '#f7d6b6');
  face.addColorStop(0.6, '#c38a60');
  face.addColorStop(1, '#4d301f');
  g.fillStyle = face;
  g.beginPath();
  g.ellipse(700, 540, 250, 320, 0, 0, Math.PI * 2);
  g.fill();
  const hair = g.createLinearGradient(0, 160, 0, 420);
  hair.addColorStop(0, '#120b07');
  hair.addColorStop(1, '#4a2f1d');
  g.fillStyle = hair;
  g.beginPath();
  g.ellipse(700, 330, 290, 170, 0, Math.PI, 0);
  g.fill();
  g.fillStyle = '#1d120b';
  g.beginPath(); g.ellipse(605, 510, 42, 20, 0, 0, Math.PI * 2); g.fill();
  g.beginPath(); g.ellipse(795, 510, 42, 20, 0, 0, Math.PI * 2); g.fill();
  g.strokeStyle = '#5a2a1e';
  g.lineWidth = 16;
  g.lineCap = 'round';
  g.beginPath(); g.arc(700, 640, 90, 0.15 * Math.PI, 0.85 * Math.PI); g.stroke();
  g.fillStyle = '#ffffff';
  g.font = '900 150px "Archivo Variable", Arial Black, Arial, sans-serif';
  g.fillText('BANANZA', 60, 1000);
  const store = useStudio.getState();
  store.set({ batchFiles: [] });
  store.loadImage(c, 'beispielbild.png');
}

export function downloadBlob(blob: Blob, name: string) {
  const link = document.createElement('a');
  link.download = name;
  link.href = URL.createObjectURL(blob);
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1500);
}

export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), 'image/png'));
}
