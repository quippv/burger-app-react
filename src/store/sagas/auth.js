import { put, delay, call } from "redux-saga/effects";
import axios from "axios";

import * as actions from "../actions/index";

export function* logoutSaga(action) {
  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "expiredDate");
  yield call([localStorage, "removeItem"], "userId");
  yield put(actions.authLogoutSuccess());
}

export function* checkTimeoutSaga(action) {
  yield delay(action.expiresTime * 1000);
  yield put(actions.authLogout());
}

export function* authUserSaga(action) {
  yield actions.authStart();
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };

  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEF8cSZSKZ4oqYZ7vm_odkflvhre6unJ4";

  if (!action.isSignup) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCEF8cSZSKZ4oqYZ7vm_odkflvhre6unJ4";
  }

  try {
    const response = yield axios.post(url, authData);
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem(
      "expiredDate",
      new Date(new Date().getTime() + response.data.expiresIn * 1000)
    );
    yield localStorage.setItem("userId", response.data.localId);
    yield put(
      actions.authSuccess(response.data.localId, response.data.idToken)
    );
    yield put(actions.authTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* checkAutoStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.authLogout());
  } else {
    const expiredDate = yield new Date(localStorage.getItem("expiredDate"));
    if (expiredDate <= new Date()) {
      yield put(actions.authLogout());
    } else {
      const userId = yield localStorage.getItem("userId");
      yield put(actions.authSuccess(userId, token));
      yield put(
        actions.authTimeout(
          (expiredDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}
