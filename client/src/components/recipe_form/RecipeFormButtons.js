import React, { Component } from "react";
import Toys from "material-ui/svg-icons/hardware/toys";
import FlatButton from "material-ui/FlatButton";

class RecipeFormButtons extends Component {
  render() {
    const {
      mode,
      handleCancel,
      recipeFormAction,
      enableSubmit,
      deleteRecipe,
      handleOpenProduction,
      user
    } = this.props;

    return (
      <div>
        <FlatButton label="Back" primary={true} onClick={handleCancel} />
        {user ? (
          <FlatButton
            label={mode}
            primary={true}
            onClick={recipeFormAction}
            disabled={enableSubmit()}
          />
        ) : (
          <div />
        )}
        {mode === "UPDATE" ? (
          <div>
            <FlatButton
              label="Delete"
              secondary={true}
              disabled={false}
              onClick={deleteRecipe}
            />
            <FlatButton
              label="Mix"
              secondary={false}
              disabled={false}
              onClick={handleOpenProduction}
              icon={<Toys />}
            />
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default RecipeFormButtons;
