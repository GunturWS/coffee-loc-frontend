import React from "react";
import {
  MapPin,
  Star,
  Clock,
  Wifi,
  Battery,
  Heart,
  Coffee,
  Zap,
  Wind,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CoffeeShopCard = ({ shop, isFavorite, onToggleFavorite }) => {
  const navigate = useNavigate();

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case "wifi":
        return <Wifi className="w-4 h-4" />;
      case "outlet":
        return <Battery className="w-4 h-4" />;
      case "parking":
        return "🅿️";
      case "ac":
        return <Wind className="w-4 h-4" />;
      case "quiet":
        return "🤫";
      case "terrace":
        return "🌿";
      case "roastery":
        return <Coffee className="w-4 h-4" />;
      case "workspace":
        return "💻";
      case "training":
        return "🎓";
      case "specialty":
        return <Zap className="w-4 h-4" />;
      case "fast":
        return "⚡";
      case "drive-thru":
        return "🚗";
      case "24h":
        return "🌙";
      case "delivery":
        return "🛵";
      default:
        return "✓";
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 group h-full flex flex-col">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={shop.image}
          alt={shop.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {shop.featured && (
            <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full">
              FEATURED
            </span>
          )}
          {shop.trending && (
            <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-full">
              TRENDING
            </span>
          )}
          {shop.new && (
            <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold rounded-full">
              NEW
            </span>
          )}
        </div>

        {/* Price Range */}
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-bold">
          {shop.priceRange}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(shop.id);
          }}
          className="absolute bottom-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all hover:scale-110 z-10"
        >
          <Heart
            className={`w-5 h-5 transition-all ${
              isFavorite
                ? "fill-red-500 text-red-500 animate-pulse"
                : "text-gray-400 hover:text-red-400"
            }`}
          />
        </button>

        {/* Distance */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5">
          <span className="text-sm font-medium text-gray-900">{shop.distance} away</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-bold text-xl text-gray-900 mb-1 group-hover:text-coffee-700 transition-colors">
                {shop.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{shop.tagline}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(shop.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-gray-900">{shop.rating}</span>
                <span className="text-gray-500 text-sm">({shop.reviewCount} reviews)</span>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-2 mb-4">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-600 flex-1">{shop.address}</p>
          </div>

          {/* Amenities */}
          <div className="mb-4">
            <div className="text-xs text-gray-500 mb-2">AMENITIES</div>
            <div className="flex flex-wrap gap-2">
              {shop.amenities.slice(0, 4).map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-coffee-50 rounded-lg text-sm text-coffee-700"
                  title={amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                >
                  {getAmenityIcon(amenity)}
                  <span className="font-medium">
                    {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                  </span>
                </div>
              ))}
              {shop.amenities.length > 4 && (
                <div className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-600">
                  +{shop.amenities.length - 4} more
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {shop.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Open until {shop.openUntil}</span>
          </div>

          <button
            onClick={() => navigate(`/shop/${shop.id}`)}
            className="bg-coffee-600 hover:bg-coffee-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group/btn"
          >
            View Details
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeShopCard;
