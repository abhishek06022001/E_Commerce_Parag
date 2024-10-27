import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart: [],
};
export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  //   action .payload will have the id with it
  reducers: {
    addToCart: (state, action) => {
      // find inside the cart state if yes increment the count
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      // find inside the cart state if yes decrement the count
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart.quantity == 1) {
        const index = state.cart.indexOf(itemInCart);
        if (index > -1) {
          state.cart.splice(index, 1);
        }
      } else {
        itemInCart.quantity--;
      }
    },
    placeOrder: (state, action) => {
      // remove all the items and clear the cart at once
      return { cart: [] };
    },
  },
});
export const { addToCart, removeFromCart, placeOrder } = cartSlice.actions;
export default cartSlice.reducer;
