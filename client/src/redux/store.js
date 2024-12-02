import { configureStore } from '@reduxjs/toolkit';
import workReducer from './workSlice';

export const store = configureStore({
  reducer: {
    work: workReducer,
  },
});
