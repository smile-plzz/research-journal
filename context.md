# Research Context, Goals, Stack & Constraints

## 1. Project Identity & Author
- **Project Title:** GitHub-Powered Research Journal & Publication Archive
- **Author/Owner:** Md. Ismail Hossain
- **GitHub Account:** `smile-plzz` (https://github.com/smile-plzz)
- **Deployment Platform:** Vercel
- **Primary Discipline:** Academic Publishing, Scholarly Web Platforms, Static-First Data Systems

## 2. Strategic Objectives & Core Vision
Transform GitHub repositories into structured, peer-reviewed/working-paper publication records with an editorial reading experience. Rather than serving as a code portfolio or typical blog, this platform provides an intellectual archive for:
1. **Master's Theses & Formal Frameworks** (Jahangirnagar University PMIT TCRA Research)
2. **Critical Game Studies & Ludology Monographs** (60k–90k word studies with structured matrices)
3. **Public Health, GIS & Biomedical Engineering** (Health Access Gap spatial modeling, MRI Brain Tumor classification)
4. **Political Science & Digital Forensics** (Social Media mobilization and cancellation empirical analysis)
5. **Computational Musicology & Cultural Studies** (Evolution of contemporary Bangladeshi music)

## 3. Key Architectural Decisions & Constraints
- **Work vs. Repository Separation:** A single academic publication ("Work") can encompass multiple repository editions, revisions, or supporting toolkits. The TCRA thesis series maps 4 distinct repositories (`tcra-thesis-draft-01-paper`, `JU-PMIT-TCRA-Research-SubmissionCopy-paper`, `JU-PMIT-TCRA-Research-Tightened-paper`, `JU-PMIT-TCRA-Research-humanize-paper`) into a single canonical Work entity with distinct edition tags.
- **Content vs. Metadata Decoupling:** `catalog.json` stores lightweight metadata, abstracts, and artifact references to guarantee instant initial page loads and fast client search. Complete long-form manuscripts are stored in `src/content/generated/works/[slug].md` and loaded on demand.
- **Auditable Metadata Provenance:** Every extracted field (title, abstract, authors, publication date) retains its extraction source (`.publication.json`, `CITATION.cff`, `.zenodo.json`, `README.md`, or configured default) and verification flag. No academic peer-review status, DOI, or co-authorship is ever fabricated.
- **Workflow Document Privacy:** Internal development logs (`dev-log.md`) and raw investigative records are recognized during ingestion for metadata extraction but are never directly exposed to the public reading interface.
- **Zero Runtime Database Dependency:** Pure static-first architecture generated through GitHub Actions (daily cron or workflow dispatch) and served on Vercel with zero live API calls required during browser page views.
- **Design Language:** Warm scholarly editorial layout (warm off-white / charcoal, Source Serif + Geist Sans typography, generous whitespace, subtle dividing lines, dark/light theme support).

## 4. Technology Stack
- **Framework:** Next.js 15+ (App Router) with TypeScript (Strict Mode)
- **Styling:** Tailwind CSS with typography and theme customization
- **Theming:** `next-themes` (Light, Dark, System)
- **Data Validation:** Zod
- **Markdown & Math Rendering:** `react-markdown`, `remark-gfm`, `remark-math`, `rehype-katex`, `rehype-sanitize`
- **Automation:** GitHub Actions workflow with conditional commits
- **Testing:** Vitest for schema validation, parsers, and classification heuristics

