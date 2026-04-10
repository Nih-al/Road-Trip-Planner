// tracking.js - Live Tracking Logic
export class Tracker {
  constructor(onUpdate, onAlert) {
    this.watchId = null;
    this.onUpdate = onUpdate; // callback(lat, lon, speed)
    this.onAlert = onAlert;
    this.lastFuelLevel = 100;
  }

  start() {
    if (!navigator.geolocation) {
      this.onAlert('Geolocation is not supported by your browser');
      return;
    }

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, speed } = position.coords;
        if (this.onUpdate) {
          this.onUpdate(latitude, longitude, speed);
        }
        
        // Simulate fuel decreasing based on arbitrary logic for demo
        this.lastFuelLevel -= 0.1; 
        if (this.lastFuelLevel < 20) {
            this.onAlert('Low Fuel Warning (<20%)!');
        }

      },
      (error) => {
        this.onAlert('Location access denied or failed: ' + error.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 27000 // approx 30 sec as requested
      }
    );
  }

  stop() {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }
}
