import {
  setUser,
  startLoadingUsers,
  setRental,
  startLoadingRentals,
} from "./userSlice";

const apiUrl = process.env.API_URL;

export const getUser = (page = 0) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingUsers());
    const resp = await fetch(`${apiUrl}/api/users`);
    const data = await resp.json();

    dispatch(setUser({ users: data }));
  };
};

export const getRental = (page = 0) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingRentals());
    const resp = await fetch(`${apiUrl}/api/bookings`);
    const data = await resp.json();

    dispatch(setRental({ rental: data }));
  };
};
