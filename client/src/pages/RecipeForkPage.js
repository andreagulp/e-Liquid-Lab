import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, Col } from 'react-flexbox-grid';
import { Tabs, Tab } from 'material-ui/Tabs';

import RecipeForm from '../components/recipe_form/RecipeForm';
import { fetchSingleRecipe } from '../actions/recipes_action';

class RecipeForkPage extends Component {
  // componentDidMount = () => {
  //     this.props.fetchSingleRecipe(this.props.match.params.recipeid)
  // }

  render() {
    if (!this.props.recipes.selectedRecipe) {
      return (
        <div>...loading</div>
      )
    }

    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Tabs style={{ marginTop: "10px" }}>
            <Tab
              label="DESIGN"
              style={{ backgroundColor: "#673AB7" }}
            >
              <RecipeForm
                mode="FORK"
                history={this.props.history}
                recipeid={this.props.match.params.recipeid}
              // handleCloseRecipeForm={this.handleCloseRecipeForm}
              />
            </Tab>
            <Tab
              label="COMMENTS"
              style={{ backgroundColor: "#673AB7" }}
            >
            </Tab>
          </Tabs>
        </Col>
      </Row>
    )
  }
};

const mapStateToProps = (state) => { return { recipes: state.recipes } }
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchSingleRecipe }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RecipeForkPage)
