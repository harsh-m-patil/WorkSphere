import { createSlice } from '@reduxjs/toolkit';

const workSlice = createSlice({
  name: 'work',
  initialState: [],
  reducers: {
    addWorks: (state, action) => action.payload,
  },
});

export const { addWorks } = workSlice.actions;
export default workSlice.reducer;
