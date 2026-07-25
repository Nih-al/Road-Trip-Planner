# SVAP — Smart Vehicle-Aware Planner

A road trip planner that actually knows your car.

Most navigation apps treat every vehicle the same. SVAP doesn't. You tell it your make, model, and year, and it figures out your real fuel range — then plans your entire trip around it, including fuel stops, so you're never guessing whether you'll make it to the next station.

![SVAP Dashboard](./public/preview.png)

---

## What it does

**Knows your car's limits.** Enter your vehicle and SVAP pulls its fuel tank size and real-world MPG from the API Ninjas database (with a large built-in fallback if the API doesn't have your model). No manual lookups.

**Plans around your range, not just distance.** If your trip is longer than a single tank, SVAP automatically finds fuel stations along your actual route using the Overpass API — not just anywhere nearby, but spaced intelligently based on how much fuel you have left.

**Let's you set your route by clicking a map.** No typing addresses. Click your start point, click your destination, done. SVAP reverse-geocodes both pins into real addresses automatically.

**Adjustable mileage.** Planning a highway cruise vs. stop-and-go city driving? Override your car's default MPG rating before you go, and every range estimate and fuel stop recalculates instantly.

**Live trip mode.** Once you're moving, SVAP tracks your position, estimates your remaining fuel percentage in real time, and updates your ETA as you go.

---

## Tech used

- **Leaflet.js** for the map
- **OSRM** for routing and distance calculation
- **Nominatim** (OpenStreetMap) for geocoding
- **Overpass API** for finding fuel stations along the route
- **API Ninjas** for vehicle specs, with a local fallback database
- **Vite** as the bundler
- Plain HTML, CSS, and vanilla JS — no frameworks

---

## Getting started

You'll need [Node.js](https://nodejs.org/) installed.

```bash
# Clone and install
git clone https://github.com/Nih-al/Road-Trip-Planner.git
cd Road-Trip-Planner
npm install

# Add your API key (optional but recommended for live vehicle data)
cp .env.example .env
# Edit .env and set VITE_CAR_API_KEY to your API Ninjas key

# Start the dev server
npm run dev
```

Opens at `http://localhost:5173`. The app works without an API key — it'll just use the built-in vehicle database.

---

## Project structure