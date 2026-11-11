# Cosmic Live IPTV 📺

Cosmic Live IPTV is a high-performance, responsive web application designed for browsing and streaming IPTV channels globally. Built with a focus on visual elegance and platform reliability, it features a modern "Cosmic" dark interface, intelligent stream management, and robust channel categorization.

## ✨ Key Features

- **Live Stream Validation**: Before playback, streams are verified automatically in the background to ensure they are active. Dead or offline streams are handled gracefully.
- **Background Liveness Scanner**: Continuously verifies channel health in batches (40 streams every 0.8s) so you only see what works. Broken streams are hidden or flagged seamlessly.
- **Intelligent Categorization & Genres**: Channels are parsed and grouped into standardized categories (News, Sports, Movies, Entertainment, Kids, Music, Documentary, Lifestyle, Religious, Education, Local).
- **Virtualized Discovery**: High-performance sidebar utilizing custom virtualization to render thousands of channels smoothly with zero lag.
- **Advanced Global Filtering**: Extensive filtering by search query, region (country flags), multi-category genres, and resolution (HD/4K) badges.
- **Priority-Driven Sorting**: Intelligent channel organization that boosts HD/4K quality, favorites, and official sources to the top.
- **Picture-in-Picture & Mobile Ready**: Integrated PiP support and a responsive design that adapts flawlessly from desktop to mobile screens.
- **Recent & Favorite Channels**: Securely tracks your most recently watched channels and favorites using browser local storage.
- **Elegant UI**: A custom-crafted "Cosmic" theme utilizing deep charcoal grays, emerald accents, smooth Motion animations, and professional typography.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, TypeScript
- **Styling**: Tailwind CSS 4, Motion (Animation)
- **Streaming**: HLS.js with fallback native support
- **Icons**: Lucide React
- **Backend**: Express (Node.js) for serving and API proxying

## 📁 Project Structure

```text
/src
  /components     # Modular React components (Header, Sidebar, VideoPlayer, ChannelItem)
  /hooks          # Custom hooks (useIPTV, useBackgroundScanner, useDebounce)
  /lib            # Shared utilities, IPTV parsing, categories mapping
  /types.ts       # Global TypeScript interfaces
  /App.tsx        # Main application entry point & state orchestrator
  /index.css      # Tailwind configuration and Cosmic design tokens
/server.ts        # Full-stack production-ready Express server
```

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:3000`.

## 📦 Production

To build the application for production:

```bash
npm run build
npm start
```

The build process bundles the frontend into the `dist/` folder and compiles the TypeScript server into a self-contained CommonJS file for deployment.

## 🔑 Environment Variables

- `GEMINI_API_KEY`: (Optional) Required if integrating AI features.
- `APP_URL`: The hosted URL of the application.

## 📜 Credits

- Channel data provided by [iptv-org](https://github.com/iptv-org/iptv).
- Built with Google AI Studio.

---

*Thank you for building with Cosmic Live IPTV. Sayonara, and happy streaming! 🚀*
