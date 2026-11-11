# Cosmic Voyager 🚀

**Cosmic Voyager** is a progressive web application designed for space enthusiasts, aspiring astronauts, and mission commanders. It serves as a personal "Mission Control" dashboard, aggregating real-time data from NASA, simulating orbital mechanics, and providing interactive tools for mission planning.

## 🌟 Features

### 1. Command Deck (Dashboard)
- **Live Telemetry**: Simulated orbital velocity, altitude, and geocoordinates.
- **NEO Sensors**: Tracks Near-Earth Objects (asteroids) making close approaches today (powered by NASA NeoWs API).
- **Deep Space Network**: Displays the Astronomy Picture of the Day (APOD) with high-res visuals.
- **Space Weather**: Monitors Solar Wind speed and Geomagnetic Storm (K-Index) activity.

### 2. Stellar Cartography
- **Interactive Orrery**: A CSS-animated model of the solar system showing relative orbits.
- **Planetary Database**: Detailed data cards for all major planets (and Pluto) including gravity, temperature, and moons.

### 3. Mars Relay Network
- **Live Rover Feed**: Connects to NASA's Mars Rover Photos API.
- **Multi-Rover Support**: Switch between *Curiosity* and *Perseverance*.
- **Offline Buffer**: Includes a cached data mode if the connection to Mars (or the API) is disrupted.

### 4. Mission Hangar
- **Flight Planner**: Interactive calculator for Delta-V requirements based on destination (LEO, Moon, Mars).
- **Vehicle Configurator**: Select payload and crew size to receive launch vehicle recommendations (Falcon 9, Starship, SLS, etc.).

### 5. Training & Archives
- **Flight Readiness Exam**: A quiz module to test your knowledge of space history and physics.
- **Mission Logs**: A timeline of humanity's greatest achievements in spaceflight.

## 🛠️ Technical Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, Glassmorphism UI
- **Icons**: Lucide React
- **Data Sources**: NASA Open APIs (APOD, NeoWs, Mars Photos)
- **Audio**: Web Audio API (Procedural sound generation)

## 🚀 Getting Started

1. **Clone the repository.**
2. **Install dependencies** (if moving to a local build environment).
3. **Run the application.**

*Note: The application uses a demo NASA API Key. For production use, replace the key in `index.tsx` with your own from [api.nasa.gov](https://api.nasa.gov).*

## 🎮 Controls

- **Audio System**: Toggle the speaker icon in the top right to enable the ambient engine drone and interface sounds.
- **Navigation**: Use the bottom dock on mobile or the top bar on desktop to switch subsystems.

---

*"Somewhere, something incredible is waiting to be known."* — Carl Sagan
