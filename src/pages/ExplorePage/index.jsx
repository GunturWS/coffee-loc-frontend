import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Map,
  Grid,
  Filter,
  List,
  ChevronDown,
  MapPin,
  Star,
  Clock,
  Wifi,
  Battery,
  Sparkles,
  TrendingUp,
  Coffee,
  Zap,
} from "lucide-react";
import CoffeeShopGrid from "./components/CoffeeShopGrid";
import FilterSidebar from "./components/FilterSidebar";
import MapView from "./components/MapView";
import SearchBar from "./components/SearchBar";
import data from "../Data/coffeeshop.json";

const ExplorePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'map'
  const [coffeeShopsState, setCoffeeShopsState] = useState([]); // Ganti nama state
  const [filteredShops, setFilteredShops] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState("rating");

  // Data dari JSON - gunakan nama yang berbeda dari state
  const coffeeShopsData = data.coffeeShops;

  // Stats state
  const [stats, setStats] = useState({
    totalShops: 0,
    totalReviews: 0,
    avgRating: 0,
    citiesCount: 0,
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCoffeeShopsState(coffeeShopsData); // Set ke state
      setFilteredShops(coffeeShopsData);
      setLoading(false);

      // Calculate stats
      const totalReviews = coffeeShopsData.reduce((sum, shop) => sum + shop.reviewCount, 0);
      const avgRating =
        coffeeShopsData.reduce((sum, shop) => sum + shop.rating, 0) / coffeeShopsData.length;
      const cities = [
        ...new Set(
          coffeeShopsData.map((shop) => {
            const addressParts = shop.address.split(", ");
            return addressParts.length > 1 ? addressParts[1] : addressParts[0];
          }),
        ),
      ];

      setStats({
        totalShops: coffeeShopsData.length,
        totalReviews,
        avgRating: avgRating.toFixed(1),
        citiesCount: cities.length,
      });
    }, 500);
  }, []);

  // Apply filters
  useEffect(() => {
    if (coffeeShopsState.length === 0) return;

    let result = [...coffeeShopsState];

    // Filter by city
    if (selectedCity !== "all") {
      result = result.filter((shop) =>
        shop.address.toLowerCase().includes(selectedCity.toLowerCase()),
      );
    }

    // Filter by price range
    if (priceRange !== "all") {
      result = result.filter((shop) => shop.priceRange === priceRange);
    }

    // Filter by amenities
    if (selectedAmenities.length > 0) {
      result = result.filter((shop) =>
        selectedAmenities.every((amenity) => shop.amenities.includes(amenity)),
      );
    }

    // Sort results
    result.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "reviews":
          return b.reviewCount - a.reviewCount;
        case "distance":
          const distA = parseFloat(a.distance);
          const distB = parseFloat(b.distance);
          return (isNaN(distA) ? 0 : distA) - (isNaN(distB) ? 0 : distB);
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredShops(result);
  }, [selectedCity, priceRange, selectedAmenities, sortBy, coffeeShopsState]);

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredShops(coffeeShopsState);
      return;
    }

    const filtered = coffeeShopsState.filter(
      (shop) =>
        shop.name.toLowerCase().includes(query.toLowerCase()) ||
        shop.address.toLowerCase().includes(query.toLowerCase()) ||
        shop.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())) ||
        shop.coffeeTypes.some((type) => type.toLowerCase().includes(query.toLowerCase())),
    );

    setFilteredShops(filtered);
  };

  const handleAmenityToggle = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity],
    );
  };

  const handleResetFilters = () => {
    setSelectedCity("all");
    setPriceRange("all");
    setSelectedAmenities([]);
    setSortBy("rating");
    setFilteredShops(coffeeShopsState);
  };

  // Extract cities from data
  const cities = [
    "all",
    ...new Set(
      coffeeShopsState.map((shop) => {
        const addressParts = shop.address.split(", ");
        return addressParts.length > 1 ? addressParts[1] : addressParts[0];
      }),
    ),
  ];

  // Extract price ranges from data
  const priceRanges = ["all", ...new Set(coffeeShopsState.map((shop) => shop.priceRange))];

  // All amenities
  const allAmenities = [...new Set(coffeeShopsState.flatMap((shop) => shop.amenities))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-coffee-50 to-white pt-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-coffee-300 border-t-coffee-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Finding the best coffee spots...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-coffee-50 to-white ">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-coffee-900 to-primary text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/20">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-code">EXPLORE COFFEE SHOPS</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Discover{" "}
              <span className="bg-gradient-to-r from-amber-200 to-coffee-200 bg-clip-text text-transparent">
                Local Coffee
              </span>{" "}
              Gems
            </h1>

            <p className="text-xl text-coffee-200 mb-8 max-w-2xl mx-auto font-code">
              Find your perfect coffee spot with detailed filters, maps, and real reviews.
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto mb-8">
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-white mb-1">{stats.totalShops}</div>
                <div className="text-sm text-coffee-200">Coffee Shops</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-white mb-1">{stats.citiesCount}</div>
                <div className="text-sm text-coffee-200">Cities</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-white mb-1">{stats.avgRating}</div>
                <div className="text-sm text-coffee-200">Avg Rating</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-white mb-1">
                  {stats.totalReviews.toLocaleString()}+
                </div>
                <div className="text-sm text-coffee-200">Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            {/* View Toggle */}
            <div className="flex bg-white rounded-xl p-1 border border-gray-200">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-coffee-50 text-coffee-700 border border-coffee-200"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Grid className="w-4 h-4" />
                <span className="font-medium">Grid</span>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-coffee-50 text-coffee-700 border border-coffee-200"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <List className="w-4 h-4" />
                <span className="font-medium">List</span>
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  viewMode === "map"
                    ? "bg-coffee-50 text-coffee-700 border border-coffee-200"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Map className="w-4 h-4" />
                <span className="font-medium">Map</span>
              </button>
            </div>

            {/* Filter Button Mobile */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              {selectedCity !== "all" || priceRange !== "all" || selectedAmenities.length > 0 ? (
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              ) : null}
            </button>
          </div>

          {/* Results Count & Sort */}
          <div className="flex items-center gap-4">
            <div className="text-gray-600">
              Showing <span className="font-bold text-coffee-700">{filteredShops.length}</span> of{" "}
              {coffeeShopsState.length} coffee shops
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-xl pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
              >
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviews</option>
                <option value="distance">Nearest</option>
                <option value="name">A to Z</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar - Desktop */}
          <div className={`lg:w-1/4 ${isFilterOpen ? "block" : "hidden"} lg:block`}>
            <FilterSidebar
              cities={cities}
              priceRanges={priceRanges}
              amenities={allAmenities}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedAmenities={selectedAmenities}
              onAmenityToggle={handleAmenityToggle}
              onReset={handleResetFilters}
            />
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {viewMode === "map" ? (
              <MapView coffeeShops={filteredShops} />
            ) : (
              <CoffeeShopGrid coffeeShops={filteredShops} viewMode={viewMode} />
            )}

            {/* Empty State */}
            {filteredShops.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-coffee-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Coffee className="w-12 h-12 text-coffee-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No coffee shops found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Try adjusting your filters or search for something different.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-coffee-600 hover:bg-coffee-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Trending Tags */}
            {filteredShops.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-coffee-600" />
                  <h3 className="font-bold text-gray-900">Popular Tags Right Now</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Specialty Coffee",
                    "Work Friendly",
                    "24/7 Open",
                    "Quiet Space",
                    "Parking Available",
                    "Dessert",
                    "Roastery",
                  ].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleSearch(tag)}
                      className="px-4 py-2 bg-white border border-gray-200 hover:border-coffee-300 rounded-full text-sm font-medium text-gray-700 hover:text-coffee-700 transition-colors hover:shadow-sm"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-coffee-800 to-primary rounded-2xl p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Can't find your favorite coffee shop?
            </h3>
            <p className="text-coffee-200 mb-6">
              Help us grow our community by suggesting new coffee spots!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-coffee-900 hover:bg-coffee-50 px-6 py-3 rounded-xl font-bold transition-colors">
                Suggest a Coffee Shop
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-xl font-bold transition-colors">
                Become a Partner
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsFilterOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-white shadow-xl overflow-y-auto">
            <FilterSidebar
              cities={cities}
              priceRanges={priceRanges}
              amenities={allAmenities}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedAmenities={selectedAmenities}
              onAmenityToggle={handleAmenityToggle}
              onReset={handleResetFilters}
              onClose={() => setIsFilterOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
