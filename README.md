<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/logo-dark.svg" />
    <img src="docs/logo.svg" alt="LBB" width="200" />
  </picture>
</p>

<h1 align="center">Levi's Bitmap Bananza</h1>

<p align="center">
  <b>Fotos rein, druckfertige Schwarz-Weiß-Grafik raus.</b><br />
  Dithering, Halftone, Xerox-Dreck und Shirt-Kanten, direkt im Browser.
</p>

<p align="center">
  <a href="https://lbbstudio.pages.dev/"><img src="https://img.shields.io/badge/Jetzt_ausprobieren-lbbstudio.pages.dev-000000?style=for-the-badge" alt="Jetzt ausprobieren" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-000000?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-000000?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8-000000?logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-000000?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Cloudflare_Pages-deployed-000000?logo=cloudflarepages&logoColor=white" alt="Cloudflare Pages" />
  <img src="https://img.shields.io/badge/100%25-im_Browser-000000" alt="Läuft komplett im Browser" />
</p>

<p align="center">
  <img src="docs/banner.jpg" alt="Ein Foto in sechs Looks: Original, Clean Photo, Newspaper, Dirty Xerox, Detail Ink, Pixel Bitmap" />
</p>

<p align="center">
  <a href="#was-es-kann">Was es kann</a> ·
  <a href="#beispiele">Beispiele</a> ·
  <a href="#oberfläche">Oberfläche</a> ·
  <a href="#lokal-starten">Lokal starten</a> ·
  <a href="#tastenkürzel">Tastenkürzel</a>
</p>

## Was es kann

- **Acht Looks** mit einem Klick: Clean Photo, Hard Poster, Detail Ink, Newspaper, Dirty Xerox, Shirt Print, Logo Cleanup und Pixel Bitmap
- **Dithering, Halftone, Glyphen und Xerox-Dreck**, jeder Regler fein einstellbar
- **Shirt-Kanten**: weiche oder raue Ränder, Weiß transparent, Druck-Check mit Farbdeckung und kleinster Insel
- **Zuschneiden, Radierer, Vorher/Nachher-Split** und Varianten-Vergleich
- **Export** als PNG, SVG oder ZIP-Paket (transparent, auf Schwarz, auf Weiß, Druckbericht), auch als Stapel
- Läuft komplett im Browser, kein Bild verlässt das Gerät

## Beispiele

Ein Foto, acht Looks. Jeder Look ist nur ein Startpunkt, danach lässt sich jeder Regler weiter verstellen.

<table>
  <tr>
    <td align="center"><img src="docs/looks/original.jpg" alt="Original" width="240" /><br /><b>Original</b><br /><sub>Das Foto</sub></td>
    <td align="center"><img src="docs/looks/cleanPhoto.png" alt="Clean Photo" width="240" /><br /><b>Clean Photo</b><br /><sub>Foto, sauber getrennt</sub></td>
    <td align="center"><img src="docs/looks/hardPoster.png" alt="Hard Poster" width="240" /><br /><b>Hard Poster</b><br /><sub>Große Flächen</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/looks/highDetailInk.png" alt="Detail Ink" width="240" /><br /><b>Detail Ink</b><br /><sub>Kanten und Feinheiten</sub></td>
    <td align="center"><img src="docs/looks/softNewspaper.png" alt="Newspaper" width="240" /><br /><b>Newspaper</b><br /><sub>Feines Punktraster</sub></td>
    <td align="center"><img src="docs/looks/dirtyXerox.png" alt="Dirty Xerox" width="240" /><br /><b>Dirty Xerox</b><br /><sub>Kopierer-Dreck</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/looks/shirtPrintGraphic.png" alt="Shirt Print" width="240" /><br /><b>Shirt Print</b><br /><sub>Transparent, weicher Rand</sub></td>
    <td align="center"><img src="docs/looks/logoCleanup.png" alt="Logo Cleanup" width="240" /><br /><b>Logo Cleanup</b><br /><sub>Scan zu klarer Fläche</sub></td>
    <td align="center"><img src="docs/looks/pixelClassic.png" alt="Pixel Bitmap" width="240" /><br /><b>Pixel Bitmap</b><br /><sub>Grobe Pixelblöcke</sub></td>
  </tr>
</table>

### Vorher und Nachher

<p align="center">
  <img src="docs/beispiele/detail-ink.jpg" alt="Vorher und Nachher mit Detail Ink" width="420" />
  &nbsp;
  <img src="docs/beispiele/newspaper.jpg" alt="Vorher und Nachher mit Newspaper" width="420" />
</p>
<p align="center"><sub>Links Detail Ink, rechts Newspaper. Alle Bilder sind direkt mit der Engine aus den Beispielfotos der App gerendert.</sub></p>

## Oberfläche

<p align="center">
  <img src="docs/screenshots/desktop.png" alt="Bitmap Bananza auf dem Desktop" width="780" />
</p>

<p align="center">
  <img src="docs/screenshots/suche.png" alt="Regler-Suche mit Strg K" width="520" />
  &nbsp;
  <img src="docs/screenshots/mobile.png" alt="Bitmap Bananza auf dem Handy" width="200" />
</p>

## Lokal starten

Voraussetzung ist Node 22 (siehe `.nvmrc`).

```sh
npm install
npm run dev            # http://localhost:5173
```

| Befehl                 | Was passiert                                 |
| ---------------------- | -------------------------------------------- |
| `npm run dev`          | Entwicklungsserver mit Hot Reload            |
| `npm run build`        | Typecheck und Produktions-Build nach `dist/` |
| `npm run preview`      | Den Build aus `dist/` lokal ausliefern       |
| `npm run typecheck`    | Nur TypeScript prüfen                        |
| `npm run format`       | Code mit Prettier formatieren                |
| `npm run format:check` | Prüfen, ob alles formatiert ist              |

## Aufbau

```
src/
  engine/        Bild-Engine, unverändert aus dem ursprünglichen Ein-Datei-Tool übernommen
    core.js      Pixel-Algorithmen
    index.js     öffentliche API: renderGraphic, renderAtSize, Analyse, SVG
    worker.js    rendert Vorschauen abseits des Haupt-Threads
  lib/           Regler-Schema, Export, Dateien laden, gemeinsame Aktionen
  state/         Zustand-Store (Regler, Verlauf, Ansicht, Werkzeuge), Renderer, Tastenkürzel
  components/    Oberfläche: Looks, Regler, Bühne, Dock, Zuschnitt, Suche, Vergleich, Export
public/          Favicon und Beispielbilder
docs/            Logo, Screenshots und Beispielbilder für diese README
```

Jeder Regler ist genau einmal in `src/lib/controls.ts` definiert. Schieberegler, Suche, die „geändert“-Punkte und Zurücksetzen lesen alle von dort, ein neuer Regler braucht also nur einen Eintrag.

Die Engine liefert für alle acht Looks pixelgleiche Ergebnisse zum Original-Tool, im Worker wie im Haupt-Thread. Pixel Bitmap rendert immer im Haupt-Thread, weil OffscreenCanvas minimal anders herunterskaliert.

## Tastenkürzel

| Tasten                 | Aktion                                         |
| ---------------------- | ---------------------------------------------- |
| Strg/⌘ K               | Regler oder Aktion suchen                      |
| Strg/⌘ O               | Bild öffnen                                    |
| Strg/⌘ S               | PNG exportieren                                |
| Strg/⌘ Z, Strg/⌘ ⇧ Z   | Rückgängig, Wiederholen                        |
| B (halten)             | Original zeigen                                |
| S                      | Vorher/Nachher teilen                          |
| F, 1, + / −            | Einpassen, 100 %, Zoom                         |
| C, E, M                | Zuschneiden (Enter übernimmt), Radierer, Maske |
| ?                      | Alle Tastenkürzel                              |
| Doppelklick auf Regler | Regler zurücksetzen                            |

## Deployment

Die Seite läuft auf Cloudflare Pages (Projekt `lbbstudio`). Jeder Push auf `main` wird automatisch gebaut.

- Build-Befehl: `npm run build`
- Ausgabeordner: `dist` (steht auch in `wrangler.toml`)

Gebaut mit React, Vite, Tailwind CSS, Motion und Zustand.
