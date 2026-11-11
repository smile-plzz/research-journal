import {
  ProjectCategory,
  ProjectPlatform,
  ProjectStatus,
} from "@/lib/showcase/schema";

export interface ShowcaseEditorialOverride {
  slug?: string;
  name?: string;
  tagline?: string;
  description?: string;
  audience?: string;
  features?: string[];
  category?: ProjectCategory;
  status?: ProjectStatus;
  platforms?: ProjectPlatform[];
  tech?: string[];
  cover?: string;
  screenshots?: string[];
  screenshotAlts?: string[];
  liveUrl?: string;
  safetyNote?: boolean;
  statusNote?: string;
  featured?: boolean;
  order?: number;
  relatedWorks?: string[];
  relatedProjects?: string[];
  needsReview?: boolean;
  includePrereleases?: boolean;
}

export interface WingRoutingOverride {
  research?: boolean;
  showcase?: boolean;
}

/**
 * Repositories excluded from the public Showcase gallery by default.
 * These are profile/training/meta repos rather than standalone user-facing projects.
 */
export const showcaseExclusionList: string[] = [
  "smile-plzz",
  "github-slideshow",
  "Luma-Memory-Drive-PRD",
  "research-journal-web-app",
];

/**
 * Explicit wing routing overrides.
 * By default:
 *   - Repos in repositoryInclusionList or matching `-paper` go to Research only.
 *   - All other non-excluded public non-fork repos go to Showcase only.
 * Add an entry here to show a repository in both wings or override its default wing.
 */
export const wingOverrides: Record<string, WingRoutingOverride> = {
  // Example for dual-wing overlap if desired:
  // "TCRA-Code-Auditor-V4-web-app": { research: true, showcase: true },
};

/**
 * Hand-curated editorial layer (source of truth for plain-language product copy).
 * Drafts derived from repository READMEs are marked `needsReview: true` until confirmed.
 */
export const showcaseEditorialEntries: Record<string, ShowcaseEditorialOverride> = {
  "Luma-windows-software": {
    slug: "luma",
    name: "Luma",
    tagline:
      "A native Windows media library for organizing photos and videos across your folders and drives.",
    description:
      "Luma turns your existing folders and external drives into a fast, searchable media gallery on Windows. Browse photos and videos by month, organize favorites and tags, exclude folders you want hidden, and open any original file in your default desktop app without uploading anything to the cloud.",
    audience:
      "Windows users with large local photo and video collections across folders or external hard drives.",
    features: [
      "Browse photos and videos directly from existing folders and removable drives",
      "Organize memories with favorites, tags, month navigation, and On This Day views",
      "Hide specific sources, folders, or file types with reversible exclusions",
      "Open original files directly in your default Windows apps with no cloud sync required",
    ],
    category: "desktop-app",
    status: "downloadable",
    platforms: ["windows"],
    tech: ["C#", ".NET", "Windows"],
    safetyNote: true,
    statusNote:
      "Portable gallery milestone is complete (v0.6.0) and in everyday testing with resumable indexing and drive reconnect support.",
    featured: true,
    order: 1,
    needsReview: true,
  },

  "NowShowing-Stream-android-app-TV": {
    slug: "nowshowing-tv",
    name: "NowShowing TV",
    tagline:
      "A standalone movie and series discovery app built for Android TV and Google TV.",
    description:
      "NowShowing TV brings movie and series discovery to your television screen with full hardware remote control support. It includes voice search, one-click source switching, crash recovery, and built-in update checking.",
    audience:
      "Android TV and Google TV users who want a dedicated, remote-friendly movie and show browser.",
    features: [
      "Designed for Android TV and Google TV with scrollable remote navigation",
      "Supports hardware remote media keys, voice search, and quick source switching",
      "Includes in-app update checks and automatic renderer crash recovery",
      "Organized settings for playback, metadata, privacy, and app health diagnostics",
    ],
    category: "mobile-app",
    status: "downloadable",
    platforms: ["android"],
    tech: ["Kotlin", "Android TV"],
    safetyNote: true,
    statusNote:
      "Active release candidate (1.6.0-rc series) alongside stable v1.4.0 builds with 158 unit tests.",
    featured: true,
    order: 2,
    relatedProjects: ["nowshowing"],
    includePrereleases: true,
    needsReview: true,
  },

  "NearDrop-windows-software": {
    slug: "neardrop",
    name: "NearDrop",
    tagline:
      "Send files, text, and links between your Windows laptop and phone browser over local Wi-Fi.",
    description:
      "NearDrop lets you move original files, notes, and links between a Windows computer and any phone browser on the same Wi-Fi network. There is no phone app to install, no account to create, and no cloud server involved.",
    audience:
      "Anyone who wants quick, private file and link transfers between Windows and iPhone or Android.",
    features: [
      "Works with your phone's built-in browser by scanning a QR code",
      "Transfers original files without compression, accounts, or cloud relays",
      "Supports drag-and-drop multi-file queues and shared text notes",
      "Runs as a portable Windows app with no Python or Node installation needed",
    ],
    category: "tool",
    status: "downloadable",
    platforms: ["windows"],
    tech: ["Python", "Local Wi-Fi", "Windows"],
    safetyNote: true,
    statusNote: "v1.0.0 portable Windows x64 release available for direct download.",
    featured: true,
    order: 3,
    needsReview: true,
  },

  "dedupe-light-windows-software": {
    slug: "dedupe-light",
    name: "DedupeLight",
    tagline:
      "A lightweight Windows app that safely finds exact duplicate files using SHA-256 verification.",
    description:
      "DedupeLight scans folders and drives for exact duplicate files, verifies every match with SHA-256 hashes, and groups copies side-by-side so you can decide what to keep. Nothing is ever deleted automatically.",
    audience:
      "Windows users looking to reclaim disk space without risking accidental file loss.",
    features: [
      "Verifies exact duplicates using SHA-256 cryptographic hashes and cached lookups",
      "Filters scan results by images, videos, audio, documents, code, or archives",
      "Side-by-side preview inspector and smart selection helpers (keep oldest, newest, or shortest path)",
      "Portable Windows app with no installer or separate .NET runtime required",
    ],
    category: "desktop-app",
    status: "downloadable",
    platforms: ["windows"],
    tech: ["C#", ".NET", "Windows"],
    safetyNote: true,
    statusNote: "Stable v1.1.0 Windows x64 portable build available with SHA-256 checksum.",
    featured: true,
    order: 4,
    needsReview: true,
  },

  "trek-route-visualizer-web-app": {
    slug: "trek-route-visualizer",
    name: "Trek Route Visualizer",
    tagline:
      "Turn geotagged photos or GPX files into an animated 3D map of your trek right in your browser.",
    description:
      "Trek Route Visualizer transforms your geotagged hiking photos or GPX tracks into an animated 3D terrain map. Everything runs locally inside your web browser with zero backend and full privacy for your location data.",
    audience:
      "Hikers, travelers, and photographers who want to visualize and animate their routes privately.",
    features: [
      "Renders trails on 3D mountain elevation terrain in the browser",
      "Supports four map themes and four atmospheric lighting modes",
      "Interactive drawer to inspect, search, or toggle individual photos and waypoints",
      "100% client-side processing so photos and GPS tracks never leave your device",
    ],
    category: "web-app",
    status: "live",
    platforms: ["web"],
    tech: ["TypeScript", "MapLibre GL", "3D Terrain"],
    statusNote: "Live in the browser with zero account or upload requirements.",
    featured: true,
    order: 5,
    needsReview: true,
  },

  "tracklist-web-app": {
    slug: "tracklist",
    name: "Tracklist",
    tagline:
      "A minimalist browser player that turns YouTube links or JSON playlists into a clean audio-visual queue.",
    description:
      "Tracklist is a fast static web player that turns any list of YouTube links or JSON playlist into a continuous, auto-advancing playlist. It runs entirely in your browser with local storage and shareable link encoding.",
    audience:
      "Listeners who want a calm, distraction-free YouTube playlist player without accounts.",
    features: [
      "Plays JSON playlists or pasted YouTube link lists with automatic track advance",
      "Automatically skips unplayable videos without interrupting playback",
      "Includes drag-to-reorder queues, stable shuffle, mini-player, and Focus Mode",
      "Stores playlists locally and shares playlists via compact URL links",
    ],
    category: "web-app",
    status: "live",
    platforms: ["web"],
    tech: ["TypeScript", "Static Web"],
    statusNote: "Live and ready to use directly in any desktop or mobile browser.",
    featured: true,
    order: 6,
    needsReview: true,
  },

  "TCRA-Code-Auditor-V4-web-app": {
    slug: "tcra-code-auditor-v4",
    name: "TCRA Code Auditor V4",
    tagline:
      "Audit AI-generated code for transparency, controllability, reliability, and auditability.",
    description:
      "TCRA Code Auditor V4 evaluates AI-generated code against the four-dimensional TCRA academic framework: Transparency, Controllability, Reliability, and Auditability. It features a guided three-step audit flow and a multi-provider compare mode.",
    audience:
      "Developers, researchers, and engineering teams reviewing AI-assisted code quality.",
    features: [
      "Guided three-step code audit workflow with inline validation",
      "Scores code across Transparency, Controllability, Reliability, and Auditability",
      "Compare and benchmark mode to evaluate the same prompt and code across providers",
      "Light and dark reading modes built as a companion tool to the TCRA thesis",
    ],
    category: "data",
    status: "live",
    platforms: ["web"],
    tech: ["TypeScript", "AI Evaluation", "TCRA"],
    statusNote: "Live web application accompanying the Jahangirnagar University PMIT TCRA thesis.",
    featured: false,
    order: 7,
    relatedWorks: ["tcra-intelligence-automation-boundary"],
    needsReview: true,
  },

  "iBackup-windows-software": {
    slug: "ibackup",
    name: "iBackup",
    tagline:
      "Copy iPhone and iPad photos and videos to your Windows PC over USB or local Wi-Fi.",
    description:
      "iBackup is a native Windows app that saves your iPhone and iPad photos and videos directly to ordinary folders on your own drive. It tracks what has already been copied so repeat backups stay fast and avoid duplicates.",
    audience:
      "iPhone and iPad users on Windows who prefer local folder backups over cloud subscriptions.",
    features: [
      "Supports both USB cable transfers and local Wi-Fi wireless backups",
      "Incremental backup tracking skips previously saved files automatically",
      "Organizes backups by year/month, year/month/day, or flat folders with optional SHA-256 checks",
      "Operates completely offline with zero cloud uploads or telemetry",
    ],
    category: "desktop-app",
    status: "downloadable",
    platforms: ["windows"],
    tech: ["C#", ".NET", "Windows"],
    safetyNote: true,
    statusNote: "Stable v0.1.3 Windows build available alongside v0.1.4 preview.",
    featured: false,
    order: 8,
    needsReview: true,
  },

  "Element-Screenshot-Extension": {
    slug: "elementshot",
    name: "ElementShot",
    tagline:
      "Click any element on a web page to capture and copy a clean PNG screenshot locally.",
    description:
      "ElementShot is a local-only browser extension for Chrome, Edge, and Firefox that captures exact pixels of any page component or custom region, copies it to your clipboard, and saves it to Downloads.",
    audience:
      "Designers, writers, and developers who regularly capture clean screenshots of specific UI parts.",
    features: [
      "Hover and click any element or hold Shift to capture a custom region",
      "Scroll wheel expands or narrows selection between parent and child containers",
      "Copies PNG directly to clipboard and saves organized files to Downloads/ElementShots",
      "Available as ready-to-load packages for Chrome/Edge and Firefox",
    ],
    category: "tool",
    status: "downloadable",
    platforms: ["browser-extension"],
    tech: ["TypeScript", "Chrome Extension", "Firefox Add-on"],
    safetyNote: false,
    statusNote: "v1.1.0 packages available for manual unpacked loading in Chrome, Edge, and Firefox.",
    featured: false,
    order: 9,
    needsReview: true,
  },

  "Khoroch-android-app": {
    slug: "khoroch",
    name: "Khoroch",
    tagline:
      "An offline-first Android expense tracker that reads bKash, Nagad, Rocket, and bank SMS automatically.",
    description:
      "Khoroch is an offline-first Android app built for Bangladesh that turns mobile wallet and bank SMS alerts into categorized expense and income records with zero manual typing and zero internet permission.",
    audience:
      "Android users in Bangladesh who want automatic, completely private expense tracking.",
    features: [
      "Automatically parses transaction SMS from bKash, Nagad, Rocket, Upay, and major banks",
      "Strictly offline with zero internet permission and an on-device SQLite database",
      "Bilingual Bangla and English interface with optional Bangla numerals and lakh/crore formatting",
      "Monthly spending dashboard, category charts, and budget warnings",
    ],
    category: "mobile-app",
    status: "in-development",
    platforms: ["android"],
    tech: ["Kotlin", "Android", "SQLite"],
    safetyNote: false,
    statusNote: "MVP source available; prebuilt APK release pending.",
    featured: false,
    order: 10,
    needsReview: true,
  },

  "PhotoManagementApp-windows-software": {
    slug: "photo-library",
    name: "Photo Library",
    tagline:
      "An offline desktop photo manager that indexes your existing folders without moving or uploading files.",
    description:
      "Photo Library points at the folders where your photos already live and builds a searchable, date-organized gallery on Windows, macOS, and Linux without moving, renaming, or uploading a single file.",
    audience:
      "Desktop users who want a fast Picasa-style offline photo browser across Windows, macOS, or Linux.",
    features: [
      "Builds a searchable, date-organized library directly over existing folders",
      "Never moves, renames, or uploads original photo files",
      "Cross-platform builds available for Windows, macOS (Intel and Apple Silicon), and Linux",
    ],
    category: "desktop-app",
    status: "downloadable",
    platforms: ["windows", "macos", "linux"],
    tech: ["C#", ".NET 9", "Avalonia UI"],
    safetyNote: true,
    statusNote: "v1.0.0 cross-platform builds available for Windows, macOS, and Linux.",
    featured: false,
    order: 11,
    needsReview: true,
  },

  "TV-Bridge-android-app-TV": {
    slug: "tv-bridge",
    name: "TV Bridge",
    tagline:
      "Share files, text, and links between your phone browser and Android TV over local Wi-Fi.",
    description:
      "TV Bridge connects any phone browser to your Android TV or Google TV using a QR code and six-digit pairing code over your home Wi-Fi, with no phone app, ads, or cloud upload needed.",
    audience:
      "Android TV users who need an easy way to send APKs, photos, or links from a phone.",
    features: [
      "Pair a phone browser to Android TV via QR code and six-digit approval",
      "Send multiple files, text, or links and download TV files back to your phone",
      "Works completely offline on home Wi-Fi with zero ads or cloud storage",
    ],
    category: "mobile-app",
    status: "prototype",
    platforms: ["android"],
    tech: ["Java", "Android TV", "Local Wi-Fi"],
    safetyNote: true,
    statusNote: "Preview APK build (v1.0.0-preview.5) available for sideload testing.",
    featured: false,
    order: 12,
    includePrereleases: true,
    needsReview: true,
  },
};

