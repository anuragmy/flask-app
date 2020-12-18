import * as actionTypes from "./types";
import { message } from 'antd'
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
    .post("/sign-in", {
      email: email,
      password: password,
    })
    .then((res) => {

      if (res.data) {
        return dispatch(
          SignedIn({ user: res.data.user, token: res.data.token })
        );
      }
      else if (res.data && res.data.statusCode === 401) {
        return message.info('Something went wrong, please try again')
      }
    })
    .catch((err) => {
      message.error('unexpected error, please try again')
      dispatch(SignedInError(err));
    });
};

export const signUp = (email, password) => async (dispatch) => {
  await axios
    .post("/sign-up", {
      email: email,
      password: password,
    })
    .then((res) => {
      if (res.data) {
        return dispatch(
          SignedIn({ user: res.data.user, token: res.data.token })
        );
      }
      else if (res.data && res.data.statusCode === 401) {
        return message.info('Already registered, please sign in')
      }
    })
    .catch((err) => dispatch(SignedInError(err)));
};



export const upload = (data, token, name) => async (dispatch) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      "x-access-token": token,
    },
  };
  await axios
    .post("/image_upload", { image: data, name, }, config)
    .then((res) => {

    })
    .catch((err) => console.log(err));
};

export const getPics = (token) => async (dispatch) => {
  const config = {
    headers: {
      "x-access-token": token,
    },
  };
  await axios
    .get("/images", config)
    .then((res) => {

      dispatch(getAllPics(res.data))
    })
    .catch((err) => console.log(err));
};

