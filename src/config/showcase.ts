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
 * Includes meta/profile repos, superseded older versions, abandoned prototypes,
 * and repositories whose only link points to an expired tunnel or planning doc.
 */
export const showcaseExclusionList: string[] = [
  // Profile, meta, training, and host site repositories
  "smile-plzz",
  "github-slideshow",
  "Luma-Memory-Drive-PRD",
  "research-journal-web-app",
  "Ismail_Hossain",
  "yet-another-ai-generated-portfolio-web-app",
  "portfolio-cms-ismail-web-app",

  // Superseded earlier versions replaced by newer entries
  "TCRA-Code-Auditor-web-app",
  "TCRA-Code-Auditor-V2-web-app",
  "TCRA-Code-Auditor-V3-web-app",
  "HiveMind_V3-web-app",
  "Brainstorm.AI-V1-web-app",
  "TimeCapsule-web-app",
  "NowShowing-Stream-web-app",
  "NowShowing-Stream-V2-web-app",
  "Daily-Doggo-Dusky-web-app",
  "real-time-event-finder-full-stack-web-app",

  // Abandoned experiments, planning-only repos, or dead tunnel URLs
  "FORGE-web-app",
  "Delayed.-web-app",
  "spotify-intelligence-web-app",
  "LocalFlix-windows-software",
];

/**
 * Explicit wing routing overrides.
 * By default:
 *   - Repos in repositoryInclusionList or matching `-paper` go to Research only.
 *   - All other non-excluded public non-fork repos go to Showcase only.
 * Relevant dual-wing repositories appear in both wings via explicit flags here.
 */
export const wingOverrides: Record<string, WingRoutingOverride> = {
  "bangladesh-music-evolution-paper": { research: true, showcase: true },
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
    relatedProjects: ["nowshowing", "watchmatch"],
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
    relatedProjects: ["tv-bridge"],
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
    relatedProjects: ["luma", "photo-library"],
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
    relatedProjects: ["vibebench-forensic-viewer"],
    needsReview: true,
  },

  "bangladesh-music-evolution-paper": {
    slug: "bangladesh-music-evolution",
    name: "Bangladesh Music Evolution Explorer",
    tagline:
      "Interactive explorer of Bangladeshi music genres, artist influence networks, and listener culture from 1972 onward.",
    description:
      "An interactive web explorer and open dataset tracing how contemporary Bangladeshi music evolved from 1972 to the present, mapping artist influence networks, cultural events, and genre lineages.",
    audience:
      "Music listeners, cultural researchers, and data journalists exploring Bangladeshi music history.",
    features: [
      "Explores 63 catalogued Bangladeshi artists and 179 sourced influence network edges",
      "Interactive visualizations of genre development and global cultural influences",
      "Backed by a validated open dataset and academic research pipeline",
    ],
    category: "data",
    status: "live",
    platforms: ["web"],
    tech: ["TypeScript", "Network Analysis", "Open Data"],
    liveUrl: "https://bangladesh-music-evolution-fep4.vercel.app/",
    statusNote: "Live interactive web explorer paired with the full study in the Research wing.",
    featured: false,
    order: 8,
    relatedWorks: ["bangladesh-music-evolution"],
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
    order: 9,
    relatedProjects: ["luma", "neardrop"],
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
    order: 10,
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
    order: 11,
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
    order: 12,
    relatedProjects: ["luma"],
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
    order: 13,
    relatedProjects: ["nook-tv", "neardrop"],
    includePrereleases: true,
    needsReview: true,
  },

  "NowShowing": {
    slug: "nowshowing",
    name: "NowShowing Web",
    tagline:
      "Search and browse movies and TV shows with watchlist tracking right in your browser.",
    description:
      "NowShowing is a responsive web app for discovering movies and TV shows across sources, managing a personal watchlist, picking up where you left off, and browsing entertainment news.",
    audience:
      "Movie and TV viewers who want a clean browser dashboard for discovery and watchlists.",
    features: [
      "Real-time search and filtering for movies and TV shows",
      "Personal watchlist management and Continue Watching history",
      "Responsive layout with light/dark theme switching and PWA offline support",
    ],
    category: "web-app",
    status: "live",
    platforms: ["web"],
    tech: ["JavaScript", "PWA"],
    statusNote: "Live web version paired with the standalone NowShowing TV Android app.",
    featured: false,
    order: 14,
    relatedProjects: ["nowshowing-tv", "watchmatch", "swipetrack"],
    needsReview: true,
  },

  "PhysioTrace-web-app": {
    slug: "physiotrace",
    name: "PhysioTrace Pro",
    tagline:
      "An educational browser simulator showing how medications are absorbed and cleared over 24 hours.",
    description:
      "PhysioTrace builds a browser-based bio-metric profile and plots how a compound is absorbed, distributed, and cleared over a 24-hour window, using public openFDA drug label data for educational exploration only.",
    audience:
      "Students, educators, and curious readers exploring basic pharmacokinetic curves.",
    features: [
      "Interactive digital-twin calibration stored locally in your browser",
      "24-hour curves for plasma concentration, organ load, and metabolic rate",
      "Public openFDA label lookup with zero accounts, backend, or telemetry",
    ],
    category: "data",
    status: "live",
    platforms: ["web"],
    tech: ["TypeScript", "openFDA", "Simulation"],
    statusNote: "Live educational simulator in the browser (not intended for clinical dosing).",
    featured: false,
    order: 15,
    relatedProjects: ["pillpal"],
    needsReview: true,
  },

  "Time-Capsule-V2-web-app": {
    slug: "timecapsule",
    name: "TimeCapsule",
    tagline:
      "Turn a Facebook archive into a private, searchable timeline and geo-map on your own device.",
    description:
      "TimeCapsule imports a downloaded Facebook archive locally in your browser and lets you pick any calendar day or explore an interactive map to rediscover memories across years without logging into Facebook.",
    audience:
      "People who downloaded their social media archive and want a private, searchable way to revisit memories.",
    features: [
      "Any-Day and Month timeline explorer with pre-loaded demo data",
      "Interactive geo-map with pin clustering, year filters, and location index",
      "Instant local search across captions, locations, people, and tags with zero login",
    ],
    category: "web-app",
    status: "live",
    platforms: ["web"],
    tech: ["TypeScript", "Local-First"],
    statusNote: "Live V2 web app with demo data preloaded so you can try it immediately.",
    featured: false,
    order: 16,
    needsReview: true,
  },

  "BetweenUs-web-app": {
    slug: "betweenus",
    name: "BetweenUs",
    tagline:
      "A calm, private shared space for two people to save moments, ideas, and plans together.",
    description:
      "BetweenUs creates a shared digital environment for a couple so everyday links, restaurant spots, gift hints, recipes, and notes stay organized in context instead of disappearing in chat threads.",
    audience:
      "Couples looking for a quiet shared space without streak counters or social feeds.",
    features: [
      "Shared home for saving places, gift ideas, recipes, questions, and plans",
      "Keeps everyday fragments organized by context instead of scrolling chat history",
      "Built as a live web application ready to test in the browser",
    ],
    category: "web-app",
    status: "live",
    platforms: ["web"],
    tech: ["TypeScript", "Web App"],
    statusNote: "V1 beta live on the web.",
    featured: false,
    order: 17,
    needsReview: true,
  },

  "WatchMatch-web-app": {
    slug: "watchmatch",
    name: "WatchMatch",
    tagline:
      "A chat-based movie and TV assistant that learns from your thumbs-up or thumbs-down reactions.",
    description:
      "Describe what you feel like watching in plain words, and WatchMatch suggests real movies and shows while learning immediately from your reactions without repeating titles you rejected.",
    audience:
      "Viewers tired of scrolling endless streaming grids who want tailored movie picks.",
    features: [
      "Natural-language movie and TV recommendations with at most one follow-up question",
      "Adapts picks on the fly when you react or give feedback",
      "Keeps your taste profile locally in your browser",
    ],
    category: "web-app",
    status: "live",
    platforms: ["web"],
    tech: ["JavaScript", "Recommendations"],
    statusNote: "Live and deployed for everyday movie and show recommendations.",
    featured: false,
    order: 18,
    relatedProjects: ["nowshowing", "swipetrack"],
    needsReview: true,
  },

  "SwipeTrack-web-app": {
    slug: "swipetrack",
    name: "SwipeTrack",
    tagline:
      "A swipe-based entertainment journal for logging movies, series, and games quickly.",
    description:
      "SwipeTrack turns media tracking into a fast card deck: swipe right to log watched titles, left to skip, up to prioritize, or down for your backlog, paired with viewing stats.",
    audience:
      "Movie, series, and game fans who want a quick way to track backlogs and watch history.",
    features: [
      "Card-swiping deck for logging Watched, Skip, Prioritize, and Backlog",
      "Global search for movies, shows, and games with posters and cast info",
      "Visual analytics showing time logged and media breakdowns",
    ],
    category: "web-app",
    status: "live",
    platforms: ["web"],
    tech: ["TypeScript", "React", "Charts"],
    statusNote: "Live web app with offline-first local fallback.",
    featured: false,
    order: 19,
    relatedProjects: ["watchmatch", "nowshowing"],
    needsReview: true,
  },

  "Westeros-Chronicles-web-app": {
    slug: "westeros-chronicles",
    name: "Westeros Chronicles",
    tagline:
      "An animated, spoiler-safe interactive map tracking Game of Thrones character journeys episode by episode.",
    description:
      "Westeros Chronicles maps character movements across Westeros and Essos episode by episode across all eight seasons, with timeline scrubbing and spoiler-safe filtering.",
    audience:
      "Fans of Game of Thrones and House of the Dragon rewatching or following character arcs.",
    features: [
      "Interactive SVG map with animated character tokens and path tracing",
      "Scrubbable episode timeline with playback controls and spoiler filter",
      "Filter characters by house or allegiance across desktop and mobile",
    ],
    category: "game",
    status: "live",
    platforms: ["web"],
    tech: ["TypeScript", "React", "Interactive Map"],
    statusNote: "Live interactive timeline explorer.",
    featured: false,
    order: 20,
    needsReview: true,
  },

  "Brainstorm.AI-V2-web-app": {
    slug: "brainstorm-ai-v2",
    name: "AI Ideation Studio (Brainstorm.AI)",
    tagline:
      "Assemble custom panels of AI specialist personas to debate, test, and refine ideas.",
    description:
      "AI Ideation Studio lets you launch preset expert rooms or define custom AI personas, control debate intensity, watch autonomous panel discussions unfold, and export full transcripts.",
    audience:
      "Founders, writers, and product builders stress-testing ideas from multiple perspectives.",
    features: [
      "Preset lab rooms including Startup Launchpad, Architecture Review, and Ethical Tech Summit",
      "Custom expert personas with adjustable debate intensity and autonomous turn skipping",
      "Collapsible focus workspace and one-click markdown transcript export",
    ],
    category: "web-app",
    status: "live",
    platforms: ["web"],
    tech: ["TypeScript", "Multi-Agent AI"],
    statusNote: "V2 live web application with collapsible focus workspace.",
    featured: false,
    order: 21,
    needsReview: true,
  },

  "AstroNode-web-app": {
    slug: "astronode",
    name: "AstroNode",
    tagline:
      "A mission-control style orbital dashboard for tracking space stations, modules, and launches.",
    description:
      "AstroNode renders a tactical orbital map with ground tracks, space debris overlays, telemetry diagnostics, and ground station handovers across low Earth orbit.",
    audience:
      "Space enthusiasts and students interested in orbital tracking and mission control interfaces.",
    features: [
      "Orbital ground track map with debris overlay and Deep Space Network handover indicators",
      "Live telemetry HUD displaying altitude, velocity, and orbital elements",
      "Built-in mission diagnostics and launch tracking views",
    ],
    category: "data",
    status: "live",
    platforms: ["web"],
    tech: ["TypeScript", "Orbital Telemetry"],
    statusNote: "Live web dashboard.",
    featured: false,
    order: 22,
    needsReview: true,
  },

  "PillPal-web-app": {
    slug: "pillpal",
    name: "PillPal",
    tagline:
      "A medication tracking and reminder web app for schedules, dosages, and refill alerts.",
    description:
      "PillPal helps people stay on top of prescriptions with flexible daily dose schedules, browser reminders, refill alerts, and adherence charts.",
    audience:
      "Patients and caregivers managing daily medication routines.",
    features: [
      "Custom daily dose schedules with timestamped adherence logging",
      "Browser reminder notifications and upcoming prescription refill alerts",
      "Adherence score and trend analytics over time",
    ],
    category: "web-app",
    status: "live",
    platforms: ["web"],
    tech: ["TypeScript", "Web Notifications"],
    statusNote: "Live web app.",
    featured: false,
    order: 23,
    relatedProjects: ["physiotrace"],
    needsReview: true,
  },

  "traillink-android-app": {
    slug: "traillink",
    name: "TrailLink",
    tagline:
      "Turn an older Samsung Galaxy S7 into a monitored offline travel hotspot appliance.",
    description:
      "TrailLink runs offline on stock Android 8.0 Oreo without root to monitor cellular signal, battery thermal safety, data usage, and travel sessions while a dedicated hotspot phone stays inside a backpack.",
    audience:
      "Travelers repurposing an older Android phone as a reliable field hotspot.",
    features: [
      "100% offline background monitoring with zero root required",
      "Four-tier battery thermal alert engine to protect aging phone batteries",
      "Network reachability diagnostics plus sanitized JSON and CSV session exports",
    ],
    category: "mobile-app",
    status: "prototype",
    platforms: ["android"],
    tech: ["Kotlin", "Android", "SQLite"],
    safetyNote: false,
    statusNote: "v0.1.0 source available; prebuilt APK release not yet published.",
    featured: false,
    order: 24,
    relatedProjects: ["autopoweroff"],
    needsReview: true,
  },

  "AutoPowerOff-andorid-app": {
    slug: "autopoweroff",
    name: "AutoPowerOff",
    tagline:
      "An Android utility that detects device inactivity and automatically locks or shuts down idle phones.",
    description:
      "AutoPowerOff tracks screen-off and stationary idle periods to conserve battery or protect privacy after configurable timers, complete with a warning countdown before triggering.",
    audience:
      "Android users running unattended or secondary devices who want automatic idle shutoff.",
    features: [
      "Configurable idle timers from 5 minutes up to 2 hours with motion reset",
      "Accessibility-based screen lock mode requiring zero root access",
      "Visual and audio warning countdown plus charger-connected protection",
    ],
    category: "automation",
    status: "in-development",
    platforms: ["android"],
    tech: ["Kotlin", "Android", "Material 3"],
    safetyNote: false,
    statusNote: "Android source available; APK build not yet published.",
    featured: false,
    order: 25,
    relatedProjects: ["traillink"],
    needsReview: true,
  },

  "nook-tv-android-app-TV": {
    slug: "nook-tv",
    name: "Nook TV",
    tagline:
      "A calm, personal Android TV home screen with app tiles, YouTube/RSS feeds, and phone video handoff.",
    description:
      "Nook TV replaces cluttered smart TV home screens with a clean dashboard featuring direct app launch cards, selected YouTube or RSS feeds, and local Wi-Fi video sending from a phone browser.",
    audience:
      "Android TV owners who want a minimal, ad-free custom home screen.",
    features: [
      "Clean Android TV launcher grid with favorite app cards",
      "Displays up to six selected YouTube channel or RSS feeds",
      "Built-in local Wi-Fi companion for sending videos from a phone browser",
    ],
    category: "mobile-app",
    status: "in-development",
    platforms: ["android"],
    tech: ["Java", "Android TV", "Media3"],
    safetyNote: false,
    statusNote: "Hardening release candidate in testing on physical TV hardware.",
    featured: false,
    order: 26,
    relatedProjects: ["tv-bridge", "nowshowing-tv"],
    needsReview: true,
  },

  "VibeBench-Forensic-Analysis-Viewer-web-app": {
    slug: "vibebench-forensic-viewer",
    name: "VibeBench Forensic Viewer",
    tagline:
      "Inspect AI-generated code benchmark evidence, patterns, and forensic findings in the browser.",
    description:
      "VibeBench Forensic Analysis Viewer provides a structured visual interface for inspecting benchmark outputs, code patterns, and forensic evidence from AI code generation studies.",
    audience:
      "Researchers and software engineers inspecting AI code evaluation results.",
    features: [
      "Interactive inspection of benchmark runs and evidence artifacts",
      "Pattern and anomaly browsing without command-line tools",
      "Static web viewer hosted directly in the browser",
    ],
    category: "data",
    status: "live",
    platforms: ["web"],
    tech: ["HTML", "Forensic Analysis"],
    statusNote: "Live static web viewer linked to the TCRA research program.",
    featured: false,
    order: 27,
    relatedWorks: ["tcra-intelligence-automation-boundary"],
    relatedProjects: ["tcra-code-auditor-v4"],
    needsReview: true,
  },

  "Bangladesh-Constitution-System-RAG": {
    slug: "bangladesh-constitution-rag",
    name: "Bangladesh Constitution Q&A (RAG)",
    tagline:
      "Ask natural-language questions against the text of the Bangladesh Constitution with cited answers.",
    description:
      "A retrieval-augmented generation pipeline built over the text of the Constitution of Bangladesh so queries return answers grounded in specific constitutional articles and sections.",
    audience:
      "Law students, researchers, and citizens searching constitutional articles.",
    features: [
      "Crawls and chunks official constitutional sections into structured datasets",
      "Supports multilingual embeddings and Bangla query flags",
      "Grounds responses in retrieved constitutional citations",
    ],
    category: "data",
    status: "prototype",
    platforms: ["cli"],
    tech: ["JavaScript", "Python", "RAG"],
    safetyNote: false,
    statusNote: "Local Node.js and Python pipeline; requires local vector store setup.",
    featured: false,
    order: 28,
    needsReview: true,
  },

  "hermes-model-router-agent-workflow": {
    slug: "hermes-model-router",
    name: "Hermes Model Router",
    tagline:
      "Automatically classifies tasks and routes them to the best free-tier AI model across providers.",
    description:
      "Hermes Model Router inspects incoming tasks (coding, reasoning, creative, or long-context) and picks the highest-scoring free-tier model across Groq, Gemini, Mistral, Nous, and OpenRouter.",
    audience:
      "Developers and AI agent builders minimizing API costs across free-tier model providers.",
    features: [
      "Classifies tasks across simple, code, reasoning, creative, summary, and long-context modes",
      "Scores candidate models by task fit and free-tier availability",
      "Outputs ready-to-use routing decisions across five model providers",
    ],
    category: "automation",
    status: "prototype",
    platforms: ["cli"],
    tech: ["Python", "AI Routing"],
    safetyNote: false,
    statusNote: "Open-source Python routing workflow.",
    featured: false,
    order: 29,
    needsReview: true,
  },

  "Med-Tech-web-app": {
    slug: "med-tech",
    name: "Med-Tech",
    tagline:
      "An online doctor consultation platform with built-in OCR to digitize handwritten prescriptions.",
    description:
      "Developed as a senior design project at North South University, Med-Tech connects patients and doctors for online consultations and uses OCR to turn handwritten prescriptions into readable digital text.",
    audience:
      "Patients, doctors, and healthcare clinics digitizing handwritten medical records.",
    features: [
      "Dedicated portals for patients, doctors, and hospital administrators",
      "Built-in OCR scanner to convert handwritten prescriptions into digital records",
      "Appointment scheduling, medical history tracking, and diagnostic reporting",
    ],
    category: "web-app",
    status: "prototype",
    platforms: ["web"],
    tech: ["TypeScript", "OCR", "Healthcare"],
    safetyNote: false,
    statusNote: "Academic senior design prototype (source available).",
    featured: false,
    order: 30,
    needsReview: true,
  },
};
