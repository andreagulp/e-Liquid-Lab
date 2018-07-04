import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col } from "react-flexbox-grid";
import Toggle from "material-ui/Toggle";

import { fetchSingleRecipeTimer } from "../../actions/timers_action";
import RecipeTimersList from "./RecipeTimersList";
import TimerNotificationList from "./TimerNotificationList";
import StepNotificationList from "./StepNotificationList";

class TimerContainer extends Component {
  state = {
    showCompleted: false,
    openEditTimer: false,
    showMoreTimerNotifications: false,
    showMoreStepNotifications: false
  };

  componentDidMount = () => {
    this.props.fetchSingleRecipeTimer(this.props.recipeid);
  };

  handleShowCompleted = () => {
    this.setState({ showCompleted: !this.state.showCompleted });
  };

  handleShowMoreTimerNotifications = () => {
    this.setState({
      showMoreTimerNotifications: !this.state.showMoreTimerNotifications
    });
  };
  handleShowMoreStepNotifications = () => {
    this.setState({
      showMoreStepNotifications: !this.state.showMoreStepNotifications
    });
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

    const timerNotifications = () => {
      let notifications = [];

      timersList.map(timer => {
        if (new Date(timer.timerEnd) <= new Date(Date.now())) {
          notifications = [...notifications, timer];
        }
        return notifications;
      });
      return notifications;
    };

    const stepsNotifications = () => {
      let notifications = [];

      timersList.map(timer => {
        timer.steps.map(step => {
          if (new Date(step.endDate) <= new Date(Date.now())) {
            notifications = [
              ...notifications,
              {
                timerId: timer._id,
                timerName: timer.name,
                ...step
              }
            ];
          }
          return notifications;
        });
        return notifications;
      });
      return notifications;
    };

    const visibleTimersNotifications = timerNotifications().slice(0, 2);
    const visibleStepsNotifications = stepsNotifications().slice(0, 3);

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
              <TimerNotificationList
                timerNotifications={
                  this.state.showMoreTimerNotifications
                    ? timerNotifications()
                    : visibleTimersNotifications
                }
                handleShowMoreTimerNotifications={
                  this.handleShowMoreTimerNotifications
                }
                showMoreTimerNotifications={
                  this.state.showMoreTimerNotifications
                }
              />
              <StepNotificationList
                stepsNotifications={
                  this.state.showMoreStepNotifications
                    ? stepsNotifications()
                    : visibleStepsNotifications
                }
                showMoreStepNotifications={this.state.showMoreStepNotifications}
                handleShowMoreStepNotifications={
                  this.handleShowMoreStepNotifications
                }
              />
            </Col>
            {/* <Col xs={12} sm={12} md={12} lg={12}>
              comments
            </Col> */}
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
