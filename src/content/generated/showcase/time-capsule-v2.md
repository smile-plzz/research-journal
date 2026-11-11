# TimeCapsule

**Every day has a story. Rediscover yours.**

TimeCapsule turns a Facebook archive into a searchable, interactive personal timeline. Pick any calendar day and instantly see every memory from that day across all the years you have.

Privacy-first and offline-first: import happens locally, processing stays on your device, and there is no Facebook login.

## Run it

```bash
git clone https://github.com/smile-plzz/TimeCapsule.git
cd TimeCapsule
npm install
npm run dev
```

Open http://localhost:5173

Demo data is pre-loaded so you can experience the core “any day across years” flow immediately.

## Live project tracking

| Doc | Purpose |
|-----|---------|
| [`STATUS.md`](STATUS.md) | Current phase, what works, risks, next steps |
| [`CHANGELOG.md`](CHANGELOG.md) | Dated history of material changes |
| [`docs/TRACKING.md`](docs/TRACKING.md) | How to keep status files accurate |

## What works today (MVP surfaces)

| Surface | Status |
|---------|--------|
| **Interactive Geo-Map** | ✅ Vector map with proximity pin clustering, year/type filters & location index |
| **Any-Day & Month Timeline Explorer** | ✅ Working with day vs month scope switcher |
| **Archive Analytics Dashboard** | ✅ Interactive Year/Month filters, annual/day/time charts, top check-ins, keywords |
| **Calendar Heatmap** (clickable) | ✅ |
| **Search** (captions, locations, people, tags) | ✅ |
| **Anniversary Collections** | ✅ |
| **Compare Years** | ✅ |
| **Import UI & Facebook JSON ZIP Parser** | ✅ In-browser JSZip parser + multi-domain extraction (posts, comments, reactions, messages, events, groups, marketplace, stories) |
| **Comment & Post Reactions** | ✅ Authentic comment-level reaction counts & actor attribution |
| **Media Viewer** | ✅ In-browser lightbox with keyboard nav (⚠ missing-media placeholder pending) |
| **On-device AI summaries** | 🔧 Infrastructure in place (AI-off path, prompt grounding); local LLM integration pending |

## Golden-path demo (under 60 seconds)

1. Open the app → you land on **Timeline Explorer** for August 5.
2. Toggle scope between **On Specific Day** or **Entire Month** (e.g. all of August).
3. Switch to **Explorer** → browse the multi-year timeline stack for that day.
4. Click a memory card → open the post detail with comments, reactions, and media viewer.
5. Import a real Facebook ZIP export file in the **Import Archive** tab for local client-side processing.

## Product truth

- Full vision, user stories, MVP definition, and roadmap → [`PRODUCT.md`](PRODUCT.md)
- Engineering invariants and current architecture notes → [`CLAUDE.md`](CLAUDE.md)
- Structured evaluation system → [`audits/`](audits/)

## Privacy promise

- No server that receives your archive
- No Facebook authentication flow
- All processing intended to stay on-device

## Next engineering priorities

1. Stabilize import pipeline — edge-case parser fixes, fixture matrix, error categorization (domain 03)
2. UI/UX hardening — media lightbox placeholder, duplicate render fix, accessibility, contrast (domain 04)
3. Privacy audit pass — offline-first verification, exfil checks, regression fixtures (domain 01)
4. MVP scope discipline — route import to explorer, gate non-MVP views (domain 02)
5. Local AI summaries — grounding, AI-off path, on-device inference (domain 05)

See [`STATUS.md`](STATUS.md) for the live ordered list.

## License

MIT
