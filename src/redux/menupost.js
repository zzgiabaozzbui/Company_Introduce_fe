import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  menuPost: [],
}

export const menuPostSlice = createSlice({
  name: "menuPost",
  initialState,
  reducers: {
    setMenuPost: (state, action) => {
      state.menuPost = action.payload
    },
  },
})

export const { setMenuPost } = menuPostSlice.actions

export default menuPostSlice.reducer
