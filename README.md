# SVAP: Smart Vehicle-Aware Planner

SVAP is an intelligent, reactive web-based road trip assistant designed to tailor routing and stops specifically to your vehicle's physical capabilities. Instead of relying on generic map navigation, SVAP queries real-world vehicle databases to calculate the true limits of your car's range, ensuring you never run out of fuel halfway to your destination.

![SVAP Dashboard Interface Preview](./public/preview.png) *(Preview image placeholder)*

## ✨ Features

- 🚘 **Vehicle Intelligence & Database:** Simply input your vehicle's Make, Model, and Year. SVAP queries the API Ninjas car database and falls back to a massive built-in local database for pinpoint accuracy on your fuel tank capacity and expected MPG.
- 🗺️ **Interactive Geographic Picking:** No need to type addresses manually. Simply click the Start or Destination input fields, then click anywhere on the Map to dynamically reverse-geocode your dropped pin into a clean address.
- ⛽ **Range-Aware Route Planning:** Using your exact vehicle specs, SVAP evaluates your total trip. If it exceeds your car's range, SVAP autonomously queries the Overpass API to generate smart fuel & restaurant stops along your path based on remaining fuel capacity.
- 🎨 **Premium Glassmorphism UI:** Features a gorgeous desktop and mobile-friendly interface built thoroughly from scratch using raw CSS, CSS variables, and modern frosted-glass blur layers.
- 📡 **Live Tracking Mode:** Follow your active trip! The application estimates live ETA constraints and dynamically evaluates fuel percentage as you "travel" using geolocation updates.
- ⚙️ **Mileage Overrides:** Want to drive aggressively or cautiously? You can override your default car mileage rating before executing a trip layout. All range metrics and stops will instantly adapt.

## 🛠️ Technology Stack

- **Frontend Core:** HTML5, CSS3, Vanilla JavaScript (ES6+ Module Pattern)
- **Mapping Engine:** Leaflet.js
- **Routing API:** Project OSRM (Open Source Routing Machine)
- **Geocoding & POI API:** Nominatim (OpenStreetMap) & Overpass API bounds
- **Vehicle Data:** API Ninjas (Cars endpoint) with a heavily expanded Local JSON Array fallback
- **Bundler:** Vite

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Nih-al/Road-Trip-Planner.git
   cd Road-Trip-Planner
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up API Keys (Optional but Recommended):**
   Copy the example environment variables file and fill out your API Ninjas key for fetching live model specs:
   ```bash
   cp .env.example .env
   ```
   *(Ensure `VITE_CAR_API_KEY` is present in your `.env` file!)*

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The platform will be available to preview, usually at `http://localhost:5173`.

## 📁 Core Project Structure

- `index.html`: Main HTML document, grid setup.
- `style.css`: Contains CSS variables, glassmorphism templates, map filters, and UI animations.
- `main.js`: Main controller handling interactions, map listeners, and logic wiring.
- `map.js`: Leaflet setup, layer handling, map event hooking.
- `api.js`: All external `fetch` handlers (Nominatim geocoding, OSRM routing, API Ninjas).
- `vehicle.js`: Transforms raw vehicle statistics into working 'Health' and Range validation markers.
- `planner.js`: Merges map distance parameters with POI arrays to produce smart waypoints.
- `tank-data.js`: Extensive local dictionary detailing car models, body classes, and raw fuel liter allowances.

## 🔗 APIs Utilized

- **[Nominatim API](https://nominatim.org/):** Forward and Reverse geolocation addressing.
- **[OSRM API](http://project-osrm.org/):** Generating routing lines and measuring trip distances/durations.
- **[Overpass API](https://wiki.openstreetmap.org/wiki/Overpass_API):** Sourcing 'amenity=fuel' near route vectors.
- **[API Ninjas (Cars)](https://api-ninjas.com/api/cars):** Extracting exact engine size and MPG metadata per car model.

---

*Disclaimer: This is a sophisticated proof-of-concept application built to demonstrate reactive DOM integrations and complex API chaining.*
