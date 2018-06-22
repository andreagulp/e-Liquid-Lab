import React, { Component } from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import Book from "material-ui/svg-icons/action/book";
import LibraryBooks from "material-ui/svg-icons/av/library-books";
import CardTravel from "material-ui/svg-icons/action/card-travel";
import BatteryAlert from "material-ui/svg-icons/device/battery-alert";
import ActionHome from "material-ui/svg-icons/action/home";
import Help from "material-ui/svg-icons/action/help";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Divider from "material-ui/Divider";

import LogIn from "./LogIn";
import ToggleTheme from "./ToggleTheme";

class Navigation extends Component {
  render() {
    const {
      user,
      open,
      handleNavigationToggle,
      handleNavigationClose
    } = this.props;

    return (
      <div>
        <Drawer
          docked={false}
          width={200}
          open={open}
          onRequestChange={handleNavigationToggle}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <MenuItem
              primaryText="Home"
              leftIcon={<ActionHome />}
              onClick={handleNavigationClose}
            />
          </Link>
          <Link to="/public-recipes" style={{ textDecoration: "none" }}>
            <MenuItem
              primaryText="Shared Recipes"
              leftIcon={<LibraryBooks />}
              onClick={handleNavigationClose}
            />
          </Link>
          {user ? (
            <div>
              <Link to="/recipes" style={{ textDecoration: "none" }}>
                <MenuItem
                  primaryText="My Recipes"
                  leftIcon={<Book />}
                  onClick={handleNavigationClose}
                />
              </Link>
              <Link to="/flavors" style={{ textDecoration: "none" }}>
                <MenuItem
                  primaryText="My Flavors"
                  leftIcon={<CardTravel />}
                  onClick={handleNavigationClose}
                />
              </Link>
              <Link to="/flavors-alert-page" style={{ textDecoration: "none" }}>
                <MenuItem
                  primaryText="My Flavors alert"
                  leftIcon={<BatteryAlert />}
                  onClick={handleNavigationClose}
                />
              </Link>
            </div>
          ) : (
            <div />
          )}

          <Divider />
          <LogIn user={user} />
          <ToggleTheme handleClose={handleNavigationClose} />
          <Link to="/help-page" style={{ textDecoration: "none" }}>
            <MenuItem
              primaryText="Help"
              leftIcon={<Help />}
              onClick={handleNavigationClose}
            />
          </Link>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(
  mapStateToProps,
  null
)(Navigation);
