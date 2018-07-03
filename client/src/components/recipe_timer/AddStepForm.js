import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import { Row, Col } from "react-flexbox-grid";
import TextField from "material-ui/TextField";
import Checkbox from "material-ui/Checkbox";
import NotificationOff from "material-ui/svg-icons/social/notifications-off";
import NotificationActive from "material-ui/svg-icons/social/notifications-active";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

import {
  updateStepField,
  addStepToTimer,
  cleanSelectedStep,
  editStep,
  updateStep,
  refreshSteps
} from "../../actions/timers_action";

class AddStepForm extends Component {
  componentDidMount = () => {
    if (this.props.mode === "UPDATE") {
      this.props.editStep(this.props.stepid);
    }
  };

  handleFieldChange = e => {
    this.props.updateStepField(e.target.value, e.target.name);
  };
  handleFieldNumberChange = e => {
    this.props.updateStepField(parseInt(e.target.value, 10), e.target.name);
  };

  handleNotificationActiveChange = () => {
    const value = !this.props.timers.selectedStep.notificationActive;
    this.props.updateStepField(value, "notificationActive");
  };

  // addStepToTimer needs to trigger recalculation of all steps in the selectedTimer
  addStepToTimer = () => {
    const { selectedStep, selectedTimer } = this.props.timers;

    const newStartDate =
      selectedTimer.steps.length === 0
        ? moment(Date.now())
        : moment(
            new Date(
              selectedTimer.steps[selectedTimer.steps.length - 1].endDate
            )
          );

    const newEndDate =
      selectedTimer.steps.length === 0
        ? moment(Date.now())
            .add(selectedStep.days, "days")
            .add(selectedStep.hours, "hours")
        : moment(selectedTimer.steps[selectedTimer.steps.length - 1].endDate)
            .add(selectedStep.days, "days")
            .add(selectedStep.hours, "hours");

    const newStep = {
      ...this.props.timers.selectedStep,
      order: selectedTimer.steps.length + 1,
      startDate: moment(newStartDate).format("YYYY-MM-DDTHH:mm:ss.SSSSZ"),
      endDate: moment(newEndDate).format("YYYY-MM-DDTHH:mm:ss.SSSSZ"),
      days: parseInt(this.props.timers.selectedStep.days, 10),
      hours: parseInt(this.props.timers.selectedStep.hours, 10),
      duration: newEndDate.diff(newStartDate, "days", true).toFixed(1)
    };

    this.props.addStepToTimer(newStep);
    this.props.handleCloseStep();
  };

  updateStepToTimer = () => {
    const { selectedStep, selectedTimer } = this.props.timers;

    const newStartDate =
      selectedStep.order === 1
        ? moment(selectedStep.startDate)
        : new Date(
            selectedTimer.steps.filter(
              step => step.order === selectedStep.order - 1
            )[0].endDate
          );

    const newEndDate =
      selectedStep.order === 1
        ? moment(selectedStep.startDate)
            .add(selectedStep.days, "days")
            .add(selectedStep.hours, "hours")
        : moment(
            new Date(
              selectedTimer.steps.filter(
                step => step.order === selectedStep.order - 1
              )[0].endDate
            )
          )
            .add(selectedStep.days, "days")
            .add(selectedStep.hours, "hours");

    const newStep = {
      ...selectedStep,
      days: parseInt(selectedStep.days, 10),
      hours: parseInt(selectedStep.hours, 10),
      startDate: moment(newStartDate).format("YYYY-MM-DDTHH:mm:ss.SSSSZ"),
      endDate: moment(newEndDate).format("YYYY-MM-DDTHH:mm:ss.SSSSZ"),
      duration: parseInt(
        newEndDate.diff(newStartDate, "days", true),
        10
      ).toFixed(1)
    };

    this.props.updateStep(newStep, selectedStep._id);
    // this.refreshAllSteps();
    this.props.handleCloseStep();
  };

  enableSubmit = () => {
    const selectedStep = this.props.timers.selectedStep;
    if (selectedStep.name.length > 0) {
      return false;
    }
    return true;
  };

  componentWillUnmount = () => {
    this.props.cleanSelectedStep();
  };

  render() {
    const { handleCloseStep, mode } = this.props;
    const { selectedStep } = this.props.timers;
    return (
      <form>
        <Row>
          <FlatButton label="test" onClick={this.refreshAllSteps} />
          <Col xs={12} sm={12} md={12} lg={12}>
            <TextField
              name="name"
              hintText="Enter Step Name"
              floatingLabelText="Enter Step Name"
              onChange={this.handleFieldChange}
              value={selectedStep.name}
              fullWidth={true}
              errorText={
                !selectedStep.name.length > 0 ? "This field is required" : ""
              }
            />
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} style={{ marginTop: "10px" }}>
            <TextField
              name="days"
              type="number"
              hintText="Enter days"
              floatingLabelText="Enter days"
              onChange={this.handleFieldNumberChange}
              value={selectedStep.days}
              fullWidth={true}
            />
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} style={{ marginTop: "10px" }}>
            <TextField
              name="hours"
              type="number"
              hintText="Enter hours"
              floatingLabelText="Enter hours"
              onChange={this.handleFieldNumberChange}
              value={selectedStep.hours}
              fullWidth={true}
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Checkbox
              checkedIcon={<NotificationActive />}
              uncheckedIcon={<NotificationOff />}
              onCheck={this.handleNotificationActiveChange}
              checked={selectedStep.notificationActive}
              label={
                selectedStep.notificationActive
                  ? "Notification Active"
                  : "Notification Inactive"
              }
              style={{ marginTop: "20px" }}
            />
          </Col>
        </Row>
        <Row end="xs" style={{ margin: "10px 0 10px 0" }}>
          <FlatButton label="Back" onClick={handleCloseStep} />
          <FlatButton
            label={mode}
            primary={true}
            disabled={this.enableSubmit()}
            onClick={
              mode === "UPDATE" ? this.updateStepToTimer : this.addStepToTimer
            }
          />
        </Row>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return { timers: state.timers };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateStepField,
      addStepToTimer,
      cleanSelectedStep,
      editStep,
      updateStep,
      refreshSteps
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStepForm);
