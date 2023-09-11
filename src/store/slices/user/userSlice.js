import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: [],
  allRentals: [],
  foundUser: {},
  isLoading: false,
  currentUser: {
    userId: "",
    userUid: "",
    userName: "",
    userEmail: "",
    userPassport: "",
    userPhone: "",
    userImage: "",
    userIsActive: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoadingUsers: (state) => {
      state.isLoading = true;
    },
    setUser: (state, action) => {
      state.isLoading = false;
      state.allUsers = action.payload.users;
    },
    startLoadingRentals: (state) => {
      state.isRentalsLoading = true;
    },
    setRental: (state, action) => {
      state.isRentalsLoading = false;
      state.allRentals = action.payload.rental;
    },
    setCurrentUser: (state, action) => {
      const {
        id,
        uid,
        username,
        emailUser,
        passport,
        phone,
        image,
        isActive,
        userRentals,
      } = action.payload;
      state.currentUser = {
        userId: id,
        userUid: uid,
        userName: username,
        userEmail: emailUser,
        userPassport: passport,
        userPhone: phone,
        userImage: image,
        userIsActive: isActive === null,
        userRentals: userRentals,
      };
    },
    searchUserbyId: (state, action) => {
      state.foundUser = state.allUsers.filter((u) => u.id === action.payload);
    },
  },
});

export const {
  startLoadingUsers,
  setUser,
  setRental,
  startLoadingRentals,
  searchUserbyId,
  setCurrentUser,
} = userSlice.actions;
