# Real-Time Event Finder

This is a single-page web application that allows users to search for real-time events using the Ticketmaster API. It provides a user-friendly interface to discover events, view them on a map, and save them for later.

## Features

*   **Event Search:** Search for events by location, category, or keyword. Search is triggered manually by clicking the "Search" button, ensuring a seamless typing experience.
*   **Advanced Filtering:** Filter events by date range (Today, This Weekend, Next 7 Days) and price range (min/max).
*   **Interactive Map View:** Events are displayed on an interactive map using Leaflet.js, with marker clustering for better performance with a large number of events. The map automatically zooms to fit the search results. Map popups include a direct link to Google Maps for directions.
*   **List View:** A clean, card-based list view of events.
*   **In-Page Event Details:** View comprehensive details for each event in a modal overlay, including additional information like price ranges and notes.
*   **Share Event:** Easily share event details via native sharing options (Web Share API) or by copying to clipboard.
*   **Save Events:** Save events you're interested in to a separate list.
*   **Event Notes:** Add personal notes to your saved events.
*   **Event Reminders:** Set browser notifications to remind you about your saved events.
*   **Geolocation:** Use your current location to find events happening near you.
*   **Trending/Popular Events:** Discover a curated list of popular events.
*   **Responsive Design:** The application is designed to work seamlessly on both desktop and mobile devices, with optimized layouts and mobile-specific meta tags.
*   **Dark Theme:** A sleek, modern dark theme is enabled by default.
*   **User Feedback:** Includes loading spinners and clear error messages for a better user experience.
*   **Performance Optimizations:** Implements lazy loading for images to improve initial page load times.
*   **Enhanced Interactivity:** Features subtle animations and improved input field feedback.

## How to Use

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/real-time-event-finder.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd real-time-event-finder
    ```
3.  **Open `index.html` in your web browser.**

That's it! No complex setup or build process is required.

## Technologies Used

*   **HTML5**
*   **Tailwind CSS** (via CDN)
*   **JavaScript (ES6+)**
*   **React** (via CDN)
*   **Leaflet.js** (for the interactive map)
*   **Leaflet.markercluster** (for map marker clustering)
*   **Ticketmaster API** (for event data)