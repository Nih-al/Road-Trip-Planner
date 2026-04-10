// api.js - External API Integrations

import { lookupTankCapacity, estimateTankFromClass } from './tank-data.js';

const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org/search';
const OSRM_BASE = 'https://router.project-osrm.org/route/v1/driving';
const OVERPASS_BASE = 'https://overpass-api.de/api/interpreter';
const CARS_API_BASE = 'https://api.api-ninjas.com/v1/cars';

export async function geocode(locationStr) {
  // If the string is likely coordinates "lat, lon", check it first
  const coordMatch = locationStr.match(/^\s*(-?\d+(\.\d+)?)\s*,\s*(-?\d+(\.\d+)?)\s*$/);
  if (coordMatch) {
     return {
         lat: parseFloat(coordMatch[1]),
         lon: parseFloat(coordMatch[3]),
         name: "Selected Coordinates"
     };
  }

  try {
    const res = await fetch(`${NOMINATIM_BASE}?format=json&q=${encodeURIComponent(locationStr)}`);
    const data = await res.json();
    if (!data || data.length === 0) throw new Error('Location not found');
    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
      name: data[0].display_name
    };
  } catch (err) {
    console.error('Geocoding error:', err);
    throw new Error('Failed to find location');
  }
}

export async function reverseGeocode(lat, lon) {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
    const data = await res.json();
    if (!data || data.error) return `${lat.toFixed(5)}, ${lon.toFixed(5)}`;
    // Keep it concise, e.g. suburb, city
    let addressName = data.display_name;
    if (data.address) {
       const parts = [];
       if (data.address.road) parts.push(data.address.road);
       if (data.address.suburb || data.address.neighbourhood) parts.push(data.address.suburb || data.address.neighbourhood);
       if (data.address.city || data.address.town || data.address.village) parts.push(data.address.city || data.address.town || data.address.village);
       if (parts.length > 0) addressName = parts.join(', ');
    }
    return addressName;
  } catch(e) {
    return `${lat.toFixed(5)}, ${lon.toFixed(5)}`;
  }
}

export async function getRoute(startCoords, destCoords) {
  try {
    const coords = `${startCoords.lon},${startCoords.lat};${destCoords.lon},${destCoords.lat}`;
    // steps=true is critical to get turn-by-turn steps with maneuver locations
    const url = `${OSRM_BASE}/${coords}?overview=full&geometries=geojson&steps=true`;
    const res = await fetch(url);
    const data = await res.json();
    
    if (data.code !== 'Ok') throw new Error('Route not found');
    
    const route = data.routes[0];
    return {
      distance: route.distance / 1000, // meters to km
      duration: route.duration, // seconds
      geometry: route.geometry, // GeoJSON LineString
      steps: route.legs[0].steps // turn-by-turn steps with maneuver coords
    };
  } catch (err) {
    console.error('Routing error:', err);
    throw new Error('Failed to calculate route');
  }
}

export async function fetchPOIs(lat, lon, radius = 5000, type = "fuel") {
  try {
    // using overpass query language
    const typeQuery = type === "fuel" ? 'amenity=fuel' : 'amenity=restaurant';
    const query = `[out:json];node(around:${radius},${lat},${lon})[${typeQuery}];out 5;`;
    
    const res = await fetch(`${OVERPASS_BASE}?data=${encodeURIComponent(query)}`);
    const data = await res.json();
    
    if (!data.elements) return [];
    
    return data.elements.map(el => ({
      name: el.tags?.name || `Unknown ${type}`,
      lat: el.lat,
      lon: el.lon,
      type: type,
      tags: el.tags
    }));
  } catch (err) {
    console.error(`Error fetching ${type} stops:`, err);
    return [];
  }
}

export async function fetchVehicleSpecs(make, model, year) {
  let apiData = null;
  let tankData = null;

  // ── Step 1: Try API Ninjas for detailed car data ──────────
  const apiKey = import.meta.env.VITE_CAR_API_KEY;
  if (apiKey && apiKey !== 'insert-api-key-here') {
    try {
      const url = `${CARS_API_BASE}?make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}&year=${encodeURIComponent(year)}`;
      const res = await fetch(url, {
        headers: { 'X-Api-Key': apiKey }
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          apiData = data[0];
        }
      }
    } catch (err) {
      console.warn('API Ninjas call failed:', err.message);
    }
  }

  // ── Step 2: Look up tank capacity from database ───────────
  tankData = lookupTankCapacity(make, model);

  // If tank not in database but we have API class, estimate from class
  if (!tankData && apiData && apiData.class) {
    tankData = estimateTankFromClass(apiData.class);
  }

  // If we have neither API data nor tank database entry → return null
  // so the UI can prompt for manual input
  if (!apiData && !tankData) {
    return null;
  }

  // ── Step 3: Combine best available data ───────────────────
  const result = {
    make: apiData?.make || make,
    model: apiData?.model || model,
    year: apiData?.year || year,
    city_mpg: apiData?.city_mpg || null,
    highway_mpg: apiData?.highway_mpg || null,
    fuel_capacity_gals: tankData ? tankData.gal : 14, // fallback 14 gal
    fuel_capacity_litres: tankData ? tankData.L : 53,
    vehicle_class: apiData?.class || null,
    cylinders: apiData?.cylinders || null,
    displacement: apiData?.displacement || null,
    fuel_type: apiData?.fuel_type || (tankData?.electric ? 'electric' : null),
    drive: apiData?.drive || null,
    transmission: apiData?.transmission || null,
    is_electric: tankData?.electric || false,
    battery_kwh: tankData?.battery_kwh || null,
    tank_source: tankData?.source || 'default',
    api_source: apiData ? 'api-ninjas' : 'local-database',
  };

  return result;
}
