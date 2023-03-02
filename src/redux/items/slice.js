import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from './asynAction';

const sts = {
  loading: 'loading',
  success: 'success',
  error: 'error',
};

const initialState = {
  items: [],
  status: sts.loading,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state, action) => {
      state.status = sts.loading;
      state.items = [];
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.status = sts.success;
      state.items = action.payload;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.status = sts.error;
      state.items = [];
    });
  },
});

export const { setItems } = dataSlice.actions;

export default dataSlice.reducer;
