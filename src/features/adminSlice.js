import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    isAdminLoggedIn: false,
    adminInfo: null,
  },
  reducers: {
    adminLogin: (state, action) => {
      state.isAdminLoggedIn = true;
      state.adminInfo = action.payload;
    },
    adminLogout: (state) => {
      state.isAdminLoggedIn = false;
      state.adminInfo = null;
    },
  },
});

export const { adminLogin, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;