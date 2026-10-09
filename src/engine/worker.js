// Renders previews off the main thread so sliders stay responsive.
import { renderGraphic, createCanvas } from './index.js';

let source = null;
let sourceId = null;

self.onmessage = (event) => {
  const { type } = event.data;
  if (type === 'source') {
    const bitmap = event.data.bitmap;
    const canvas = createCanvas(bitmap.width, bitmap.height);
    canvas.getContext('2d').drawImage(bitmap, 0, 0);
    bitmap.close();
    source = canvas;
    sourceId = event.data.id;
    return;
  }
  if (type === 'render') {
    const { jobId, controls, strokes } = event.data;
    if (!source || event.data.sourceId !== sourceId) {
      self.postMessage({ jobId, error: 'stale-source' });
      return;
    }
    try {
      const out = renderGraphic(controls, source, strokes);
      const image = out.getContext('2d').getImageData(0, 0, out.width, out.height);
      self.postMessage({ jobId, width: out.width, height: out.height, buffer: image.data.buffer }, [image.data.buffer]);
    } catch (error) {
      self.postMessage({ jobId, error: String(error && error.message ? error.message : error) });
    }
  }
};
