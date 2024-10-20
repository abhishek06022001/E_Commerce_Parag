import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  W: "abhishek",
};
export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    logoutUser: (state) => {
      return {};
    },
    logUser: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});
export const { logoutUser, logUser } = userSlice.actions;
// action objects are named
export default userSlice.reducer;
// reducer is default
