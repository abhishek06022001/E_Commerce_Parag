// store holds all the reducers
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import cartReducer from "../features/cart/cartSlice";
export const store = configureStore({
  reducer: {
    users_store_reducer: userReducer,
    cart_reducer: cartReducer,
  },
});
