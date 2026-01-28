import React, { useState } from "react";
import HeroSection from "./components/HeroSection";
import FilterSection from "./components/FilterSection";
import CoffeeShopsGrid from "./components/CoffeeShopsGrid";
import CoffeeShopsCarousel from "./components/CoffeeShopsCarousel";
import StatsSection from "./components/StatsSection";
import CoffeeTypesSection from "./components/CoffeeTypesSection";
import CTASection from "./components/CTASection";
import data from "../Data/coffeeshop.json";
// import Header from "../../components/layout/Header";

const HomePage = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [favorites, setFavorites] = useState(new Set([1, 3]));

  const coffeeShops = data.coffeeShops;

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
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

  return (
    <>
    {/* <Header/> */}
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
              onToggleFavorite={toggleFavorite}
            />
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:block mb-12">
            <CoffeeShopsGrid
              shops={filteredShops}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          </div>

          <StatsSection />
          <CoffeeTypesSection />
          <CTASection />
        </div>
      </div>
    </>
  );
};

export default HomePage;
