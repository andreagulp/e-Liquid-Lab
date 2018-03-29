import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { getRecipesByFlavor } from '../../selectors';
import { fetchRecipes } from '../../actions/recipes_action';
import RecipesList from '../commons/RecipesList';

class FlavorUsageList extends Component {

  componentDidMount = () => {
    this.props.fetchRecipes()
  }

  render() {
    if (!this.props.flavorId && !this.props.recipes) {
      return <div>...loading</div>;
    }
    const recipes = this.props.recipes
    return (
      <div>
        <RecipesList recipes={recipes} />
      </div>
    );
  }
}

const mapStateToProps = state => { return { recipes: getRecipesByFlavor(state) } }
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchRecipes }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FlavorUsageList);
