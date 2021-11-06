import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Starship } from '../starships/starshipsSlice'

export interface StarshipsState {
  data: Starship[];
};

const initialState: StarshipsState = {
  data: [],
};

export const starshipsSlice = createSlice({
  name: 'favoriteStarships',
  initialState,
  reducers: {
    addFavoriteStarship: (state, action: PayloadAction<Starship>) => {
      state.data.push(action.payload);
    },
    removeFavoriteStarship: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter(starship => starship.name !== action.payload);
    },
  },
});

export const { addFavoriteStarship, removeFavoriteStarship } = starshipsSlice.actions;

export const selectFavoriteStarships = (state: RootState) => state.favoriteStarships.data;

export default starshipsSlice.reducer;
