# Levi's Bitmap Bananza

Browser tool that turns photos into print-ready black/white graphics: dithering, halftone, xerox distress, shirt-edge masks, crop, variant comparison and PNG/SVG/ZIP export.

Live: https://lbbstudio.pages.dev/

Everything runs client-side in the browser. There is no build step.

## Structure

```
index.html        markup; every control keeps the id the engine expects
css/app.css       design tokens, layout, components
js/app.js         image engine and original app logic (rendering, export, crop, history)
js/ui.js          interface layer: looks with live thumbnails, dock, split handle,
                  command palette, shortcuts, toasts
assets/           favicon and the original logo
```

`js/app.js` calls into `js/ui.js` through `window.ui` hooks (`onImageLoaded`, `onRedraw`, …). If `ui.js` is missing the engine still works.

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
| C, E, M | Crop, eraser, mask preview |
| ? | Shortcut list |
| Double-click a slider | Reset it |

## Run locally

```sh
npx serve .
```

Then open the printed URL.

## Deploy (Cloudflare Pages)

Connect this repository in Cloudflare Pages with:

- Build command: none
- Build output directory: `/`
