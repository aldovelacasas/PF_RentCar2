import { setUser, startLoadingUsers } from "./userSlice";

export const getUser = (page = 0) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingUsers());
    const resp = await fetch(`http://localhost:3000/api/usuarios`);
    const data = await resp.json();

    dispatch(setUser({ user: data }));
  };
};
