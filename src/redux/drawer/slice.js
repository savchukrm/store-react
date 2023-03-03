import { createSlice } from '@reduxjs/toolkit';

import { calcTotalPrice } from '../../utils/calcTotalPrice';

const initialState = {
  cells: [],
  totalPrice: 0,
};

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.cells.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        state.cells = state.cells.filter((obj) => obj.id !== action.payload.id);
      } else {
        state.cells.push({ ...action.payload });
      }

      state.totalPrice = calcTotalPrice(state.cells);
    },
    removeItem(state, action) {
      state.cells = state.cells.filter((obj) => obj.id !== action.payload);
      state.totalPrice = calcTotalPrice(state.cells);
    },
    clearDrawer(state, action) {
      state.cells = [];
      state.totalPrice = 0;
    },
  },
});

export const selectDrawer = (state) => state.drawer;

export const { addItem, removeItem, clearDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
