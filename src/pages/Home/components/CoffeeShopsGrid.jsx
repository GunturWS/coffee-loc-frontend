import React from "react";
import CoffeeShopCard from "./CoffeeShopCard";

const CoffeeShopsGrid = ({ shops, favorites, onToggleFavorite }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {shops.map((shop) => (
        <CoffeeShopCard
          key={shop.id}
          shop={shop}
          isFavorite={favorites.has(shop.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default CoffeeShopsGrid;
