import { configureStore } from '@reduxjs/toolkit';
import workReducer from './workSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    work: workReducer,
    auth: authReducer,
  },
});
