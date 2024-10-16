// store holds all the reducers
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
export const store = configureStore({
  reducer: {
    users_store_reducer: userReducer,
  },
});
