<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# MusicianHire

A booking marketplace for musicians: clients discover, filter, and book verified
artists directly; artists manage bookings, earnings, and their public profile
from a dashboard.

View the original prototype in AI Studio: https://ai.studio/apps/drive/1xHLb-NkoP64co46mchF14w9cBQVTX8Sm

## Features

**Discover & book**
- Search by name, genre, or instrument, with AI-generated search suggestions
- Filter by genre, instrument, max rate, and minimum rating; sort by rating or price
- Favorite/save artists and filter down to just your favorites
- Artist profile with bio, instruments, offered services, weekly availability,
  a portfolio player (audio playback, images), and client reviews
- One-click booking requests, tracked in the artist's dashboard

**Artist dashboard**
- Performance overview: earnings trend, active projects, upcoming gigs
- Accept/decline incoming booking requests
- Editable public profile with an AI bio generator (Gemini) and a toggleable
  service catalog
- Distribution hub for tracking release streams across platforms

**Messaging**
- Per-artist conversation threads with live search over conversations

All data is currently mocked (`data.ts`) and held in memory — there is no
backend or persistence yet; refreshing the page resets bookings, favorites,
and chat messages.

## Tech Stack

- React 19 + TypeScript, built with Vite
- Tailwind CSS (via CDN, no build step)
- Recharts for the earnings chart
- Google Gemini API (`@google/genai`) for AI bio generation and search suggestions

## Run Locally

**Prerequisites:** Node.js 18+

1. Install dependencies:
   `npm install`
2. Copy [.env.local.example](.env.local.example) to `.env.local` and set `GEMINI_API_KEY` to your Gemini API key
3. Run the app:
   `npm run dev`

The AI bio generator and smart search suggestions require a Gemini API key; the rest of the app (browsing, filtering, favorites, booking, dashboard, messaging) works without one.

## Build

`npm run build` outputs a static site to `dist/`. `npm run preview` serves that build locally.

## Deploying to Vercel

This is a static Vite SPA, so it deploys to Vercel with no server config:

1. Import the repo at https://vercel.com/new
2. Framework preset: **Vite** (build command `npm run build`, output directory `dist` — Vercel detects both automatically)
3. Add an environment variable `GEMINI_API_KEY` in the Vercel project settings if you want the AI features enabled in production
4. Deploy

## Project Structure

```
App.tsx                    Top-level state (search, filters, favorites, bookings) and page routing
components/
  Navbar.tsx                Top navigation
  TalentCard.tsx             Artist card used in the Explore grid
  Dashboard.tsx              Artist-facing performance, profile, and distribution views
  Messages.tsx               Chat UI
data.ts                      Mock users, talents, bookings, reviews, distributions
types.ts                      Shared TypeScript interfaces
services/geminiService.ts     Gemini API calls (bio generation, search suggestions)
```
