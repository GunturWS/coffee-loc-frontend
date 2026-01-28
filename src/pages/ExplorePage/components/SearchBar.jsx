import React, { useState, useEffect } from "react";
import { Search, MapPin, Filter, X } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Sample suggestions
  const sampleSuggestions = [
    "Specialty coffee",
    "24 hours open",
    "With parking",
    "Work friendly",
    "Quiet space",
    "Bandung coffee",
    "Dessert coffee",
    "Outdoor seating",
    "Coffee with view",
    "Local favorite",
  ];

  useEffect(() => {
    if (query.trim()) {
      const filtered = sampleSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(query.toLowerCase()),
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`relative transition-all duration-300 ${isExpanded ? "scale-105" : ""}`}>
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              setIsExpanded(true);
              setShowSuggestions(true);
            }}
            onBlur={() => {
              setTimeout(() => {
                setIsExpanded(false);
                setShowSuggestions(false);
              }, 200);
            }}
            placeholder="Search coffee shops by name, location, or tags..."
            className="w-full pl-12 pr-12 py-4 bg-white rounded-2xl border-2 border-coffee-200 focus:border-coffee-500 focus:ring-4 focus:ring-coffee-100 outline-none transition-all duration-300 text-gray-900 placeholder-gray-500 shadow-lg"
          />

          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-16 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}

          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-coffee-600 to-primary text-white px-6 py-2 rounded-xl font-medium hover:from-coffee-700 hover:to-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Search
          </button>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden animate-slide-down">
          <div className="p-2">
            <div className="text-xs font-medium text-gray-500 px-3 py-2">Popular Searches</div>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-3 hover:bg-coffee-50 rounded-xl transition-colors flex items-center gap-3"
              >
                <Search className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{suggestion}</span>
              </button>
            ))}
          </div>
          <div className="border-t border-gray-100 p-3 bg-gray-50">
            <div className="text-xs text-gray-500">Try searching for:</div>
            <div className="flex flex-wrap gap-2 mt-2">
              {["coffee near me", "wifi available", "open now", "specialty", "quiet"].map(
                (tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(tag)}
                    className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-coffee-300 hover:text-coffee-700 transition-colors"
                  >
                    {tag}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quick Filter Chips */}
      <div className="flex flex-wrap gap-3 mt-4 justify-center">
        <button
          type="button"
          onClick={() => handleSuggestionClick("open now")}
          className="px-4 py-2 bg-white border border-coffee-200 hover:border-coffee-400 text-coffee-700 rounded-full text-sm font-medium transition-colors flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Open Now
        </button>
        <button
          type="button"
          onClick={() => handleSuggestionClick("wifi available")}
          className="px-4 py-2 bg-white border border-coffee-200 hover:border-coffee-400 text-coffee-700 rounded-full text-sm font-medium transition-colors flex items-center gap-2"
        >
          <span className="text-blue-500">📶</span>
          WiFi Available
        </button>
        <button
          type="button"
          onClick={() => handleSuggestionClick("parking available")}
          className="px-4 py-2 bg-white border border-coffee-200 hover:border-coffee-400 text-coffee-700 rounded-full text-sm font-medium transition-colors"
        >
          🅿️ Parking
        </button>
        <button
          type="button"
          onClick={() => handleSuggestionClick("specialty coffee")}
          className="px-4 py-2 bg-white border border-coffee-200 hover:border-coffee-400 text-coffee-700 rounded-full text-sm font-medium transition-colors"
        >
          ☕ Specialty
        </button>
      </div>
    </div>
  );
};

// Add animation style
const style = document.createElement("style");
style.textContent = `
  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-slide-down {
    animation: slide-down 0.2s ease-out;
  }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
document.head.appendChild(style);

export default SearchBar;
