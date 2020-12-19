import * as actionTypes from "../actions/types";

const initialState = {
  signedIn: false,
  email: '',
  token: "",
  authLoading: false,
  error: "",
  user_id: '',
};

export const checkSignedIn = (state = initialState, action) => {
  const { payload, type } = action;
  console.log(payload)
  switch (type) {
    case actionTypes.SIGNEDIN:
      return {
        ...state,
        signedIn: true,
        user: payload.email,
        token: payload.token,
        authLoading: false,
        user_id: payload.user_id,
        email: payload.email,
      };
    case actionTypes.SIGNOUT:
      return {
        ...state,
        signedIn: false,
        user: "",
        token: "",
        authLoading: false,
      };
    case actionTypes.SIGNINERROR:
      return {
        ...state,
        signedIn: false,
        error: payload,
        authLoading: false,
      };
    default:
      return state;
  }
};
