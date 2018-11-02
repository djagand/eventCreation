import { AUTH_USER, AUTH_ERROR } from "./types";
import axios from "axios";

export const signup = (email, password, navigate) => async dispatch => {
  try {
    dispatch({
      type: AUTH_ERROR,
      payload: ""
    });
    const response = await axios.post("/api/signup", { email, password });
    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem("token", response.data.token);
    navigate();
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
      payload: "Email already exists."
    });
  }
};

export const login = (email, password, navigate) => async dispatch => {
  try {
    dispatch({
      type: AUTH_ERROR,
      payload: ""
    });
    const response = await axios.post("/api/login", { email, password });
    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem("token", response.data.token);
    navigate();
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
      payload: "No such email exists"
    });
  }
};

export const logout = () => dispatch => {
  dispatch({
    type: AUTH_ERROR,
    payload: ""
  });
  localStorage.removeItem("token");
  dispatch({ type: AUTH_USER, payload: "" });
};
