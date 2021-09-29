import { configureStore } from '@reduxjs/toolkit'
import gameSlice from './game'
import authSlice from "./auth"

export const store = configureStore({
  reducer: {
    game: gameSlice,
    auth: authSlice
  },
})