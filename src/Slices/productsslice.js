import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  availabaleproducts: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setproductdetails: (state, action) => {
      console.log("Dispatching products:", action.payload);
      state.availabaleproducts = action.payload;
    },
    removeproduct: (state, action) => {
      //  console.log("dispatching as expected")
      state.availabaleproducts = state.availabaleproducts.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});
export const { setproductdetails, removeproduct } = productsSlice.actions;
export default productsSlice.reducer;
