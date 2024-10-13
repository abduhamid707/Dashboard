// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  role: localStorage.getItem('role') || null,
  adminType: localStorage.getItem('adminType') || null,
  userName: localStorage.getItem('userName') || null,
  userId: localStorage.getItem('userId') || null,
  phone: localStorage.getItem('phone') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, role, adminType, userName, userId, phone } = action.payload;
      state.token = token;
      state.role = role;
      state.adminType = adminType;
      state.userName = userName;
      state.userId = userId;
      state.phone = phone;

      // LocalStorage ga saqlash
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('adminType', adminType);
      localStorage.setItem('userName', userName);
      localStorage.setItem('userId', userId);
      localStorage.setItem('phone', phone);
    },
    clearCredentials: (state) => {
      state.token = null;
      state.role = null;
      state.adminType = null;
      state.userName = null;
      state.userId = null;
      state.phone = null;

      // LocalStorage dan o'chirish
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('adminType');
      localStorage.removeItem('userName');
      localStorage.removeItem('userId');
      localStorage.removeItem('phone');
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
