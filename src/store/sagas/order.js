import axios from "../../axios-orders";
import { put } from "redux-saga/effects";
import * as actions from "../actions/index";

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const response = yield axios.post(
      "/orders.json?auth=" + action.token,
      action.order
    );
    yield put(actions.purchaseDataSuccess(response.data.name, action.order));
  } catch (error) {
    yield put(actions.purchaseDataFail(error));
  }
}

export function* fetchOrderInitSaga(action) {
  yield put(actions.fetchOrderStart());
  try {
    const queryParams =
      "?auth=" +
      action.token +
      '&orderBy="userId"&equalTo="' +
      action.userId +
      '"';
    const res = yield axios.get("orders.json" + queryParams);
    const fetchOrders = [];
    for (let key in res.data) {
      fetchOrders.push({
        ...res.data[key],
        id: key,
      });
    }
    yield put(actions.fetchOrderSuccess(fetchOrders));
  } catch (error) {
    yield put(actions.fetchOrderFail(error));
  }
}
