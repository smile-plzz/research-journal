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
| **Any-Day Explorer** + Timeline Stack | ✅ Working with demo data |
| **Calendar Heatmap** (clickable) | ✅ |
| **Search** (captions, locations, people, tags) | ✅ |
| **Anniversary Collections** | ✅ |
| **Compare Years** | ✅ |
| **Import UI** | ✅ UI + privacy messaging; real Facebook ZIP/JSON parser is the next milestone |
| Photo viewer for real media | Not yet (needs archive media resolution) |
| On-device AI summaries | Not yet |

## Golden-path demo (under 60 seconds)

1. Open the app → you land on **Any-Day Explorer** for August 5.
2. Scroll the vertical stack — memories from 2009 through 2025 appear for the same calendar day.
3. Switch to **Heatmap**, click a dense square → jumps back to Explorer for that day.
4. Try **Search** for “Japan” or “birthday”.
5. Open **Collections** → “My Birthdays”.

## Product truth

- Full vision, user stories, MVP definition, and roadmap → [`PRODUCT.md`](PRODUCT.md)
- Engineering invariants and current architecture notes → [`CLAUDE.md`](CLAUDE.md)
- Structured evaluation system → [`audits/`](audits/)

## Privacy promise

- No server that receives your archive
- No Facebook authentication flow
- All processing intended to stay on-device

## Next engineering priorities

1. Real Facebook ZIP + JSON parser (domain 03)
2. Media path resolution + in-flow photo viewer
3. Local AI summaries that degrade gracefully (domain 05)
4. Stronger first-run → first multi-year “wow” path (domain 07)

See [`STATUS.md`](STATUS.md) for the live ordered list.

## License

MIT
