import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col } from "react-flexbox-grid";
import Toggle from "material-ui/Toggle";
// import moment from "moment";

import { fetchSingleRecipeTimer } from "../../actions/timers_action";
import RecipeTimersList from "./RecipeTimersList";

class TimerContainer extends Component {
  state = {
    showCompleted: false,
    openEditTimer: false
  };

  componentDidMount = () => {
    this.props.fetchSingleRecipeTimer(this.props.recipeid);
  };

  handleShowCompleted = () => {
    this.setState({ showCompleted: !this.state.showCompleted });
  };

  handleOpenEditTimer = () => {
    this.setState({ openEditTimer: true });
  };
  handleCloseTimer = () => {
    this.setState({ openEditTimer: false });
  };

  render() {
    const { timersList } = this.props.timers;

    const visibleTimerList = timersList.filter(
      timer => new Date(timer.timerEnd) >= new Date(Date.now())
    );

    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} style={{ marginTop: "5px" }}>
          <Toggle
            label="Show Completed"
            labelPosition="right"
            onToggle={this.handleShowCompleted}
            toggled={this.state.showCompleted}
          />
        </Col>
        <Col xs={12} sm={12} md={8} lg={8}>
          <RecipeTimersList
            timersList={
              this.state.showCompleted ? timersList : visibleTimerList
            }
            handleOpenEditTimer={this.handleOpenEditTimer}
          />
        </Col>
        <Col xs={12} sm={12} md={4} lg={4}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              notification
            </Col>
            <Col xs={12} sm={12} md={12} lg={12}>
              comments
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return { timers: state.timers };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchSingleRecipeTimer }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerContainer);
