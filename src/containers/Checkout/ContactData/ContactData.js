import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import { updatedObject, checkValidation } from "../../../shared/utility";

const ContactData = (props) => {
  const [elementsForm, setElementsForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
        name: "name",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
        name: "street",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIP Code",
        name: "zip",
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
        name: "country",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your Mail",
        name: "email",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      value: "fastest",
      validation: {},
      valid: true,
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formDataIdentifier in elementsForm) {
      formData[formDataIdentifier] = elementsForm[formDataIdentifier].value;
    }
    const order = {
      ingredients: props.ingredients,
      price: props.price.toFixed(2),
      orderData: formData,
      userId: props.userId,
    };
    props.onOrderBurger(order, props.token);
  };

  const inputChangeHandler = (event, idIdentifier) => {
    const updateElementForm = updatedObject(elementsForm[idIdentifier], {
      value: event.target.value,
      valid: checkValidation(
        event.target.value,
        elementsForm[idIdentifier].validation
      ),
      touched: true,
    });

    const updateOrderForm = updatedObject(elementsForm, {
      [idIdentifier]: updateElementForm,
    });

    let formIsValid = true;
    for (let formIdentifier in updateOrderForm) {
      formIsValid = updateOrderForm[formIdentifier].valid && formIsValid;
    }
    setElementsForm(updateOrderForm);
    setFormIsValid(formIsValid);
  };

  const elementsFormArray = [];
  for (let key in elementsForm) {
    elementsFormArray.push({
      id: key,
      config: elementsForm[key],
    });
  }

  let form = (
    <form onSubmit={(event) => orderHandler(event)}>
      {elementsFormArray.map((elementForm) => (
        <Input
          key={elementForm.id}
          elementType={elementForm.config.elementType}
          elementConfig={elementForm.config.elementConfig}
          value={elementForm.config.value}
          invalid={!elementForm.config.valid}
          shouldValidate={elementForm.config.validation}
          isTouched={elementForm.config.touched}
          changed={(event) => inputChangeHandler(event, elementForm.id)}
        />
      ))}
      <Button btnType="Success" disabled={!formIsValid}>
        Order
      </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.ContactData}>
      <h4>Please Input Your Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (order, token) =>
      dispatch(actions.purchaseBurger(order, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
