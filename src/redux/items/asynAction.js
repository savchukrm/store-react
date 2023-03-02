import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchData = createAsyncThunk(
  'data/fetchDataStatus',
  async (param) => {
    const category = param ? `category=${param}` : ' ';
    const { data } = await axios.get(
      `https://6351072b3e9fa1244e535a4a.mockapi.io/items?${category}`
    );

    return data;
  }
);
