// main.js - Core UI and Event Wiring
import { fetchVehicleSpecs, reverseGeocode } from './api.js';
import { normalizeVehicleData, calculateVehicleHealth } from './vehicle.js';
import { planTrip } from './planner.js';
import { initMap, drawRoute, addMarker, clearMarkers, centerOn, onMapClick } from './map.js';
import { Tracker } from './tracking.js';

let currentVehicleStats = null;
let currentVehicleHealth = null;
let currentTripStats = null;
let liveTracker = null;
let activeLocationInput = null;

document.addEventListener('DOMContentLoaded', () => {
   initMap('map');

   const vehicleForm = document.getElementById('vehicle-form');
   const tripForm = document.getElementById('trip-form');
   const btnTracking = document.getElementById('btn-start-tracking');

   const startInput = document.getElementById('start-location');
   const destInput = document.getElementById('dest-location');
   
   if (startInput) startInput.addEventListener('focus', () => activeLocationInput = 'start');
   if (destInput) destInput.addEventListener('focus', () => activeLocationInput = 'dest');
   
   onMapClick(async (lat, lon) => {
       if (!activeLocationInput) return;
       const targetInput = activeLocationInput === 'start' ? startInput : destInput;
       if (targetInput) {
           targetInput.value = "📍 Fetching address...";
           try {
               const address = await reverseGeocode(lat, lon);
               targetInput.value = address;
           } catch (e) {
               targetInput.value = `${lat.toFixed(5)}, ${lon.toFixed(5)}`;
           }
       }
   });

   vehicleForm.addEventListener('submit', async (e) => {
     e.preventDefault();
     await handleVehicleLookup();
   });

   tripForm.addEventListener('submit', async (e) => {
     e.preventDefault();
     await handleTripPlan();
   });
   
   const overrideInput = document.getElementById('mileage-override');
   if (overrideInput) {
       overrideInput.addEventListener('input', (e) => {
           if (!currentVehicleStats) return;
           const val = parseFloat(e.target.value);
           if (!isNaN(val) && val > 0) {
               document.getElementById('spec-mileage-val').textContent = `${val} km/L (Override)`;
               const overriddenHealth = calculateVehicleHealth(
                 { ...currentVehicleStats, mileageKmL: val }, null
               );
               document.getElementById('spec-range-val').textContent = `${Math.round(overriddenHealth.maxRangeKm)} km`;
           } else {
               // Revert back when cleared
               const apiSpecs = window.lastApiSpecs || null;
               const hwyMpg = apiSpecs?.highway_mpg;
               const cityMpg = apiSpecs?.city_mpg;
               if (hwyMpg || cityMpg) {
                   document.getElementById('spec-mileage-val').textContent = `${cityMpg || hwyMpg} / ${hwyMpg || cityMpg} MPG`;
               } else {
                   document.getElementById('spec-mileage-val').textContent = `${currentVehicleStats.mileageKmL.toFixed(1)} km/L`;
               }
               const originalHealth = calculateVehicleHealth(currentVehicleStats, null);
               document.getElementById('spec-range-val').textContent = `${Math.round(originalHealth.maxRangeKm)} km`;
           }
       });
   }
   
   btnTracking.addEventListener('click', handleToggleTracking);
});

async function handleVehicleLookup() {
  const make = document.getElementById('vehicle-make').value;
  const model = document.getElementById('vehicle-model').value;
  const year = document.getElementById('vehicle-year').value;
  
  const alertBox = document.getElementById('vehicle-health-alert');
  const btn = document.querySelector('#vehicle-form button[type="submit"]');
  const specsCard = document.getElementById('vehicle-specs-card');
  
  let manualInput = null;
  const manualInputsDiv = document.getElementById('manual-vehicle-inputs');
  if (!manualInputsDiv.classList.contains('hidden')) {
      manualInput = {
          fuelCap: parseFloat(document.getElementById('vehicle-fuel-cap').value),
          mileage: parseFloat(document.getElementById('vehicle-mileage').value)
      };
      // Validation if manual is showing but incomplete
      if (!manualInput.fuelCap || !manualInput.mileage) {
          showAlert(alertBox, 'Please fill in manual specs.', 'alert-danger');
          return;
      }
  }

  try {
     btn.textContent = "Looking up...";
     let specs = null;
     if (!manualInput) {
         try {
             specs = await fetchVehicleSpecs(make, model, year);
         } catch(e) {
             console.warn("API Lookup Failed, falling back to manual inputs. Reason:", e.message);
             // Show manual input for ANY error (CORS, missing data, failed to fetch, etc)
             manualInputsDiv.classList.remove('hidden');
             specsCard.classList.add('hidden');
             showAlert(alertBox, `API Lookup failed (${e.message}). Please enter your vehicle specs manually.`, 'alert-warning');
             btn.textContent = "Lookup & Validate";
             return;
         }

         // If API + database returned nothing (unknown car), show manual
         if (!specs) {
             manualInputsDiv.classList.remove('hidden');
             specsCard.classList.add('hidden');
             showAlert(alertBox, `Vehicle "${make} ${model} ${year}" not found in our database. Please enter specs manually.`, 'alert-warning');
             btn.textContent = "Lookup & Validate";
             return;
         }
     }
     
     const vData = normalizeVehicleData(specs, manualInput);
     if (!vData) throw new Error("Could not compute vehicle data");
     
     const vHealth = calculateVehicleHealth(vData, null);
     
     currentVehicleStats = vData;
     currentVehicleHealth = vHealth;
     window.lastApiSpecs = specs;
     
     // Display the vehicle specs card with tank capacity
     displayVehicleSpecs(specs, vData, vHealth, manualInput);
     
     if (vHealth.alerts.length > 0) {
         showAlert(alertBox, vHealth.alerts.join('<br>'), 'alert-warning');
     } else {
         showAlert(alertBox, `Vehicle Health: OK. Good to go!<br>Estimated Range: ${Math.round(vHealth.maxRangeKm)} km`, 'alert-success');
         alertBox.style.color = '#00ff66';
     }

  } catch (err) {
     console.error(err);
     specsCard.classList.add('hidden');
     showAlert(alertBox, 'Error: ' + err.message, 'alert-danger');
  } finally {
     btn.textContent = "Lookup & Validate";
  }
}

function displayVehicleSpecs(apiSpecs, vehicleData, vehicleHealth, manualInput) {
  const card = document.getElementById('vehicle-specs-card');
  const tankHero = document.getElementById('tank-hero');
  
  // ── Car name + source badge ─────────────────────────────
  const carName = document.getElementById('specs-car-name');
  const badge = document.getElementById('specs-source-badge');

  if (manualInput) {
    carName.textContent = `${document.getElementById('vehicle-make').value} ${document.getElementById('vehicle-model').value}`;
    badge.textContent = 'Manual';
    badge.style.background = 'rgba(255, 184, 0, 0.1)';
    badge.style.color = 'var(--warning-color)';
    badge.style.borderColor = 'rgba(255, 184, 0, 0.2)';
  } else if (apiSpecs) {
    const displayMake = (apiSpecs.make || '').charAt(0).toUpperCase() + (apiSpecs.make || '').slice(1);
    const displayModel = (apiSpecs.model || '').charAt(0).toUpperCase() + (apiSpecs.model || '').slice(1);
    carName.textContent = `${displayMake} ${displayModel} ${apiSpecs.year || ''}`;
    
    if (apiSpecs.api_source === 'api-ninjas') {
      badge.textContent = 'API Verified';
      badge.style.background = 'rgba(0, 255, 102, 0.1)';
      badge.style.color = '#00ff66';
      badge.style.borderColor = 'rgba(0, 255, 102, 0.2)';
    } else {
      badge.textContent = 'Database';
      badge.style.background = '';
      badge.style.color = '';
      badge.style.borderColor = '';
    }
  }

  // ── Tank Capacity (Hero) ────────────────────────────────
  const tankValue = document.getElementById('spec-tank-value');
  const isElectric = apiSpecs?.is_electric || false;

  if (isElectric) {
    tankHero.classList.add('electric');
    tankValue.textContent = `${apiSpecs.battery_kwh || '—'} kWh`;
    document.querySelector('.tank-label').textContent = 'Battery Capacity';
  } else {
    tankHero.classList.remove('electric');
    const litres = vehicleData.fuelCapacityL;
    const gallons = litres / 3.785;
    tankValue.textContent = `${Math.round(litres)} L`;
    document.querySelector('.tank-label').textContent = `Fuel Tank Capacity (${gallons.toFixed(1)} gal)`;
  }

  // ── Stats tiles ─────────────────────────────────────────
  const hwyMpg = apiSpecs?.highway_mpg;
  const cityMpg = apiSpecs?.city_mpg;

  // Show mileage
  let mileageStr = '—';
  const mileageOverride = document.getElementById('mileage-override').value;
  
  if (mileageOverride && parseFloat(mileageOverride) > 0) {
      mileageStr = `${parseFloat(mileageOverride)} km/L (Override)`;
  } else if (hwyMpg || cityMpg) {
      mileageStr = `${cityMpg || hwyMpg} / ${hwyMpg || cityMpg} MPG`;
  } else if (manualInput?.mileage) {
      mileageStr = `${manualInput.mileage} km/L`;
  } else if (vehicleData?.mileageKmL) {
      mileageStr = `${vehicleData.mileageKmL.toFixed(1)} km/L`;
  }
  document.getElementById('spec-mileage-val').textContent = mileageStr;
  
  document.getElementById('spec-range-val').textContent = `${Math.round(vehicleHealth.maxRangeKm)} km`;

  // Show the card with animation
  card.classList.remove('hidden');
  // Re-trigger animation
  card.style.animation = 'none';
  card.offsetHeight; // force reflow
  card.style.animation = '';
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

async function handleTripPlan() {
  if (!currentVehicleHealth) {
      alert("Please validate vehicle details first.");
      return;
  }

  const startLoc = document.getElementById('start-location').value;
  const destLoc = document.getElementById('dest-location').value;
  const depTime = document.getElementById('departure-time').value;
  const mileageOverride = parseFloat(document.getElementById('mileage-override').value);
  
  const btn = document.querySelector('#trip-form button[type="submit"]');
  btn.textContent = "Planning...";
  
  try {
     // If user provided a mileage override, apply it to the vehicle stats
     // so that fuel range (and therefore fuel stop frequency) reflects their input.
     if (mileageOverride && mileageOverride > 0) {
       currentVehicleStats = { ...currentVehicleStats, mileageKmL: mileageOverride };
       // Recalculate health with the overridden mileage
       currentVehicleHealth = calculateVehicleHealth(
         currentVehicleStats,
         null
       );
     }

     const trip = await planTrip(startLoc, destLoc, depTime, currentVehicleHealth);
     currentTripStats = trip;
     
     // recalculate health with actual trip length
     currentVehicleHealth = calculateVehicleHealth(
         currentVehicleStats, 
         trip.route.distance
     );
     
     if (currentVehicleHealth.alerts.some(a => a.includes('severely inadequate'))) {
        alert("Warning: This trip distance is extremely long for your vehicle range. Exercise caution.");
     }

     renderTripResults(trip);
     
     document.getElementById('live-section').classList.remove('hidden');
     
  } catch (err) {
      console.error(err);
      alert('Error calculating route: ' + err.message);
  } finally {
      btn.textContent = "Plan Route";
  }
}

function renderTripResults(trip) {
    clearMarkers();
    drawRoute(trip.route.geometry);
    
    addMarker(trip.start.lat, trip.start.lon, `Start: ${trip.start.name}`, 'start');
    addMarker(trip.dest.lat, trip.dest.lon, `Destination: ${trip.dest.name}`, 'dest');
    
    const stopsList = document.getElementById('stops-list');
    const stopsPanel = document.getElementById('stops-panel');
    
    stopsList.innerHTML = '';
    
    // Add trip summary at top of stops
    const summaryLi = document.createElement('li');
    summaryLi.className = 'stop-item';
    const durationHrs = Math.floor(trip.route.duration / 3600);
    const durationMins = Math.floor((trip.route.duration % 3600) / 60);
    summaryLi.innerHTML = `<h4>🗺 Trip Summary</h4><p>${Math.round(trip.route.distance)} km · ${durationHrs}h ${durationMins}m · ${trip.stops.length} fuel stop(s)</p>`;
    stopsList.appendChild(summaryLi);
    
    if (trip.stops && trip.stops.length > 0) {
        stopsPanel.classList.remove('hidden');
        trip.stops.forEach((stop, idx) => {
            const li = document.createElement('li');
            li.className = 'stop-item';
            
            const icon = stop.type === 'fuel' ? '⛽' : '🍽';
            li.innerHTML = `<h4>${icon} Stop ${idx + 1}: ${stop.name}</h4><p>At ${stop.distanceKm} km from start</p>`;
            stopsList.appendChild(li);
            
            addMarker(stop.lat, stop.lon, `${stop.name} (${stop.distanceKm} km)`, stop.type);
        });
    } else {
        stopsPanel.classList.remove('hidden');
        const noStopLi = document.createElement('li');
        noStopLi.className = 'stop-item';
        noStopLi.innerHTML = `<h4>✅ No fuel stops needed</h4><p>Your vehicle range covers the entire trip.</p>`;
        stopsList.appendChild(noStopLi);
    }
}

function handleToggleTracking() {
    const btn = document.getElementById('btn-start-tracking');
    if (liveTracker) {
        liveTracker.stop();
        liveTracker = null;
        btn.textContent = 'Start Live Tracking';
        document.getElementById('tracking-status').textContent = 'Tracking stopped.';
        return;
    }
    
    liveTracker = new Tracker(
        (lat, lon, speed) => {
            document.getElementById('tracking-status').textContent = 'Live tracking active...';
            // If we have a vehicle marker, update it, otherwise create
            addMarker(lat, lon, 'You are here', 'vehicle');
            centerOn(lat, lon, 15);
            
            document.getElementById('live-fuel').textContent = liveTracker.lastFuelLevel.toFixed(1) + '%';
        },
        (alertMsg) => {
            const statusBox = document.getElementById('tracking-status');
            statusBox.innerHTML = `<span style="color:#ff4d4d">${alertMsg}</span>`;
            if (alertMsg.includes('Option')) {
                 // For errors
            }
        }
    );
    
    liveTracker.start();
    btn.textContent = 'Stop Live Tracking';
}

function showAlert(element, message, typeClass) {
    element.innerHTML = message;
    element.className = `alert ${typeClass}`;
    element.classList.remove('hidden');
}
