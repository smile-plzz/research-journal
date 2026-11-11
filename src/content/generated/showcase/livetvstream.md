# IPTV.STREAM

A lightweight IPTV web player built with pure HTML, CSS, and JavaScript. It fetches live IPTV channel data from the IPTV-Org project, provides fast searching and filtering, virtualized channel lists for high performance, HLS playback support, country/category filtering, recently watched channels, and automatic playlist refresh.

## Features

* 📺 Live IPTV channel streaming
* 🌍 Country-based channel filtering with flag support
* 🏷️ Category filtering
* 🔍 Debounced search (920ms delay)
* ⚡ Virtual scrolling for handling thousands of channels efficiently
* 🎬 HLS playback using HLS.js
* 📡 Automatic stream failover support ("Try Next Stream")
* 🕒 Recently watched channels
* 💾 Persistent settings using LocalStorage

  * Volume level
  * Recent channels
  * Last played channel
* 🔄 Automatic playlist refresh every 5 minutes
* ⛶ Fullscreen support
* ⌨️ Keyboard shortcuts
* 🎨 Responsive dark UI

---

## Data Source

This application uses the public IPTV playlist provided by the IPTV-Org project:

https://iptv-org.github.io/iptv/index.m3u

The application does not host, modify, or redistribute any IPTV streams. All stream URLs originate from publicly available sources maintained by IPTV-Org.

---

## Requirements

### Option 1: Run Locally

Modern browser with support for:

* Chrome
* Edge
* Firefox
* Safari

Because the application fetches remote resources, it should be served through an HTTP server rather than opening the file directly.

Example:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

---

## Project Structure

```text
project/
│
├── index.html
└── README.md
```

All application logic, styling, and UI components are contained within a single HTML file.

---

## User Interface

### Header

* Search channels
* Filter by category
* Refresh playlist manually
* View total available channels

### Country Filter Bar

Displays the most popular countries based on live playlist data.

### Sidebar

Three viewing modes:

* All Channels
* HD Only
* Recently Watched

### Video Player

* HLS playback
* Loading indicator
* Stream timeout detection
* Error handling
* Fullscreen support

### Now Playing Panel

Displays:

* Channel logo
* Channel name
* Country
* Category
* Language
* Volume controls
* Playback status

---

## Search

Search matches:

* Channel name
* Country code
* Category name

Search execution is delayed by 920 milliseconds after typing stops to improve performance.

Example:

```text
BBC
Sports
News
BD
```

---

## Filtering

Users can combine:

* Search
* Country
* Category
* HD-only mode
* Recently watched mode

Filters are applied instantly without additional network requests.

---

## Virtual Scrolling

The application may load thousands of channels.

Instead of rendering every channel at once, only visible rows are rendered.

Benefits:

* Faster rendering
* Lower memory usage
* Smooth scrolling
* Better browser performance

---

## Auto Refresh

Playlist data automatically refreshes every 5 minutes.

```javascript
const REFRESH_INTERVAL = 5 * 60 * 1000;
```

Users may also manually refresh using the refresh button.

---

## Local Storage

The following settings are saved automatically:

| Key | Purpose                   |
| --- | ------------------------- |
| iv  | Volume level              |
| ir  | Recently watched channels |
| il  | Last played channel       |

---

## Keyboard Shortcuts

| Key        | Action           |
| ---------- | ---------------- |
| Arrow Up   | Previous channel |
| Arrow Down | Next channel     |
| F          | Fullscreen       |
| M          | Mute / Unmute    |

---

## Stream Handling

Supported playback methods:

1. HLS.js
2. Native HLS support (Safari)
3. Browser-native video playback fallback

If a stream becomes unavailable:

* Error overlay is displayed
* User may dismiss the error
* User may switch to the next available stream

---

## Performance Notes

Large IPTV playlists often contain several thousand channels.

To maintain responsiveness:

* Virtual scrolling is used
* Search input is debounced
* DOM rendering is minimized
* Channel logos are lazy-loaded

---

## Disclaimer

This project is a frontend IPTV player for educational and personal use.

The application:

* Does not host IPTV content
* Does not guarantee stream availability
* Does not control geo-restrictions
* Does not verify stream legality in specific regions

Users are responsible for complying with local laws and content licensing requirements.

---

## License

MIT License

Feel free to modify, extend, and integrate this project into your own IPTV dashboards, media centers, or streaming applications.
