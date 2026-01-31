// import React, { useEffect, useState } from "react";
// import HeroSection from "./components/HeroSection";
// import FilterSection from "./components/FilterSection";
// import CoffeeShopsGrid from "./components/CoffeeShopsGrid";
// import CoffeeShopsCarousel from "./components/CoffeeShopsCarousel";
// import StatsSection from "./components/StatsSection";
// import CoffeeTypesSection from "./components/CoffeeTypesSection";
// import CTASection from "./components/CTASection";
// // import data from "../Data/coffeeshop.json";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCoffeeShops } from "../../store/slices/coffeeShopsSlice";
// // import Header from "../../components/layout/Header";

// const HomePage = () => {
//   const dispatch = useDispatch();
//   const (item: coffeeShops) = useSelector((state) => state.coffeeShops);

//   const [selectedFilter, setSelectedFilter] = useState("all");
//   const [favorites, setFavorites] = useState(new Set([1, 3]));

//   // const coffeeShops = data.coffeeShops;

//   useEffect(() => {
//     dispatch(fetchCoffeeShops({
//       featured: true,
//       limit: 8
//     }));
//   }, [dispatch]);

//   const toggleFavorite = (id) => {
//      // Update local state
//     setFavorites((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(id)) {
//         newSet.delete(id);
//       } else {
//         newSet.add(id);
//       }
//       return newSet;
//     });

//     // Dispatch to Redux
//     dispatch(toggleFavorite(id));

//     // Update localStorage
//     const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
//     const newFavorites = storedFavorites.includes(id)
//       ? storedFavorites.filter(favId => favId !== id)
//       : [...storedFavorites, id];
//     localStorage.setItem('favorites', JSON.stringify(newFavorites));
//   };

//   const filteredShops = coffeeShops.filter((shop) => {
//     if (selectedFilter === "all") return true;
//     if (selectedFilter === "featured") return shop.featured;
//     if (selectedFilter === "trending") return shop.trending;
//     if (selectedFilter === "new") return shop.new;
//     if (selectedFilter === "work-friendly") return shop.workFriendly;
//     if (selectedFilter === "specialty")
//       return shop.specialty || shop.tags?.includes("Specialty") || shop.tags?.includes("Artisanal");

//     return true;
//   });

//   return (
//     <>
//     {/* <Header/> */}
//       <div className="min-h-screen bg-gradient-to-b from-white to-coffee-50">
//         <HeroSection />

//         <div className="container mx-auto px-4 py-16">
//           <FilterSection
//             selectedFilter={selectedFilter}
//             onFilterChange={setSelectedFilter}
//             totalShops={coffeeShops.length}
//             filteredCount={filteredShops.length}
//           />

//           {/* Mobile Carousel */}
//           <div className="md:hidden mb-12">
//             <CoffeeShopsCarousel
//               shops={filteredShops}
//               favorites={favorites}
//               onToggleFavorite={toggleFavorite}
//             />
//           </div>

//           {/* Desktop Grid */}
//           <div className="hidden md:block mb-12">
//             <CoffeeShopsGrid
//               shops={filteredShops}
//               favorites={favorites}
//               onToggleFavorite={toggleFavorite}
//             />
//           </div>

//           <StatsSection coffeeShops={coffeeShops} />
//           <CoffeeTypesSection coffeeShops={coffeeShops} />
//           <CTASection />
//         </div>
//       </div>
//     </>
//   );
// };

// export default HomePage;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "./components/HeroSection";
import FilterSection from "./components/FilterSection";
import CoffeeShopsGrid from "./components/CoffeeShopsGrid";
import CoffeeShopsCarousel from "./components/CoffeeShopsCarousel";
import StatsSection from "./components/StatsSection";
import CoffeeTypesSection from "./components/CoffeeTypesSection";
import CTASection from "./components/CTASection";
import { fetchCoffeeShops, toggleFavorite } from "../../store/slices/coffeeShopsSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const { items: coffeeShops, loading, error } = useSelector((state) => state.coffeeShops);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [favorites, setFavorites] = useState(new Set([1, 3]));

  // Fetch coffee shops on mount
  useEffect(() => {
    dispatch(
      fetchCoffeeShops({
        featured: true,
        limit: 8,
      }),
    );
  }, [dispatch]);

  const handleToggleFavorite = (id) => {
    // Update local state
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });

    // Dispatch to Redux
    dispatch(toggleFavorite(id));

    // Update localStorage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const newFavorites = storedFavorites.includes(id)
      ? storedFavorites.filter((favId) => favId !== id)
      : [...storedFavorites, id];
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const filteredShops = coffeeShops.filter((shop) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "featured") return shop.featured;
    if (selectedFilter === "trending") return shop.trending;
    if (selectedFilter === "new") return shop.new;
    if (selectedFilter === "work-friendly") return shop.workFriendly;
    if (selectedFilter === "specialty")
      return shop.specialty || shop.tags?.includes("Specialty") || shop.tags?.includes("Artisanal");

    return true;
  });

  // Loading state
  if (loading && coffeeShops.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-coffee-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-coffee-300 border-t-coffee-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading coffee shops...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-coffee-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Data</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => dispatch(fetchCoffeeShops())}
            className="bg-coffee-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-coffee-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white to-coffee-50">
        <HeroSection />

        <div className="container mx-auto px-4 py-16">
          <FilterSection
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
            totalShops={coffeeShops.length}
            filteredCount={filteredShops.length}
          />

          {/* Mobile Carousel */}
          <div className="md:hidden mb-12">
            <CoffeeShopsCarousel
              shops={filteredShops}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:block mb-12">
            <CoffeeShopsGrid
              shops={filteredShops}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>

          <StatsSection coffeeShops={coffeeShops} />
          <CoffeeTypesSection coffeeShops={coffeeShops} />
          <CTASection />
        </div>
      </div>
    </>
  );
};

export default HomePage;