import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import SearchBar from "../commons/SearchBar";
import { searchRecipe } from "../../actions/recipesFilter_action";
import { getVisibleRecipes } from "../../selectors/recipesFiltered_selector";

class RecipesSearchContainer extends Component {
  handleFieldChange = e => {
    this.props.searchRecipe(e.target.value);
  };

  componentWillUnmount = () => {
    this.props.searchRecipe("");
  };

  render() {
    console.log("visibleRecipes:", this.props.visibleRecipes);

    return (
      <SearchBar
        handleFieldChange={this.handleFieldChange}
        keyword={this.props.recipesFilter.keyword}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    recipesFilter: state.recipesFilter,
    visibleRecipes: getVisibleRecipes(state)
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ searchRecipe }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipesSearchContainer);
