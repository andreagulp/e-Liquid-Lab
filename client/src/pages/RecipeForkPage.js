import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col } from "react-flexbox-grid";
import { Tabs, Tab } from "material-ui/Tabs";
import Build from "material-ui/svg-icons/action/build";
import Comment from "material-ui/svg-icons/communication/chat-bubble";

import RecipeForm from "../components/recipe_form/RecipeForm";
import PublicRecipeReview from "../components/pubblic_recipe/PublicRecipeReview";
import { fetchSingleRecipe } from "../actions/recipes_action";

class RecipeForkPage extends Component {
  componentDidMount = () => {
    this.props.fetchSingleRecipe(this.props.match.params.recipeid);
  };

  render() {
    if (!this.props.recipes.selectedRecipe) {
      return <div>...loading</div>;
    }

    return (
      <Row style={{ margin: "0 1px 0 1px" }}>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Tabs style={{ marginTop: "10px" }}>
            <Tab
              label="DESIGN"
              style={{ backgroundColor: "#673AB7" }}
              icon={<Build />}
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
              icon={<Comment />}
            >
              <PublicRecipeReview recipeId={this.props.match.params.recipeid} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return { recipes: state.recipes };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchSingleRecipe }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeForkPage);
