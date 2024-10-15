import { createSlice } from "@reduxjs/toolkit";

const initialState = {
};
export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    logoutUser: (state) => {},
    logUser: (state, action) => {
      // get the user and replace the user with the action
      state.user = action.payload;
    },
  },
});
export const { logoutUser, logUser } = userSlice.actions;
// action objects are named
export default userSlice.reducer;
// reducer is default