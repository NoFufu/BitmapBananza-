import { useStudio } from '../state/store';

const ACCEPTED = ['image/png', 'image/jpeg', 'image/webp'];

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

export const SAMPLE_PHOTOS = ['/samples/sample-1.jpg', '/samples/sample-2.jpg', '/samples/sample-3.jpg', '/samples/sample-4.jpg'];

const photoCache = new Map<string, Promise<HTMLImageElement>>();
export function loadPhoto(url: string): Promise<HTMLImageElement> {
  if (!photoCache.has(url)) {
    photoCache.set(url, new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => { photoCache.delete(url); reject(new Error(`Could not load ${url}`)); };
      img.src = url;
    }));
  }
  return photoCache.get(url)!;
}

let lastSample = -1;
/** Loads one of the sample photos, a different one each time. */
export async function loadSampleImage() {
  lastSample = (lastSample + 1 + Math.floor(Math.random() * (SAMPLE_PHOTOS.length - 1))) % SAMPLE_PHOTOS.length;
  const store = useStudio.getState();
  try {
    const img = await loadPhoto(SAMPLE_PHOTOS[lastSample]);
    store.set({ batchFiles: [] });
    store.loadImage(img, `beispielbild-${lastSample + 1}.jpg`);
  } catch {
    store.notify('Das Beispielbild konnte nicht geladen werden.');
  }
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
