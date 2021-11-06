import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchStarshipsByPage } from './starshipsAPI';

export interface Starship {
  name: string;
  manufacturer: string;
  hyperdrive_rating: string;
  passengers: string;
};

export interface StarshipResponse {
  count: number;
  next?: string;
  previous?: string;
  results: Starship[];
}

export interface StarshipsState {
  data: StarshipResponse;
  status: 'idle' | 'loading' | 'failed';
};

const initialState: StarshipsState = {
  data: {
    count: 0,
    results: [],
  },
  status: 'idle',
};

export const getStarshipsByPage = createAsyncThunk(
  'starships/fetchByPage',
  async (url?: string): Promise<StarshipResponse> => {
    const response = await fetchStarshipsByPage(url);
    return response;
  }
);

export const starshipsSlice = createSlice({
  name: 'starships',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStarshipsByPage.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getStarshipsByPage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getStarshipsByPage.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      });
  },
});

export const selectStarships = (state: RootState) => state.starships.data.results;
export const selectStarshipsPrevious = (state: RootState) => state.starships.data?.previous;
export const selectStarshipsNext = (state: RootState) => state.starships.data?.next;
export const selectStarshipsLoading = (state: RootState) => state.starships.status === 'loading';
export const selectStarshipsError = (state: RootState) => state.starships.status === 'failed';

export default starshipsSlice.reducer;
