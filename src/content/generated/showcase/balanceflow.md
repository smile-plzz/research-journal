# BalanceFlow

A focused work-break timer built for balance, not burnout.

## Features

- **Work / Break tabs** — Switch modes with dedicated durations and colour themes
- **Custom durations** — Set any minute value (1–120) via input or ±5 buttons
- **Pause & Resume** — Interrupt and continue any session without losing time
- **Keyboard shortcuts** — `Space` to start/pause, `R` to reset
- **Stopwatch** — Independent stopwatch with start/stop/reset; runs alongside the main timer
- **Session log** — Today's completed sessions shown with type, duration, and time
- **Daily stats** — Live counts of work sessions, breaks, and total minutes
- **Persistent state** — Survives page refresh; resets automatically on a new day
- **Browser notifications** — Desktop alerts when sessions complete (opt-in)
- **PWA / offline-first** — Installable on iOS/Android/desktop; works without internet

## Setup

1. Clone or download this repo.
2. Open `index.html` in any modern browser — works locally with no build step.
3. For PWA features (install prompt, service worker, notifications), serve over HTTPS, e.g. GitHub Pages or `npx serve .`.

## Shortcuts

| Key     | Action              |
|---------|---------------------|
| `Space` | Start / Pause       |
| `R`     | Reset current timer |

## Browser support

Chrome 90+, Firefox 88+, Safari 15+, Edge 90+.
