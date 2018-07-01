import React, { Component } from "react";
import TimerForm from "../components/recipe_timer/TimerForm";

class EditTimerPage extends Component {
  handleCloseTimer = () => {
    this.props.history.goBack();
  };
  render() {
    console.log(
      "this.props.match.params.timerid",
      this.props.match.params.timerid
    );
    return (
      <div>
        <TimerForm
          mode="UPDATE"
          history={this.props.history}
          timerid={this.props.match.params.timerid}
          handleCloseTimer={this.handleCloseTimer}
        />
      </div>
    );
  }
}

export default EditTimerPage;
