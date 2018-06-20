import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import { connect } from "react-redux";

import LogIn from "./LogIn";
import FlavorsSearchContainer from "../flavors_filter/FlavorsSearchContainer";
import RecipesSearchContainer from "../recipes_filter/RecipesSearchContainer";

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

  renderIconElementRight = () => {
    if (
      window.location.pathname === "/flavors" ||
      window.location.pathname === "/flavors-alert-page"
    ) {
      return <FlavorsSearchContainer />;
    }

    if (
      window.location.pathname === "/public-recipes" ||
      window.location.pathname === "/recipes"
    ) {
      return <RecipesSearchContainer />;
    }
    return <LogIn user={this.props.user} />;
  };

  render() {
    const { handleNavigationToggle } = this.props;
    return (
      <AppBar
        title={this.renderTitle()}
        onLeftIconButtonTouchTap={handleNavigationToggle}
        iconElementRight={this.renderIconElementRight()}
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
