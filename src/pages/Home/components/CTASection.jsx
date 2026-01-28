import React from "react";
import { MapPin, ExternalLink, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <div className="inline-flex items-center gap-2 bg-coffee-50 text-coffee-700 rounded-full px-4 py-1.5 mb-6">
        <Users className="w-4 h-4" />
        <span className="text-sm font-medium">JOIN 5,000+ COFFEE LOVERS</span>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Ready to Explore More?</h3>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => navigate("/map")}
          className="bg-gradient-to-r from-coffee-600 to-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-3 group"
        >
          <MapPin className="w-6 h-6" />
          Explore Interactive Map
          <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => navigate("/shop/all")}
          className="bg-white border-2 border-coffee-300 text-coffee-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-coffee-50 transition-all"
        >
          View All Coffee Shops
        </button>
      </div>

      <p className="text-gray-600 mt-6 text-sm font-code">
        {">"} No sign-up required. Start exploring now!
      </p>
    </div>
  );
};

export default CTASection;
