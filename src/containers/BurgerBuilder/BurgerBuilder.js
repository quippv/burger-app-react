import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import * as actions from "../../store/actions/index";

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const { onInitIngredients } = props;

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchasable = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const cancelHandler = () => {
    setPurchasing(false);
  };

  const continueHandler = () => {
    props.onPurchaseInit();
    props.history.push("/checkout");
  };

  const disabledInfo = {
    ...props.ingrs,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;

  let burger = props.error ? (
    <p>cannot view burger, something error!</p>
  ) : (
    <Spinner />
  );

  if (props.ingrs) {
    burger = (
      <Auxiliary>
        <Burger ingredients={props.ingrs} />
        <BuildControls
          ingredientsAdded={props.onIngredientsAdded}
          ingredientRemoved={props.onIngredientsRemoved}
          disabled={disabledInfo}
          price={props.totalPrc}
          purchasable={updatePurchasable(props.ingrs)}
          ordered={purchaseHandler}
          isAuth={props.isAuthenticated}
        />
      </Auxiliary>
    );

    orderSummary = (
      <OrderSummary
        ingredients={props.ingrs}
        purchaseCancel={cancelHandler}
        purchaseContinue={continueHandler}
        price={props.totalPrc}
      />
    );
  }

  return (
    <Auxiliary>
      <Modal purchased={purchasing} canceled={cancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Auxiliary>
  );
};

const mapStateToProps = (state) => {
  return {
    ingrs: state.burgerBuilder.ingredients,
    totalPrc: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispacthToProps = (dispatch) => {
  return {
    onIngredientsAdded: (ingredientName) =>
      dispatch(actions.addIngredient(ingredientName)),
    onIngredientsRemoved: (ingredientName) =>
      dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onPurchaseInit: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispacthToProps
)(withErrorHandler(BurgerBuilder, axios));
