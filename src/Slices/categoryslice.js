import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: [],
};
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addtocategories: (state, action) => {
      state.filters = [...state.filters, action.payload];
    },
    removefromcategories: (state, action) => {
      state.filters = state.filters.filter(
        (category) => category !== action.payload
      );
    },
  },
});

export const { addtocategories, removefromcategories } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
