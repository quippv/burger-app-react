import * as actionTypes from "./actionTypes";

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
  return {
    type: actionTypes.PURCHASE_BURGER,
    order,
    token,
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
  return {
    type: actionTypes.FETCH_ORDER_INIT,
    token,
    userId,
  };
};
