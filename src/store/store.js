"use client";

import { configureStore } from "@reduxjs/toolkit";
import { carSlice } from "./slices/car";
import { userSlice } from "./slices/user";

export const store = configureStore({
  reducer: {
    cars: carSlice.reducer,
    user: userSlice.reducer,
  },
});
