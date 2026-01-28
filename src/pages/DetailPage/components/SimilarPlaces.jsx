import React from "react";
import { useNavigate } from "react-router-dom";
import { Coffee, MapPin, Star, Clock, Zap } from "lucide-react";
import CoffeeData from "../../data/coffeeShops.json";

const SimilarPlaces = ({ currentShopId }) => {
  const navigate = useNavigate();

  // Filter similar coffee shops (excluding current one, same city, similar price range)
  const currentShop = CoffeeData.coffeeShops.find((shop) => shop.id === currentShopId);

  const similarShops = CoffeeData.coffeeShops
    .filter(
      (shop) =>
        shop.id !== currentShopId &&
        shop.city === currentShop.city &&
        shop.priceRange === currentShop.priceRange,
    )
    .slice(0, 3);

  if (similarShops.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Similar Spots Nearby</h2>
          <p className="text-gray-600">Other great places you might like</p>
        </div>

        <button
          onClick={() => navigate(`/map?city=${encodeURIComponent(currentShop.city)}`)}
          className="text-coffee-600 hover:text-coffee-700 font-medium flex items-center gap-2"
        >
          View all in {currentShop.city}
          <Zap className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {similarShops.map((shop) => (
          <div
            key={shop.id}
            onClick={() => navigate(`/shop/${shop.id}`)}
            className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-coffee-300 transition-all hover:shadow-xl cursor-pointer group"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={shop.image}
                alt={shop.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

              {/* Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-800">
                  {shop.priceRange}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-coffee-600 transition-colors">
                {shop.name}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{shop.tagline}</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{shop.distance}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{shop.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Until {shop.openUntil}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {shop.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 bg-coffee-50 text-coffee-700 rounded-lg text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarPlaces;
