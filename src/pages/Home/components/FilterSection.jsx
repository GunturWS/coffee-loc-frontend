import React from "react";
import { Filter } from "lucide-react";

const FilterSection = ({ selectedFilter, onFilterChange, totalShops, filteredCount }) => {
  const filters = [
    { id: "all", label: "All Shops", count: 12 },
    { id: "featured", label: "Featured", count: 4 },
    { id: "trending", label: "Trending", count: 5 },
    { id: "new", label: "New", count: 3 },
    { id: "work-friendly", label: "Work Friendly", count: 8 },
    { id: "specialty", label: "Specialty Coffee", count: 6 },
  ];

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Filter className="w-5 h-5 text-coffee-600" />
          Filter by
        </h3>
        <div className="text-sm text-gray-500">
          Showing <span className="font-bold text-coffee-700">{filteredCount}</span> of{" "}
          <span className="font-bold text-gray-700">{totalShops}</span> shops
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
              selectedFilter === filter.id
                ? "bg-gradient-to-r from-coffee-600 to-primary text-white shadow-lg transform scale-105"
                : "bg-white text-gray-700 hover:bg-coffee-50 border border-gray-200"
            }`}
          >
            <span>{filter.label}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                selectedFilter === filter.id ? "bg-white/20" : "bg-coffee-100 text-coffee-700"
              }`}
            >
              {filter.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;
