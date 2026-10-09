# Levi's Bitmap Bananza

Browser tool that turns photos into print-ready black/white graphics: dithering, halftone, xerox distress, shirt-edge masks, crop, variant comparison and PNG/SVG/ZIP export.

Live: https://lbbstudio.pages.dev/

Everything runs client-side in the browser. There is no build step.

## Run locally

```sh
npx serve .
```

Then open the printed URL.

## Deploy (Cloudflare Pages)

Connect this repository in Cloudflare Pages with:

- Build command: none
- Build output directory: `/`
