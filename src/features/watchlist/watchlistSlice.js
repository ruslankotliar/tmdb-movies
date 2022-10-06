import { createSlice } from '@reduxjs/toolkit'

export const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState: {
        watchlist: []
    },
    reducers: {
        addFilm: (state, action) => {
            state.watchlist.push(action.payload)
        }
    }
})

export const { addFilm } = watchlistSlice.actions
export default watchlistSlice.reducer