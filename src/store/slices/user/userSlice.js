import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: [],
  userId: "",
  userName: "",
  userEmail: "",
  userPassport: "",
  userPhone: "",
  userImage: "",
  userIsActive: "",
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
      state.userId = action.payload.user;
      let currentUser = action.payload.user.filter(
        (u) => u.name === "Auto Contact"
      );
      state.userId = currentUser.id;
      state.userName = currentUser.emailUser;
      state.userEmail = currentUser.username;
      state.userPassport = currentUser.passport;
      state.userPhone = currentUser.phone;
      state.userImage = currentUser?.image;
      state.userIsActive = currentUser?.isActive;
    },
  },
});

export const { startLoadingUsers, setUser } = userSlice.actions;
