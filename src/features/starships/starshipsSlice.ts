import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchStarships } from './starshipsAPI';

export interface Starship {
  name: string;
  manufacturer: string;
  hyperdrive_rating: string;
  passengers: string;
};

export interface StarshipsState {
  data: Starship[];
  status: 'idle' | 'loading' | 'failed';
};

const initialState: StarshipsState = {
  data: [],
  status: 'idle',
};

export const getStarships = createAsyncThunk(
  'starships/fetch',
  async () => {
    const response = await fetchStarships();
    return response.results;
  }
);

export const starshipsSlice = createSlice({
  name: 'starships',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStarships.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getStarships.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getStarships.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      });
  },
});

export const selectStarships = (state: RootState) => state.starships.data;
export const selectStarshipsLoading = (state: RootState) => state.starships.status === 'loading';
export const selectStarshipsError = (state: RootState) => state.starships.status === 'failed';

export default starshipsSlice.reducer;
