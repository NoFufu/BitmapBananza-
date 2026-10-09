<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/logo-dark.svg" />
    <img src="docs/logo.svg" alt="LBB" width="180" />
  </picture>
</p>

<h1 align="center">Levi's Bitmap Bananza</h1>

<p align="center">
  Fotos im Browser in druckfertige Schwarz-Weiß-Grafiken verwandeln.<br />
  <a href="https://lbbstudio.pages.dev/"><strong>lbbstudio.pages.dev</strong></a>
</p>

<p align="center">
  <img src="docs/screenshots/desktop.png" alt="Bitmap Bananza auf dem Desktop" width="780" />
</p>

## Was es kann

- **Acht Looks** mit einem Klick: Clean Photo, Hard Poster, Detail Ink, Newspaper, Dirty Xerox, Shirt Print, Logo Cleanup und Pixel Bitmap
- **Dithering, Halftone, Glyphen und Xerox-Dreck**, jeder Regler fein einstellbar
- **Shirt-Kanten**: weiche oder raue Ränder, Weiß transparent, Druck-Check mit Farbdeckung und kleinster Insel
- **Zuschneiden, Radierer, Vorher/Nachher-Split** und Varianten-Vergleich
- **Export** als PNG, SVG oder ZIP-Paket (transparent, auf Schwarz, auf Weiß, Druckbericht), auch als Stapel
- Läuft komplett im Browser, kein Bild verlässt das Gerät

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
docs/            Logo und Screenshots für diese README
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
