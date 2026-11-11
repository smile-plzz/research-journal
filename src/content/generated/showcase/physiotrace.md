# PhysioTrace Pro — Pharmacokinetic Digital Twin

PhysioTrace is a client-side pharmacokinetic (PK) simulator. It builds a "digital twin"
from your bio-metrics and plots how a compound is absorbed, distributed, and cleared over
a 24-hour window — plasma concentration, organ load, and the effect of metabolic rate.

Everything runs in the browser. There is no backend, no account, and no telemetry; the only
network call is a public [openFDA](https://open.fda.gov/) label lookup for the selected drug.

> **Educational use only.** This is a simplified one-compartment model, not a clinical tool.
> It does not represent a real patient and must never be used to guide dosing decisions.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | `tsc --noEmit` over the whole project |
| `npm test` | Unit tests (Vitest) |
| `npm run test:watch` | Tests in watch mode |

No API keys or environment variables are required.

---

## Features

- **Digital twin calibration** — age, gender, height, weight, and activity level (1–5), stored
  in `localStorage`. Inputs are range-validated, and BMR (Mifflin-St Jeor) and BSA (Du Bois)
  are derived live.
- **Pharmacokinetic engine** — plasma concentration via the Bateman function (first-order
  absorption + elimination), modulated by weight, age, and metabolic activity. Multiple doses
  and multiple compounds superpose.
- **Compound library** — 24 curated drugs and supplements with half-life, Tmax, bioavailability,
  volume-of-distribution factor, toxicity threshold, and compound-specific warnings.
- **Peak summary** — Cmax, Tmax, and the time the curve falls to a negligible fraction of peak.
- **Body map** — an SVG twin whose organ regions shade with the metabolic load at the selected
  time, alongside a systemic radar chart and a per-organ breakdown.
- **Analytics** — a PK curve with toxicity threshold and brush-to-zoom, plus an activity-impact
  chart comparing sedentary / normal / hyper-metabolic clearance of the same protocol.
- **Deterministic clinical status** — absorption / peak / elimination / cleared phase detection
  with toxicity and therapeutic-window warnings, computed from the simulation rather than an LLM.
- **Safety guardrails** — a first-run disclaimer modal, and Pediatric Mode (profile age under 12)
  which blocks compounds contraindicated in children and suppresses their visualizations.

---

## Project layout

```
App.tsx                  Application shell, state, and layout
index.tsx                React entry point
components/              Presentational components (charts, panels, body map)
lib/simulation.ts        Bateman PK solver, organ-load model, peak summary
lib/physiology.ts        Profile validation, BMR / BSA, pediatric cutoff
services/drugService.ts  openFDA label lookup + clinical status analysis
constants.tsx            Drug library and organ metadata
types.ts                 Shared TypeScript types
```

Tests live next to the code they cover (`lib/simulation.test.ts`, `lib/physiology.test.ts`,
`services/drugService.test.ts`).

## Tech stack

React 19 · TypeScript · Vite · Recharts · lucide-react · Vitest.

Styling is plain inline styles plus a small global stylesheet in `index.html` — no CSS
framework and no runtime CDN dependency.

## The model, briefly

Concentration at time *t* after a dose *D*:

```
C(t) = (F·D·ka) / (Vd·(ka − kel)) · (e^(−kel·t) − e^(−ka·t))
```

where `kel = ln2/t½` scaled by activity level and age, `ka ≈ 2.5/Tmax`, and `Vd = weight ×
volDistFactor`. The `ka ≈ kel` degenerate case falls back to the limiting form
`C(t) = F·D·ka·t·e^(−ka·t)/Vd`. Organ load is derived from concentration as a fraction of the
compound's toxicity threshold, weighted toward its primary clearance organ.

These are population-average parameters. Real pharmacokinetics vary widely with genetics,
hepatic and renal function, food, and co-medication.
