import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";

class FormButtons extends Component {
  render() {
    const {
      handleCancel,
      mode,
      enableSubmit,
      deleteItem,
      formAction
    } = this.props;
    return (
      <div>
        <FlatButton
          label="Back"
          disabled={false}
          primary={false}
          onClick={handleCancel}
        />
        <FlatButton
          label={mode}
          primary={true}
          onClick={formAction}
          disabled={enableSubmit()}
        />
        {this.props.mode === "UPDATE" ? (
          <FlatButton
            label="Delete"
            secondary={true}
            disabled={false}
            onClick={deleteItem}
          />
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default FormButtons;
