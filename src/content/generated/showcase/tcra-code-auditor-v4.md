# TCRA Code Auditor V4

An AI-powered web application that audits AI-generated ("vibecoded") code against **TCRA** — a four-dimensional academic framework for evaluating the intelligence-automation boundary in conversational AI code generation: **Transparency, Controllability, Reliability, Auditability**.

This is a ground-up redesign of the [V3 auditor](https://github.com/smile-plzz/TCRA-Code-Auditor-V3): a new visual identity, a redesigned three-step audit flow, light/dark theming, and a new **Compare/Benchmark mode** that runs the same code across multiple providers at once.

## Table of Contents

- [What's new in V4](#whats-new-in-v4)
- [Research Background](#research-background)
- [The TCRA Framework](#the-tcra-framework)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [Citation](#citation)
- [License](#license)

## What's new in V4

- **New visual identity.** V3 was a generic dark-blue "AI-studio dashboard." V4 uses a warm charcoal/paper palette, a serif display face (Newsreader) paired with Inter and JetBrains Mono, and a single violet brand accent — plus a real light/dark theme toggle (V3 was dark-only).
- **Redesigned audit flow.** Four steps collapsed into three (Setup → Code → Report), with inline validation instead of silent disabled buttons.
- **Compare/Benchmark mode.** Run the same prompt and code across up to 6 provider/model combinations in parallel, and see results as small-multiple radar cards, a sorted composite-score bar chart, and a data table — mirroring the thesis's own VibeBench-Mini cross-tool evaluation methodology.
- **Chart colors are validated, not eyeballed.** The TCRA radar's dimension colors and the score-level palette were checked against colorblind-safe contrast thresholds rather than chosen by taste (see [Design System](#design-system)).
- **Input validation on the server.** Requests to `/api/audit` and `/api/compare` are validated with `zod` instead of trusting the client.
- **Per-leg failure isolation in Compare mode.** If one provider errors out, the others still return — failures are reported per-target, not as a single all-or-nothing request.

## Research Background

This tool operationalizes the TCRA rubric developed in **Md. Ismail Hossain's** thesis, *["TCRA: A Framework for Locating the Intelligence–Automation Boundary in Vibecoded AI-Generated Code"](#citation)* (Professional Master's in Information Technology, Institute of Information Technology, Jahangirnagar University, August 2026, supervised by Dr. M Mesbahuddin Sarker). The thesis argues that the intelligence–automation boundary is not a binary distinction but a measurable gradient of *process quality* — and builds TCRA to operationalize that gradient across four philosophically-grounded properties (Transparency ↔ epistemic visibility, Controllability ↔ phenomenological agency, Reliability ↔ ontological coherence, Auditability ↔ epistemic/governance accountability).

The framework was validated through **VibeBench-Mini**, a suite of four programming tasks (web application, data processing, UI component, database schema) evaluated across five conversational AI tools — ChatGPT GPT-4o, Claude Sonnet 4.6, Claude Haiku 4.5, Google Gemini, and DeepSeek-V3 — scored by a blended methodology combining this auditor with four independent human reviewer sets, adjudicated by median consensus. Key findings:

- Evaluated tools clustered in the **Assisted Automation** range (composite 4–7 out of 12), with **Auditability** as the binding constraint on higher classifications — the lowest-scoring dimension across all five tools.
- Claude Sonnet 4.6 led on both Transparency and Auditability, posted the highest per-tool average composite (8.0, Delegated Reasoning), and achieved the dataset's only **Collaborative Intelligence** classification, on the database schema task.
- AI-to-human scoring alignment was tight: the largest average per-dimension gap between this auditor and the human-reviewer median was **0.225** (on Reliability); Transparency and Controllability tied for the smallest gap (0.175).
- **Controllability** showed the highest inter-rater standard deviation among the four human reviewer sets (SD = 0.620) — genuine interpretive ambiguity in that descriptor's language — while Auditability was the most consistently scored (SD = 0.414).

<p align="center">
  <img src="docs/thesis-figures/CompositeTCRA.png" alt="Composite TCRA scores per tool, broken down by dimension contribution" width="70%" />
  <br/>
  <sub>Composite TCRA scores per tool, stacked by dimension. Claude Sonnet 4.6 leads at 8.0; Gemini and GPT-4o are held down primarily by their Auditability segment. Source: thesis Chapter 4.</sub>
</p>

<p align="center">
  <img src="docs/thesis-figures/DimensionPerTool.png" alt="TCRA dimension radar profiles per tool" width="70%" />
  <br/>
  <sub>TCRA dimension profiles per tool. The inward dip at Auditability is consistent across all five tools, confirming it as the binding structural constraint on upward movement. Source: thesis Chapter 4.</sub>
</p>

## The TCRA Framework

Each dimension is scored **0–3** by an LLM auditor, summed into a **0–12 composite index** (I = T + C + R + A), and mapped to a classification. The rubric descriptors below are reproduced verbatim from the thesis's Table 3.2:

| Dimension | Measures | 0 — Poor | 1 — Basic | 2 — Good | 3 — Excellent |
|---|---|---|---|---|---|
| **Transparency (T)** | Visibility of reasoning pathways and justifications | Opaque output, no trace or rationale | Minimal comments; ad-hoc rationale | Partial trace; rationale links to code paths | Inspectable trace; step mapping; reproducible rationale |
| **Controllability (C)** | The user's capacity to guide, constrain, or correct behavior | Prompts rarely steer behavior | Coarse control; side effects common | Localized steering with minor trade-offs | Fine-grained control; constraints obeyed consistently |
| **Reliability (R)** | Stability and coherence across variation | Flaky; silent failures | Passes base tests only | Robust to small prompt/data shifts | Robust across perturbations, seeds, and refactors |
| **Auditability (A)** | Ability to record, reconstruct, and verify operations | No provenance or tests | Sparse logs; brittle tests | Provenance + runnable tests | Full provenance; versioned tests; reproducible builds |

> **On Controllability:** the thesis notes that a low score can stem from two distinct, hard-to-separate causes — *prompt under-specification* (the instruction was too vague to constrain the output) versus *system non-responsiveness* (a precise instruction wasn't obeyed). This auditor's system prompt asks the model to flag that ambiguity in its explanation rather than silently picking one (see thesis §3.3.2, §4.6.2, §5.5).

| Composite (0–12) | Classification |
|---|---|
| 0–3 | Automated Execution |
| 4–7 | Assisted Automation |
| 8–10 | Delegated Reasoning |
| 11–12 | Collaborative Intelligence |

## Architecture

- **Frontend** — React 19 + Vite 6, Tailwind CSS v4 (CSS-variable theme, light/dark), `motion/react`, `lucide-react`.
- **Backend** — Express server (`server.ts`) with a shared audit engine (`server/engine.ts`) used by both endpoints:
  - `POST /api/audit` — single provider/model audit.
  - `POST /api/compare` — runs the same code+prompt across up to 6 provider/model targets in parallel (`Promise.all` with per-leg try/catch), returning fulfilled results and per-target errors independently.
- Request bodies are validated with `zod` before touching any provider API.

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- An API key for at least one provider (Gemini/Groq can also be configured purely server-side)

### Installation

```bash
git clone https://github.com/smile-plzz/TCRA-Code-Auditor-V4.git
cd TCRA-Code-Auditor-V4
npm install
```

### Environment Variables

Copy `.env.example` to `.env`:

```env
GEMINI_API_KEY="your_gemini_api_key_here"
GROQ_API_KEY="your_groq_api_key_here"
PORT="3000"
```

Both keys are optional — users can supply their own key per-provider in the UI instead.

### Running

```bash
npm run dev     # development server (Vite + Express, HMR)
npm run lint    # tsc --noEmit
npm run build   # production build (client bundle + bundled server)
npm run start   # run the production build
```

## Usage

**Single Audit** — a three-step flow: pick a provider/model and describe the original prompt (Setup), paste the code (Code), then review the composite score, radar chart, per-dimension breakdown, and risk callouts (Report). Export as PDF or JSON.

**Compare** — paste one prompt/code pair, add up to 6 provider/model targets, and run them all at once. Results render as small-multiple radar cards (one per target), a sorted composite-score bar chart, and an optional data table.

## API Reference

### `POST /api/audit`

```json
{
  "provider": "anthropic | openai | google | groq",
  "apiKey": "string (optional if server-side key configured)",
  "model": "string — the provider's real API model ID",
  "prompt": "string (optional)",
  "code": "string (required)"
}
```

Returns an `AuditResult` (see `src/types.ts`) or `{ "error": "..." }` on failure.

### `POST /api/compare`

```json
{
  "prompt": "string (optional)",
  "code": "string (required)",
  "targets": [
    { "provider": "anthropic", "model": "claude-sonnet-5", "apiKey": "optional", "label": "optional" }
  ]
}
```

Returns `{ "prompt": "...", "legs": [{ "target": {...}, "status": "fulfilled" | "rejected", "result"?: AuditResult, "error"?: string, "durationMs": number }] }` — one entry per target, so a single provider failure never blocks the others.

## Project Structure

```
.
├── server.ts                 # Express: static hosting + /api/audit + /api/compare + /api/health
├── server/
│   └── engine.ts              # Shared TCRA prompt, provider dispatch, JSON sanitization
└── src/
    ├── App.tsx                 # Shell: header, mode switch (Single / Compare), theme toggle
    ├── config.ts                # Provider/model registry (frontend)
    ├── constants.ts              # Preset samples, classification metadata
    ├── types.ts                   # Shared types (AuditResult, AuditTarget, CompareResponse, ...)
    ├── index.css                  # Design tokens (light/dark), fonts
    ├── views/
    │   ├── SingleAudit.tsx          # 3-step wizard + report
    │   └── Compare.tsx               # Multi-target compare UI + results
    └── components/
        ├── RadarChart.tsx             # TCRA radar (single or small-multiple size)
        ├── ScoreBar.tsx                # Per-dimension status-colored bar
        └── ThemeToggle.tsx             # Light/dark toggle
```

## Design System

The color system follows a validated method rather than ad hoc choices:

- **TCRA dimension identity** (radar axes T/C/R/A) uses a fixed categorical order — blue, orange, aqua, yellow — checked against colorblind-vision-deficiency contrast thresholds for adjacent pairs in both light and dark modes. Position and persistent labels carry identity; color is a secondary cue.
- **Score levels (0–3)** use a dedicated status scale (critical → serious → warning → good) instead of reusing categorical colors, so a score's color never impersonates a dimension's color.
- **Brand accent** (violet) is deliberately outside the categorical set used in charts, so UI chrome and chart data never share a hue.
- Both light and dark themes are first-class — dark is not a filter over light, it's a separately-specified set of steps against the dark surface.

## Citation

If you use or reference this tool or the TCRA framework, please cite the originating thesis:

> Hossain, M. I. (2026). *TCRA: A Framework for Locating the Intelligence–Automation Boundary in Vibecoded AI-Generated Code* (Professional Master's thesis, Information Technology). Institute of Information Technology, Jahangirnagar University, Dhaka, Bangladesh.

```bibtex
@mastersthesis{hossain2026tcra,
  author = {Hossain, Md. Ismail},
  title  = {TCRA: A Framework for Locating the Intelligence--Automation Boundary in Vibecoded AI-Generated Code},
  school = {Institute of Information Technology, Jahangirnagar University},
  year   = {2026},
  month  = {8},
  type   = {Professional Master's thesis (Information Technology)},
  note   = {Supervisor: Dr. M Mesbahuddin Sarker}
}
```

## License

Licensed under the [Apache License 2.0](./LICENSE).
