import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"
import { BusDeparture } from "../utilities/data_types"

export type BookingDetails = {
  seat_per_price: number
  total_amount: number
  vat: number
  grand_total: number
}

export type BookingInfo = {
  bus_departure: BusDeparture | null
  booking_details: BookingDetails | null
  selected_seats: string[]
}

const initialState = {
  from_bus_departure: false,
  booking_info: null as BookingInfo | null
}

export const bookingSlice = createSlice({
  name: "bookingInfo",
  initialState,
  reducers: {
    storeBookingInfo: (state, action: PayloadAction<BookingInfo | null>) => {
      state.booking_info = action.payload
    },
    storeFromBusDeparture: (state, action: PayloadAction<boolean>) => {
      state.from_bus_departure = action.payload
    }
  }
})

export const { storeBookingInfo, storeFromBusDeparture } = bookingSlice.actions

export default bookingSlice.reducer
