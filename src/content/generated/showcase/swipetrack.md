# 📱 SwipeTrack – Personal Entertainment Journal

SwipeTrack is a high-energy, "dating-app-style" entertainment tracker designed to help you organize your movies, series, and games with a single swipe. Built with a premium **Notion-style** aesthetic, it combines addictive interactivity with deep analytics.

## ✨ Features

- **The Deck**: Swipe right to log as "Watched", left to "Skip", up to "Prioritize", and down for "Backlog".
- **Cinematic Journal**: A beautiful workspace for your tracked media, featuring powerful filters and a "Surprise Me" decision-maker.
- **Deep Analytics**: Visualize your entertainment habits with time-logged summaries, quality averages, and a detailed "Medium Split" donut chart.
- **Global Search**: Instantly find any movie, show, or game using integrated OMDb and RAWG data.
- **Cinematic Details**: Full-bleed posters, synopsis, cast lists, and direct "Watch Here" links to external streamers.
- **Cloud Sync**: Real-time persistence using **RestDB.io** and local offline-first fallback.

## 🛠️ Tech Stack

- **Frontend**: React 19, Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **Backend**: RestDB.io (NoSQL Cloud Database)
- **External APIs**: 
  - [OMDb API](http://www.omdbapi.com/) (Movies & Series)
  - [RAWG API](https://rawg.io/apidocs) (Games)

## 🚀 Setup & Backend Configuration

### 1. Environment variables
All API keys are read from environment variables — none are committed to the repo. Copy the template and fill in your own keys:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
|---|---|
| `VITE_OMDB_KEY` | [OMDb API](https://www.omdbapi.com/apikey.aspx) key (movies & series) |
| `VITE_RAWG_KEY` | [RAWG API](https://rawg.io/apidocs) key (games) |
| `VITE_RESTDB_URL` | Your RestDB.io collection REST endpoint |
| `VITE_RESTDB_API_KEY` | Your RestDB.io API key |

Then install and run:

```bash
npm install
npm run dev
```

### 2. Database Setup (RestDB.io)
1. Log in to [restdb.io](https://restdb.io/) and create a database.
2. Create a collection named **`user-entries`**.
3. In **Settings > API**, generate an API key with `POST` and `GET` permissions and put it in `VITE_RESTDB_API_KEY`.
4. Enable **CORS** for your database in the RestDB security settings.
5. Put the collection's REST endpoint (e.g. `https://your-db.restdb.io/rest/user-entries`) in `VITE_RESTDB_URL`.

### 3. Project Properties
The application expects the following data structure in the `user-entries` collection:
- `username` (String)
- `itemId` (String)
- `data` (JSON/Object containing the MediaItem details)
- `syncedAt` (DateTime)

> **Note:** Since this is a client-only app, these keys are still visible in the browser at runtime — that's unavoidable without a backend proxy. Keeping them out of the git history at least stops them from being harvested by GitHub secret scanners and search-indexed forks. If you're publishing this repo, use freshly generated keys with tight rate limits/permissions.

## 🎨 Design Philosophy
The UI follows a **Glassmorphism** and **Dark Mode** aesthetic, prioritizing legibility and tactile feedback. Every interaction is designed to feel "snappy" through the use of spring physics and micro-interactions.

---
*Created with passion by your world-class senior frontend engineer. Hasta la vista!*