import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PublicRecipesList from '../components/pubblic_recipe/PublicRecipesList';
import RecipeForm from '../components/recipe_form/RecipeForm';
import { fetchRecipes, fetchPublicRecipes } from '../actions/recipes_action';
import { fetchUser } from '../actions/user_action';


class PublicRecipesPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openRecipeForm: false
        }
    }

    componentDidMount = () => {
        this.props.fetchPublicRecipes();
        // this.props.fetchUser();
    }

    handleOpenRecipeForm = () => { this.setState({ openRecipeForm: true }) };
    handleCloseRecipeForm = () => { this.setState({ openRecipeForm: false }) };

    render() {
        // console.log(this.props)

        if (!this.props.recipes.recipes) {
            return <CircularProgress size={80} thickness={5} />
        }
        let recipes = this.props.recipes.publicRecipes
        return (
            <div>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <PublicRecipesList recipes={recipes} />
                    </Col>
                    <Dialog
                        title="Add Recipe to Book"
                        modal={true}
                        open={this.state.openRecipeForm}
                        contentStyle={{ width: '98%', maxWidth: '98%', }}
                        autoScrollBodyContent={true}
                    >
                        <RecipeForm
                            recipeid={this.props.match.params.recipeid}
                            mode="FORK"
                            handleCloseRecipeForm={this.handleCloseRecipeForm}
                        />
                    </Dialog>
                </Row>
            </div>
        )
    }
};


const mapStateToProps = (state) => { return { recipes: state.recipes, user: state.user } }
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchRecipes, fetchUser, fetchPublicRecipes }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PublicRecipesPage)


// create action/reducer fetch public recipe from api . update recipePage to call recipes-user api end point
// call action in didMount in tis component
// change visibility in the menu. show public recipe to not auth user
// after login re-direct to recipe page