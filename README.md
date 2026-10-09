[README.md](https://github.com/user-attachments/files/33246894/README.md)
# Levi's Bitmap Bananza

Browser tool that turns photos into print-ready black/white graphics: dithering, halftone, xerox distress, shirt-edge masks, crop, variant comparison and PNG/SVG/ZIP export.

Live: https://lbbstudio.pages.dev/

Everything runs client-side in the browser. Built with React, Vite, Tailwind CSS and Motion.

## Develop

```sh
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into dist/
npm run preview    # serve dist/
```

Node 22 is expected (see `.nvmrc`).

## Structure

```
src/engine/        image engine, ported verbatim from the original single-file tool
  core.js          pixel algorithms; DOM reads replaced by parameters
  index.js         public API: renderGraphic, renderAtSize, analysis, SVG
  worker.js        renders previews off the main thread
src/lib/           control schema, export, file loading, shared actions
src/state/         Zustand store (controls, history, view, tools), renderer, shortcuts
src/components/    UI: looks, controls, stage, dock, crop, palette, compare, export
public/            favicon and original logo
```

Every control is defined once in `src/lib/controls.ts`. Sliders, the command palette, the "changed" dots and reset all read from there, so a new control only needs one entry.

The engine output is pixel-identical to the original tool for all eight looks, both in the worker and on the main thread. Pixel Bitmap mode always renders on the main thread because OffscreenCanvas downsamples slightly differently.

## Shortcuts

| Keys | Action |
| --- | --- |
| Ctrl/⌘ K | Search any control or action |
| Ctrl/⌘ O | Open image |
| Ctrl/⌘ S | Export PNG |
| Ctrl/⌘ Z, Ctrl/⌘ ⇧ Z | Undo, redo |
| B (hold) | Show original |
| S | Split before/after |
| F, 1, + / − | Fit, 100 %, zoom |
| C, E, M | Crop (Enter applies), eraser, mask preview |
| ? | Shortcut list |
| Double-click a slider | Reset it |

## Deploy (Cloudflare Pages)

Connect this repository in Cloudflare Pages with:

- Framework preset: Vite (or None)
- Build command: `npm run build`
- Build output directory: `dist`
