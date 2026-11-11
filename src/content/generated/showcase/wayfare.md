# Wayfare

Wayfare is a private, zero-cost place-capture and trip-decision tool for two people.

It begins with a recurring problem: attractive cottages, houseboats, resorts, and other destinations appear in Facebook, Instagram, and YouTube feeds, but disappear before they can become real travel plans. Wayfare turns those fleeting discoveries into a durable, searchable collection that can answer practical questions such as:

> Where could we go tomorrow, within our budget and available travel time, that both of us would enjoy?

The planned product is a mobile-friendly web app paired with an Apple Shortcut. A user shares a post, link, text, or screenshot from an iPhone; Wayfare preserves the source, extracts what it can, asks for confirmation where needed, and organizes the place by location, distance, price, category, preference, and visit status.

## Current status

**Phase:** local capture prototype

A local-first web prototype now covers manual and URL-prefilled capture, a durable browser inbox, evidence status, collection filters, two administrator identities, separate ratings, match scores, and JSON export. It uses clearly labeled sample records and has not yet been deployed or connected to a shared backend. The next experiment will test capture quality using real Facebook, Instagram, and YouTube examples.

## Run the prototype

From `apps/web`:

```bash
pnpm install
pnpm dev
```

Use `pnpm build` for a production build and `pnpm lint` for static checks. The prototype currently stores data in the browser under `wayfare:places:v1`.

## Product principles

- Capture must take seconds.
- Saving must succeed even when automatic extraction fails.
- Facts, estimates, and missing information must be visibly different.
- The collection is private by default.
- Both administrators retain distinct preferences and ratings.
- The project must work without subscriptions, payment cards, or paid APIs.
- User data must be exportable in ordinary formats.
- AI is optional assistance, not a dependency.

## Documentation

- [Product context](docs/product-context.md)
- [Vision and intent](docs/vision.md)
- [Market and positioning](docs/market-fit.md)
- [Product requirements](docs/prd.md)
- [Experience and information model](docs/experience.md)
- [Technical direction](docs/technical-direction.md)
- [Privacy and data ownership](docs/privacy.md)
- [Validation plan](docs/validation-plan.md)
- [Roadmap](docs/roadmap.md)
- [Decision log](docs/decisions/README.md)
- [Open questions](docs/open-questions.md)

## Working name

**Wayfare** is a provisional name. It is intentionally broader than honeymoon planning because the underlying job includes discovery, couple preferences, nearby escapes, international travel, and visit memory.

## License

No license has been selected. Until one is added, the repository is not licensed for reuse or redistribution.

