import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (userId, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiredDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authTimeout = (expiresTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expiresTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEF8cSZSKZ4oqYZ7vm_odkflvhre6unJ4";

    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCEF8cSZSKZ4oqYZ7vm_odkflvhre6unJ4";
    }

    axios
      .post(url, authData)
      .then((response) => {
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem(
          "expiredDate",
          new Date(new Date().getTime() + response.data.expiresIn * 1000)
        );
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data.localId, response.data.idToken));
        dispatch(authTimeout(response.data.expiresIn));
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
  };
};

export const checkAutoState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(authLogout());
    } else {
      const expiredDate = new Date(localStorage.getItem("expiredDate"));
      if (expiredDate <= new Date()) {
        dispatch(authLogout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(userId, token));
        dispatch(
          authTimeout((expiredDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
};
