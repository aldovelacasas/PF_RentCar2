import {
  setUser,
  startLoadingUsers,
  setRental,
  startLoadingRentals,
} from "./userSlice";

export const getUser = (page = 0) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingUsers());
    const resp = await fetch(`http://localhost:3000/api/users`);
    const data = await resp.json();

    dispatch(setUser({ users: data }));
  };
};

export const getRental = (page = 0) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingRentals());
    const resp = await fetch(`http://localhost:3000/api/bookings`);
    const data = await resp.json();

    dispatch(setRental({ rental: data }));
  };
};
