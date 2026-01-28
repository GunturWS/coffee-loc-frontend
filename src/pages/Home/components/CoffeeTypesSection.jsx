import React from "react";
import { Coffee } from "lucide-react";

const CoffeeTypesSection = () => {
  const coffeeTypes = [
    { name: "Espresso", count: "40+ shops" },
    { name: "Cappuccino", count: "45+ shops" },
    { name: "Latte", count: "50+ shops" },
    { name: "Cold Brew", count: "35+ shops" },
    { name: "Pour Over", count: "25+ shops" },
    { name: "Aeropress", count: "20+ shops" },
  ];

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular Coffee Types Available</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {coffeeTypes.map((type) => (
          <div
            key={type.name}
            className="bg-white rounded-xl p-4 text-center border border-gray-100 hover:border-coffee-300 hover:shadow-lg transition-all group cursor-pointer"
          >
            <div className="w-12 h-12 mx-auto mb-3 bg-coffee-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Coffee className="w-6 h-6 text-coffee-600" />
            </div>
            <div className="font-medium text-gray-900">{type.name}</div>
            <div className="text-xs text-gray-500 mt-1">{type.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoffeeTypesSection;
