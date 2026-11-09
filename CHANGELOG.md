# Changelog

All notable changes to the GitHub-Powered Research Journal & Publication Archive project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-11-09

### Added
- **Full Next.js App Router Application**: Complete production application with TypeScript, Tailwind CSS, and `next-themes`.
- **Automated Ingestion Engine**:
  - `src/lib/ingestion/sync.ts` & `src/lib/ingestion/local-source.ts`: Scans GitHub and local `paper_repos` to ingest candidate research projects.
  - Parsers for `.publication.json`, `CITATION.cff`, `.zenodo.json`, and structured Markdown READMEs.
  - Architecture detection heuristics for all 5 archetypes: `numbered-stage-monograph`, `modular-latex-thesis`, `geospatial-empirical-data-science`, `computational-cultural-ecosystem`, and `open-science-investigative-corpus`.
  - Ingestion CLI runner: `npm run sync:github` (`scripts/sync-github.ts`).
- **Data Model & Decoupling**:
  - Zod schemas for Work, RepositoryEdition, Artifact, Author, and Catalog.
  - Multi-repository edition grouping: Unified 4 TCRA repositories into 1 canonical Master's thesis publication.
  - Metadata provenance tracking with auditable verification flags.
  - Dual-tier storage: Lightweight `src/data/generated/catalog.json` and isolated `src/content/generated/works/[slug].md`.
- **Editorial UI & Scholarly Reading Pages**:
  - Editorial homepage (`/`) with live search, domain filters, status chips, and publication cards.
  - Publication detail page (`/works/[slug]`) with sticky Table of Contents, responsive manuscript reading column, citation export (BibTeX & APA), artifact downloads, and JSON-LD structured data.
  - Research area taxonomy pages (`/research-areas` and `/research-areas/[slug]`).
  - Researcher profile page (`/about`).
  - Open-science workflow documentation (`/methodology`).
  - Dark mode and light mode toggle with theme persistence.
  - Dynamic sitemap (`/sitemap.xml`) and robots configuration (`/robots.txt`).
- **Testing & CI/CD**:
  - Vitest test suite with 14 unit tests covering classification, parsers, and catalog schemas (`npm test`).
  - Production build verification (`npm run build` with 26 static routes).
  - GitHub Actions automated daily sync workflow (`.github/workflows/sync-github.yml`).
