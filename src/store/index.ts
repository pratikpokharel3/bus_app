import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import bookingSlice from "./bookingSlice"

export const store = configureStore({
  reducer: {
    user: userSlice,
    bookingInfo: bookingSlice
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
