import React from "react";
import { X, Filter, MapPin, DollarSign, Wifi, Battery, Clock, Sparkles } from "lucide-react";

const FilterSidebar = ({
  cities,
  priceRanges,
  amenities,
  selectedCity,
  setSelectedCity,
  priceRange,
  setPriceRange,
  selectedAmenities,
  onAmenityToggle,
  onReset,
  onClose,
}) => {
  const getAmenityIcon = (amenity) => {
    const icons = {
      wifi: <Wifi className="w-4 h-4" />,
      outlet: <Battery className="w-4 h-4" />,
      parking: <Sparkles className="w-4 h-4" />,
      ac: <Sparkles className="w-4 h-4" />,
      quiet: <Sparkles className="w-4 h-4" />,
      workspace: <Sparkles className="w-4 h-4" />,
      toilet: <Sparkles className="w-4 h-4" />,
      terrace: <Sparkles className="w-4 h-4" />,
      roastery: <Sparkles className="w-4 h-4" />,
      specialty: <Sparkles className="w-4 h-4" />,
      training: <Sparkles className="w-4 h-4" />,
      garden: <Sparkles className="w-4 h-4" />,
      fast: <Sparkles className="w-4 h-4" />,
      "drive-thru": <Sparkles className="w-4 h-4" />,
      "24h": <Clock className="w-4 h-4" />,
      delivery: <Sparkles className="w-4 h-4" />,
      dessert: <Sparkles className="w-4 h-4" />,
      mall: <Sparkles className="w-4 h-4" />,
    };
    return icons[amenity] || <Sparkles className="w-4 h-4" />;
  };

  const getAmenityLabel = (amenity) => {
    const labels = {
      wifi: "WiFi Available",
      outlet: "Power Outlets",
      parking: "Parking Space",
      ac: "Air Conditioned",
      quiet: "Quiet Space",
      workspace: "Workspace Friendly",
      toilet: "Clean Toilet",
      terrace: "Outdoor Terrace",
      roastery: "On-site Roastery",
      specialty: "Specialty Coffee",
      training: "Coffee Training",
      garden: "Garden Area",
      fast: "Quick Service",
      "drive-thru": "Drive-thru",
      "24h": "24 Hours Open",
      delivery: "Delivery Available",
      dessert: "Dessert Menu",
      mall: "Mall Location",
    };
    return labels[amenity] || amenity.charAt(0).toUpperCase() + amenity.slice(1);
  };

  return (
    <div className="h-full bg-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-coffee-600" />
          <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Active Filters */}
      {(selectedCity !== "all" || priceRange !== "all" || selectedAmenities.length > 0) && (
        <div className="mb-6 p-4 bg-coffee-50 rounded-xl">
          <div className="text-sm text-gray-600 mb-2">Active filters:</div>
          <div className="flex flex-wrap gap-2">
            {selectedCity !== "all" && (
              <span className="inline-flex items-center gap-1 bg-white border border-coffee-200 text-coffee-700 px-3 py-1 rounded-full text-sm">
                <MapPin className="w-3 h-3" />
                {selectedCity}
                <button onClick={() => setSelectedCity("all")} className="ml-1 hover:text-red-500">
                  ×
                </button>
              </span>
            )}
            {priceRange !== "all" && (
              <span className="inline-flex items-center gap-1 bg-white border border-coffee-200 text-coffee-700 px-3 py-1 rounded-full text-sm">
                <DollarSign className="w-3 h-3" />
                {priceRange}
                <button onClick={() => setPriceRange("all")} className="ml-1 hover:text-red-500">
                  ×
                </button>
              </span>
            )}
            {selectedAmenities.map((amenity) => (
              <span
                key={amenity}
                className="inline-flex items-center gap-1 bg-white border border-coffee-200 text-coffee-700 px-3 py-1 rounded-full text-sm"
              >
                {getAmenityIcon(amenity)}
                {getAmenityLabel(amenity)}
                <button
                  onClick={() => onAmenityToggle(amenity)}
                  className="ml-1 hover:text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Filter Sections */}
      <div className="space-y-8">
        {/* City Filter */}
        <div>
          <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            City
          </h4>
          <div className="space-y-2">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  selectedCity === city
                    ? "bg-coffee-100 text-coffee-700 font-medium border border-coffee-200"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {city === "all" ? "All Cities" : city}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Price Range
          </h4>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <button
                key={range}
                onClick={() => setPriceRange(range)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  priceRange === range
                    ? "bg-coffee-100 text-coffee-700 font-medium border border-coffee-200"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {range === "all" ? "All Prices" : `${range} (${range.length} dollar signs)`}
              </button>
            ))}
          </div>
        </div>

        {/* Amenities Filter */}
        <div>
          <h4 className="font-bold text-gray-900 mb-3">Amenities</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {amenities.map((amenity) => (
              <button
                key={amenity}
                onClick={() => onAmenityToggle(amenity)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  selectedAmenities.includes(amenity)
                    ? "bg-coffee-100 text-coffee-700 border border-coffee-200"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    selectedAmenities.includes(amenity)
                      ? "bg-coffee-200 text-coffee-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {getAmenityIcon(amenity)}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium">{getAmenityLabel(amenity)}</div>
                </div>
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center ${
                    selectedAmenities.includes(amenity)
                      ? "bg-coffee-600 border-coffee-600"
                      : "border-gray-300"
                  }`}
                >
                  {selectedAmenities.includes(amenity) && (
                    <span className="text-white text-xs">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Filter Buttons */}
        <div>
          <h4 className="font-bold text-gray-900 mb-3">Quick Filters</h4>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setSelectedCity("all");
                setPriceRange("all");
                setSelectedAmenities(["wifi", "outlet", "workspace"]);
              }}
              className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-center transition-colors"
            >
              <Wifi className="w-6 h-6 mx-auto mb-2 text-gray-600" />
              <div className="text-sm font-medium text-gray-700">Work Ready</div>
            </button>
            <button
              onClick={() => {
                setSelectedCity("all");
                setPriceRange("all");
                setSelectedAmenities(["quiet", "ac"]);
              }}
              className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-center transition-colors"
            >
              <Sparkles className="w-6 h-6 mx-auto mb-2 text-gray-600" />
              <div className="text-sm font-medium text-gray-700">Quiet Study</div>
            </button>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={onReset}
          className="w-full py-3 border-2 border-coffee-600 text-coffee-600 hover:bg-coffee-50 rounded-xl font-medium transition-colors"
        >
          Reset All Filters
        </button>
      </div>

      {/* Results Count */}
      <div className="mt-6 p-4 bg-gradient-to-r from-coffee-50 to-primary/10 rounded-xl">
        <div className="text-center">
          <div className="text-2xl font-bold text-coffee-700 mb-1">
            {selectedCity !== "all" || priceRange !== "all" || selectedAmenities.length > 0
              ? "Filtered"
              : "All"}
          </div>
          <div className="text-sm text-gray-600">coffee shops shown</div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
