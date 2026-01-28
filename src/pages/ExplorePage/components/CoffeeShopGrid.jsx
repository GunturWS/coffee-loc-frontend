import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Star,
  Clock,
  Wifi,
  Battery,
  Heart,
  Sparkles,
  Coffee,
  TrendingUp,
  Zap,
} from "lucide-react";

const CoffeeShopGrid = ({ coffeeShops, viewMode = "grid" }) => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = React.useState(new Set());

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getPriceRangeDisplay = (range) => {
    const symbols = {
      $: "₺",
      $$: "₺₺",
      $$$: "₺₺₺",
      $$$$: "₺₺₺₺",
    };
    return symbols[range] || range;
  };

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {coffeeShops.map((shop) => (
          <div
            key={shop.id}
            // Ubah onClick:
            onClick={() => navigate(`/coffee-shop/${shop.id}`, { state: { shop } })}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer group"
          >
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="md:w-64 h-48 md:h-auto relative">
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent md:hidden" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {shop.featured && (
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      <Sparkles className="w-3 h-3" />
                      FEATURED
                    </span>
                  )}
                  {shop.trending && (
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      <TrendingUp className="w-3 h-3" />
                      TRENDING
                    </span>
                  )}
                  {shop.new && (
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      NEW
                    </span>
                  )}
                </div>

                {/* Favorite Button */}
                <button
                  onClick={(e) => toggleFavorite(shop.id, e)}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.has(shop.id) ? "fill-red-500 text-red-500" : "text-gray-400"
                    }`}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{shop.name}</h3>
                      <span className="text-lg font-bold text-coffee-600">
                        {getPriceRangeDisplay(shop.priceRange)}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-3">{shop.tagline}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{shop.address}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Until {shop.openUntil}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{shop.distance}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-start gap-3 mb-4 md:mb-0">
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <span className="text-2xl font-bold text-gray-900">{shop.rating}</span>
                      </div>
                      <div className="text-sm text-gray-500">({shop.reviewCount} reviews)</div>
                    </div>
                  </div>
                </div>

                {/* Tags & Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {shop.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-coffee-50 text-coffee-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  {shop.amenities.slice(0, 3).map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-1 text-sm text-gray-600">
                      {amenity === "wifi" && <Wifi className="w-4 h-4" />}
                      {amenity === "outlet" && <Battery className="w-4 h-4" />}
                      {amenity === "parking" && <span className="text-xs">🅿️</span>}
                      {amenity === "ac" && <span className="text-xs">❄️</span>}
                      <span className="capitalize">{amenity}</span>
                    </div>
                  ))}
                  {shop.amenities.length > 3 && (
                    <span className="text-sm text-gray-500">+{shop.amenities.length - 3} more</span>
                  )}
                </div>

                {/* Coffee Types */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Coffee className="w-4 h-4 text-coffee-600" />
                    <span className="text-sm font-medium text-gray-700">Coffee Types:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {shop.coffeeTypes.slice(0, 3).map((type, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Grid View (default)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {coffeeShops.map((shop) => (
        <div
          key={shop.id}
          onClick={() => navigate(`/coffee-shop/${shop.id}`)}
          className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 cursor-pointer group"
        >
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={shop.image}
              alt={shop.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {shop.featured && (
                <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  <Sparkles className="w-3 h-3" />
                  FEATURED
                </span>
              )}
              {shop.trending && (
                <span className="inline-flex items-center gap-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  <TrendingUp className="w-3 h-3" />
                  TRENDING
                </span>
              )}
              {shop.new && (
                <span className="inline-flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  NEW
                </span>
              )}
            </div>

            {/* Favorite Button */}
            <button
              onClick={(e) => toggleFavorite(shop.id, e)}
              className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              <Heart
                className={`w-5 h-5 ${
                  favorites.has(shop.id) ? "fill-red-500 text-red-500" : "text-gray-400"
                }`}
              />
            </button>

            {/* Price Range */}
            <div className="absolute bottom-4 left-4">
              <span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-coffee-700 font-bold">
                {getPriceRangeDisplay(shop.priceRange)}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-bold text-xl text-gray-900 mb-1">{shop.name}</h3>
                <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{shop.address}</span>
                </div>
              </div>

              {/* Rating */}
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-gray-900">{shop.rating}</span>
                </div>
                <div className="text-xs text-gray-500">({shop.reviewCount})</div>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{shop.tagline}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {shop.tags.slice(0, 2).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-coffee-50 text-coffee-700 rounded-md text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Amenities */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2">
                {shop.amenities.includes("wifi") && (
                  <div className="p-1.5 bg-gray-100 rounded-lg" title="WiFi">
                    <Wifi className="w-3 h-3 text-gray-600" />
                  </div>
                )}
                {shop.amenities.includes("outlet") && (
                  <div className="p-1.5 bg-gray-100 rounded-lg" title="Power Outlets">
                    <Battery className="w-3 h-3 text-gray-600" />
                  </div>
                )}
                {shop.amenities.includes("parking") && (
                  <div className="p-1.5 bg-gray-100 rounded-lg" title="Parking">
                    <span className="text-xs">🅿️</span>
                  </div>
                )}
              </div>

              <div className="flex-1"></div>

              <div className="text-sm text-gray-600 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Until {shop.openUntil}</span>
              </div>
            </div>

            {/* Coffee Types */}
            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-1">Serves:</div>
              <div className="flex flex-wrap gap-1">
                {shop.coffeeTypes.slice(0, 2).map((type, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
                  >
                    {type}
                  </span>
                ))}
                {shop.coffeeTypes.length > 2 && (
                  <span className="px-2 py-1 text-gray-500 text-xs">
                    +{shop.coffeeTypes.length - 2} more
                  </span>
                )}
              </div>
            </div>

            {/* Distance & CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-600">
                <Zap className="w-4 h-4 inline mr-1" />
                {shop.distance} away
              </div>
              <button className="text-coffee-600 hover:text-coffee-700 font-medium text-sm group/btn">
                <span className="flex items-center gap-1">
                  View Details
                  <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoffeeShopGrid;
