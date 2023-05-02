import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  activeKey: "1",
}

export const activeKeySlice = createSlice({
  name: "activeKey",
  initialState,
  reducers: {
    setKey: (state, action) => {
      state.activeKey = action.payload
    },
  },
})

export const { setKey } = activeKeySlice.actions

export default activeKeySlice.reducer
