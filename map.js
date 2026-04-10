// map.js - Leaflet Integration
import * as L from 'leaflet';

let mapInstance = null;
let currentRouteLayer = null;
let markerGroup = null;

// Fix for default leaflet icons in Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export function initMap(elementId) {
  if (mapInstance) return mapInstance;
  
  mapInstance = L.map(elementId, { zoomControl: false }).setView([20.5937, 78.9629], 5); // Center India

  // Use standard OSM tiles — CSS filter handles dark mode.
  // These tiles show all roads, labels, POIs etc. properly.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(mapInstance);
  
  // Move zoom control
  L.control.zoom({ position: 'bottomright' }).addTo(mapInstance);

  markerGroup = L.layerGroup().addTo(mapInstance);

  // Force a size recalculation after the map container is fully laid out.
  // This prevents grey/missing tiles on first load.
  setTimeout(() => {
    mapInstance.invalidateSize();
  }, 200);

  return mapInstance;
}

export function drawRoute(geoJsonGeometry) {
  if (!mapInstance) return;
  
  if (currentRouteLayer) {
    mapInstance.removeLayer(currentRouteLayer);
  }

  // OSRM returns a raw GeoJSON geometry (LineString), wrap it in a Feature for L.geoJSON
  let geoJsonFeature;
  if (geoJsonGeometry.type === 'Feature' || geoJsonGeometry.type === 'FeatureCollection') {
    geoJsonFeature = geoJsonGeometry;
  } else {
    // It's a raw geometry (LineString) — wrap it
    geoJsonFeature = {
      type: 'Feature',
      properties: {},
      geometry: geoJsonGeometry
    };
  }

  currentRouteLayer = L.geoJSON(geoJsonFeature, {
    style: {
      color: '#00f0ff',
      weight: 5,
      opacity: 0.85
    }
  }).addTo(mapInstance);

  // Fit bounds with padding to account for the left panel
  try {
    const bounds = currentRouteLayer.getBounds();
    if (bounds.isValid()) {
      mapInstance.fitBounds(bounds, { 
        padding: [60, 60],
        paddingTopLeft: [450, 60] // account for left sidebar
      });
    }
  } catch(e) {
    console.warn('Could not fit bounds:', e);
  }
}

export function addMarker(lat, lon, popupText, type = 'default') {
  if (!markerGroup) return;

  const colorMap = {
    'start': '#00ff66',
    'dest': '#ff003c',
    'fuel': '#ffb800',
    'restaurant': '#a020f0',
    'vehicle': '#00f0ff'
  };

  const sizeMap = {
    'start': 20,
    'dest': 20,
    'fuel': 14,
    'restaurant': 12,
    'vehicle': 18
  };

  const color = colorMap[type] || '#fff';
  const size = sizeMap[type] || 14;
  
  const customIcon = L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: ${size}px; height: ${size}px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 12px ${color};"></div>`,
    iconSize: [size + 4, size + 4],
    iconAnchor: [(size + 4) / 2, (size + 4) / 2]
  });

  const marker = L.marker([lat, lon], { icon: customIcon }).addTo(markerGroup);
  if (popupText) {
    marker.bindPopup(`<b>${popupText}</b>`);
  }
  
  return marker;
}

export function clearMarkers() {
  if (markerGroup) {
    markerGroup.clearLayers();
  }
}

export function centerOn(lat, lon, zoom = 14) {
    if (mapInstance) {
        mapInstance.setView([lat, lon], zoom);
    }
}

export function onMapClick(callback) {
    if (mapInstance) {
        mapInstance.on('click', (e) => {
            callback(e.latlng.lat, e.latlng.lng);
        });
    }
}
