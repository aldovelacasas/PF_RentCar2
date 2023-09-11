import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allRentals: [],
  allCars: [],
  allUsers: [],
  allRentalsConnected: [],
  currentUserRentals: [],
  isRentalsLoading: false,
  isCarsLoading: false,
  isUsersLoading: false,
};

export const rentalSlice = createSlice({
  name: "rental",
  initialState,
  reducers: {
    startLoadingRentals: (state) => {
      state.isRentalsLoading = true;
    },
    setRental: (state, action) => {
      state.isRentalsLoading = false;
      state.allRentals = action.payload.rental;
    },
    startLoadingCars: (state /* action */) => {
      state.isCarsLoading = true;
    },
    setCars: (state, action) => {
      state.isCarsLoading = false;
      state.allCars = action.payload.cars;
    },
    startLoadingUsers: (state) => {
      state.isUsersLoading = true;
    },
    setUser: (state, action) => {
      state.isUsersLoading = false;
      state.allUsers = action.payload.user;
    },
  },
});

export const {
  setRental,
  startLoadingRentals,
  setUser,
  startLoadingUsers,
  setCars,
  startLoadingCars,
  getAllRentals,
} = rentalSlice.actions;
