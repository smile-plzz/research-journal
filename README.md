# Research and Projects: Academic Archive & Software Showcase

**Owner:** Md. Ismail Hossain  
**GitHub Profile:** [https://github.com/smile-plzz](https://github.com/smile-plzz)  
**Deployment Target:** Vercel  
**Architecture:** Next.js App Router (Static-first) + TypeScript + Tailwind CSS + GitHub Ingestion Engine + Research & Showcase Catalogs

---

## Overview

A two-wing static-first platform by Md. Ismail Hossain combining an academic publication archive (**Wing A: Research**) with a non-technical **Software & Project Showcase** (**Wing B: Showcase**).

- **Research Wing (`/`, `/works/[slug]`, `/research-areas`):** Discovers, ingests, and normalizes academic repositories into structured scholarly publication records with provenance tracking, sticky TOCs, KaTeX math, BibTeX/APA/IEEE/Chicago citations, and RSS syndication.
- **Showcase Wing (`/showcase`, `/showcase/[slug]`, `/showcase/categories/[category]`):** Presents software projects as accessible products for non-GitHub readers, featuring plain-language summaries, live web app links, direct OS-labeled GitHub Release binary downloads, unsigned-build guidance, and collapsed developer documentation.

### Core Capabilities

- **Two-Wing Routing & Cross-Linking**: Routes `-paper` and academic repositories to Research and software repositories to Showcase, with explicit dual-wing overrides and bidirectional cross-links where relevant.
- **Automated Repository Discovery & Ingestion**: Discovers candidate `-paper` and research repositories via GitHub API and local repository inspection with inclusion/exclusion filters, plus public Showcase discovery with direct GitHub Release asset extraction.
- **Work vs. Repository Decoupling (Research)**: Distinguishes canonical academic Works from raw GitHub repositories, grouping multi-stage revisions (e.g., TCRA Thesis drafts, submission copies, tightened editions, and humanized revisions) into cohesive editions of a single publication.
- **Editorial Override Layer (Showcase)**: Merges auto-discovered GitHub/README metadata and release assets with hand-curated plain-language product copy (`src/config/showcase.ts`), tracking field provenance and `needsReview` flags without fabricating missing fields.
- **5 Academic Archetypes Supported**:
  1. `numbered-stage-monograph` (Long-form game studies monographs, e.g., Bad Company 2, Metro Last Light, Spec Ops: The Line, The Last of Us Part II)
  2. `modular-latex-thesis` (Jahangirnagar University PMIT TCRA Master's Thesis chapters & defense presentations)
  3. `geospatial-empirical-data-science` (Bangladesh Health Access Gap spatial pipelines, GIS maps, tests)
  4. `computational-cultural-ecosystem` (Contemporary Bangladeshi Music Evolution networks, schemas, and dashboards)
  5. `open-science-investigative-corpus` (Social media cancellation empirical studies, claims ledgers, ITS regressions, and Zenodo preprints)
- **Separate Content & Metadata Layers**: Fast lightweight `catalog.json` and `showcase.json` indexes for client-side search; isolated markdown files (`works/[slug].md`, `showcase/[slug].md`) loaded only on detail routes.
- **Metadata Provenance Tracking**: Tracks exact extraction sources (`CITATION.cff`, `.zenodo.json`, `.publication.json`, `README.md`, GitHub API, release assets, or manual overrides) with verification flags to prevent metadata fabrication.
- **Scheduled & Manual Synchronization**: Daily GitHub Actions synchronization (`npm run sync:github`, supporting `--target research|showcase|all`) with zero runtime database dependencies.

---

## Getting Started

### Prerequisites
- Node.js >= 18.18 (Node 20+ or 22+ recommended)
- npm >= 9.0

### Installation
```bash
npm install
```

### Ingestion & Catalog Build
To run the ingestion pipeline and generate `catalog.json`, `showcase.json`, and cached markdown files:
```bash
npm run sync:github
# Optional targets:
npm run sync:github -- --target research
npm run sync:github -- --target showcase --strict
```

### Showcase Validation
```bash
npm run validate:showcase -- --strict
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Test
```bash
npm run test
npm run build
npm start
```

---

## Production Deployment & Shipping

### 1. GitHub Remote Setup
To connect this repository to your GitHub account:
```bash
git remote add origin https://github.com/smile-plzz/research-journal.git
git branch -M main
git push -u origin main
```

### 2. Vercel Deployment
The platform is fully configured and live on Vercel:
- **Live Production URL:** [https://research-journal-kappa.vercel.app](https://research-journal-kappa.vercel.app)
- **Project Alias:** [https://research-journal-smile-plzzs-projects.vercel.app](https://research-journal-smile-plzzs-projects.vercel.app)

Deploying or promoting future updates is zero-configuration:
- **Automatic GitHub Integration (Active):**
  Every push to the `main` branch automatically triggers a production build and deployment on Vercel.
- **Manual CLI Deployments:**
  ```bash
  # Preview deployment:
  npx vercel
  # Production promotion:
  npx vercel --prod
  ```

### 3. Automated Daily Sync Pipeline
- `.github/workflows/sync-github.yml` fires daily at `00:00 UTC` and supports manual triggers via `workflow_dispatch`.
- It executes `npm run sync:github` in cloud mode, fetching candidate repositories via GitHub API, regenerating the catalog, running tests, and pushing changes back to the repository.
- Vercel automatically deploys the updated catalog on commit.


---

## Repository Structure

```
research-journal/
├── .github/
│   └── workflows/
│       └── sync-github.yml      # Scheduled daily GitHub Actions sync
├── public/                      # Static assets & favicon
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── layout.tsx           # Root layout with theme provider
│   │   ├── page.tsx             # Two-wing homepage (Research & Showcase)
│   │   ├── showcase/            # Software showcase gallery, categories & project pages
│   │   ├── works/[slug]/        # Publication detail & manuscript reader
│   │   ├── research-areas/      # Academic domain taxonomies
│   │   ├── about/               # Bio, research/software focus & contact
│   │   ├── methodology/         # GitHub-as-source-of-truth workflow documentation
│   │   ├── sitemap.ts           # Dynamic SEO sitemap
│   │   └── robots.ts            # Robots configuration
│   ├── components/              # Modular UI components
│   │   ├── layout/              # Header, Footer, ThemeToggle
│   │   ├── publication/         # PublicationEntry, MetadataProvenance, TOC, CitationBox
│   │   ├── showcase/            # ProjectCard, ShowcaseBrowser, DownloadPanel, DownloadSafetyNote
│   │   ├── markdown/            # Scholarly Markdown & LaTeX math renderer
│   │   ├── search/              # Fast client-side search & filters
│   │   └── artifacts/           # PDF viewer, dataset links, and asset cards
│   ├── content/
│   │   └── generated/
│   │       ├── works/           # Cached full manuscripts (slug.md)
│   │       └── showcase/        # Cached showcase project READMEs (slug.md)
│   ├── data/
│   │   └── generated/           # Normalized catalog.json and showcase.json
│   ├── lib/
│   │   ├── catalog/             # Research schema & queries
│   │   ├── showcase/            # Showcase schema, discovery, releases, merge, validate, queries
│   │   ├── classification/      # Archetype detection heuristics
│   │   ├── github/              # Shared API client, releases, tree inspection, rate-limit handler
│   │   ├── ingestion/           # Research normalizer, validator, edition grouping
│   │   └── parsers/             # Manifest, CFF, Zenodo, and README parsers
│   └── config/
│       ├── site.ts              # Site identity, contact & navigation
│       ├── authors.ts           # Authorship fallback rules
│       ├── domains.ts           # 5 academic domain taxonomies
│       ├── repositories.ts      # Research repository lists & overrides
│       └── showcase.ts          # Showcase exclusions, wing overrides & editorial copy
├── scripts/
│   ├── sync-github.ts           # Unified Ingestion CLI (--target research|showcase|all)
│   └── validate-showcase.ts     # Build-time showcase catalog validator
└── tests/                       # Vitest unit tests (classification, parsers, catalog, showcase)
```

---

## License
MIT © Md. Ismail Hossain

