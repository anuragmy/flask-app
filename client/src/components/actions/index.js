import * as actionTypes from "./types";

// actions

import axios from "axios";

export const SignedIn = (data) => ({
  type: actionTypes.SIGNEDIN,
  payload: data,
});

export const getAllPics = (data) => ({
  type: actionTypes.GET_PICS,
  payload: data,
});



export const SignOut = () => ({
  type: actionTypes.SIGNOUT,
});

export const SignedInError = (data) => ({
  type: actionTypes.SIGNINERROR,
  payload: data,
});

// thunks

export const signIn = (email, password) => async (dispatch) => {
  await axios
    .post("http://localhost:5000/sign-in", {
      email: email,
      password: password,
    })
    .then((res) => {
      console.log("res", res.data);
      if (res.data) {
        localStorage.setItem("token", res.data.token);
        return dispatch(
          SignedIn({ user: res.data.user, token: res.data.token })
        );
      }
    })
    .catch((err) => dispatch(SignedInError(err)));
};

export const signUp = (email, password) => async (dispatch) => {
  await axios
    .post("http://localhost:5000/sign-up", {
      email: email,
      password: password,
    })
    .then((res) => {
      console.log("res", res.data);
      if (res.data) {
        return dispatch(
          SignedIn({ user: res.data.user, token: res.data.token })
        );
      }
    })
    .catch((err) => dispatch(SignedInError(err)));
};



export const upload = (data, token) => async (dispatch) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      "x-access-token": token,
    },
  };
  await axios
    .post("http://localhost:5000/image_upload", { image: data }, config)
    .then((res) => {
      console.log("res", res.data);
    })
    .catch((err) => console.log(err));
};

export const getPics = (token) => async (dispatch) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      "x-access-token": token,
    },
  };
  await axios
    .get("http://localhost:5000/images", config)
    .then((res) => {
      console.log("res", res.data);
      dispatch(getAllPics(res.data))
    })
    .catch((err) => console.log(err));
};

