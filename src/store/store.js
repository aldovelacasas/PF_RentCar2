"use client";

import { configureStore } from "@reduxjs/toolkit";
import { carSlice } from "./slices/car";
import { userSlice } from "./slices/user";
import { rentalSlice } from "./slices/rental";
import { combineReducers } from "@reduxjs/toolkit";
import { testimonioSlice } from "./slices/testimonio";

const rootReducer = combineReducers({
  cars: carSlice.reducer,
  user: userSlice.reducer,
  rental: rentalSlice.reducer,
  testimonies: testimonioSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
