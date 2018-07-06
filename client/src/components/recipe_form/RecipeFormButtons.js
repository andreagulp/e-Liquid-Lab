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
      <div style={{ zIndex: 2 }}>
        <FlatButton
          label="Back"
          onClick={handleCancel}
          style={{ marginBottom: "10px" }}
        />
        {user ? (
          <FlatButton
            label={mode}
            primary={true}
            onClick={recipeFormAction}
            disabled={enableSubmit()}
            style={{ marginBottom: "10px" }}
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
              style={{ marginTop: "10px" }}
            />
            <FlatButton
              label="Steep"
              secondary={false}
              disabled={false}
              onClick={handleOpenTimer}
              icon={<AddAlarm />}
              style={{ marginTop: "10px" }}
            />
            <FlatButton
              label="Delete"
              secondary={true}
              icon={<DeleteForever />}
              disabled={false}
              onClick={deleteRecipe}
              style={{ marginTop: "10px" }}
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
