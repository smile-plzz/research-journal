# Entertainment Suite

Entertainment Suite is a comprehensive, responsive web application that combines movie streaming and mood-based recommendation features into a single, unified experience. Users can search for movies and TV shows, get personalized recommendations based on their mood, view detailed information, and stream content from various third-party sources.

## Features

*   **Unified Movie & TV Show Search:** Search for content using the OMDb API, with results displayed seamlessly within the main interface.
*   **Integrated Mood-Based Recommendations:** Discover movies tailored to your current mood, with mood selection and recommendations integrated directly into the primary application flow.
*   **Comprehensive Movie/TV Show Details:** Access detailed information for movies and TV shows, including season and episode selection for TV series.
*   **Multiple Streaming Sources:** Enjoy reliable content streaming with integrated support for various third-party video sources.
*   **Responsive Design:** Optimized for a consistent and adaptive viewing experience across desktops, tablets, and mobile devices.
*   **Modern UI/UX:** Features a dark-mode-first design with a refined visual language, cohesive styling via CSS variables, subtle animations, and a dynamic hero section.
*   **Integrated News Widget:** Stay updated with the latest movie and TV show news, powered by the GNews API, directly within the application.
*   **Seamless Video Playback:** Experience video playback within a modal window, complete with availability indicators and detailed content information.
*   **Enhanced Accessibility:** Improved keyboard navigation, focus management for modals, and ARIA attributes ensure better screen reader compatibility.

## Technologies Used

*   **HTML5:** For the application's structure.
*   **CSS3:** For styling and responsive design.
*   **JavaScript (ES6+):** For dynamic content, API interactions, and UI logic.
*   **Node.js (Vercel Serverless Functions):** Powers backend video availability checks, news fetching, and acts as a proxy for the OMDb API.
*   **OMDb API:** Used to fetch movie and TV show data.
*   **GNews API:** Used to fetch news articles.
*   **Third-Party Video Embeds:** Integrates with various video embedding services for content streaming.

## Setup and Installation

This project includes a small backend component (Vercel Serverless Functions) for API proxying and video source availability checks. To get started:

1.  **Clone or Download:** Download the project files to your local machine.
2.  **Install Dependencies:** Navigate to the project root in your terminal and run `npm install`.
3.  **Testing:**
    *   This project uses Jest for unit testing and a basic shell script for E2E testing.
    *   Unit test configuration is in `jest.config.cjs` and Babel configuration in `babel.config.cjs`.
    *   Run unit tests using `npm test`.
    *   Run E2E tests using `scripts/e2e.sh`.
4.  **Run Locally (for development with backend):**
    *   Install Vercel CLI: `npm install -g vercel`
    *   **Set OMDb API Key & GNews API Key:** Before running, set your OMDb API key and GNews API key as environment variables. For local development, create a `.env` file in your project root with:
        ```
        OMDB_API_KEY=your_omdb_api_key_here
        GNEWS_API_KEY=your_gnews_api_key_here
        ```
    *   From the project root, run `vercel dev` to start a local development server.
    *   Open the URL provided by Vercel CLI (e.g., `http://localhost:3000`) in your browser. The main application entry point is `index.html` at the root.
5.  **Deploy to Vercel:**
    *   Ensure you have a Vercel account and the Vercel CLI installed and logged in (`vercel login`).
    *   **Set OMDb API Key & GNews API Key on Vercel:** Go to your Vercel project dashboard -> Settings -> Environment Variables. Add new variables named `OMDB_API_KEY` and `GNEWS_API_KEY` with your respective API keys as their values.
    *   From the project root, run `vercel deploy`.

## Additional Documentation

*   **API Documentation:** Detailed information on the serverless functions and their usage can be found in `docs/API.md`.
*   **Troubleshooting Guide:** For common issues and their solutions, please refer to the `docs/TROUBLESHOOTING.md` guide.
*   **Development Log:** A log of the development process can be found in `docs/DEVELOPMENT_LOG.md`.
*   **UI/UX Development Track:** A log of the UI/UX development process can be found in `docs/UI_UX_DEVELOPMENT_TRACK.md`.
*   **Platform Outline:** The high-level design and feature roadmap can be found in `docs/platform-outline.markdown`.
*   **Development Workflow:** The workflow followed for this project is detailed in `docs/xyz.md`.
