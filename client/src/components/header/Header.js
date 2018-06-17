import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import { connect } from "react-redux";

import LogIn from "./LogIn";

class Header extends Component {
  renderTitle = () => {
    switch (window.location.pathname) {
      case "/":
        return "Home";
      case "/public-recipes":
        return "Shared Recipes";
      case "/recipes":
        return "My Recipes";
      case "/flavors":
        return "My Flavors";
      case "/flavors-alert-page":
        return "Flavors Alert";
      default:
        return (
          this.props.recipes.selectedRecipe.name ||
          `${this.props.flavors.selectedFlavor.name} - ${
            this.props.flavors.selectedFlavor.brand
          }`
        );
    }
  };

  render() {
    const { user, handleToggle } = this.props;
    return (
      <AppBar
        title={this.renderTitle()}
        onLeftIconButtonTouchTap={handleToggle}
        iconElementRight={<LogIn user={user} />}
      />
    );
  }
}

const mapStateToProps = state => {
  return { flavors: state.flavors, user: state.user, recipes: state.recipes };
};

export default connect(
  mapStateToProps,
  null
)(Header);
