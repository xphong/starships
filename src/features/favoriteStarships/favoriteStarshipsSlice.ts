import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Starship } from '../starships/starshipsSlice'

export interface StarshipNote {
  note?: string;
}

export type FavoriteStarship = Starship & StarshipNote;

export interface FavoriteStarshipsState {
  data: FavoriteStarship[];
};

const initialState: FavoriteStarshipsState = {
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
    updateFavoriteStarshipNote: (state, action: PayloadAction<FavoriteStarship>) => {
      state.data = state.data.map(starship => {
        if (starship.name === action.payload.name) {
          return { ...starship, note: action.payload.note };
        }
        return starship;
      });
    },
  },
});

export const { addFavoriteStarship, removeFavoriteStarship, updateFavoriteStarshipNote } = starshipsSlice.actions;

export const selectFavoriteStarships = (state: RootState) => state.favoriteStarships.data;

export default starshipsSlice.reducer;
