import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import CircularProgress from 'material-ui/CircularProgress';

import RecipeCard from './RecipeCard'

class RecipesList extends Component {

  render() {
    if (!this.props.recipes) {
      return <CircularProgress size={80} thickness={5} />
    }

    let recipes = this.props.recipes
    return (
      <Row>
        {recipes.map(recipe => {
          return (
            <Col xs={12} sm={6} md={6} lg={4} key={recipe._id}>
              <RecipeCard recipe={recipe} />
            </Col>
          )
        })}
      </Row>
    )
  }
};

export default RecipesList;
