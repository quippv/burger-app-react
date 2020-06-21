import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseDataSuccess = (id, dataForm) => {
  return {
    type: actionTypes.PURCHASE_DATA_SUCCESS,
    dataId: id,
    dataForm,
  };
};

export const purchaseDataFail = (error) => {
  return {
    type: actionTypes.PURCHASE_DATA_FAIL,
    error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (order, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json?auth=" + token, order)
      .then((response) => {
        dispatch(purchaseDataSuccess(response.data.name, order));
      })
      .catch((error) => {
        dispatch(purchaseDataFail(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrderSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders,
  };
};

export const fetchOrderFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDER_FAIL,
    error,
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START,
  };
};

export const fetchOrderInit = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrderStart());
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("orders.json" + queryParams)
      .then((res) => {
        const fetchOrders = [];
        for (let key in res.data) {
          fetchOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrderSuccess(fetchOrders));
      })
      .catch((err) => {
        dispatch(fetchOrderFail(err));
      });
  };
};
