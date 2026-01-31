import { configureStore } from "@reduxjs/toolkit";
import coffeeShpsReducers from "./slices/coffeeShopsSlice";

export const store = configureStore({
  reducer: {
    coffeeShops: coffeeShpsReducers,
  },
});
