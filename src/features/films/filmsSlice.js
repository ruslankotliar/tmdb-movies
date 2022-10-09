import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFilmsByExpression = createAsyncThunk(
  'films/fetchFilmsByExpression',
  async (expression) => {
    const films = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.FILMS_API_KEY}&language=en-US&page=1&include_adult=false&query=${expression}`
    );
    const data = await films.json();
    return data.results;
  }
);

export const fetchPopularFilms = createAsyncThunk(
  'films/fetchPopularFilms',
  async () => {
    const popFilms = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.FILMS_API_KEY}&language=en-US&page=1`
    );
    const data = await popFilms.json();
    return data.results;
  }
);

export const fetchFilmVideo = createAsyncThunk(
  'films/fetchFilmTrailer',
  async (filmId) => {
    const data = await fetch(`https://api.themoviedb.org/3/movie/${filmId}/videos?api_key=${process.env.FILMS_API_KEY}&language=en-US`)
    const filmYouTubeVideos = await data.json()
    return filmYouTubeVideos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube').key
  }
)

export const filmsSlice = createSlice({
  name: 'films',
  initialState: {
    expression: '',
    isLoadingFilms: false,
    errorFilms: false,
    isLoadingImage: false,
    errorImage: false,
    films: [],
    filmVideo: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmsByExpression.pending, (state, action) => {
        state.isLoadingFilms = true;
        state.errorFilms = false;
      })
      .addCase(fetchFilmsByExpression.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isLoadingFilms = false;
        state.errorFilms = false;
      })
      .addCase(fetchFilmsByExpression.rejected, (state, action) => {
        state.isLoadingFilms = false;
        state.errorFilms = true;
      })
      .addCase(fetchPopularFilms.pending, (state, action) => {
        state.isLoadingFilms = true;
        state.errorFilms = false;
      })
      .addCase(fetchPopularFilms.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isLoadingFilms = false;
        state.errorFilms = false;
      })
      .addCase(fetchPopularFilms.rejected, (state, action) => {
        state.isLoadingFilms = false;
        state.errorFilms = true;
      })
      .addCase(fetchFilmVideo.pending, (state, action) => {
        state.isLoadingFilms = true;
        state.errorFilms = false;
      })
      .addCase(fetchFilmVideo.fulfilled, (state, action) => {
        state.filmVideo = action.payload;
        state.isLoadingFilms = false;
        state.errorFilms = false;
      })
      .addCase(fetchFilmVideo.rejected, (state, action) => {
        state.isLoadingFilms = false;
        state.errorFilms = true;
      });
  },
});

export const { setExpression } = filmsSlice.actions;
export default filmsSlice.reducer;
