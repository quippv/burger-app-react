import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { updatedObject, checkValidation } from "../../shared/utility";

const Auth = (props) => {
  const [controls, setControls] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your Mail",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Your Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });
  const [isSignup, setIsSignup] = useState(true);

  const { burgerBuilder, setAuthRedirectPath, onSetAuthRedirectPath } = props;

  useEffect(() => {
    if (!burgerBuilder && setAuthRedirectPath !== "/") {
      onSetAuthRedirectPath();
    }
  }, [burgerBuilder, setAuthRedirectPath, onSetAuthRedirectPath]);

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignup);
  };

  const switchSigninHandler = () => {
    setIsSignup(!isSignup);
  };

  const inputChangeHandler = (event, controlName) => {
    const updatedControls = updatedObject(controls, {
      [controlName]: updatedObject(controls[controlName], {
        value: event.target.value,
        valid: checkValidation(
          event.target.value,
          controls[controlName].validation
        ),
        touched: true,
      }),
    });
    setControls(updatedControls);
  };

  const elementsFormArray = [];
  for (let key in controls) {
    elementsFormArray.push({
      id: key,
      config: controls[key],
    });
  }

  let form = elementsFormArray.map((elementForm) => (
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
  ));

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;

  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  let redirectAuth = null;

  if (props.isAuthenticated) {
    redirectAuth = <Redirect to={props.setAuthRedirectPath} />;
  }

  return (
    <div className={classes.Auth}>
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">SUBMIT</Button>
      </form>
      <Button clicked={switchSigninHandler} btnType="Danger">
        SWITCH TO {isSignup ? "SIGN IN" : "SIGN UP"}
      </Button>
      {redirectAuth}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    burgerBuilder: state.burgerBuilder.building,
    setAuthRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
