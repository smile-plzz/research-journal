# 🛰️ Macro Pulse: Real-Time alternative Climate-Market Correlation Engine

**Macro Pulse** is a professional-grade full-stack alternative data telemetry engine and analytical terminal. It synchronizes decentralized financial indices (Cryptocurrency asset prices) with high-fidelity, localized environmental observations (Weather statistics) from cities across the globe. By tracking correlations, volatility, and trend patterns in real-time, the platform provides quants and macroeconomists with a playground to study alternative data vectors.

---

## 🏗️ Architecture & Stack Overview

The application is structured as a decoupled, high-frequency full-stack application leveraging **Vite**, **React**, **Express**, and the modern **Google Gen AI SDK**:

*   **Frontend (SPA)**: Engineered with React 19, TypeScript, and Vite. Utilizes **Recharts** for dual-axis quantitative comparative rendering, **Tailwind CSS v4** for clean, low-latency design styles, and **Motion** for high-fidelity interactive state transitions.
*   **Backend (Data Orchestrator)**: Run by an Express server on Node.js (`server.ts`). It handles parallel concurrent API querying, rate limits, maintains sliding analytical historical buffers, and isolates critical API keys.
*   **Analysis Layer**: Calculates dynamic standard deviations (rolling volatility), Pearson Correlation Coefficients (covariance), and first-degree polyfit linear regressions (future trend projection vectors) dynamically inside the Node.js server.
*   **Cognitive Layer (AI)**: Driven by `gemini-3.5-flash` via the modern `@google/genai` client, drafting instantaneous macro quantitative summaries.

---

## 📊 Mathematical & Statistical Foundations

### 1. Pearson Correlation Coefficient ($r$)
Used to identify whether the asset price ($X$) and the localized climate index ($Y$) are mathematically coupled:

$$r = \frac{\sum (X_i - \bar{X})(Y_i - \bar{Y})}{\sqrt{\sum (X_i - \bar{X})^2 \sum (Y_i - \bar{Y})^2}}$$

*   **$|r| > 0.5$**: Strong Coupling
*   **$0.15 < |r| \le 0.5$**: Weak / Moderate Coupling
*   **$|r| \le 0.15$**: Statistical Noise (Independent)

### 2. Rolling Volatility
Expressed as the standard deviation of percentage price returns over the historical sliding buffer window:

$$\sigma = \sqrt{\frac{1}{N-1} \sum_{i=1}^N \left( R_i - \bar{R} \right)^2}$$

Where $R_i$ represents the asset price percent change at interval $i$.

### 3. Linear Regression Trend Projection
Employs ordinary least squares to fit a first-degree trendline ($y = mx + c$) through current window observations, predicting the price target for the next immediate sample.

---

## 🎨 Design Theme: GitHub/VSCode Bento Grid

The user interface implements a strict **Bento Grid** design system matching Github's visual aesthetic:

*   **Palette**: Charcoal Slate values `#0D1117` (Deep Ground), `#161B22` (Bento Cards), and `#30363D` (Bento Borders).
*   **Accents**: Tech-forward neon highlights including `#58A6FF` (Sky Blue), `#3FB950` (Emerald Green), `#D29922` (Amber), and `#F85149` (Vivid Crimson).
*   **Density**: Ultra-scannable metrics, dual-axis graphs, and raw live event logging streams fit perfectly within responsive visual grids.

---

## 🛠️ Getting Started & Local Setup

### 1. Prerequisites
Ensure you have Node.js (version 18+) and npm installed.

### 2. Installation
Install the workspace dependencies:
```bash
npm install
```

### 3. Environment Secrets Config
Create a `.env` file at the root level using `.env.example` as a template:
```env
# Required for real-time generative quant summaries
GEMINI_API_KEY="YOUR_ACTUAL_GEMINI_API_KEY"
```

### 4. Running Development
Run the high-performance local dev server:
```bash
npm run dev
```
Navigate your browser to `http://localhost:3000`.

---

## 📡 Live Endpoints & Adapters

*   **Crypto Price Feed**: Sourced dynamically from the CoinGecko Public API (with robust offline/rate-limit noise-simulation fallbacks).
*   **Climate Feed**: Gathered dynamically from the Open-Meteo Public API.
*   **Analytical API**: Exposed natively at `/api/pulse` supporting query-params `city` and `crypto`.
*   **Gemini Proxy API**: Securely wraps model operations at `/api/gemini/analyze`.
