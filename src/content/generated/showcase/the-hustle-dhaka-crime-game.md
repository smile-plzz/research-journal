# The Hustle (Untitled Dhaka Crime Game)

[![CI & Deploy to GitHub Pages](https://github.com/smile-plzz/-The-Hustle-Untitled-Dhaka-Crime-Game-/actions/workflows/deploy.yml/badge.svg)](https://github.com/smile-plzz/-The-Hustle-Untitled-Dhaka-Crime-Game-/actions/workflows/deploy.yml)
[![Tests: 7/7 Passed](https://img.shields.io/badge/tests-7%2F7%20passed-brightgreen.svg)](https://github.com/smile-plzz/-The-Hustle-Untitled-Dhaka-Crime-Game-)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF.svg)](https://vitejs.dev/)

> **Playable Web Simulation:** [https://smile-plzz.github.io/-The-Hustle-Untitled-Dhaka-Crime-Game-/](https://smile-plzz.github.io/-The-Hustle-Untitled-Dhaka-Crime-Game-/)

A slow-burn coming-of-age crime drama and narrative simulation set in real Bangladesh between 2013 and 2025. 

The player is Rafiq, a schoolboy from Mirpur in Dhaka, who is pulled into the drug trade by a family medical debt. Over twelve in-game years he navigates the trade as it evolves from weed to yaba, and from local lanes to the Chattogram and Teknaf supply chains, against real documented historical events (the Rana Plaza collapse, the 2018 anti-drug drive, the 2018 Narcotics Control Act, the 2020 Teknaf surrender, COVID-19 lockdown, and the 2024 political upheaval).

The full authoritative Game Design & Development Document is preserved in [GDD.md](./GDD.md).

---

## Key Features

- **Deterministic Choice Engine**: Full 5-stage story with mathematically exact stat calculations, branching paths, and inter-stage ledgers.
- **Real-World Historical Anchor**:
  - **Era Banners**: Period title cards displaying year, Rafiq's age, and geographic location.
  - **News Tickers**: Verified real historical news wire above each scene.
  - **Fact Tags**: Clear labels distinguishing *"Based on real events"* from *"Fictional"* scenes.
  - **"What's the history?" Drawer**: In-scene contextual panel linking to 29 verified investigative news sources and 15 documented archive entries without breaking gameplay immersion.
- **Persistent Archive & Dual-Track Timeline**:
  - Full archive of 15 historical entries persistent across playthroughs via browser `localStorage`.
  - 2013–2025 horizontal timeline comparing national events with Rafiq's milestones.
- **Core Stats System**:
  - **Money (৳)**: Whole taka accumulation.
  - **Loyalty (0–100)**: Trust with family, friends, and crew.
  - **Heat (0–100)**: Law enforcement attention (70+ triggers critical risk).
  - **Morality (0–100)**: Ethical toll and psychological guilt.
  - **Crew Loyalty**: Dedicated tracking for lieutenants Noyon, Reshma, and Kalam in Stage 4+.
- **Seven Authoritative Endings & Character Fates**:
  - *Redemption*, *The Untouchable Kingpin*, *Caught* (including surrendered variant), *Killed in the Turf War*, and *Ghost* (including fled variant).
  - Detailed character epilogues for Amena, Babu, Shuvo, Haque, Noyon, Reshma, Kalam, and the boy.
- **Responsible Social Realism & Support**:
  - Ethical treatment of sensitive topics without drug recipes or glorification.
  - Dedicated **Help Screen (A-15)** referencing official Department of Narcotics Control (DNC) treatment services and the Central Drug Addiction Treatment Centre in Dhaka.
- **Audio & Visual Polish**:
  - Atmospheric dark Dhaka Noir aesthetic.
  - Procedural monsoon rain ambience generated via Web Audio API.
  - Optional retro CRT scanlines display filter.
  - Multi-slot save/load system.

---

## Project Structure

```
├── .github/workflows/deploy.yml # GitHub Actions automated CI and Pages deployment
├── GDD.md                       # Full authoritative Game Design Document
├── README.md                    # Project overview & documentation
├── dev-log.md                   # Development log with verification records
├── context.md                   # System rules, stat equations & endings hierarchy
├── CHANGELOG.md                 # Versioned change history
├── index.html                   # HTML entry point with typography preconnects
├── package.json                 # Project dependencies and npm scripts
├── vite.config.ts               # Vite configuration (relative base for Pages)
└── src/
    ├── types.ts                 # Complete TypeScript interfaces
    ├── main.tsx                 # React application mounting
    ├── App.tsx                  # Root component, state orchestration & modals
    ├── index.css                # Custom Dhaka Noir design system
    ├── game/
    │   ├── engine.ts            # Deterministic state machine & ending resolution
    │   ├── engine.test.ts       # Automated Vitest suite for all 7 reference tests
    │   ├── storyData.ts         # Scenes S1-1 to S5-3, choice logic & deltas
    │   └── archiveData.ts       # 15 Archive entries, 12 Tickers & 29 Sources
    └── components/
        ├── Header.tsx           # Stat meters, crew status & top controls
        ├── NewsTicker.tsx       # Historical news tape
        ├── ScenePlayer.tsx      # Scene viewer, fact tags & interactive choices
        ├── HistoryDrawer.tsx    # Slide-over panel for historical context
        ├── ArchiveScreen.tsx    # 15-entry persistent historical database
        ├── TimelineScreen.tsx   # Dual-track 2013-2025 timeline
        ├── SourcesScreen.tsx    # Table of 29 cited journalism/academic sources
        ├── HelpScreen.tsx       # DNC treatment facilities & health guidance
        ├── LedgerModal.tsx      # Financial settlement between stages
        ├── EndingScreen.tsx     # Epilogues, character fates & stats recap
        ├── SaveLoadModal.tsx    # 4-slot persistent game save manager
        ├── PauseMenu.tsx        # Pause overlay & display toggles
        └── SoundAtmosphere.ts   # Web Audio API rain atmosphere generator
```

---

## Local Development & Setup

### Prerequisites
- Node.js 18+
- npm

### Installation
```bash
git clone https://github.com/smile-plzz/-The-Hustle-Untitled-Dhaka-Crime-Game-.git
cd -The-Hustle-Untitled-Dhaka-Crime-Game-
npm install
```

### Run Development Server
```bash
npm run dev
```

### Run Automated Tests
```bash
npm test
```
Validates all 7 reference playthroughs (R, K, C, X, G, F, S) against Section 9 specifications.

### Production Build
```bash
npm run build
```
Generates an optimized static build in `dist/`.
