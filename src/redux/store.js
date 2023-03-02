import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import filter from './filter/slice';
import data from './items/slice';
import drawer from './drawer/slice';
import favorite from './favorite/slice';

export const store = configureStore({
  reducer: { data, filter, drawer, favorite },
});

export const useAppDispatch = () => useDispatch();
