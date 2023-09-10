import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: [],
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
      state.allUsers = action.payload;
    },
    setCurrentUser: (state, action) => {
      let user = state.allUsers.filter((u) => u.emailUser === action.payload);
      state.currentUser = {
        userId: user.id,
        userUid: user.uid,
        userName: user.username,
        userEmail: user.emailUser,
        userPassport: user.passport,
        userPhone: user.phone,
        userImage: user.image,
        userIsActive: user.isActive === null,
      };
    },
  },
});

export const { startLoadingUsers, setUser } = userSlice.actions;
