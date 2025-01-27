import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  itemsincart: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setcartdetails: (state, action) => {
      state.itemsincart = action.payload;
    },

    additemtocart: (state, action) => {
      const existingProduct = state.itemsincart.find(
        (item) => item.id === action.payload.id
      );
      if (!existingProduct) {
        state.itemsincart.push({ ...action.payload, quantity: 1 }); // Add new item with quantity 1
      }
    },

    incItemtocart: (state, action) => {
      console.log(action.payload);

      const existingProduct = state.itemsincart.find(
        (item) => item.id === action.payload.id
      );
      const maxQuantity = action.payload.max_quantity;
      //  console.log(maxQuantity);

      if (existingProduct) {
        if (existingProduct.quantity < maxQuantity) {
          existingProduct.quantity += 1;
        } else {
          console.log("Max quantity reached for this product.");
          alert("Max Quantity Reached");
          existingProduct.quantity = maxQuantity;
        }
      } else {
        state.itemsincart.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    decItemtocart: (state, action) => {
      console.log("hi");
      const existingProduct = state.itemsincart.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      } else {
        state.itemsincart = state.itemsincart.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },

    removeitemfromcart: (state, action) => {
      console.log("hi");
      state.itemsincart = state.itemsincart.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const {
  setcartdetails,
  additemtocart,
  removeitemfromcart,
  decItemtocart,
  incItemtocart,
} = cartSlice.actions;

export default cartSlice.reducer;
