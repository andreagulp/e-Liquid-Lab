import React, { Component } from "react";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Row, Col } from "react-flexbox-grid";
import Dialog from "material-ui/Dialog";
import CircularProgress from "material-ui/CircularProgress";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import RecipesList from "../components/commons/RecipesList";
import RecipeForm from "../components/recipe_form/RecipeForm";
import { fetchRecipes } from "../actions/recipes_action";
import { fetchUser } from "../actions/user_action";
import { getVisibleRecipes } from "../selectors/recipesFiltered_selector";

class RecipesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openRecipeForm: false
    };
  }

  componentDidMount = () => {
    this.props.fetchRecipes();
    // this.props.fetchUser();
  };

  handleOpenRecipeForm = () => {
    this.setState({ openRecipeForm: true });
  };
  handleCloseRecipeForm = () => {
    this.setState({ openRecipeForm: false });
  };

  render() {
    if (!this.props.recipes) {
      return <CircularProgress size={80} thickness={5} />;
    }
    const { user, recipes } = this.props;
    return (
      <div>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <RecipesList recipes={recipes} />
          </Col>
          {user ? (
            <FloatingActionButton
              style={{ position: "fixed", bottom: 20, right: 20 }}
              onClick={this.handleOpenRecipeForm}
            >
              <ContentAdd />
            </FloatingActionButton>
          ) : (
            <div />
          )}
          <Dialog
            title="Add Recipe to Book"
            modal={true}
            open={this.state.openRecipeForm}
            contentStyle={{ width: "98%", maxWidth: "98%" }}
            autoScrollBodyContent={true}
          >
            <RecipeForm
              recipeid={this.props.match.params.recipeid}
              mode="CREATE"
              handleCloseRecipeForm={this.handleCloseRecipeForm}
            />
          </Dialog>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { recipes: getVisibleRecipes(state), user: state.user };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchRecipes, fetchUser }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipesPage);
