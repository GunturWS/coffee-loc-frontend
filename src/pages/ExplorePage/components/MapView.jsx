import React, { useState, useEffect } from "react";
import { MapPin, Navigation, ZoomIn, ZoomOut, X } from "lucide-react";

const MapView = ({ coffeeShops }) => {
  const [selectedShop, setSelectedShop] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [mapZoom, setMapZoom] = useState(13);

  // Simulate user location (Jakarta center)
  useEffect(() => {
    setUserLocation({
      lat: -6.2088,
      lng: 106.8456,
    });
  }, []);

  const handleShopClick = (shop) => {
    setSelectedShop(shop);
  };

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          // Fallback to default location
          setUserLocation({
            lat: -6.2088,
            lng: 106.8456,
          });
        },
      );
    }
  };

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    // Simple distance calculation (for demo)
    const latDiff = Math.abs(lat1 - lat2);
    const lngDiff = Math.abs(lng1 - lng2);
    const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 111;
    return distance.toFixed(1);
  };

  if (coffeeShops.length === 0) {
    return (
      <div className="bg-gray-50 rounded-2xl p-8 text-center h-96 flex items-center justify-center">
        <div>
          <div className="w-16 h-16 bg-coffee-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-coffee-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No coffee shops on map</h3>
          <p className="text-gray-600">Try adjusting your filters to see more results</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Map Container */}
      <div className="bg-gradient-to-br from-blue-50 to-coffee-50 rounded-2xl overflow-hidden border border-gray-200 h-[600px] relative">
        {/* Simulated Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-coffee-100">
          {/* Simulated streets */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300/50"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-300/50"></div>

          {/* User Location */}
          {userLocation && (
            <div
              className="absolute w-8 h-8 -ml-4 -mt-4 animate-pulse"
              style={{
                left: "50%",
                top: "50%",
              }}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          )}

          {/* Coffee Shop Markers */}
          {coffeeShops.map((shop, index) => {
            // Distribute markers around center for demo
            const angle = (index / coffeeShops.length) * Math.PI * 2;
            const radius = 100 + (index % 3) * 50;
            const left = 50 + Math.cos(angle) * radius;
            const top = 50 + Math.sin(angle) * radius;

            return (
              <div
                key={shop.id}
                onClick={() => handleShopClick(shop)}
                className={`absolute w-6 h-6 -ml-3 -mt-3 cursor-pointer transition-transform hover:scale-125 ${
                  selectedShop?.id === shop.id ? "z-10" : ""
                }`}
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                }}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shadow-lg ${
                    shop.featured
                      ? "bg-gradient-to-r from-amber-500 to-orange-500"
                      : shop.trending
                        ? "bg-gradient-to-r from-red-500 to-pink-500"
                        : "bg-gradient-to-r from-coffee-600 to-primary"
                  }`}
                >
                  <Coffee className="w-3 h-3 text-white" />
                </div>
                {userLocation && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-medium bg-white px-2 py-1 rounded shadow-sm">
                    {calculateDistance(
                      userLocation.lat,
                      userLocation.lng,
                      shop.latitude,
                      shop.longitude,
                    )}{" "}
                    km
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={handleLocateMe}
            className="p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            title="Locate me"
          >
            <Navigation className="w-5 h-5 text-blue-600" />
          </button>
          <button
            onClick={() => setMapZoom((prev) => Math.min(prev + 1, 18))}
            className="p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            title="Zoom in"
          >
            <ZoomIn className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => setMapZoom((prev) => Math.max(prev - 1, 10))}
            className="p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            title="Zoom out"
          >
            <ZoomOut className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Zoom Level Display */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
          <div className="text-sm font-medium text-gray-700">Zoom: {mapZoom}x</div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg max-w-xs">
          <div className="text-sm font-bold text-gray-900 mb-2">Map Legend</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"></div>
              <span className="text-xs text-gray-600">Featured</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500"></div>
              <span className="text-xs text-gray-600">Trending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-coffee-600 to-primary"></div>
              <span className="text-xs text-gray-600">Regular</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-600"></div>
              <span className="text-xs text-gray-600">Your Location</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Shop Details */}
      {selectedShop && (
        <div className="absolute top-4 left-4 bg-white rounded-2xl shadow-2xl max-w-sm w-full animate-slide-down">
          <div className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-xl text-gray-900 mb-1">{selectedShop.name}</h3>
                <p className="text-gray-600 text-sm">{selectedShop.tagline}</p>
              </div>
              <button
                onClick={() => setSelectedShop(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-coffee-700">{selectedShop.rating}</span>
                <span className="text-sm text-gray-500">({selectedShop.reviewCount})</span>
              </div>
              <div className="flex-1"></div>
              <div className="text-sm text-gray-600">{selectedShop.distance} away</div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-1">Address:</div>
              <div className="text-gray-700">{selectedShop.address}</div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="text-sm">
                <div className="text-gray-500">Open until</div>
                <div className="font-medium text-gray-900">{selectedShop.openUntil}</div>
              </div>
              <div className="text-sm">
                <div className="text-gray-500">Price</div>
                <div className="font-medium text-gray-900">{selectedShop.priceRange}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {selectedShop.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-coffee-50 text-coffee-700 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            <button className="w-full bg-coffee-600 hover:bg-coffee-700 text-white py-3 rounded-xl font-medium transition-colors">
              View Full Details
            </button>
          </div>
        </div>
      )}

      {/* Coffee Shops List (Bottom Sheet) */}
      <div className="mt-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="text-sm font-medium text-gray-700 mb-3">
          {coffeeShops.length} coffee shops shown on map
        </div>
        <div className="overflow-x-auto">
          <div className="flex gap-4 pb-4">
            {coffeeShops.map((shop) => (
              <div
                key={shop.id}
                onClick={() => handleShopClick(shop)}
                className={`flex-shrink-0 w-64 rounded-xl border-2 p-4 cursor-pointer transition-all ${
                  selectedShop?.id === shop.id
                    ? "border-coffee-500 bg-coffee-50"
                    : "border-gray-200 hover:border-coffee-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{shop.name}</h4>
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-xs text-amber-600">★</span>
                      <span className="text-xs font-medium">{shop.rating}</span>
                      <span className="text-xs text-gray-500">({shop.reviewCount})</span>
                    </div>
                    <div className="text-xs text-gray-600">{shop.address.split(",")[0]}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
