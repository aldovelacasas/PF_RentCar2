import { setCars, setModels, startLoadingCars } from "./carSlice";

export const getCars = (page = 0) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingCars());
    // TODO: realizar peticion http
    const resp = await fetch(`/api/products`);
    const data = await resp.json();

    dispatch(setCars({ cars: data }));
    dispatch(setModels());
  };
};
