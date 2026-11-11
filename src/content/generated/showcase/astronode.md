# 🛰️ AstroNode: Live Orbital Dashboard

**AstroNode** is a high-fidelity mission control interface designed for the "New Space" era of 2026. As low Earth orbit (LEO) becomes increasingly crowded with government stations like the ISS and Tiangong, alongside emerging commercial modules, AstroNode provides a unified tactical grid for tracking, diagnostics, and logistics.

---

## 🌌 Overview

In 2026, the orbital landscape is dynamic. AstroNode serves as a centralized hub for flight directors and orbital enthusiasts, offering real-time telemetry, structural analysis, and AI-driven intelligence powered by the **Google Gemini API**.

---

## 🛠️ Feature Catalog

### 🗺️ Tactical Orbital Map
- **Sinusoidal Ground Tracks**: Projected paths based on live TLE (Two-Line Element) ephemeris data.
- **Kessler Debris Overlay**: Real-time visualization of high-velocity space debris clouds and potential collision vectors.
- **Ground Station Sync**: Visual indicators of signal handovers between spacecraft and Deep Space Network (DSN) sites (Goldstone, Madrid, Canberra).

### 📟 Telemetry & Diagnostic HUD
- **Live Flight Data**: Tracking altitude, velocity, and orbital elements with simulated high-radiation jitter.
- **X-Ray Walkthroughs**: Structural schematics of stations like the ISS and Tiangong, allowing users to "see through" hulls to internal pressurized modules and life-support racks.
- **System Console**: A real-time log of kernel events, uplink handshakes, and environmental monitoring.

### 🎮 Orbital Operations
- **Docking Simulator**: A manual approach-and-capture simulation for SpaceX Crew Dragon and Axiom modules, requiring precision alignment and low relative velocity (< 0.1 m/s).
- **AR Sky-Scan**: Leverages device camera and sensors to identify orbital passes, highlighting Starlink trains and active satellites in the user's local sky.

### 🚀 Expedition Logistics
- **Hazard Zone Mapping**: Visual overlays for Restricted Airspace and Maritime Hazard Zones during active launch windows for KSC and Starbase (Boca Chica).
- **Mission Manifest**: A centralized directory of aerospace fleet status, including Starship, New Glenn, and SLS Block 1B integration progress.

---

## 🧠 Intelligence Layer

AstroNode leverages the **Gemini 3** series models to provide real-time situational awareness:

- **Gemini 3 Flash**: Generates concise, technical **Mission Briefings** and **Solar Weather** forecasts, processing radiation flux and KP-index data.
- **Gemini 3 Pro**: Powers the **Orbital News Feed**, using Google Search grounding to synthesize real-world aerospace news (SpaceX, NASA, Blue Origin) into a May 2026 contextual feed.

---

## 💻 Technical Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Intelligence**: `@google/genai` (Gemini 3 Pro/Flash)
- **Visualization**: SVG-based ground tracks, CSS-driven CRT/Scanline effects, and custom-built 3D-simulated schematics.
- **Data**: TLE Ephemeris parsing, WebRTC (Camera API for AR), and Geo-location grounding.

---

## 🚀 Setup & Installation

### Environment Variables
The application requires a valid Gemini API Key to power the intelligence features.

1. Ensure the `process.env.API_KEY` is configured in your environment.
2. The application uses a dynamic client initialization pattern to ensure the latest keys are utilized.

### Running Locally
```bash
# Clone the repository
git clone https://github.com/your-repo/astronode.git

# Install dependencies
npm install

# Start the dashboard
npm start
```

---

## 📡 Signal Handover

AstroNode is designed for sub-200ms uplink environments. If you encounter rate limits on shared mission control frequencies (429 errors), the system implements an exponential backoff retry logic. Users can also swap to a **Premium Uplink** (Paid API Key) directly through the interface header.

---
**INTERFACE: v4.2.0-ROBUST** | **ASTRONODE // 2026**
