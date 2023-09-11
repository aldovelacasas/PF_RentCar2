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
    const resp = await fetch(`http://localhost:3000/api/bookings`);
    const data = await resp.json();

    dispatch(setRental({ rental: data }));
  };
};

export const getUser = (page = 0) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingUsers());
    const resp = await fetch(`http://localhost:3000/api/users`);
    const data = await resp.json();

    dispatch(setUser({ user: data }));
  };
};

export const getCars = (page = 0) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingCars());
    const resp = await fetch(`http://localhost:3000/api/products`);
    const data = await resp.json();

    dispatch(setCars({ cars: data }));
  };
};
