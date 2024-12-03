import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;

      // Persist data in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('id', user._id);
      localStorage.setItem('token', token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;

      // Remove data from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
