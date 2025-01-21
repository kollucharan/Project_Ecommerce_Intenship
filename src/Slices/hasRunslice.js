import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  hasRun: false,
};
const hasRunSlice = createSlice({
  name: "hasRun",
  initialState,
  reducers: {
    SetHasRun: (state, action) => {
      console.log("hi");
      state.hasRun = true;
    },
  
  SetHasRunFalse: (state, action) => {
    state.hasRun = false;
  }
},
});
export const { SetHasRun , SetHasRunFalse} = hasRunSlice.actions;
export default hasRunSlice.reducer;
