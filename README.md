# GitHub-Powered Research Journal & Publication Archive

**Owner:** Md. Ismail Hossain  
**GitHub Profile:** [https://github.com/smile-plzz](https://github.com/smile-plzz)  
**Deployment Target:** Vercel  
**Architecture:** Next.js App Router (Static-first) + TypeScript + Tailwind CSS + GitHub Ingestion Engine + Normalized Publication Catalog

---

## Overview

A modern, minimal academic publication archive and scholarly research journal that automatically discovers, ingests, organizes, and presents academic research projects from GitHub.

Unlike standard developer portfolios or blogs, this platform treats repositories as peer sources of scholarly materials, technical reports, data science pipelines, and monograph manuscripts. It transforms code repositories into structured scholarly publication records with an editorial reading experience inspired by contemporary academic journals and Claude's restrained visual aesthetic.

### Core Capabilities

- **Automated Repository Discovery & Ingestion**: Discovers candidate `-paper` and research repositories via GitHub API and local repository inspection with inclusion/exclusion filters.
- **Work vs. Repository Decoupling**: Distinguishes canonical academic Works from raw GitHub repositories, grouping multi-stage revisions (e.g., TCRA Thesis drafts, submission copies, tightened editions, and humanized revisions) into cohesive editions of a single publication.
- **5 Academic Archetypes Supported**:
  1. `numbered-stage-monograph` (Long-form game studies monographs, e.g., Bad Company 2, Metro Last Light, Spec Ops: The Line, The Last of Us Part II)
  2. `modular-latex-thesis` (Jahangirnagar University PMIT TCRA Master's Thesis chapters & defense presentations)
  3. `geospatial-empirical-data-science` (Bangladesh Health Access Gap spatial pipelines, GIS maps, tests)
  4. `computational-cultural-ecosystem` (Contemporary Bangladeshi Music Evolution networks, schemas, and dashboards)
  5. `open-science-investigative-corpus` (Social media cancellation empirical studies, claims ledgers, ITS regressions, and Zenodo preprints)
- **Separate Content & Metadata Layers**: Fast lightweight `catalog.json` for indexing and search; dedicated markdown manuscript storage (`works/[slug].md`) for reading 60k–90k word monographs without slowing down list views.
- **Metadata Provenance Tracking**: Tracks exact extraction sources (`CITATION.cff`, `.zenodo.json`, `.publication.json`, `README.md`, or configured defaults) with verification flags to prevent scholarly metadata fabrication.
- **Editorial Reading Experience**: Responsive scholarly layout, sticky table of contents, BibTeX citation export, PDF download/embed capabilities, light/dark themes, and faceted filtering.
- **Scheduled & Manual Synchronization**: Daily GitHub Actions synchronization with zero runtime database dependencies.

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
To run the ingestion pipeline and generate `catalog.json` and cached manuscripts from GitHub or local scratch repositories:
```bash
npm run sync:github
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
│   │   ├── page.tsx             # Editorial journal homepage
│   │   ├── works/[slug]/        # Publication detail & manuscript reader
│   │   ├── research-areas/      # Academic domain taxonomies
│   │   ├── about/               # Scholarly bio & research profile
│   │   ├── methodology/         # GitHub-as-source-of-truth workflow documentation
│   │   ├── sitemap.ts           # Dynamic SEO sitemap
│   │   └── robots.ts            # Robots configuration
│   ├── components/              # Modular UI components
│   │   ├── layout/              # Header, Footer, ThemeToggle
│   │   ├── publication/         # PublicationEntry, MetadataProvenance, TOC, CitationBox
│   │   ├── markdown/            # Scholarly Markdown & LaTeX math renderer
│   │   ├── search/              # Fast client-side search & filters
│   │   └── artifacts/           # PDF viewer, dataset links, and asset cards
│   ├── content/
│   │   └── generated/works/     # Cached full manuscripts (slug.md)
│   ├── data/
│   │   └── generated/           # Normalized catalog.json
│   ├── lib/
│   │   ├── catalog/             # Schema, queries, filter utilities
│   │   ├── classification/      # Archetype detection heuristics
│   │   ├── github/              # API client, tree inspection, rate-limit handler
│   │   ├── ingestion/           # Normalizer, validator, edition grouping
│   │   └── parsers/             # Manifest, CFF, Zenodo, and README parsers
│   └── config/
│       ├── site.ts              # Site identity & navigation
│       ├── authors.ts           # Authorship fallback rules
│       ├── domains.ts           # 5 academic domain taxonomies
│       └── repositories.ts      # Repository inclusion/exclusion lists & manual overrides
├── scripts/
│   └── sync-github.ts           # Ingestion CLI script
└── tests/                       # Vitest unit tests for ingestion, classification, parsing
```

---

## License
MIT © Md. Ismail Hossain

