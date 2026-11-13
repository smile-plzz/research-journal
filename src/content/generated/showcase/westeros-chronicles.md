# Westeros Chronicles: Interactive Timeline Map

A calm, mobile-first interactive timeline and original vector map of Westeros and Essos. Pick a point in time, see what happened and where, and follow characters across eras without unrequested spoilers.

Live: https://westeros-chronicles-interactive-tim.vercel.app/

## Features

- **Original Vector Cartography**: Simplified custom SVG map of Westeros and Essos with smooth 60 fps pan, pinch-zoom, zoom-aware clustering, and optional regional House Control overlays.
- **Scrubber-Driven Timeline**: Drag or step chronologically from the Age of Heroes through Robert's Rebellion and the War of the Five Kings with full keyboard and screen-reader slider support.
- **Spoiler-Safe by Default**: Starts in Historical Only mode (pre-298 AC) with a calm checkpoint selector for Books 1 to 5 and Seasons 1 to 8.
- **Deep Search & Cross-Links**: Command-style fuzzy search (`/`), deep-link URLs (`?e=...&t=...&sp=...`), native sharing, character journey playback, and curated guided tours.
- **Accessible & Offline-Ready**: Full chronological list view alternative (`L`), light/dark/system themes, fluid typography, text scaling, `prefers-reduced-motion` support, PWA manifest, and stale-while-revalidate offline cache.

## Quick Start

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev`: Start local Vite development server
- `npm run validate`: Validate all era, house, location, character, event, and tour data
- `npm run typecheck`: Run TypeScript strict type checking
- `npm test`: Run unit and component tests (Vitest)
- `npm run build`: Validate data, build production bundle, and verify JS size budget
- `npm run test:e2e`: Run Playwright mobile E2E smoke tests against local preview

## Data Contributions

All chronicle records live in typed modules under `src/data/` (`eras.ts`, `houses.ts`, `locations.ts`, `characters.ts`, `events.ts`, `tours.ts`, `regions.ts`). Please write original short summaries, verify coordinates stay inside the `1000x1200` map bounds, avoid em-dashes, and run `npm run validate && npm test` before opening a pull request.

## Legal & Attributions

This is a non-commercial, unofficial fan project. It is not affiliated with or endorsed by George R. R. Martin, Bantam Books, HarperCollins, or HBO. Vector cartography and summaries are original works; factual dates and relationships are cross-referenced with [A Wiki of Ice and Fire](https://awoiaf.westeros.org/) under CC BY-SA 3.0. Application code is licensed under [MIT](LICENSE).
