import React, { useEffect, useRef } from "react";
import { MapPin, Navigation, Expand, Minimize } from "lucide-react";

const MapEmbed = ({ latitude, longitude, name, address }) => {
  const mapRef = useRef(null);
  const [isExpanded, setIsExpanded] = React.useState(false);

  useEffect(() => {
    // Load Google Maps API
    const loadGoogleMaps = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        script.onload = initializeMap;
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      const position = { lat: latitude, lng: longitude };

      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 16,
        center: position,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: [
          {
            featureType: "poi.business",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "transit",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
          },
        ],
      });

      new window.google.maps.Marker({
        position: position,
        map: map,
        title: name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: "#8B5A2B",
          fillOpacity: 1,
          strokeColor: "#FFFFFF",
          strokeWeight: 3,
        },
        animation: window.google.maps.Animation.DROP,
      });

      // Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 12px; max-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-weight: 600; color: #1F2937;">${name}</h3>
            <p style="margin: 0; color: #6B7280; font-size: 14px;">${address}</p>
          </div>
        `,
      });

      infoWindow.open(map, marker);
    };

    loadGoogleMaps();
  }, [latitude, longitude, name, address]);

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(url, "_blank");
  };

  const openInAppleMaps = () => {
    const url = `https://maps.apple.com/?q=${latitude},${longitude}`;
    window.open(url, "_blank");
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-200 overflow-hidden ${
        isExpanded ? "fixed inset-0 z-[100] m-0 rounded-none" : "relative"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-coffee-50 to-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-coffee-100 rounded-lg">
            <MapPin className="w-5 h-5 text-coffee-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Location</h3>
            <p className="text-sm text-gray-600 truncate max-w-xs">{address}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title={isExpanded ? "Minimize" : "Expand"}
          >
            {isExpanded ? <Minimize className="w-5 h-5" /> : <Expand className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div
        ref={mapRef}
        className={`w-full bg-gray-100 ${
          isExpanded ? "h-[calc(100vh-80px)]" : "h-[300px] md:h-[400px]"
        }`}
      />

      {/* Action Buttons */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={openInGoogleMaps}
            className="flex-1 bg-coffee-600 text-white py-3 rounded-xl font-medium hover:bg-coffee-700 transition-colors flex items-center justify-center gap-2"
          >
            <Navigation className="w-5 h-5" />
            Open in Google Maps
          </button>

          <button
            onClick={openInAppleMaps}
            className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <MapPin className="w-5 h-5" />
            Apple Maps
          </button>
        </div>

        {/* Transport Options */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <div className="text-sm text-gray-600">Walking</div>
            <div className="font-bold text-gray-900">12 min</div>
          </div>

          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <div className="text-sm text-gray-600">Driving</div>
            <div className="font-bold text-gray-900">5 min</div>
          </div>

          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <div className="text-sm text-gray-600">Transit</div>
            <div className="font-bold text-gray-900">8 min</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapEmbed;
