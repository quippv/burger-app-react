import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../../shared/utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseDataSuccess = (state, action) => {
  const newOrder = updatedObject(action.dataForm, { id: action.dataId });
  return updatedObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder),
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return updatedObject(state, { purchased: false });
    case actionTypes.PURCHASE_BURGER_START:
      return updatedObject(state, { loading: true });
    case actionTypes.PURCHASE_DATA_SUCCESS:
      return purchaseDataSuccess(state, action);
    case actionTypes.PURCHASE_DATA_FAIL:
      return updatedObject(state, { loading: false });
    case actionTypes.FETCH_ORDER_START:
      return updatedObject(state, { loading: true });
    case actionTypes.FETCH_ORDER_SUCCESS:
      return updatedObject(state, { orders: action.orders, loading: false });
    case actionTypes.FETCH_ORDER_FAIL:
      return updatedObject(state, { loading: false });
    default:
      return state;
  }
};

export default reducer;
