import React, { Component } from "react";
import classes from "./Modal.module.css";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.purchased !== this.props.purchased ||
      nextProps.children !== this.props.children
    );
  }

  componentWillUpdate() {
    console.log("[Modal] componentWillUpdate");
  }

  render() {
    return (
      <Auxiliary>
        <Backdrop show={this.props.purchased} clicked={this.props.canceled} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.purchased
              ? "translateY(0)"
              : "translateY(-100vh)",
            opacity: this.props.purchased ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Auxiliary>
    );
  }
}

export default Modal;
