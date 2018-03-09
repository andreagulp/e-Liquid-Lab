import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Row, Col } from 'react-flexbox-grid';

import RecipeForm from '../components/recipe_form/RecipeForm';
import {fetchSingleRecipe} from '../actions/recipes_action';

class RecipeForkPage extends Component {
  componentDidMount = () => {
      this.props.fetchSingleRecipe(this.props.match.params.recipeid)
  }

  render () {
    if(!this.props.recipes.selectedRecipe) {
      return (
        <div>...loading</div>
      )
    }

    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <RecipeForm
            mode="FORK"
            history={this.props.history}
            recipeid={this.props.match.params.recipeid}
            handleCloseRecipeForm={this.handleCloseRecipeForm}
          />
        </Col>
      </Row>
    )
  }
};

const mapStateToProps = (state) => {return {recipes: state.recipes}}
const mapDispatchToProps  = (dispatch) => bindActionCreators({fetchSingleRecipe}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RecipeForkPage)
