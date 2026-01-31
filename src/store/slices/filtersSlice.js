import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // UI filters
  selectedFilter: "all",
  viewMode: "grid", // 'grid', 'list', 'map'

  // Search filters
  searchQuery: "",
  city: "all",
  priceRange: "all",
  amenities: [],
  coffeeTypes: [],

  // Sorting
  sortBy: "rating", // 'rating', 'reviews', 'distance', 'name'
  sortOrder: "desc",

  // Pagination
  page: 1,
  limit: 12,

  // UI state
  isFilterOpen: false,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSelectedFilter: (state, action) => {
      state.selectedFilter = action.payload;
    },

    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.page = 1; // Reset to first page on new search
    },

    setCity: (state, action) => {
      state.city = action.payload;
      state.page = 1;
    },

    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
      state.page = 1;
    },

    setAmenities: (state, action) => {
      state.amenities = action.payload;
      state.page = 1;
    },

    toggleAmenity: (state, action) => {
      const amenity = action.payload;
      if (state.amenities.includes(amenity)) {
        state.amenities = state.amenities.filter((a) => a !== amenity);
      } else {
        state.amenities.push(amenity);
      }
      state.page = 1;
    },

    setCoffeeTypes: (state, action) => {
      state.coffeeTypes = action.payload;
      state.page = 1;
    },

    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },

    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },

    setPage: (state, action) => {
      state.page = action.payload;
    },

    setLimit: (state, action) => {
      state.limit = action.payload;
      state.page = 1;
    },

    toggleFilterPanel: (state) => {
      state.isFilterOpen = !state.isFilterOpen;
    },

    resetFilters: () => initialState,

    // Complex filter setters
    setWorkFriendlyFilter: (state) => {
      state.amenities = [...new Set([...state.amenities, "wifi", "outlet", "workspace"])];
    },

    setSpecialtyFilter: (state) => {
      state.coffeeTypes = [
        ...new Set([...state.coffeeTypes, "Specialty", "Artisanal", "Single Origin"]),
      ];
    },
  },
});

export const {
  setSelectedFilter,
  setViewMode,
  setSearchQuery,
  setCity,
  setPriceRange,
  setAmenities,
  toggleAmenity,
  setCoffeeTypes,
  setSortBy,
  setSortOrder,
  setPage,
  setLimit,
  toggleFilterPanel,
  resetFilters,
  setWorkFriendlyFilter,
  setSpecialtyFilter,
} = filtersSlice.actions;

export default filtersSlice.reducer;
