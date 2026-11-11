# Portfolio 2.0 — Md. Ismail Hossain

Next.js App Router + Sanity + Vercel. Replaces the single-file `index.html`
that used to be this repo.

Built from the Claude Design handoff: `Portfolio 2.0.dc.html` decides the UI,
`_ds/classical-*/styles.css` supplies the tokens, and the old `index.html` plus
the CV supply the content.

## Running it

```bash
npm install
cp .env.example .env.local   # fill in the Sanity write token
npm run dev
```

Without a Sanity project ID the site still renders — the data layer falls back
to `src/content/manifest.ts`, which is the same content the seed writes, so
there is no separate fixture to drift.

## Seeding the content

```bash
npm run seed
```

Idempotent: every document has a deterministic `_id`, so re-running updates
rather than duplicating. Seeds all 14 projects, both roles, both ventures, all
15 certificates, both papers, the 4 academic projects, the extra-curricular
entries and the site settings.

## The design system

`src/app/globals.css` carries the Classical tokens verbatim. Do not re-derive
them and do not add colours.

The rules that are load-bearing, not decoration:

- **Colour is stroke, never fill.** No filled buttons, no filled cards, no
  tinted section backgrounds, no gradients.
- **Cormorant sets at 400 for display sizes**; 600 is only for small interface
  headings. The bigger the text, the lighter it sets.
- **No bold.** Emphasis is italic.
- **No shadows on public pages.** Elevation is a whisper, and only the dialog
  uses it.
- **Square corners** on cards, plates and sections. Only tags, inputs, buttons
  and admin nav items are rounded.
- **`.plate` wraps every content photograph** — a 6px surface mat, a 1px
  outline, and a warm archival grade.
- **Tabular figures** (`.tnum`) on every number that stands as a figure.
- **No emoji, no icon library on the public site.** The sidebar socials are
  two-letter text on purpose.

Accent (`#b68235`) against the ground is roughly 3:1 — fine for chrome and
large text, not for body copy. Paragraph-size accent text resolves through
`--color-accent-prose`, never `--color-accent`.

Dark mode re-points the same variables under `:root[data-theme="dark"]`. There
is no parallel stylesheet.

## Layout

- Fixed 200px sidebar on desktop; a 58px top bar plus a right-hand drawer below
  1024px.
- `Section` owns the `150px 1fr` two-column spine and its stacked collapse. It
  is the single most-reused abstraction here.
- Breakpoints: `≥1024` full layout, `640–1023` stacked with 32px gutters,
  `<640` single column with 20px gutters and 48px touch targets.

## Still needs real content

These ship as scaffolding and are flagged, not passed off as real:

- The **positioning line** — the home headline is still the placeholder.
- **All fourteen project write-ups** (problem / approach / outcome). Projects
  carry `placeholderCopy: true` until Ismail writes them.
- **Project screenshots.** Nine or more have none; those cards fall back to a
  typographic panel rather than a placeholder graphic.
- **The portrait.**
- **Writing posts.** There are none, so the Writing nav link stays hidden.

## Notes

- The contact form still posts to the existing Formspree endpoint.
- The résumé is still the Google Drive link.
- The visitor badge is still `visitor-badge.laobi.icu`, moved to the footer.
- The CV lists three Atlassian certificates; the live site listed four including
  Forge Fundamentals. Four were kept — confirm before launch.

## Admin

`/admin` is built — dashboard, project editor with a live preview pane,
post editor, media library, settings. Single-editor auth: set
`ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` and the studio is reachable; leave
them unset and `/admin` stays closed. `SANITY_API_WRITE_TOKEN` gates whether
it can actually save — without it the studio is browsable but read-only,
same as the public site's fallback to the seed manifest.

Publishing a project or post calls `revalidateTag("content")`, so a save is
live everywhere within the minute — index, home grid and prev/next together.
Point the Sanity webhook at `/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>`
to get the same effect from edits made in Sanity Studio directly.

The post editor is a constrained Markdown textarea, not a rich-text library —
only the subset the reading page has type styles for (`##`/`###` headings,
`> ` quotes, `*italic*`, `[text](url)` links) round-trips to Portable Text.

## SEO

`sitemap.xml`, `robots.txt`, per-page JSON-LD (Person / CreativeWork /
BlogPosting) and a generated OG image are wired in — none of this was in the
design frames, per handoff §9 ("not designed. Add them, matching the type
system").
