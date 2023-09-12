import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  testimonies: [],
};

export const testimonioSlice = createSlice({
  name: "testimonios",
  initialState,
  reducers: {
    setTestimonies: (state, action) => {
      state.testimonies = action.payload.testimonies;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTestimonies } = testimonioSlice.actions;
