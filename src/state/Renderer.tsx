import { useEffect, useRef } from 'react';
import { renderGraphic, createCanvas } from '../engine';
import { useStudio } from './store';

// Renders the preview whenever controls, the source image or the eraser change.
// One job in flight at a time; while it runs, only the newest request is kept.
export function Renderer() {
  const controls = useStudio((s) => s.controls);
  const preview = useStudio((s) => s.preview);
  const previewId = useStudio((s) => s.previewId);
  const strokesVersion = useStudio((s) => s.strokesVersion);
  const useWorker = useStudio((s) => s.useWorker);

  const workerRef = useRef<Worker | null>(null);
  const workerSourceId = useRef<number>(-1);
  const inFlight = useRef<number | null>(null);
  const pending = useRef<(() => void) | null>(null);
  const jobCounter = useRef(0);

  useEffect(() => () => workerRef.current?.terminate(), []);

  useEffect(() => {
    if (!preview) return;
    const state = useStudio.getState();
    useStudio.setState({ rendering: true });

    const run = () => {
      const jobId = ++jobCounter.current;
      const { controls: current, strokes } = useStudio.getState();
      const finish = () => {
        inFlight.current = null;
        const next = pending.current;
        pending.current = null;
        if (next) next();
      };

      const renderHere = () => {
        try {
          const out = renderGraphic(current, preview, strokes);
          useStudio.getState().setRendered(out);
        } catch (error) {
          console.error(error);
          useStudio.getState().notify('Die Vorschau konnte nicht gerendert werden.');
          useStudio.setState({ rendering: false });
        }
        finish();
      };

      inFlight.current = jobId;
      // Pixel mode downsamples with drawImage, which OffscreenCanvas does slightly differently;
      // it is cheap, so it stays on the main thread like in the original tool.
      if (!useWorker || current.graphicMode === 'pixelBitmap' || typeof Worker === 'undefined' || typeof OffscreenCanvas === 'undefined') {
        requestAnimationFrame(renderHere);
        return;
      }

      const worker = ensureWorker();
      const send = () => worker.postMessage({ type: 'render', jobId, sourceId: previewId, controls: current, strokes });
      worker.onmessage = (event: MessageEvent) => {
        const data = event.data;
        if (data.jobId !== jobId) return;
        if (data.error) {
          // Fall back to the main thread once, e.g. when the browser lacks OffscreenCanvas features.
          renderHere();
          return;
        }
        const canvas = createCanvas(data.width, data.height);
        canvas.getContext('2d')!.putImageData(new ImageData(new Uint8ClampedArray(data.buffer), data.width, data.height), 0, 0);
        useStudio.getState().setRendered(canvas);
        finish();
      };
      worker.onerror = () => {
        workerRef.current?.terminate();
        workerRef.current = null;
        workerSourceId.current = -1;
        renderHere();
      };
      if (workerSourceId.current !== previewId) {
        workerSourceId.current = previewId;
        createImageBitmap(preview).then((bitmap) => {
          worker.postMessage({ type: 'source', id: previewId, bitmap }, [bitmap]);
          send();
        });
      } else {
        send();
      }
    };

    const timer = window.setTimeout(
      () => {
        if (inFlight.current !== null) pending.current = run;
        else run();
      },
      state.pendingFit ? 0 : 48
    );
    return () => window.clearTimeout(timer);
  }, [controls, preview, previewId, strokesVersion, useWorker]);

  function ensureWorker() {
    if (!workerRef.current) {
      workerRef.current = new Worker(new URL('../engine/worker.js', import.meta.url), { type: 'module' });
      workerSourceId.current = -1;
    }
    return workerRef.current;
  }

  return null;
}
