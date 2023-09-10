import { setRental, startLoadingRentals } from "./rentalSlice";

export const getRental = (page = 0) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingRentals());
    const resp = await fetch(`http://localhost:3000/api/bookings`);
    const data = await resp.json();

    dispatch(setRental({ rental: data }));
  };
};