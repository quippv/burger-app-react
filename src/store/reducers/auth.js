import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../../shared/utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
};

const authSuccess = (state, action) => {
  return updatedObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updatedObject(state, { loading: true });
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return updatedObject(state, { error: action.error, loading: false });
    case actionTypes.AUTH_LOGOUT:
      return updatedObject(state, { token: null, userId: null });
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return updatedObject(state, { authRedirectPath: action.path });
    default:
      return state;
  }
};

export default reducer;
