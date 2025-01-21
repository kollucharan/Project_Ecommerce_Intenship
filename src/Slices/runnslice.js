import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  runn: false,
};
const runnSlice = createSlice({
  name: "runn",
  initialState,
  reducers: {
    setRunn: (state, action) => {
      console.log("run");
      state.runn = !state.runn;
    },
  },
});
export const { setRunn } = runnSlice.actions;
export default runnSlice.reducer;
