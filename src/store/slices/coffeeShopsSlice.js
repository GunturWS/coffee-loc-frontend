import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
4;

export const fetchCoffeeShops = createAsyncThunk(
  "coffeeShops/fetchAll",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get("/coffeeshops", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Initial state
const initialState = {
  items: [],
  currentShop: null,
  loading: false,
  error: null,
  success: false,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  },
  filters: {
    city: "all",
    priceRange: "all",
    amenities: [],
    sortBy: "rating",
  },
};

const coffeeShopsSlice = createSlice({
  name: "coffeeShops",
  initialState,
  reducers: {
    // Sync actions
    setCurrentShop: (state, action) => {
      state.currentShop = action.payload;
    },
    clearCurrentShop: (state) => {
      state.currentShop = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    toggleFavorite: (state, action) => {
      const shop = state.items.find((item) => item.id === action.payload);
      if (shop) {
        shop.isFavorite = !shop.isFavorite;
      }
      if (state.currentShop?.id === action.payload) {
        state.currentShop.isFavorite = !state.currentShop.isFavorite;
      }
    },
    resetState: () => initialState,
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchCoffeeShops.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchCoffeeShops.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.success = true;
        state.pagination = {
          page: action.payload.meta?.page || 1,
          limit: action.payload.meta?.limit || 10,
          total: action.payload.meta?.total || 0,
          totalPages: action.payload.meta?.totalPages || 1,
        };
      })
      .addCase(fetchCoffeeShops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const {
  setCurrentShop,
  clearCurrentShop,
  setFilters,
  clearFilters,
  toggleFavorite,
  resetState,
} = coffeeShopsSlice.actions;

export default coffeeShopsSlice.reducer;
