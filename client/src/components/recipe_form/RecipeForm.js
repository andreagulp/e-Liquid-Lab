import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CircularProgress from 'material-ui/CircularProgress';
import Toys from 'material-ui/svg-icons/hardware/toys';

import { addRecipe, fetchSingleRecipe, updateRecipe, deleteRecipe, updateRecipeField, cleanSelectedRecipe, fetchRecipes } from '../../actions/recipes_action';

import FormLiquidQty from '../commons/FormLiquidQty';
import FormBaseVgPg from '../commons/FormBaseVgPg';
import RecipeFormBaseNico from '../recipe_form/RecipeFormBaseNico';
import RecipeFormTable from './RecipeFormTable';
import FlavorToRecipeForm from '../recipe_form/FlavorToRecipeForm';
import FlavorToRecipeList from '../recipe_form/FlavorToRecipeList';
import RecipeProduction from './RecipeProduction'
import RecipeInformation from './RecipeInformation';

class RecipeForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      openFlavorToRecipeForm: false,
      openProduction: false
    }
  }

  componentDidMount = () => {
    if (this.props.recipeid && this.props.mode !== 'CREATE') { //if mode is FORK or EDIT then execute
      this.props.fetchSingleRecipe(this.props.recipeid)
    }
    // this.props.fetchRecipes()
    // this.setCurrentUser()
  }

  // setCurrentUser = () => {
  //   const user = this.props.user
  //   const currentUser = {
  //     userId: user.googleId,
  //     userName: user.name,
  //     userPhoto: user.photo
  //   }
  //   this.props.updateRecipeField(currentUser, 'user')
  // }

  handleMlToProduceChange = (event, value) => { this.props.updateRecipeField(parseInt(value, 10), 'mlToProduce') }

  handleBaseVgChange = (event, value) => {
    Promise.resolve(this.props.updateRecipeField(parseInt(value, 10), 'baseVg'))
      .then(this.props.updateRecipeField(100 - value, 'basePg'))
  }

  handleBasePgChange = (event, value) => {
    Promise.resolve(this.props.updateRecipeField(parseInt(value, 10), 'basePg'))
      .then(this.props.updateRecipeField(parseInt((100 - value), 10), 'baseVg'))
  }

  handleNicoVgChange = (event, value) => {
    Promise.resolve(this.props.updateRecipeField(parseInt(value, 10), 'nicoVg'))
      .then(this.props.updateRecipeField(100 - value, 'nicoPg'))
  }
  handleNicoPgChange = (event, value) => {
    Promise.resolve(this.props.updateRecipeField(parseInt(value, 10), 'nicoPg'))
      .then(this.props.updateRecipeField(parseInt((100 - value), 10), 'nicoVg'))
  }

  handleNicoStrengthChange = (event, value) => { this.props.updateRecipeField(parseInt(value, 10), 'nicoStrength') }
  handleDesiredNicoStrengthChange = (event, value) => { this.props.updateRecipeField(parseInt(value, 10), 'desiredNicoStrength') }

  handleRatingChange = (value) => { this.props.updateRecipeField(parseInt(value, 10), 'rating') }

  handleFieldChange = (e) => { this.props.updateRecipeField(e.target.value, e.target.name) }

  handleIsPrivateChange = () => {
    const value = !this.props.recipes.selectedRecipe.isPublic
    this.props.updateRecipeField(value, 'isPublic')

  }
  recipeFormAction = (id) => {
    if (this.props.mode !== 'EDIT') {
      const selectedRecipe = this.props.recipes.selectedRecipe
      let createdAt = new Date()
      let isForkedRecipe = this.props.mode === 'FORK' ? 'yes' : 'no'
      let newRecipeForkedId = this.props.mode === 'FORK' ? selectedRecipe._id : ''
      let newRecipeForkedName = this.props.mode === 'FORK' ? this.props.recipes.recipes.find(x => x._id === selectedRecipe._id).name : ''
      let newRecipe = {
        name: selectedRecipe.name,
        mlToProduce: selectedRecipe.mlToProduce,
        baseVg: selectedRecipe.baseVg,
        basePg: selectedRecipe.basePg,
        nicoVg: selectedRecipe.nicoVg,
        nicoPg: selectedRecipe.nicoPg,
        nicoStrength: selectedRecipe.nicoStrength,
        desiredNicoStrength: selectedRecipe.desiredNicoStrength,
        creationDate: createdAt.toISOString(),
        recipeFlavors: selectedRecipe.recipeFlavors,
        comment: selectedRecipe.comment,
        rating: selectedRecipe.rating,
        isForked: isForkedRecipe,
        recipeForkedId: newRecipeForkedId,
        recipeForkedName: newRecipeForkedName,
        production: [],
      }
      this.props.addRecipe(newRecipe)
      if (this.props.mode === 'CREATE') {
        this.props.handleCloseRecipeForm()
        this.props.cleanSelectedRecipe()
      } else {
        this.props.history.push("/recipes");
        this.props.cleanSelectedRecipe()
      }
    } else {
      const selectedRecipe = this.props.recipes.selectedRecipe
      let updatedAt = new Date()
      const updatedRecipe = {
        ...selectedRecipe, updateDate: updatedAt.toISOString(), _user: selectedRecipe._user._id
      }

      this.props.updateRecipe(selectedRecipe._id, updatedRecipe)
      this.props.history.push("/recipes");
    }

  }

  deleteRecipe = () => {
    const selectedRecipe = this.props.recipes.selectedRecipe
    this.props.deleteRecipe(selectedRecipe._id, selectedRecipe._rev)
    this.props.history.push("/recipes");
  }

  handleCancel = (e) => {
    e.preventDefault();
    if (this.props.mode !== 'CREATE') {
      this.props.history.push("/recipes");
      this.props.cleanSelectedRecipe()
    } else {
      this.props.handleCloseRecipeForm()
      this.props.cleanSelectedRecipe()
    }
  }


  handleOpenFlavorToRecipeForm = () => { this.setState({ openFlavorToRecipeForm: true }) };
  handleCloseFlavorToRecipeForm = () => { this.setState({ openFlavorToRecipeForm: false }) };
  handleOpenProduction = () => { this.setState({ openProduction: true }) };
  handleCloseProduction = () => { this.setState({ openProduction: false }) };

  componentWillUnmount = () => {
    this.props.cleanSelectedRecipe()
  }

  render() {
    if (this.props.mode !== 'CREATE' && !this.props.recipes.selectedRecipe.recipeFlavors) {
      return (
        <CircularProgress size={60} thickness={7} />
      )
    }

    const selectedRecipe = this.props.recipes.selectedRecipe

    return (
      <form>
        <Row>
          <Col xs={12} sm={12} md={7} lg={7}>
            <Row>
              <Col xs={12} sm={12} md={4} lg={4}>
                <FormLiquidQty
                  mlOfLiquid={selectedRecipe.mlToProduce}
                  handleMlOfLiquidChange={this.handleMlToProduceChange}
                  chartValue={selectedRecipe.mlToProduce}
                  chartLabel="ml"
                  title="Quantity"
                />
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
                <FormBaseVgPg
                  chartValue={selectedRecipe.baseVg}
                  chartLabel="VG"
                  basePg={selectedRecipe.basePg}
                  baseVg={selectedRecipe.baseVg}
                  onBasePgChange={this.handleBasePgChange}
                  onBaseVgChange={this.handleBaseVgChange}
                />
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
                <RecipeFormBaseNico
                  nicoVg={selectedRecipe.nicoVg}
                  nicoPg={selectedRecipe.nicoPg}
                  nicoStrength={selectedRecipe.nicoStrength}
                  desiredNicoStrength={selectedRecipe.desiredNicoStrength}
                  onNicoVgChange={this.handleNicoVgChange}
                  onNicoPgChange={this.handleNicoPgChange}
                  onNicoStrengthChange={this.handleNicoStrengthChange}
                  onDesiredNicoStrengthChange={this.handleDesiredNicoStrengthChange}
                />
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <RaisedButton
                  label="Add Flavor"
                  labelPosition="before"
                  primary={true}
                  icon={<ContentAdd />}
                  style={{ marginTop: "15px" }}
                  onClick={this.handleOpenFlavorToRecipeForm}
                />
                <Dialog
                  title="Add Flavor To Recipe"
                  modal={true}
                  open={this.state.openFlavorToRecipeForm}
                  contentStyle={{ width: '70%', maxWidth: '100%', }}
                  autoScrollBodyContent={true}
                >
                  <FlavorToRecipeForm
                    handleCloseFlavorToRecipeForm={this.handleCloseFlavorToRecipeForm}
                    mode={this.props.mode}
                  />
                </Dialog>
              </Col>
            </Row>
            <div>
              <FlavorToRecipeList
                mode={this.props.mode}
              />
            </div>
          </Col>
          <Col xs={12} sm={12} md={5} lg={5}>

            <Row>
              <RecipeFormTable />
            </Row>

            {/* <Row center="xs" style={{ marginLeft: "10px", marginRight: "10px" }}> */}
            <Row style={{ margin: "30px" }}>
              <RecipeInformation
                selectedRecipe={selectedRecipe}
                handleFieldChange={this.handleFieldChange}
                handleRatingChange={this.handleRatingChange}
                handleIsPrivateChange={this.handleIsPrivateChange}
                user={this.props.user}
                mode={this.props.mode}
              />
            </Row>

          </Col>
        </Row>
        <Row end="xs" style={{ margin: "10px 0 30px 0" }}>
          <FlatButton
            label="Cancel"
            primary={true}
            onClick={this.handleCancel}
          />
          <FlatButton
            label={this.props.mode}
            primary={true}
            disabled={false}
            onClick={this.recipeFormAction}
          />
          {this.props.mode === 'EDIT' ?
            <div>
              <FlatButton
                label="Delete"
                secondary={true}
                disabled={false}
                onClick={this.deleteRecipe}
              />
              <FlatButton
                label="Mix"
                secondary={false}
                disabled={false}
                onClick={this.handleOpenProduction}
                icon={<Toys />}
              />
            </div>
            : <div></div>
          }
        </Row>
        <Dialog
          title="Mix Recipe"
          modal={true}
          open={this.state.openProduction}
          contentStyle={{ height: '98%', maxHeight: '98%', width: '90%', maxWidth: '98%' }}
          autoScrollBodyContent={true}
        >
          <RecipeProduction
            handleCloseProduction={this.handleCloseProduction}
            user={this.props.user}
          />
        </Dialog>
      </form>
    )
  }
};

const mapStateToProps = (state) => { return { recipes: state.recipes, user: state.user } }
const mapDispatchToProps = (dispatch) => bindActionCreators({ addRecipe, fetchSingleRecipe, updateRecipe, deleteRecipe, updateRecipeField, cleanSelectedRecipe, fetchRecipes }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RecipeForm)
