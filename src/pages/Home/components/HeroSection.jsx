import React from "react";
import { Coffee } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-coffee-900 via-coffee-800 to-primary pt-20 pb-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-coffee-300 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20">
          <Coffee className="w-4 h-4 text-amber-300" />
          <span className="text-sm font-code text-white">DISCOVER LOCAL COFFEE CULTURE</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-code text-white mb-6 leading-tight">
          Find Your Perfect
          <span className="block mt-2">
            <span className="bg-gradient-to-r from-amber-200 to-coffee-200 bg-clip-text text-transparent">
              Coffee Spot
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-coffee-100 mb-10 max-w-2xl mx-auto font-code">
          Discover handpicked coffee shops with the best brews, cozy ambiance, and everything a
          coffee lover needs.
          <span className="block mt-3 font-code text-amber-200">
            {">"} Curated by coffee enthusiasts
          </span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => (window.location.href = "/explore")}
            className="bg-white text-coffee-900 hover:bg-coffee-50 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-2xl flex items-center justify-center gap-3 group"
          >
            Explore Coffee Map
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>

          <button
            onClick={() => (window.location.href = "/shop/all")}
            className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold text-lg transition-all backdrop-blur-sm"
          >
            View All Shops
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-16">
          {[
            { value: "50+", label: "Coffee Shops" },
            { value: "15", label: "Cities" },
            { value: "4.8★", label: "Avg Rating" },
            { value: "5K+", label: "Happy Customers" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
            >
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-coffee-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
