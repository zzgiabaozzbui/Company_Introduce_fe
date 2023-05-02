import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  inforCourse: {
    listVideo: [],
    htmlContent: "",
  },
}

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    changeInforCourse: (state, action) => {
      state.inforCourse = action.payload
    },
  },
})

export const { changeInforCourse } = courseSlice.actions

export default courseSlice.reducer
