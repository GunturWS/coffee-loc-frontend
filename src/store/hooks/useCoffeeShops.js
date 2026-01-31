import { useDispatch, useSelector } from "react-redux";
import {
  fetchCoffeeShops,
  toggleFavorite,
  setFilters,
  clearFilters,
} from "../slices/coffeeShopsSlice";

export const useCoffeeShops = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.coffeeShops);

  const actions = {
    getCoffeeShops: (params) => dispatch(fetchCoffeeShops(params)),

    // UI actions
    toggleFavorite: (id) => dispatch(toggleFavorite(id)),

    // Filter actions
    setFilters: (filters) => dispatch(setFilters(filters)),
    clearFilters: () => dispatch(clearFilters()),
  };

  return {
    ...state,
    ...actions,
  };
};

export const useFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  return { filters, dispatch };
};
