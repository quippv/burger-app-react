import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../../shared/utility";

const initialState = {
  ingredients: null,
  totalPrice: 0.7,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.2,
  bacon: 0.5,
  cheese: 0.3,
  meat: 0.7,
};

const addIngredient = (state, action) => {
  const incIngredients = updatedObject(state.ingredients, {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  });
  return updatedObject(state, {
    ingredients: incIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true,
  });
};

const removeIngredient = (state, action) => {
  const decIngredients = updatedObject(state.ingredients, {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  });
  return updatedObject(state, {
    ingredients: decIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true,
  });
};

const setIngredients = (state, action) => {
  return updatedObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: 0.7,
    error: false,
    building: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updatedObject(state, { error: true });
    default:
      return state;
  }
};

export default reducer;
