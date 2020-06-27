import React from "react";
import classes from "./Modal.module.css";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     nextProps.purchased !== this.props.purchased ||
  //     nextProps.children !== this.props.children
  //   );
  // }

  return (
    <Auxiliary>
      <Backdrop show={props.purchased} clicked={props.canceled} />
      <div
        className={classes.Modal}
        style={{
          transform: props.purchased ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.purchased ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Auxiliary>
  );
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    prevProps.purchased === nextProps.purchased &&
    prevProps.children === nextProps.children
);
