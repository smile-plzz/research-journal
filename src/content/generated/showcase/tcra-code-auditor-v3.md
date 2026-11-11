# TCRA Code Auditor

An AI-powered web application that audits AI-generated ("vibecoded") code against **TCRA** — a four-dimensional academic framework for evaluating the intelligence-automation boundary in conversational AI code generation: **Transparency, Controllability, Reliability, Auditability**.

**Live demo:** [tcra-code-auditor-v3.onrender.com](https://tcra-code-auditor-v3.onrender.com/)

---

## Table of Contents

- [Research Background](#research-background)
- [The TCRA Framework](#the-tcra-framework)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Supported Providers & Models](#supported-providers--models)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [Security Notes](#security-notes)
- [License](#license)

---

## Research Background

This tool is the reference implementation of the **TCRA Code Auditor** instrument developed in the accompanying thesis on the intelligence-automation boundary in conversational AI code generation. The thesis argues that whether AI-generated code reflects genuine reasoning or sophisticated pattern completion is not a binary question but a gradient — one that can be operationalized, measured, and designed for.

The framework was validated through **VibeBench-Mini**, a suite of four programming tasks (web application development, data processing, UI design, and database schema generation) evaluated across five conversational AI tools. Key findings from that study:

- Evaluated tools clustered in the **Assisted Automation** range (composite 4–7 out of 12), with **Auditability** (avg. 1.3/3) as the binding constraint on higher classifications.
- AI-to-human scoring alignment (this auditor vs. independent human reviewers, median-consensus adjudicated) landed within **0.225 points** on the 0–3 scale, supporting the rubric as a transferable evaluation instrument.
- **Controllability** showed the highest inter-rater variance of the four dimensions, flagging it as the rubric axis most in need of refinement.

This application operationalizes that rubric as an interactive, multi-provider auditing tool so the framework can be applied to any AI-generated code sample, not just the original study's dataset.

## The TCRA Framework

Each dimension is scored on a **0–3 ordinal scale** by an LLM auditor, then summed into a **0–12 composite index** and mapped to one of four classifications:

| Dimension | What it measures | 0 | 1 | 2 | 3 |
|---|---|---|---|---|---|
| **Transparency (T)** | Visibility of the reasoning behind the code | Opaque output, no rationale | Minimal comments; ad-hoc rationale | Partial trace; rationale links to code paths | Inspectable trace; step mapping; reproducible rationale |
| **Controllability (C)** | The user's capacity to steer and constrain behavior | Prompts rarely steer behavior; rigid structure | Coarse control; side effects common | Localized steering with minor trade-offs | Fine-grained control; constraints obeyed consistently |
| **Reliability (R)** | Consistency and robustness across variation | Flaky; silent failures likely | Passes base cases only | Robust to small prompt/data shifts | Robust across perturbations, seeds, and refactors |
| **Auditability (A)** | Traceability and verifiability of the generative process | No provenance or tests | Sparse logs; brittle tests | Provenance + runnable tests present | Full provenance; versioned tests; reproducible builds |

**Composite → Classification mapping:**

| Composite (0–12) | Classification |
|---|---|
| 0–3 | Automated Execution |
| 4–7 | Assisted Automation |
| 8–10 | Delegated Reasoning |
| 11–12 | Collaborative Intelligence |

## Features

- **Comprehensive Evaluation** — scores code against all four TCRA dimensions with per-dimension explanations.
- **AI-Powered Analysis** — an LLM performs semantic analysis, structural auditing, and intelligence-automation classification.
- **Visual Analytics** — radar chart, per-dimension score bars, composite gauge, and risk/failure-vector callouts.
- **Multi-Provider Support** — Google Gemini, OpenAI, Anthropic, and GroqCloud, with a custom-model-ID override for any of them.
- **Secure Architecture** — an Express backend proxies all provider calls so API keys are never persisted or exposed to the client.
- **Preset Samples** — two ready-to-run examples (a fragile "vibecoded" script vs. an audit-ready implementation) to demo the scoring spread instantly.
- **Export & History** — export a report as PDF (print-optimized layout) or raw JSON, and browse up to 15 recent audits from local session history.

## Architecture

A full-stack TypeScript application:

- **Frontend** — React 19 + Vite 6, Tailwind CSS v4, `motion/react` for animation, `lucide-react` for icons. A four-step wizard (provider config → prompt context → code input → report) drives the audit flow.
- **Backend** — Express server (`server.ts`) that:
  - Serves the Vite app in development (middleware mode) and static production assets in production.
  - Exposes `POST /api/audit`, which builds a shared TCRA system prompt, dispatches it to the selected provider's API, and normalizes/clamps the response into a strict `AuditResult` shape (defensive JSON parsing handles markdown-fenced or malformed model output).
  - Falls back to server-side `GEMINI_API_KEY` / `GROQ_API_KEY` env vars when no client-supplied key is present, so those two providers can run with zero end-user setup.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 19, Vite 6 |
| Styling | Tailwind CSS v4 |
| Animation | `motion` (Framer Motion successor) |
| Icons | `lucide-react` |
| Backend | Express 4, `tsx` (dev), `esbuild` (prod bundle) |
| Language | TypeScript 5.8 |
| AI SDKs | `@google/genai` (Gemini); OpenAI, Anthropic, and Groq are called via direct `fetch` against their REST APIs |

## Getting Started

### Prerequisites

- Node.js (18+ recommended)
- npm
- An API key for at least one supported provider (Gemini/Groq can also be supplied purely server-side)

### Installation

```bash
git clone https://github.com/smile-plzz/TCRA-Code-Auditor-V3.git
cd TCRA-Code-Auditor-V3
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in the keys you plan to use server-side:

```env
GEMINI_API_KEY="your_gemini_api_key_here"
GROQ_API_KEY="your_groq_api_key_here"
APP_URL="http://localhost:3000"
```

`GEMINI_API_KEY` and `GROQ_API_KEY` are optional — if you leave them blank, users can still supply their own key for any provider directly in the UI (kept in browser state only, sent per-request, never stored server-side).

### Running the Application

```bash
# Development server (Vite + Express, HMR enabled)
npm run dev

# Type-check
npm run lint

# Production build (client bundle + bundled server)
npm run build

# Run the production build
npm run start
```

The app is served at `http://localhost:3000` in both dev and production.

## Usage

1. **AI Engine Config** — pick a provider (Gemini, OpenAI, Anthropic, GroqCloud), choose a model or supply a custom model ID, and enter an API key if one isn't pre-configured server-side.
2. **Prompt Context** — paste the original natural-language instruction that produced the code (or load one of the two built-in presets to try the tool immediately).
3. **Raw Code Entry** — paste the AI-generated code artifact to be audited.
4. **Evaluation Report** — review the composite score, classification tier, per-dimension breakdown, identified risks/silent-failure points, and vibecoding-footprint assessment. Export as PDF or JSON, or revisit past audits from the history drawer.

## Supported Providers & Models

| Provider | Notes |
|---|---|
| Google Gemini | Server-side key supported via `GEMINI_API_KEY`; uses `@google/genai` |
| GroqCloud | Server-side key supported via `GROQ_API_KEY`; OpenAI-compatible chat completions API |
| OpenAI | Requires a client-supplied key; OpenAI-compatible chat completions API |
| Anthropic | Requires a client-supplied key; Messages API |

Every provider also exposes a **Custom Model ID** option so you can target a model newer than the ones pre-listed in `src/config.ts` without a code change.

## API Reference

### `GET /api/health`

Returns `{ "status": "ok" }`. Useful for uptime checks (e.g., Render health checks).

### `POST /api/audit`

Runs a TCRA evaluation against the given code.

**Request body:**

```json
{
  "provider": "google | openai | anthropic | groq",
  "apiKey": "string (optional if server-side key is configured for the provider)",
  "model": "string — the provider's real API model ID",
  "prompt": "string (optional) — the original instruction that generated the code",
  "code": "string (required) — the code artifact to audit"
}
```

**Response body (`AuditResult`):**

```json
{
  "transparency": { "score": 0, "explanation": "..." },
  "controllability": { "score": 0, "explanation": "..." },
  "reliability": { "score": 0, "explanation": "..." },
  "auditability": { "score": 0, "explanation": "..." },
  "composite": 0,
  "classification": "Automated Execution | Assisted Automation | Delegated Reasoning | Collaborative Intelligence",
  "classificationSummary": "string",
  "risks": ["string", "..."],
  "isVibecoded": true,
  "vibecodeEvidence": "string"
}
```

Errors are returned as `{ "error": "message" }` with a non-2xx status code.

## Project Structure

```
.
├── index.html              # Vite entry HTML
├── metadata.json            # App metadata
├── server.ts                 # Express server: static hosting + /api/audit + /api/health
├── vite.config.ts            # Vite config (React + Tailwind plugins)
├── tsconfig.json
├── package.json
├── .env.example
├── LICENSE
└── src/
    ├── main.tsx               # React entry point
    ├── App.tsx                # Wizard UI, state, and report rendering
    ├── config.ts              # Provider/model registry + shared TCRA system prompt
    ├── types.ts                # Shared TypeScript types (AuditResult, ProviderConfig, ...)
    ├── index.css               # Tailwind entry + global styles
    └── components/
        ├── RadarChart.tsx      # SVG radar chart for the four TCRA dimensions
        └── ScoreBar.tsx        # Per-dimension animated score bar
```

## Security Notes

- API keys entered in the UI are held in browser component state only and sent per-request to the backend — never written to `localStorage` or persisted anywhere.
- The Express backend proxies all provider calls server-side, so keys are never exposed to third-party origins from the client.
- Audit **results** (not keys) are cached in `localStorage` under `tcra_history_audits` to power the local session history drawer, capped at the 15 most recent entries.

## License

Licensed under the [Apache License 2.0](./LICENSE).
