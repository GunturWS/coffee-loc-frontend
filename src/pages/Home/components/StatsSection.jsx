import React from "react";

const StatsSection = () => {
  return (
    <div className="bg-gradient-to-r from-coffee-900 to-primary rounded-3xl p-8 mb-12">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-white mb-2">50+</div>
          <div className="text-coffee-200">Coffee Shops Listed</div>
          <div className="text-sm text-coffee-300 mt-1">Across 15 cities in Indonesia</div>
        </div>

        <div className="text-center">
          <div className="text-4xl font-bold text-white mb-2">4.8★</div>
          <div className="text-coffee-200">Average Rating</div>
          <div className="text-sm text-coffee-300 mt-1">Based on 2,500+ reviews</div>
        </div>

        <div className="text-center">
          <div className="text-4xl font-bold text-white mb-2">98%</div>
          <div className="text-coffee-200">Verified Listings</div>
          <div className="text-sm text-coffee-300 mt-1">Personally checked by our team</div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
