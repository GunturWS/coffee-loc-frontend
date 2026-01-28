import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CoffeeShopCard from "./CoffeeShopCard";

const CoffeeShopsCarousel = ({ shops, favorites, onToggleFavorite }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % shops.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + shops.length) % shops.length);
  };

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-3xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {shops.map((shop) => (
            <div key={shop.id} className="w-full flex-shrink-0 px-2">
              <CoffeeShopCard
                shop={shop}
                isFavorite={favorites.has(shop.id)}
                onToggleFavorite={onToggleFavorite}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-10"
      >
        <ChevronLeft className="w-5 h-5 text-gray-800" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-10"
      >
        <ChevronRight className="w-5 h-5 text-gray-800" />
      </button>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {shops.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index ? "bg-coffee-600 w-6" : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CoffeeShopsCarousel;
