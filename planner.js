// planner.js - Core Planning Logic
import { geocode, getRoute, fetchPOIs } from './api.js';

export async function planTrip(startStr, destStr, departureTime, vehicleHealth) {
  const startLoc = await geocode(startStr);
  const destLoc = await geocode(destStr);
  
  const route = await getRoute(startLoc, destLoc);
  
  // Calculate fuel stops based on vehicle range along the route geometry
  const stops = await calculateFuelStops(route, departureTime, vehicleHealth.maxRangeKm);
  
  return {
    start: startLoc,
    dest: destLoc,
    route,
    stops
  };
}

/**
 * Calculate fuel stops by walking along the route's GeoJSON coordinates.
 * This approach is independent of OSRM steps — it samples fuel stations
 * along the actual line geometry at intervals derived from the vehicle's range.
 */
async function calculateFuelStops(route, departureTime, maxRangeKm) {
  const stops = [];
  const coords = route.geometry?.coordinates;
  
  if (!coords || coords.length < 2) return stops;
  
  const totalDistKm = route.distance; // already in km from api.js
  const safeRange = maxRangeKm * 0.75; // refuel at 75% of max range for safety margin
  
  // Walk along the coordinate array and accumulate haversine distance
  let accumulatedKm = 0;
  let distSinceLastFuel = 0;
  let lastFuelCheckKm = -50;
  
  // parse departure time "HH:MM"
  let [depH, depM] = [0, 0];
  if (departureTime) {
    [depH, depM] = departureTime.split(':').map(Number);
  }
  
  for (let i = 1; i < coords.length; i++) {
    const [lon1, lat1] = coords[i - 1];
    const [lon2, lat2] = coords[i];
    
    const segmentKm = haversineKm(lat1, lon1, lat2, lon2);
    accumulatedKm += segmentKm;
    distSinceLastFuel += segmentKm;
    
    // Check if we need fuel
    if (distSinceLastFuel >= safeRange) {
      
      // Hard limit: if we've gone past 100% range, force a warning marker
      if (distSinceLastFuel >= maxRangeKm) {
        stops.push({
          type: 'fuel',
          name: '⚠ Emergency Fuel Needed Here',
          lat: lat2,
          lon: lon2,
          distanceKm: Math.round(accumulatedKm)
        });
        distSinceLastFuel = 0;
        lastFuelCheckKm = accumulatedKm;
        continue;
      }
      
      // Throttle: only query Overpass every 30km to avoid spamming
      if (accumulatedKm - lastFuelCheckKm >= 30) {
        lastFuelCheckKm = accumulatedKm;
        
        try {
          const fuelStations = await fetchPOIs(lat2, lon2, 8000, "fuel");
          if (fuelStations.length > 0) {
            const station = fuelStations[0];
            stops.push({
              type: 'fuel',
              name: station.name,
              lat: station.lat,
              lon: station.lon,
              distanceKm: Math.round(accumulatedKm)
            });
            distSinceLastFuel = 0;
          }
        } catch (err) {
          console.warn('Fuel POI fetch failed at km', accumulatedKm, err);
        }
      }
    }
  }
  
  return stops;
}

/**
 * Haversine distance between two lat/lon points in kilometers.
 */
function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRad(deg) {
  return deg * Math.PI / 180;
}
