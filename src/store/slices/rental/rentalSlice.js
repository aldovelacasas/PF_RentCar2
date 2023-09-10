import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allRentals: [],
  isLoading: false,
};

export const rentalSlice = createSlice({
  name: "rental",
  initialState,
  reducers: {
    startLoadingRentals: (state) => {
      state.isLoading = true;
    },
    setRental: (state, action) => {
      state.isLoading = false;
      state.allRentals = action.payload;
    },
  },
});

export const { startLoadingRentals, setRental } = userSlice.actions;
