// Appslice.js
import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isMenuopen: true, // Default state
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuopen = !state.isMenuopen; // Toggle logic
    },
  },
});

export const { toggleMenu } = appSlice.actions;
export default appSlice.reducer;
