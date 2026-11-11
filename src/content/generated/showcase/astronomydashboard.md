# Celestial Explorer: Command Terminal

A high-fidelity space exploration dashboard powered by NASA Open APIs, live ISS
telemetry, and an optional Gemini-powered AI advisor. Brutalist, command-center
aesthetic — real-time telemetry from across the cosmos, statically hosted.

**Live:** https://smile-plzz.github.io/AstronomyDashboard/

## 🌌 Core Modules

### 1. Command Briefing
- Curated space news feed, an "On This Day" spaceflight history widget, and a saved-visions strip.

### 2. Vision Registry (APOD)
- NASA's Astronomy Picture of the Day, with save-to-favorites and shareable date links.
- Optional Gemini AI deep-scan analysis (bring your own key — see below).

### 3. Earth (EPIC)
- Real-time full-disk Earth imagery from the DSCOVR satellite's EPIC camera.

### 4. Solar Monitor (DONKI)
- Coronal Mass Ejection telemetry from the last 30 days.

### 5. Observatory
- Real-time moon phase calculation and an upcoming celestial events calendar.

### 6. Mars Expedition (Rover Photos)
- Curiosity, Perseverance, and Opportunity image archives, filterable by camera and Sol.

### 7. Deep Space Exoplanets
- Recent exoplanet discoveries from the NASA Exoplanet Archive, with a bundled
  offline snapshot fallback (the archive's TAP service has no CORS support).

### 8. Technology Audit (TechPort)
- Active NASA technology development projects.

### 9. Orbital Tracker (ISS + NEOs)
- Live ISS position (via wheretheiss.at), crew registry, and Near-Earth Object proximity data.

### 10. Galactic Archives (NASA Image/Video Library)
- Full-text search across NASA's media library.

## ⚡ Extras

- **Command palette** — `Ctrl/Cmd+K` to jump to any module.
- **Deep links** — `?tab=apod&date=2026-07-22` opens a specific module/date directly.
- **Installable PWA** — add to home screen; an offline shell keeps the last visit reachable without a connection.
- **Settings panel** (gear icon) — optionally supply your own NASA and/or Gemini API keys.

## 🛠 Technical Architecture

- **Frontend**: React 19 with Vite 6
- **Styling**: Tailwind CSS 4 (brutalist dark theme)
- **Animation**: Motion (formerly Framer Motion)
- **Data Layer**: Direct browser calls to NASA Open APIs, wheretheiss.at, and the NASA Image/Video Library — all confirmed CORS-enabled, so no backend is required
- **Intelligence**: Google Gemini, called directly from the browser with a user-supplied key
- **Icons**: Lucide React

## 🚀 Running locally

```bash
npm install
npm run dev        # full-stack dev server (server.ts) at http://localhost:3000
```

`npm run dev` uses `server.ts`, an optional Express dev server retained for
local development convenience. It is **not** used in the deployed static
build — see below.

## 📦 Static deployment (GitHub Pages)

This app is a static single-page app: every data source it calls is browser
CORS-enabled, so it needs no backend in production.

```bash
npm run pages:build   # vite build only -> dist/
```

`.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages
automatically on every push to `master`. To enable it on a fork: **Settings →
Pages → Source: GitHub Actions**.

### API keys

There is no server to hold a secret on a static site, so keys are handled
client-side via the Settings panel (gear icon, top right), stored only in
`localStorage`:

- **NASA API key** — optional. Defaults to NASA's public `DEMO_KEY`, which is
  shared and rate-limited. Get a free key at [api.nasa.gov](https://api.nasa.gov)
  to raise your own limit.
- **Gemini API key** — required only for the AI Advisor on the Vision Registry
  tab. Get a free key at [aistudio.google.com](https://aistudio.google.com).
  Calls go straight from your browser to Google's API.

A `VITE_NASA_API_KEY` build-time environment variable is also supported as a
fallback default if you want to bake a key into your own deployment.

---
**© 2026 CELESTIAL SYSTEMS // ALL SYSTEMS NOMINAL**
