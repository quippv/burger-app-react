import React, { useState } from "react";
import { connect } from "react-redux";
import Auxiliary from "../Auxiliary/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  return (
    <Auxiliary>
      <Toolbar
        drawerToggleClicked={sideDrawerHandler}
        isAuth={props.isAuthenticated}
      />
      <SideDrawer
        opened={showSideDrawer}
        closed={sideDrawerHandler}
        isAuth={props.isAuthenticated}
      />
      <main className={classes.Content}>{props.children}</main>
    </Auxiliary>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
