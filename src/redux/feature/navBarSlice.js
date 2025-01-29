import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggleSidebar: true,
};

const NavBarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.toggleSidebar = !state.toggleSidebar;
    },
  },
});
export default NavBarSlice.reducer;

export const { openSidebar } = NavBarSlice.actions;
