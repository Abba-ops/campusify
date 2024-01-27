import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/apiSlice";
import cartSliceReducer from "../features/cartSlice";
import authSliceReducer from "../features/authSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    cart: cartSliceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
