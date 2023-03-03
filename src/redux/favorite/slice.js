import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        state.items = state.items.filter((obj) => obj.id !== action.payload.id);
      } else {
        state.items.push({ ...action.payload });
      }
    },
  },
});

export const selectDrawer = (state) => state.drawer;

export const { addFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
