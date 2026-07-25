// vehicle.js - Vehicle Logic & Unit Conversions

export function normalizeVehicleData(apiSpecs, manualInput = null) {
  let rawMpg = 0;

  if (manualInput) {
    return {
       fuelCapacityL: manualInput.fuelCap || 50,
       mileageKmL: manualInput.mileage || 10
    };
  }

  // Convert MPG to km/L: km_per_litre = mpg * 0.4251
  
  if (apiSpecs) {
     rawMpg = apiSpecs.highway_mpg || apiSpecs.city_mpg || 0;
     
     return {
         fuelCapacityL: apiSpecs.fuel_capacity_litres || (apiSpecs.fuel_capacity_gals * 3.785) || 53,
         mileageKmL: (rawMpg * 0.4251) || 10
     };
  }
  
  return null; 
}

export function calculateVehicleHealth(vehicleData, totalTripDistKm) {
  const alerts = [];
  let isSafe = true;

  // Range calculation: 80% rule
  // range = fuel_capacity * mileage * 0.8
  const maxRangeKm = vehicleData.fuelCapacityL * vehicleData.mileageKmL * 0.8;
  
  if (totalTripDistKm && maxRangeKm < totalTripDistKm * 0.2) {
      alerts.push(`Vehicle range (${Math.round(maxRangeKm)}km) is severely inadequate for this trip.`);
      isSafe = false;
  }

  return {
    maxRangeKm,
    alerts,
    safe: isSafe
  };
}
