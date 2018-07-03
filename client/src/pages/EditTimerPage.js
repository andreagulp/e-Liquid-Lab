import React, { Component } from "react";
import TimerForm from "../components/recipe_timer/TimerForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { cleanSelectedTimer } from "../actions/timers_action";

class EditTimerPage extends Component {
  handleCloseTimer = () => {
    this.props.history.goBack();
    this.props.cleanSelectedTimer();
  };
  render() {
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

const mapStateToProps = state => {
  return { timers: state.timers };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators({ cleanSelectedTimer }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTimerPage);
