# Changelog

All notable changes to the GitHub-Powered Research Journal & Publication Archive project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 2026-11-12

### Added
- **Repo Showcase Wing (`/showcase`, `/showcase/[slug]`, `/showcase/categories/[category]`)**:
  - Separate static catalog (`src/data/generated/showcase.json`) and cached README layer (`src/content/generated/showcase/`) alongside the untouched Research catalog.
  - Hand-curated editorial layer (`src/config/showcase.ts`) with provenance tracking, non-fabrication defaults, and `needsReview` flags.
  - GitHub Showcase ingestion (`src/lib/showcase/`) with wing routing, GitHub Release binary asset parsing (Windows `.zip`, Android `.apk`, macOS/Linux `.tar.gz`, Chrome/Firefox extensions), and rate-limit-aware discovery.
  - Extended `scripts/sync-github.ts` with `--target research|showcase|all` and updated `.github/workflows/sync-github.yml` for dual-catalog daily sync.
  - Build-time catalog validation (`scripts/validate-showcase.ts`) checking slug uniqueness, featured completeness, release asset links, and cross-wing work slugs.
  - Non-technical UI with plain-language cards, faceted client-side search, direct release downloads, reusable `DownloadSafetyNote` component, collapsed "For developers" accordion, and two-wing homepage + navigation switch (`Research | Showcase | About`).
  - Added `tests/showcase/showcase.test.ts` covering normalizer, merge precedence, release asset parsing, routing rules, slug uniqueness, and schema validation.

## [1.2.0] - 2026-11-10

### Added
- **Google Scholar & Academic Indexing**: Added Highwire Press citation meta tags (`citation_title`, `citation_author`, `citation_publication_date`, `citation_pdf_url`, `citation_technical_report_institution`, `citation_keywords`) to all publication detail routes for automatic Google Scholar, Zotero, and Mendeley indexing.
- **Interactive Artifact Viewer Modal**: Built `ArtifactViewerModal.tsx` allowing readers to preview PDFs and interactive HTML maps/dashboards directly within an accessible modal without leaving the site.
- **Monograph Reading Experience Toolbar**: Built `ReadingToolbar.tsx` with dynamic scroll-reading percentage, font size toggle (Standard 18px / Large 21px), typeface switcher (Serif / Sans), and instant URL share.
- **Expanded Citation Suite**: Enhanced `CitationBox.tsx` with one-click toggles across 4 academic citation formats (BibTeX, APA 7th, IEEE, Chicago Author-Date) plus direct `.bib` file download.
- **Academic RSS 2.0 Feed**: Implemented automated XML syndication route at `/feed.xml` including item-level categories, authors, abstracts, and direct publication links.
- **Expanded Test Suite**: Added `tests/features/enhanced-features.test.ts` bringing total automated Vitest test coverage to 17/17 passing tests.

## [1.1.0] - 2026-11-10

### Added
- **Production Math Typography**: Installed `katex` package and imported `katex/dist/katex.min.css` in `src/app/globals.css`, ensuring mathematical formulas render with sub-pixel precision in production without external CDN dependencies.
- **Dual-Engine Ingestion Pipeline**:
  - Enhanced `src/lib/github/client.ts` with `fetchRepoTree` (recursive Git tree inspection) and automatic branch fallback handling (`main` / `master`).
  - Upgraded `src/lib/ingestion/sync.ts` with automated fallback: scans high-fidelity local folders when available and seamlessly switches to GitHub REST API + raw content fetching on cloud CI runners.
- **Vercel Production Configuration**:
  - Created `vercel.json` enforcing security headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `X-XSS-Protection`, `Referrer-Policy`) and immutable 1-year caching for `_next/static` assets.
- **Deployment Documentation**: Added comprehensive Git remote setup instructions and Vercel zero-config deployment options to `README.md`.

## [1.0.0] - 2026-11-09

### Added
- Full Next.js App Router Application with TypeScript, Tailwind CSS, and `next-themes`.
- Automated Ingestion Engine for 15 repositories across 5 archetypes.
- Zod Schemas for Work, RepositoryEdition, Artifact, and Catalog.
- Multi-repository edition grouping (TCRA Master's Thesis series).
- Fast lightweight `catalog.json` and cached isolated manuscripts (`slug.md`).
- Editorial UI: homepage, publication reader, sticky TOC, search, domain taxonomies, methodology, and about.
