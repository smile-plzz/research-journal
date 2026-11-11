# Bela Journeys

A Bangladesh parent travel concept and pilot website. Adult children can request a trip for their parents. The parents' interest, suitability, itinerary, supplier availability, price and lawful operator arrangement must be confirmed before any reservation.

## What works now

- Responsive landing page with three indicative journeys.
- Booking **request** form with field validation, explicit consent and D1 persistence.
- A reference number on successful submission. There are no instant bookings or payments.
- The research and execution plan is in `docs/feasibility-and-pilot-plan.md`.

## Development

The site uses Vinext, Cloudflare Workers and D1. Install with the bundled project setup workflow, then run `pnpm db:generate`, apply local migrations as documented by the starter, and start the dev server. `.openai/hosting.json` declares the logical `DB` binding; deployment provisions it and applies checked-in migrations.

## Operational handoff before public launch

The site is an early private pilot. The trip request database does not send notifications or expose a public admin list. An authorized owner can inspect requests through the Site's database management interface; arrange a secure staff workflow and retention policy before accepting real customer information. Connect a verified registered tour operator, establish a working response contact, inspect suppliers, confirm prices and terms, and run the safety checks in the research plan. Never describe a submitted request as a reservation.

The image on the landing page is a generated illustrative scene, not a photograph of a named property or a promised trip.
