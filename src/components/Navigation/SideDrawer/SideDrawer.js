import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../Logo/Logo";
import classes from "./SideDrawer.module.css";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = (props) => {
  let slideDrawer = [classes.SideDrawer, classes.Close];
  if (props.opened) {
    slideDrawer = [classes.SideDrawer, classes.Open];
  }

  return (
    <Auxiliary>
      <Backdrop show={props.opened} clicked={props.closed} />
      <div className={slideDrawer.join(" ")} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Auxiliary>
  );
};

export default sideDrawer;
