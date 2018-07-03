import React, { Component } from "react";
import TimerForm from "../components/recipe_timer/TimerForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col } from "react-flexbox-grid";

import { cleanSelectedTimer } from "../actions/timers_action";
import CommentsContainer from "../components/recipe_timer/CommentsContainer";

class EditTimerPage extends Component {
  handleCloseTimer = () => {
    this.props.history.goBack();
    this.props.cleanSelectedTimer();
  };
  render() {
    return (
      <Row>
        <Col xs={12} sm={6} md={6} lg={6}>
          <TimerForm
            mode="UPDATE"
            history={this.props.history}
            timerid={this.props.match.params.timerid}
            handleCloseTimer={this.handleCloseTimer}
          />
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <CommentsContainer />
        </Col>
      </Row>
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
