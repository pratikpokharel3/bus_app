import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"
import { User, KYCInfo } from "../utilities/data_types"

const initialState = {
  user: null as User | null,
  kyc_info: null as KYCInfo | null
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
    storeKYCInfo: (state, action: PayloadAction<KYCInfo | null>) => {
      state.kyc_info = action.payload
    }
  }
})

export const { storeUser, storeKYCInfo } = userSlice.actions

export default userSlice.reducer
