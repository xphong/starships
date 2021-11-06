import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import starshipsReducer from '../features/starships/starshipsSlice';
import favoriteStarshipsReducer from '../features/favoriteStarships/favoriteStarshipsSlice';

export const store = configureStore({
  reducer: {
    starships: starshipsReducer,
    favoriteStarships: favoriteStarshipsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
