import { configureStore } from '@reduxjs/toolkit';
import filmsReducer from '../features/films/filmsSlice';
import watchlistReducer from '../features/watchlist/watchlistSlice';

export const store = configureStore({
  reducer: {
    films: filmsReducer,
    watchlist: watchlistReducer
  },
});
