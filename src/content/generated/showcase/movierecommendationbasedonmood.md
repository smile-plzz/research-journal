# 🎬 MoodReel — Movie Recommendation Based on Mood

A web-based application that recommends movies and TV shows based on your current mood — pick a mood, chat with an AI about what you're after, browse the library by genre and year, or search directly. It uses the [OMDB API](http://www.omdbapi.com/) for movie/show data and is a static site at its core: deployable to GitHub Pages, Netlify, or Vercel with no build step. Two AI features (Chat with AI, and the most-accurate tier of free-text mood detection) use small serverless functions powered by Mistral on deployments that support it (e.g. Vercel); the mood-detection tier gracefully degrades to an in-browser model, then keyword matching, everywhere else — Chat with AI requires the serverless setup since a conversation has no non-AI equivalent.

---

## 🚀 Live Demo

> https://movie-recommendation-based-on-mood.vercel.app/
---

## 📌 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Deployment](#deployment)
- [AI Setup](#-ai-setup-mistral)
- [Folder Structure](#folder-structure)
- [Data & Storage](#data--storage)
- [Mood-to-Genre Mapping](#mood-to-genre-mapping)
- [A Note on "Watch Now"](#a-note-on-watch-now)
- [Known Limitations](#known-limitations)
- [Future Enhancements](#future-enhancements)
- [License](#license)

---

## ✨ Features

### 🎭 Precision Mood-Based Recommendations
- Choose from 29 moods, each mapped to genres and keywords in `config.json`.
- Since OMDB has no genre filter, picking a mood searches several mapped genre/keyword terms in parallel, merges the results, then **verifies each candidate's real `Genre` field** via a cached OMDB detail lookup and ranks by genre-match count and rating — not just movies whose title happens to contain the mood word.
- Every mood's `genres` list uses only OMDB's actual canonical genre vocabulary (Action, Drama, Sci-Fi, Thriller, Film-Noir, Sport, ...) — verified against live OMDB responses — so that genre-verification step actually matches real data instead of silently scoring zero for invented compound genres. See `CONFIG_LOG.md` (2026-07-30) for the details of this accuracy fix.

### 💬 Chat with AI
- A dedicated **Chat with AI** page (`chat.html`, via a `/api/chat` serverless function) for an actual back-and-forth: describe what you're in the mood for, and Mistral will ask at most one clarifying question if it needs to, then recommend 3–6 *specific real titles* by name (with year and movie/series type, so common-word titles like "Up" or "It" resolve to the right one). Each recommended title is looked up on OMDB and shown as a real card (poster, year, favorite/not-interested buttons) inline in the chat — not just a mood bucket.
- After recommendations appear, contextual follow-up chips ("Show something different," "Something shorter," "Something newer"...) let you refine without retyping a full sentence. A **New Chat** button resets the conversation, and a failed request shows a **Retry** button instead of forcing you to retype.
- This is the tailored, conversational recommendation experience — as opposed to "Describe Your Mood" below, which is a single-shot quick match. Both need the same `MISTRAL_API_KEY` setup (see [AI Setup](#-ai-setup-mistral)); chat has no non-AI fallback (a keyword matcher can't hold a conversation), so if the key isn't configured it says so directly in the chat instead of failing silently.

### 🧠 Describe Your Mood (AI-assisted)
- Type a sentence like *"something like Inception but less confusing"* and MoodReel figures out your mood **and** pulls out specific search terms (a referenced title, actor, sub-genre) in three tiers, each falling back to the next if unavailable:
  1. **Mistral AI** (via a `/api/mood` serverless function — see [AI Setup](#-ai-setup-mistral) below) reads the free text, classifies it against the full 29-mood list, *and* extracts up to 3 specific search terms from anything you mentioned by name — so a reference to a title, actor, or setting isn't lost by being reduced to just a mood bucket. Most accurate; only active on deployments with a configured `MISTRAL_API_KEY`.
  2. **In-browser ML** ([Transformers.js](https://github.com/xenova/transformers.js), lazy-loaded from a CDN) classifies the text into one of 7 base emotions if the AI tier is unavailable (mood only, no extracted terms).
  3. **Keyword matching** as a last resort if both models are unreachable (offline, blocked CDN, etc.) — the feature always does *something* useful.

### 📚 Library — Genre & Year Browsing
- A dedicated **Library** page (`library.html`) for traditional catalog browsing, alongside mood-based discovery: pick a genre (all 22 canonical OMDB genres), a type (Movies / TV Shows / All), and an optional year range, and browse with the same real-genre-verification precision engine used for moods.
- Genre badges on the movie details page link straight into the Library, pre-filtered to that genre and content type — a way to "fall down a rabbit hole" from one title into everything else like it.
- Sort by popularity, year (newest or oldest), title, or rating; filter by title text, minimum IMDb rating, and hide-watched — all client-side and instant once a genre's candidate pool is fetched.

### 🎬 Movies *and* TV Shows
- A **Show** selector (Movies / TV Shows / All) on the home page applies to mood search, category browsing, and general search alike — MoodReel isn't movie-only.

### 🔍 General Search & Category Browsing
- A dedicated search bar for any title, plus one-click genre category pills.
- **Surprise Me** button for a random mood pick when you can't decide.
- Filter by title, minimum IMDb rating (6.0+/7.0+/8.0+), and sort by popularity/title/year/rating — all client-side, instant.

### ❤️ Favorites, ✅ Watched, 🚫 Not Interested
- Every movie card has quick actions: view details, favorite, mark watched, or mark not interested.
- "Not interested" titles are excluded from future recommendations automatically.
- A "Hide watched" toggle keeps your results list focused on what you haven't seen.
- Manage all three lists (remove items, bring skipped titles back into rotation) from the **My Lists** page — which also supports **exporting/importing** your lists as a JSON file (handy across browsers/devices, since everything is otherwise local-only).

### 🎬 Full Movie Details Page
- Poster, ratings (IMDb, Rotten Tomatoes, Metacritic), runtime, cast, awards, box office, and more.
- Share via the Web Share API (or copy-link fallback), and Favorite/Watched/Not-Interested actions right on the page.
- **More Like This**: same-genre recommendations at the bottom of every details page.

### 🟢 Legitimate "Where to Watch"
- Links out to JustWatch (aggregates legal streaming availability across Netflix/Prime/Hulu/etc.), free legal platforms (Tubi, Pluto TV), Internet Archive for public-domain titles, and an official trailer search — MoodReel does not embed or link to unauthorized/pirated streaming sources.

### 🔑 Bring Your Own API Key
- A shared demo OMDB key is built in, but the key icon in the navbar lets you set your own free key (stored only in your browser) so you're not sharing the demo key's daily request limit.

### 📱 Responsive, Installable PWA
- Responsive dark UI across desktop/tablet/mobile, with a service worker for offline access to previously visited pages, plus a web app manifest (`manifest.json`) so browsers offer an actual "Install" prompt.

---

## 🧰 Tech Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript (no build step, no framework)
- **APIs**: [OMDB API](http://www.omdbapi.com/) (movie/show data), [Mistral AI](https://mistral.ai/) via two serverless proxies (Chat with AI, and the most-accurate tier of free-text mood detection), [Transformers.js](https://github.com/xenova/transformers.js) via CDN (in-browser emotion detection fallback for mood detection only)
- **Storage**: Browser `localStorage` only — no backend database
- **Deployment**: GitHub Pages / Netlify / Vercel (zero-config static hosting; Vercel also runs the `api/mood.js` and `api/chat.js` serverless functions)

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/smile-plzz/MovieRecommendationBasedOnMood.git
cd MovieRecommendationBasedOnMood
```

### 2. (Optional) Use Your Own OMDB API Key

A shared demo key works out of the box. For heavier use, click the key icon in the navbar once the app is running and paste in your own free key from [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx) — it's saved to `localStorage`, not committed to the repo.

### 3. Run Locally

Any static file server works:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

---

## 🎯 Usage

1. Open the deployed link or run locally.
2. Pick a mood, or type how you're feeling in the "Or describe how you're feeling" box, or search for a title directly.
3. Click a movie to view full details, ratings, and legal watch options.
4. Use the heart/check/eye-slash icons on any card to favorite, mark watched, or hide a title from future recommendations.
5. Visit **My Lists** to manage Favorites, Watched, and Not Interested.

---

## 🚀 Deployment

MoodReel is a static site at its core — no environment variables or build step required for the core app. The AI features (Chat with AI, and the most-accurate tier of "Describe Your Mood") need one environment variable on deployments that support serverless functions (see [AI Setup](#-ai-setup-mistral) below).

### Vercel

```bash
npm i -g vercel   # if you don't already have it
vercel             # from the project root, follow the prompts
```

Vercel auto-detects this as a static project with serverless functions at `api/mood.js` and `api/chat.js`. `vercel.json` sets a `no-cache` header on `service-worker.js` so app updates roll out promptly instead of getting stuck behind a stale cached worker.

### GitHub Pages / Netlify

- **GitHub Pages**: Push to `main`, enable Pages in repo settings, serve from `/ (root)`. No serverless function support — Chat with AI won't work at all here (it says so directly in the chat), and the "Describe your mood" tier falls back to the in-browser model automatically.
- **Netlify**: Link the repo, leave the build command empty, publish directory `/`. To get the AI features here too, move `api/mood.js` and `api/chat.js` to `netlify/functions/` and update the client's fetch URLs from `/api/mood` and `/api/chat` to `/.netlify/functions/mood` and `/.netlify/functions/chat` — not done by default since this project targets Vercel's `/api` convention.

---

## 🤖 AI Setup (Mistral)

Two features call [Mistral AI](https://mistral.ai/) through small serverless functions that keep the API key server-side — it is never sent to the browser:
- **Chat with AI** (`chat.html` → `api/chat.js`) — the tailored, conversational recommender. No non-AI fallback; without the key configured, the chat says so directly instead of failing silently.
- **Describe Your Mood**'s AI tier (`index.html` → `api/mood.js`) — a quick single-shot mood classification. Falls back to an in-browser model, then keyword matching, if unavailable (see [Describe Your Mood](#-describe-your-mood-ai-assisted)).

**If you're not seeing AI-tailored results, this is almost always why**: the key isn't configured, or you're testing on a host/method with no serverless support. To enable it on Vercel:

1. Get a Mistral API key from [console.mistral.ai](https://console.mistral.ai/).
2. In the Vercel dashboard: **Project Settings → Environment Variables** → add `MISTRAL_API_KEY` with your key as the value. Do **not** put it in any file that gets committed to the repo.
3. Redeploy (or just push — Vercel picks up new env vars on the next deploy).

For local testing, create a `.env.local` file in the project root (already covered by `.gitignore`) with:

```
MISTRAL_API_KEY=your-key-here
```

and run `vercel dev` instead of a plain static file server — `python3 -m http.server` (fine for the static pages) cannot execute either serverless function, so both AI features will silently degrade or, for Chat, show an explicit "not configured" message.

**Cost/abuse note**: both functions cap input length and reject non-POST requests, but neither has rate limiting beyond whatever your Mistral account plan enforces — keep that in mind before linking the page somewhere high-traffic. `api/chat.js` additionally caps conversation history sent per request (last 10 messages) to bound token cost as a chat grows.

---

## 📁 Folder Structure

```
MovieRecommendationBasedOnMood/
│
├── index.html              # Main app — mood picker, search, recommendations
├── movie-details.html      # Full movie details page
├── favorites.html          # "My Lists" — Favorites / Watched / Not Interested
├── library.html            # Library — genre + year + type browsing
├── chat.html                # Chat with AI — conversational recommendations
├── service-worker.js       # Offline caching (PWA)
├── config.json             # Mood → genre/keyword mapping (editable)
├── manifest.json           # Web app manifest (installable PWA)
├── icon.svg                # App icon (referenced by manifest.json + favicon)
├── vercel.json             # Vercel deployment headers
├── api/
│   ├── mood.js              # Serverless proxy to Mistral AI — quick mood classification
│   └── chat.js               # Serverless proxy to Mistral AI — conversational recommender
├── src/utils/
│   └── emotionDetector.js  # In-browser emotion detection (Transformers.js)
└── README.md
```

---

## 💾 Data & Storage

Everything lives in the browser's `localStorage` — no account, no server:

| Key | Purpose |
|---|---|
| `moodreel_favs` | Favorited movies |
| `moodreel_watched` | Movies marked watched |
| `moodreel_not_interested` | Movies hidden from recommendations |
| `moodreel_history` | Recent mood/search queries |
| `moodreel_api_key` | Your custom OMDB API key, if set |
| `moodreel_detail_cache` | Cached OMDB detail lookups (keeps recommendation ranking fast and API-frugal) |

---

## 🎨 Mood-to-Genre Mapping

Stored in `config.json`, editable without touching code. Each mood maps to a list of genres and descriptive keywords used to build the search terms behind the "precision" recommendation engine described above.

---

## 🟢 A Note on "Watch Now"

MoodReel intentionally does **not** embed third-party "free movie streaming" iframes (the kind that proxy unauthorized copies of copyrighted films). The "Where to Watch" panel on the details page links only to legitimate destinations: JustWatch (legal streaming availability lookup), Tubi and Pluto TV (ad-supported legal streaming), Internet Archive (public-domain titles), and an official trailer search on YouTube.

---

## 🛡️ Stability Notes

- All movie data from OMDB (titles, plots, cast, etc.) is HTML-escaped before insertion into the page — it's third-party data and shouldn't be trusted implicitly.
- API failures (invalid key, daily limit reached, network errors) surface as an actual message in the results area instead of a misleading "no movies found."
- Rapid, overlapping requests (e.g. clicking two moods quickly) are guarded with a request-sequence check so a slower, older response can't clobber a newer one.
- `localStorage` reads are wrapped in try/catch everywhere, so corrupted or manually-edited storage degrades to an empty list instead of crashing the page.
- Movie cards, the Library's cards, and the details page's "More Like This" grid are keyboard-operable (Tab to focus, Enter/Space to open) — not just mouse/touch.
- Movie card actions (favorite/watched/not-interested) are always visible, not hover-only — a hover-only design is invisible-but-still-tappable on touchscreens, which used to let a mis-tap silently fire the wrong action instead of opening details.
- Navbars collapse to icon-only below ~560px so 4+ nav items don't overflow or clip on phone-width screens (icons keep their accessible names via `title`/`aria-label`).

## 🐞 Known Limitations

- OMDB's free tier caps at 1,000 requests/day per key — the shared demo key can be exhausted by combined traffic; set your own key via the navbar for guaranteed headroom.
- The in-browser emotion model is a first-time ~60–90MB download (cached by the browser afterward); on slow connections the keyword fallback kicks in automatically.
- OMDB doesn't expose a true genre filter, so even the precision engine's initial candidate pool comes from text search before genre verification narrows it down.

---

## 🚧 Future Enhancements

- Server-side proxy/key rotation to remove the shared-key rate limit entirely.
- TV/series season-and-episode browsing (currently movie-focused).
- Expand the emotion-to-mood mapping beyond the model's 7 base emotions using a richer classifier.
- Break the large inlined `<script>`/`<style>` blocks in each page into shared files if the project ever adopts a build step (currently intentionally build-step-free).

---

## 📜 License

MIT License. Feel free to fork and customize!

---

## 📣 Acknowledgments

- [OMDB API](http://www.omdbapi.com/)
- [Transformers.js](https://github.com/xenova/transformers.js)
- [JustWatch](https://www.justwatch.com/) for legal streaming availability
