import { setTestimonies } from "./testimonioSlice";
import axios from "axios";

export const getTest = () => {
  return async (dispatch, getState) => {
    const { data } = await axios("/api/post");
    dispatch(setTestimonies({ testimonies: data }));
  };
};
