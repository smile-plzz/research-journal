# HaorBoard

**Find your place on the water.** HaorBoard is a mobile-first prototype for discovering and reserving private rooms on Sunamganj houseboats.

> **Demo only.** Three boats are invented; the Nautilus concept is sourced but its dates, room entries and rates are illustrative. Checkout simulates payment; it collects no money and issues no valid boarding pass. Do not accept real bookings on this version.

## Why this exists

Planning a houseboat trip can involve searching across operator pages, comparing cabins and inclusions, checking a date, and negotiating with an owner or manager. Ismail's sponsored trip on Nautilus demonstrated the experience and highlighted how difficult the value of a package can be to judge before boarding. It did **not** validate an actual paid booking journey. Existing sites already list and book Sunamganj boats, so the product hypothesis is narrower: trustworthy, current cabin inventory, clear total prices, and offers handled in one place may improve booking for travelers and owners. See [Product and market fit](docs/PRODUCT.md).

## What works today

| Traveler | Owner (single demo password) |
| --- | --- |
| Filter sample boats by date and group size | Add departure dates |
| Choose a dated private room and see its total price | Block rooms sold outside the platform |
| Hold a room for ten minutes during simulated checkout | See reservations and offers |
| Receive a sample confirmation ID | Accept, decline or counter an offer |
| Offer a total price and check its status by ID | |

Private rooms are priced by capacity: a room for eight at ৳10,000 per person lists at **৳80,000 total**. A traveler may offer another total for fewer guests. Offers do not reserve inventory; an accepted offer must enter checkout while the room is available.

The catalog includes an **independent Nautilus concept preview** based on a [published BD Cruise listing](https://www.bdcruise.com/nautilus/). Share `https://YOUR-SERVICE.onrender.com/?showcase=nautilus` to show only this operator concept. Dates, specific room entries and displayed rates are illustrative, and Nautilus has not approved this demo. The normal catalog and code remain multi-boat. See [the showcase data notes](docs/NAUTILUS_SHOWCASE.md).

## Documentation

- [Product and market fit](docs/PRODUCT.md): assumptions, existing options, value proposition, validation and success measures.
- [Architecture and booking rules](docs/ARCHITECTURE.md): components, data model, API, states, concurrency and limitations.
- [Render deployment](docs/DEPLOYMENT.md): Blueprint setup, secrets, storage and smoke checks.
- [Nautilus showcase](docs/NAUTILUS_SHOWCASE.md): sourced details, uncertainty and a possible owner-only pivot.

## Run locally

Requires Node.js 22 or newer. The repo pins 24.19.0 in `.node-version`. There are no third-party npm packages.

```sh
git clone https://github.com/smile-plzz/HaorBoard.git
cd HaorBoard
ADMIN_PASSWORD='choose-a-long-password' SESSION_SECRET='choose-a-random-secret' npm start
```

Open http://localhost:3000. The owner interface is at `/owner`. Local SQLite data is written to `data/haorboard.sqlite` unless `DATA_DIR` is set.

```sh
npm test
```

The test exercises hold conflicts, checkout confirmation, owner room blocks, accepted offers and two simultaneous requests for the same room.

## Deploy

The included `render.yaml` configures a paid Render Starter web service with a persistent disk. If you created a Render Web Service manually, you must add the secrets and disk settings yourself. Follow [the deployment guide](docs/DEPLOYMENT.md).

## Production boundary

The public demo has a shared owner password, simulated checkout, illustrative inventory, no notifications, and no verified owner identities or permits. Payment collection, refunds, settlements, trip operations, cancellation policy, and customer support require separate implementation and operator agreements. The prototype validates the booking model; it does not transact.
