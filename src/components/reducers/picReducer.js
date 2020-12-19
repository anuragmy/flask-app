import * as actionTypes from "../actions/types";

export const getPics = (state = [], action) => {
  const { payload, type } = action;
  switch (type) {
    case actionTypes.GET_PICS:
      return {
        ...state,
        pics: payload
      };
    default:
      return state;
  }
};
