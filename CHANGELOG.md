# Changelog

All notable changes to the GitHub-Powered Research Journal & Publication Archive project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2026-11-12

### Added & Changed
- **GitHub Markdown & LaTeX Content Refinement (`src/lib/markdown/`)**:
  - Added `src/lib/markdown/refine.ts` to preprocess ingested GitHub Markdown and raw `.tex` manuscripts (`isLatexDocument`, `convertLatexToReadableMarkdown`, `preprocessGithubMarkdown`, `resolveGitHubAssetUrl`, `resolveGitHubBlobUrl`): strips LaTeX preambles/comments, converts `\titlepage`, section headers, and `\begin{tabular}` environments into Markdown tables, lists modular `\input{...}` chapters, strips AI Studio `GHBanner` wrappers, converts HTML `<p align="center"><img><sub>` blocks, and resolves relative image and documentation paths against the source repository.
  - Added `src/lib/markdown/table-utils.ts` and `src/components/markdown/SortableMarkdownTable.tsx` replacing static Markdown tables with interactive controls for unit-aware column sorting (asc/desc/reset), live row filtering, compact/comfortable row density, wrap/horizontal-scroll toggles, and one-click CSV / Markdown copy.
  - Added `src/components/markdown/CodeBlock.tsx` with language header, line-wrap toggle, and one-click code copy.
- **Customizable Document Reader Workspace (`DocumentReader.tsx`, `TableOfContents.tsx`, `globals.css`)**:
  - Replaced basic reading controls with unified `DocumentReader.tsx` featuring persisted preferences (`localStorage`), `Reader` / `Outline` / `Raw` view modes, typeface switcher (`Serif`, `Sans`, `Mono`), text size (`sm` / `base` / `lg` / `xl`), line spacing (`Compact` / `Relaxed` / `Spacious`), column width (`Narrow` / `Standard` / `Wide`), text alignment (`Left` / `Justify`), Focus mode, in-document text Find highlighter, shareable anchor links, and mobile-collapsible / searchable `TableOfContents.tsx`.
- **Guided Navigation & Site-Wide Accessible Tooltips**:
  - Added reusable accessible `Tooltip` and touch-friendly `InfoHint` (`src/components/ui/Tooltip.tsx`), `Breadcrumbs` (`src/components/ui/Breadcrumbs.tsx`), `BackToTopButton` (`src/components/ui/BackToTopButton.tsx`), context-aware `GuidedSubnav` (`src/components/layout/GuidedSubnav.tsx`), and global `Ctrl+K` / `Cmd+K` `QuickJumpTrigger` modal (`src/components/layout/QuickJumpModal.tsx`).
  - Integrated breadcrumbs, quick-jump section bars, previous/next navigation, one-click quick filter presets (`Ready in Browser`, `Direct Downloads`, Windows, Android/TV, Thesis/Monograph status chips), URL query parameter sync in `ShowcaseBrowser`, and contextual tooltips across all Research and Showcase pages and components.
- **Tests**:
  - Added `tests/markdown/refine.test.ts` covering LaTeX conversion, HTML wrapper normalization, repo link resolution, unit-aware table sorting/export, and heading extraction (36/36 total Vitest tests passing).

## [2.0.0] - 2026-11-12

### Added
- **Two-Wing Platform ("Research and Projects")**:
  - Rebranded site identity to **Research and Projects** with a top-level **Research | Showcase | About** wing switch and dual-entry homepage.
  - **Repo Showcase Wing (`/showcase`, `/showcase/[slug]`, `/showcase/categories/[category]`)**:
    - Separate static catalog (`src/data/generated/showcase.json`, 81 indexed projects: 30 curated drafts, 6 featured) and cached README layer (`src/content/generated/showcase/`) alongside the untouched Research catalog (`catalog.json`).
    - Hand-curated editorial layer (`src/config/showcase.ts`) with provenance tracking, non-fabrication defaults, `needsReview` flags, and exclusion rules for superseded/meta/broken-link repositories.
    - Dual-wing routing override (`bangladesh-music-evolution-paper` in both wings) plus bidirectional cross-links between Showcase tools (`TCRA Code Auditor V4`, `VibeBench Forensic Viewer`) and the TCRA thesis.
    - GitHub Showcase ingestion (`src/lib/showcase/`) with GitHub Release binary asset parsing (Windows `.zip`, Android `.apk`, macOS/Linux `.tar.gz`, Chrome/Firefox extensions) and rate-limit fallback preservation.
    - Extended `scripts/sync-github.ts` with `--target research|showcase|all`, added build-time strict validator (`scripts/validate-showcase.ts`), and updated `.github/workflows/sync-github.yml` for dual-catalog daily sync.
    - Non-technical UI with plain-language cards, faceted client-side search, direct release downloads, reusable `DownloadSafetyNote` component, collapsed "For developers" accordion, and direct email contact CTA (`ismailhossain013@gmail.com`) for purchasing builds, collaborating, or contributing.
    - Accessibility & SEO updates: skip-to-content link, OG/Twitter metadata across showcase and category pages, `SoftwareApplication` JSON-LD, and full `sitemap.ts` coverage.
    - Added `tests/showcase/showcase.test.ts` (29/29 total Vitest tests passing).

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
