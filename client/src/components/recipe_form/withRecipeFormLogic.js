import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  addRecipe,
  fetchSingleRecipe,
  updateRecipe,
  deleteRecipe,
  updateRecipeField,
  cleanSelectedRecipe,
  fetchRecipes
} from "../../actions/recipes_action";
import { fetchFlavors } from "../../actions/flavors_action";

export default function(ComposedComponent) {
  class withRecipeFormLogic extends Component {
    constructor(props) {
      super(props);

      this.state = {
        openFlavorToRecipeForm: false,
        openProduction: false,
        errorMsg: [],
        openTimerForm: false
      };
    }
    componentDidMount = () => {
      if (this.props.recipeid && this.props.mode !== "CREATE") {
        //if mode is FORK or UPDATE then execute
        this.props.fetchSingleRecipe(this.props.recipeid);
        this.props.fetchFlavors();
      }
    };

    handleMlToProduceChange = (event, value) => {
      this.props.updateRecipeField(parseInt(value, 10), "mlToProduce");
    };

    handleBaseVgChange = (event, value) => {
      Promise.resolve(
        this.props.updateRecipeField(parseInt(value, 10), "baseVg")
      ).then(this.props.updateRecipeField(100 - value, "basePg"));
    };

    handleBasePgChange = (event, value) => {
      Promise.resolve(
        this.props.updateRecipeField(parseInt(value, 10), "basePg")
      ).then(this.props.updateRecipeField(parseInt(100 - value, 10), "baseVg"));
    };

    handleNicoVgChange = (event, value) => {
      Promise.resolve(
        this.props.updateRecipeField(parseInt(value, 10), "nicoVg")
      ).then(this.props.updateRecipeField(100 - value, "nicoPg"));
    };
    handleNicoPgChange = (event, value) => {
      Promise.resolve(
        this.props.updateRecipeField(parseInt(value, 10), "nicoPg")
      ).then(this.props.updateRecipeField(parseInt(100 - value, 10), "nicoVg"));
    };

    handleNicoStrengthChange = (event, value) => {
      this.props.updateRecipeField(parseInt(value, 10), "nicoStrength");
    };
    handleDesiredNicoStrengthChange = (event, value) => {
      this.props.updateRecipeField(parseInt(value, 10), "desiredNicoStrength");
    };

    handleRatingChange = value => {
      this.props.updateRecipeField(parseInt(value, 10), "rating");
    };

    handleFieldChange = e => {
      this.props.updateRecipeField(e.target.value, e.target.name);
    };

    handleIsPrivateChange = () => {
      const value = !this.props.recipes.selectedRecipe.isPublic;
      this.props.updateRecipeField(value, "isPublic");
    };
    recipeFormAction = id => {
      if (this.props.mode !== "UPDATE") {
        const selectedRecipe = this.props.recipes.selectedRecipe;
        let createdAt = new Date();
        let isForkedRecipe = this.props.mode === "FORK" ? "yes" : "no";
        let newRecipeForkedId =
          this.props.mode === "FORK" ? selectedRecipe._id : "";
        // let newRecipeForkedName = this.props.mode === 'FORK' ? this.props.recipes.recipes.find(x => x._id === selectedRecipe._id).name : ''
        let newRecipeForkedName = () => {
          if (selectedRecipe.isPublic && this.props.mode === "FORK") {
            return this.props.recipes.publicRecipes.find(
              x => x._id === selectedRecipe._id
            ).name;
          }
          if (!selectedRecipe.isPublic && this.props.mode === "FORK") {
            return this.props.recipes.recipes.find(
              x => x._id === selectedRecipe._id
            ).name;
          }
        };

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
          recipeForkedName: newRecipeForkedName(),
          isPublic: selectedRecipe.isPublic,
          production: []
        };
        this.props.addRecipe(newRecipe);
        if (this.props.mode === "CREATE") {
          this.props.handleCloseRecipeForm();
          this.props.cleanSelectedRecipe();
        } else {
          this.props.history.push("/recipes");
          this.props.cleanSelectedRecipe();
        }
      } else {
        const selectedRecipe = this.props.recipes.selectedRecipe;
        let updatedAt = new Date();
        const updatedRecipe = {
          ...selectedRecipe,
          updateDate: updatedAt.toISOString(),
          _user: selectedRecipe._user._id
        };

        this.props.updateRecipe(selectedRecipe._id, updatedRecipe);
        this.props.history.push("/recipes");
      }
    };

    deleteRecipe = () => {
      const selectedRecipe = this.props.recipes.selectedRecipe;
      this.props.deleteRecipe(selectedRecipe._id, selectedRecipe._rev);
      this.props.history.push("/recipes");
    };

    handleCancel = e => {
      e.preventDefault();
      if (this.props.mode !== "CREATE") {
        this.props.history.goBack();
        // this.props.history.push("/recipes");
        this.props.cleanSelectedRecipe();
      } else {
        this.props.handleCloseRecipeForm();
        this.props.cleanSelectedRecipe();
      }
    };

    enableSubmit = () => {
      const selectedRecipe = this.props.recipes.selectedRecipe;
      if (!selectedRecipe.name.length > 0) {
        return true;
      }
      return false;
    };

    handleOpenFlavorToRecipeForm = () => {
      this.setState({ openFlavorToRecipeForm: true });
    };
    handleCloseFlavorToRecipeForm = () => {
      this.setState({ openFlavorToRecipeForm: false });
    };
    handleOpenProduction = () => {
      this.checkFlavorExist();
      if (this.state.errorMsg.length > 0) {
      }
      this.setState({ openProduction: true });
    };
    handleCloseProduction = () => {
      this.setState({ openProduction: false });
    };

    checkFlavorExist = () => {
      const selectedRecipe = this.props.recipes.selectedRecipe;
      const flavors = this.props.flavors.inventoryFlavors;
      let missingFlavors = [];

      selectedRecipe.recipeFlavors.map(recipeFlavor => {
        let idx = flavors.findIndex(
          flavor => flavor._id === recipeFlavor.flavorId
        );
        if (idx < 0) {
          missingFlavors = [
            ...missingFlavors,
            `${recipeFlavor.nameBrand} || ${recipeFlavor.flavorId} not found`
          ];
        }
        return missingFlavors;
      });
      return this.setState({ errorMsg: missingFlavors });
    };

    handleOpenTimer = () => {
      this.setState({ openTimerForm: true });
    };
    handleCloseTimer = () => {
      this.setState({ openTimerForm: false });
    };

    componentWillUnmount = () => {
      this.props.cleanSelectedRecipe();
    };

    render() {
      return (
        <ComposedComponent
          {...this.props}
          open={this.state.openFlavorToRecipeForm}
          errorMsg={this.state.errorMsg}
          handleMlToProduceChange={this.handleMlToProduceChange}
          handleBaseVgChange={this.handleBaseVgChange}
          handleBasePgChange={this.handleBasePgChange}
          handleNicoVgChange={this.handleNicoVgChange}
          handleNicoPgChange={this.handleNicoPgChange}
          handleNicoStrengthChange={this.handleNicoStrengthChange}
          handleDesiredNicoStrengthChange={this.handleDesiredNicoStrengthChange}
          handleRatingChange={this.handleRatingChange}
          handleFieldChange={this.handleFieldChange}
          handleIsPrivateChange={this.handleIsPrivateChange}
          recipeFormAction={this.recipeFormAction}
          deleteRecipe={this.deleteRecipe}
          handleCancel={this.handleCancel}
          enableSubmit={this.enableSubmit}
          handleOpenFlavorToRecipeForm={this.handleOpenFlavorToRecipeForm}
          handleCloseFlavorToRecipeForm={this.handleCloseFlavorToRecipeForm}
          handleOpenProduction={this.handleOpenProduction}
          handleCloseProduction={this.handleCloseProduction}
          selectedRecipe={this.props.recipes.selectedRecipe}
          openProduction={this.state.openProduction}
          handleOpenTimer={this.handleOpenTimer}
          handleCloseTimer={this.handleCloseTimer}
          openTimerForm={this.state.openTimerForm}
        />
      );
    }
  }
  const mapStateToProps = state => {
    return { recipes: state.recipes, user: state.user, flavors: state.flavors };
  };

  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        addRecipe,
        fetchSingleRecipe,
        updateRecipe,
        deleteRecipe,
        updateRecipeField,
        cleanSelectedRecipe,
        fetchRecipes,
        fetchFlavors
      },
      dispatch
    );
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRecipeFormLogic);
}
