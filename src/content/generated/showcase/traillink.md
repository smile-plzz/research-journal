# TrailLink

**Turn a Samsung Galaxy S7 into a dedicated travel hotspot appliance.**

TrailLink v0.1.0 is an offline-first Android application designed specifically to run on the Samsung Galaxy S7 (SM-G930L) on stock Android 8.0 Oreo without root. It monitors cellular reception, battery condition, thermal safety, data consumption, and travel sessions while the phone sits in a ventilated backpack compartment with the screen mostly off.

---

## Key Features
- **Zero Root / Zero Cloud**: 100% offline; uses only documented, public Android SDK APIs.
- **Independent Hotspot**: Operates alongside Android's built-in tethering without interfering with routing or client traffic.
- **Screen-Off Monitoring**: Background foreground service collects telemetry at 60-second intervals and surfaces a persistent status notification.
- **4-Tier Thermal Alert Engine**: Strict alerts (<38°C Normal, 38–42°C Warm, 42–45°C High, >45°C Critical) to safeguard aging batteries.
- **Network & Diagnostics Suite**: HTTP 204 reachability, DNS latency, and round-trip socket ping testing.
- **Session Tracking & Local Persistence**: SQLite / Room persistence for telemetry snapshots, travel sessions, and diagnostic events with automatic 7-day pruning.
- **Sanitized Offline Export**: Export telemetry and diagnostic history in JSON, CSV, and summary formats without leaking sensitive credentials or SIM IDs.

---

## System Requirements
- **Device**: Samsung Galaxy S7 (SM-G930L or compatible Exynos variant)
- **Operating System**: Android 8.0 Oreo (API 26) or higher
- **Firmware**: Stock Samsung firmware (Samsung Experience 9.0)
- **Power**: External power bank (Micro-USB)
- **Connectivity**: 4G LTE SIM (Bangladesh carriers supported: Grameenphone, Robi, Banglalink, Teletalk)

---

## Architecture Overview
```
traillink-android/
├── app/
│   ├── src/main/java/com/traillink/
│   │   ├── TrailLinkApplication.kt
│   │   ├── MainActivity.kt
│   │   ├── core/         # Device capabilities, permissions, config
│   │   ├── network/      # Telephony, signal, connectivity monitors
│   │   ├── power/        # Battery and thermal safety monitors
│   │   ├── hotspot/      # Hotspot launcher & session manager
│   │   ├── diagnostics/  # HTTP 204, DNS, and latency engines
│   │   ├── data/         # Room DB, entities, DAOs, repositories
│   │   ├── service/      # Foreground monitoring service & scheduler
│   │   ├── export/       # JSON / CSV offline report exporter
│   │   └── ui/           # MVVM Fragments (Dashboard, Network, Power, etc.)
│   └── src/main/res/     # Native Android Views & Material theme
└── docs/                 # Complete technical documentation suite
```

---

## Build & Installation
```powershell
# Build debug APK
./gradlew assembleDebug

# Run unit tests
./gradlew test

# Install onto connected Galaxy S7
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

---

## Documentation
- [Architecture & System Design](docs/ARCHITECTURE.md)
- [Device Compatibility Profile](docs/DEVICE-COMPATIBILITY.md)
- [Permissions & Security](docs/PERMISSIONS.md)
- [Data Schema](docs/DATA-SCHEMA.md)
- [Test Plan](docs/TEST-PLAN.md)
- [Known Limitations](docs/KNOWN-LIMITATIONS.md)
- [Release Checklist](docs/RELEASE-CHECKLIST.md)

