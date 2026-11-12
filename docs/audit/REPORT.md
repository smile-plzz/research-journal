# Audit Report: Baseline & Target Comparison

Generated: 2026-11-12
Baseline branch: `main` (commit `02dc32f`)

## 1. Build, Test & Bundle Inventory (Baseline)

- `npm run test`: 6 test files, 36 tests passing (4.02 s).
- `npm run lint`: Fails non-interactively (prompts to configure ESLint because no ESLint config file exists in the repo).
- `npm run build`: Passes (`validate-showcase.ts --strict`: 81 projects, 0 warnings; `next build`: 121 static/SSG routes + `/feed.xml` dynamic).
- **First-Load JS by Route (Baseline):**
  - Shared chunks across all routes: `103 kB`
  - `/` (Home): `6.44 kB` route + `119 kB` First Load JS
  - `/research-areas`: `1.02 kB` route + `108 kB` First Load JS
  - `/about`, `/methodology`: `1.02 kB` route + `108 kB` First Load JS
  - `/showcase`: `192 B` route + `139 kB` First Load JS
  - `/showcase/categories/[category]`: `187 B` route + `139 kB` First Load JS
  - `/works/[slug]`: `4.49 kB` route + `254 kB` First Load JS
  - `/showcase/[slug]`: `1.34 kB` route + `257 kB` First Load JS

### Heavy Client Bundles & Unnecessary Loading

- `katex/dist/katex.min.css` is imported globally in `src/app/globals.css`, so KaTeX CSS loads on every route even though only 2 of 16 works (`brain-tumor-classification-efficientnet-gradcam` and `listener-taste-growth-profile`) contain display math (`$$` / `\[`).
- `DocumentReader` and `MarkdownRenderer` bundle `react-markdown`, `remark-gfm`, `remark-math`, `rehype-katex`, `katex`, and `rehype-sanitize` directly into client JS on both `/works/[slug]` (254 kB) and `/showcase/[slug]` (257 kB), even though the Showcase README sits inside a collapsed `<details>` element.
- `Navbar` includes `QuickJumpTrigger` in `RootLayout`, serializing all 16 works and all 81 projects into every page's HTML payload.
- `ShowcaseBrowser` imports `date-fns` and renders 81 project cards/data on `/showcase`.

## 2. Mobile Lighthouse Baseline (390x844, Throttled)

| Route | Perf | A11y | BP | SEO | LCP (ms) | CLS | TBT (ms) | INP/FID (ms) | Total (KB) | JS (KB) |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 88 | 96 | 96 | 100 | 1094 | 0 | 468 | 289 | 489 | 306 |
| `/works/tcra-intelligence-automation-boundary` | 96 | 90 | 100 | 100 | 1085 | 0 | 229 | 284 | 512 | 306 |
| `/showcase` | 98 | 96 | 100 | 91 | 1219 | 0 | 178 | 217 | 713 | 300 |
| `/showcase/luma` | 95 | 96 | 100 | 100 | 1061 | 0 | 249 | 153 | 459 | 300 |
| `/research-areas` | 98 | 96 | 100 | 100 | 1071 | 0 | 178 | 174 | 538 | 306 |

### Baseline Accessibility & SEO Findings

- **`color-contrast` (all 5 routes):** Secondary muted text (`text-stone-400` on light backgrounds and low-contrast muted badges/dates) fails WCAG AA contrast.
- **`label-content-name-mismatch` (`/`, `/showcase`, `/showcase/luma`):** `QuickJumpTrigger` renders visible label `"Quick Jump"` with `aria-label="Quick navigation and global search"`, which does not contain `"Quick Jump"`.
- **`button-name` (`/works/tcra-...`):** Icon/utility control missing accessible name.
- **`heading-order` (`/works/tcra-...`):** Heading levels skip sequentially (`h1` -> `h4` in `EditionSelector` / `CitationBox`, or `h2` -> `h4`).
- **SEO 91 on `/showcase`:** Tap targets / font-size / link crawlability or small controls flagged on mobile.

## 3. Viewport & Horizontal Overflow Audit (360, 390, 768, 1280 px, Light & Dark)

Screenshots saved under `docs/audit/baseline/<route>-<width>-<theme>.png` (64 screenshots across 8 routes).

- **Critical Mobile Bug:** Every single route overflows horizontally at **360 px (`scrollWidth: 553 px`, +193 px overflow)** and **390 px (`scrollWidth: 553 px`, +163 px overflow)** in both light and dark modes.
- **Root Cause:** `Navbar` places brand title + segmented `Research | Showcase` switch + `About` + `Quick Jump` + `GitHub` + `ThemeToggle` in a non-wrapping `flex-shrink-0` row that exceeds 390 px width, clipping the search, GitHub, and theme toggle off-screen on phones.
- **Above-the-Fold Density (Mobile):**
  - `Navbar` + `GuidedSubnav` consume ~130 px of sticky vertical height at the top of 360 px screens.
  - `/` stacks an eyebrow pill, 3-line display H1, paragraph, two wing cards, 4-item stats bar, and 4-chip quick-start strip before showing any work or project.
  - `/works/[slug]` stacks breadcrumbs, back link, 3 status pills, 6-line H1, author block, provenance pill, 3 meta lines, and a 6-pill jump bar before the Abstract appears.
  - `/showcase/[slug]` places a 5-chip jump bar before the visual preview, pushing the preview below the fold.

## 4. Design System Inventory & Inconsistencies

- **Fonts:** `tailwind.config.ts` and `globals.css` reference `Newsreader`, `Source Serif 4`, `Geist Sans`, `Inter`, and `JetBrains Mono`, **but none are loaded via `next/font` or `@font-face`**. Browsers fall back to local system fonts (`Georgia` / `Segoe UI` / `Arial`).
- **Colors:**
  - `tailwind.config.ts` defines `cream` (`#FDFBF7`..`#C4BAA6`), `charcoal`, `academic` (`#8B3A2B` / `#D97757`), `sage`, `navy`.
  - `globals.css` defines `--bg-primary: #FBF9F5`, `--bg-secondary: #F4EFE6`, `--text-primary: #1C1C1A`, `--text-secondary: #575651`, `--border-color: #E6E0D4`, `--accent-academic: #8B3A2B` (dark `#131312` / `#E07A5F`).
  - Pages ignore CSS tokens in many places and hardcode `stone-*`, `cream-*`, `emerald-*`, `sky-*`, `amber-*`, `rose-*`, `indigo-*`, and `purple-*`.
- **Card Styles (5+ distinct treatments):**
  - `ProjectCard` (`rounded-xl border bg-white/80` + tinted footer bar + cover/gradient fallback + `hover:-translate-y-0.5`).
  - `PublicationCard` (borderless vertical row separated by `border-b`, no surface fill).
  - Home featured work card (`rounded-lg border bg-white/70` + `border-t` footer).
  - `research-areas` domain card (`rounded-lg border p-6` with colored tag + embedded publication list).
  - `about` / `methodology` info cards (`rounded-lg border p-4` / `rounded border p-3`).
- **Button Styles (6+ distinct treatments, undersized touch targets):**
  - Primary filled `bg-academic`, secondary `bg-emerald-700`, outlined `border-stone-300`, pill chips `rounded-full`, inline text links, and tiny `p-1.5` / `py-1` controls (24-32 px height, below the 44 px minimum touch target).
- **Housekeeping Gap Check:**
  - Local `git remote origin` is `https://github.com/smile-plzz/research-journal.git` and `.vercel/project.json` points to `research-journal`. The string `research-journal-web-app` appears only in `src/config/showcase.ts` exclusion list; `README.md` and `site.ts` are consistent with `research-journal`.

---

## 5. After-Pass Comparison (To Be Completed in Final Phase)

_Target metrics: Mobile Performance 95+, LCP < 2.0 s, CLS < 0.05, INP < 200 ms, 0 px horizontal overflow at 360/390 px, WCAG 2.2 AA compliance, and reduced first-load JS._
