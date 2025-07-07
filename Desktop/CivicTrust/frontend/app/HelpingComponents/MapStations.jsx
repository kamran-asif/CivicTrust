import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

const MapStations = () => {
  const [selectedStation, setSelectedStation] = useState(null);
  const [location, setLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [stations, setStations] = useState([]);

  // Fetch real police stations from Overpass API
  const fetchPoliceStations = async (lat, lng) => {
    const overpassQuery = `
      [out:json];
      (
        node["amenity"="police"](around:5000,${lat},${lng});
        way["amenity"="police"](around:5000,${lat},${lng});
        relation["amenity"="police"](around:5000,${lat},${lng});
      );
      out center;
    `;

    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
    const res = await fetch(url);
    const data = await res.json();

    console.log("Fetched data from Overpass API:", data);  // Debugging log

    const stationData = data.elements.map((el) => ({
      id: el.id,
      name: el.tags.name || 'Unnamed Police Station',
      location: el.tags['addr:city'] || el.tags['addr:street'] || el.tags.operator || 'Unknown Location',
      officers: Math.floor(Math.random() * 20 + 10), // Mocked officer count
      lat: el.lat || el.center?.lat,
      lng: el.lon || el.center?.lon,
    }));

    console.log("Station Data:", stationData);  // Debugging log

    setStations(stationData);
    return stationData;
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(newLocation);

        if (!map && window.L) {
          const m = window.L.map('map').setView([newLocation.lat, newLocation.lng], 14);
          window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            className: 'map-tiles',
          }).addTo(m);
          setMap(m);

          const mapContainer = document.querySelector('.map-tiles');
          if (mapContainer) {
            mapContainer.style.filter =
              'brightness(0.7) invert(1) contrast(1.2) hue-rotate(200deg)';
          }
        }

        const fetchedStations = await fetchPoliceStations(newLocation.lat, newLocation.lng);

        // Clear existing markers
        markers.forEach((marker) => marker.remove());

        // User's location marker
        const userMarker = window.L.marker([newLocation.lat, newLocation.lng], {
          icon: window.L.divIcon({
            html: `<div class="w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
                   <div class="w-4 h-4 bg-blue-500 rounded-full absolute top-0"></div>`,
            className: 'user-location-marker',
            iconSize: [16, 16],
          }),
        }).addTo(m);

        // Create and add police station markers
        const stationMarkers = fetchedStations.map((station) => {
          if (!station.lat || !station.lng) {
            console.warn("Invalid station coordinates:", station);
            return null;
          }

          const marker = window.L.marker([station.lat, station.lng], {
            icon: window.L.divIcon({
              html: `<div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <div class="w-4 h-4 bg-red-600 rounded-full"></div>
                     </div>`,
              className: 'station-marker',
              iconSize: [24, 24],
            }),
          })
            .addTo(m)
            .bindPopup(`
              <div class="text-gray-900 p-2">
                <strong>${station.name}</strong><br>
                ${station.location}<br>
                ${station.officers} officers
              </div>
            `);

          // When the marker is clicked, set the selected station
          marker.on('click', () => setSelectedStation(station));

          return marker;
        }).filter(Boolean);  // Filter out invalid markers

        setMarkers([userMarker, ...stationMarkers]);
      });
    }
  }, []);

  return (
    <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 text-white border border-blue-400/20">
      <div className="space-y-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-white/10 p-3 rounded-lg">
            <MapPin className="h-6 w-6 text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold">Police Stations Near You</h2>
        </div>

        <div className="aspect-video bg-slate-800/50 rounded-lg overflow-hidden relative mb-4 border border-blue-500/20">
          <div id="map" className="h-full w-full z-0"></div>
        </div>

        <div className="space-y-2">
          {stations.map((station) => (
            <div
              key={station.id}
              className={`bg-white/5 hover:bg-white/10 p-3 rounded-lg transition-colors cursor-pointer ${
                selectedStation?.id === station.id ? 'bg-white/10 border border-blue-500/20' : ''
              }`}
              onClick={() => setSelectedStation(station)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-medium">{station.name}</p>
                  <span className="text-blue-300 text-sm">{station.location}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-200">
                    approx.
                  </span>
                  <p className="text-sm text-blue-200 mt-1">
                    {station.officers} officers
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapStations;
