import {
  setRental,
  startLoadingRentals,
  setUser,
  startLoadingUsers,
  setCars,
  startLoadingCars,
} from "./rentalSlice";

export const getRental = (page = 0) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingRentals());
    const resp = await fetch(`/api/bookings`);
    const data = await resp.json();

    dispatch(setRental({ rental: data }));
  };
};

export const getUser = (page = 0) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingUsers());
    const resp = await fetch(`/api/users`);
    const data = await resp.json();

    dispatch(setUser({ user: data }));
  };
};

export const getCars = (page = 0) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingCars());
    const resp = await fetch(`/api/products`);
    const data = await resp.json();

    dispatch(setCars({ cars: data }));
  };
};
