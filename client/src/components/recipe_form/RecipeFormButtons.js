import React, { Component } from "react";
import Toys from "material-ui/svg-icons/hardware/toys";
import AddAlarm from "material-ui/svg-icons/action/alarm-add";
import DeleteForever from "material-ui/svg-icons/action/delete-forever";
import FlatButton from "material-ui/FlatButton";
import Divider from "material-ui/Divider";

class RecipeFormButtons extends Component {
  render() {
    const {
      mode,
      handleCancel,
      recipeFormAction,
      enableSubmit,
      deleteRecipe,
      handleOpenProduction,
      user,
      handleOpenTimer
    } = this.props;

    return (
      <div>
        <FlatButton label="Back" onClick={handleCancel} />
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
            <Divider />
            <FlatButton
              label="Mix"
              primary={true}
              secondary={false}
              disabled={false}
              onClick={handleOpenProduction}
              icon={<Toys />}
            />
            <FlatButton
              label="Steep"
              secondary={false}
              disabled={false}
              onClick={handleOpenTimer}
              icon={<AddAlarm />}
            />
            <FlatButton
              label="Delete"
              secondary={true}
              icon={<DeleteForever />}
              disabled={false}
              onClick={deleteRecipe}
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
