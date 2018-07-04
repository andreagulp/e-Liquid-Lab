import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import { Row, Col } from "react-flexbox-grid";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import Dialog from "material-ui/Dialog";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import DeleteForever from "material-ui/svg-icons/action/delete-forever";

import "../commons/dialog.css";

import {
  updateTimerField,
  cleanSelectedTimer,
  addTimer,
  editSingleRecipeTimer,
  updateTimer,
  updateStep,
  refreshSteps,
  deleteTimer
} from "../../actions/timers_action";
import AddStepForm from "./AddStepForm";
import StepsList from "./StepsList";

class TimerForm extends Component {
  state = {
    stepDialogOpen: false,
    confirmDialogOpen: false
  };

  componentDidMount = () => {
    if (this.props.mode === "UPDATE" && this.props.recipes.selectedRecipe) {
      this.props.editSingleRecipeTimer(
        this.props.recipes.selectedRecipe._id,
        this.props.timerid
      );
    }
  };

  handleFieldChange = e => {
    this.props.updateTimerField(e.target.value, e.target.name);
  };

  addTimer = () => {
    const { selectedRecipe } = this.props.recipes;
    const { selectedTimer } = this.props.timers;

    const timerStart = selectedTimer.steps.reduce(
      (a, b) =>
        moment(a.startDate).isBefore(moment(b.startDate))
          ? a.startDate
          : b.startDate
    );
    const timerEnd = selectedTimer.steps.reduce(
      (a, b) => (a.endDate > b.endDate ? a.endDate : b.endDate)
    );

    const newTimer = {
      ...this.props.timers.selectedTimer,
      recipeId: selectedRecipe._id,
      timerStart: moment(timerStart).format("YYYY-MM-DDTHH:mm:ss.SSSSZ"),
      timerEnd: moment(timerEnd).format("YYYY-MM-DDTHH:mm:ss.SSSSZ"),
      recipeTimerName: `${selectedRecipe.name} - ${selectedTimer.name}`
    };
    this.props.addTimer(newTimer, selectedRecipe._id);
    this.props.handleCloseTimer();
    this.props.cleanSelectedTimer();
  };

  updateTimer = () => {
    const { selectedRecipe } = this.props.recipes;
    const { selectedTimer } = this.props.timers;

    const timerStart = selectedTimer.steps.reduce(
      // (a, b) =>
      //   moment(a.startDate).isBefore(moment(b.startDate))
      //     ? a.startDate
      //     : b.startDate
      (a, b) => (a.startDate < b.startDate ? a.startDate : b.startDate)
    );
    const timerEnd = selectedTimer.steps.reduce(
      (a, b) => (a.endDate > b.endDate ? a.endDate : b.endDate)
    );

    const newTimer = {
      ...this.props.timers.selectedTimer,
      timerStart: timerStart,
      timerEnd: timerEnd,
      recipeTimerName: `${selectedRecipe.name} - ${selectedTimer.name}`
    };

    this.props.updateTimer(selectedTimer._id, newTimer, selectedRecipe._id);
    this.props.history.goBack();
  };

  refreshAllSteps = () => {
    const { selectedTimer } = this.props.timers;
    console.log("refreshAllSteps selectedTimer", selectedTimer);

    let newSteps = [];

    const newStartDate = (step, newSteps) =>
      step.order === 1
        ? step.startDate
        : newSteps.filter(newStep => newStep.order === step.order - 1)[0]
            .endDate;

    const newEndDate = (step, newSteps) =>
      step.order === 1
        ? step.endDate
        : moment(
            newSteps.filter(newStep => newStep.order === step.order - 1)[0]
              .endDate
          )
            .add(step.days, "days")
            .add(step.hours, "hours");

    selectedTimer.steps.forEach(step => {
      newSteps = [
        ...newSteps,
        {
          ...step,
          startDate: moment(newStartDate(step, newSteps)).format(
            "YYYY-MM-DDTHH:mm:ss.SSSSZ"
          ),
          endDate: moment(newEndDate(step, newSteps)).format(
            "YYYY-MM-DDTHH:mm:ss.SSSSZ"
          )
        }
      ];
    });
    console.log("refreshAllSteps newSteps", newSteps);
    this.props.refreshSteps(newSteps);
  };

  enableSubmit = () => {
    const selectedTimer = this.props.timers.selectedTimer;
    if (!selectedTimer.name.length > 0) {
      return true;
    }
    return false;
  };

  handleOpenStep = () => {
    this.setState({ stepDialogOpen: true });
  };
  handleCloseStep = () => {
    this.setState({ stepDialogOpen: false });
  };

  handleConfirmDialogOpen = () => {
    this.setState({ confirmDialogOpen: true }, () => this.refreshAllSteps());
  };
  handleConfirmDialogClose = () => {
    this.setState({ confirmDialogOpen: false });
  };

  deleteRecipe = () => {
    const { selectedTimer } = this.props.timers;
    const { selectedRecipe } = this.props.recipes;
    this.props.deleteTimer(selectedTimer._id, selectedRecipe._id);
    this.props.history.goBack();
  };

  // componentWillUnmount = () => {
  //   this.props.cleanSelectedTimer();
  // };

  render() {
    const { handleCloseTimer, mode } = this.props;
    const { selectedTimer } = this.props.timers;

    return (
      <form>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <TextField
              name="name"
              hintText="Enter Timer Name"
              floatingLabelText="Enter Timer Name"
              onChange={this.handleFieldChange}
              value={selectedTimer.name}
              fullWidth={true}
              errorText={
                !selectedTimer.name.length > 0 ? "This field is required" : ""
              }
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <TextField
              name="description"
              hintText="Enter description"
              floatingLabelText="Enter description"
              onChange={this.handleFieldChange}
              value={selectedTimer.description}
              fullWidth={true}
              multiLine={true}
              rows={2}
              rowsMax={4}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <RaisedButton
              label="Add Step"
              labelPosition="before"
              primary={true}
              icon={<ContentAdd />}
              style={{ marginTop: "15px" }}
              onClick={this.handleOpenStep}
            />
            <Dialog
              title="Add Step"
              modal={true}
              open={this.state.stepDialogOpen}
              repositionOnUpdate={false}
              autoDetectWindowHeight={false}
              autoScrollBodyContent={false}
              className="dialog-root"
              contentClassName="dialog-content"
              bodyClassName="dialog-body"
            >
              <div className="dialog-scroll">
                <AddStepForm
                  handleCloseStep={this.handleCloseStep}
                  mode="CREATE"
                />
              </div>
            </Dialog>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <StepsList
            steps={this.props.timers.selectedTimer.steps}
            mode={mode}
          />
        </Row>

        <Row end="xs" style={{ margin: "10px 0 10px 0" }}>
          <FlatButton label="Back" onClick={handleCloseTimer} />
          {/* <FlatButton label="test refresh" onClick={this.refreshAllSteps} /> */}
          <FlatButton
            label={mode}
            primary={true}
            disabled={this.enableSubmit()}
            onClick={this.handleConfirmDialogOpen}
          />
          {mode === "UPDATE" ? (
            <FlatButton
              label="Delete"
              secondary={true}
              icon={<DeleteForever />}
              disabled={false}
              onClick={this.deleteRecipe}
            />
          ) : (
            ""
          )}

          <Dialog
            title={`CONFIRM ${mode}`}
            modal={false}
            open={this.state.confirmDialogOpen}
            onRequestClose={this.handleConfirmDialogClose}
            contentStyle={{
              height: "100%",
              maxHeight: "100%",
              width: "85%",
              maxWidth: "98%"
            }}
            autoScrollBodyContent={true}
          >
            <Row end="xs" style={{ margin: "10px 0 10px 0" }}>
              <FlatButton
                label={mode}
                primary={true}
                disabled={this.enableSubmit()}
                onClick={mode === "CREATE" ? this.addTimer : this.updateTimer}
              />
            </Row>
          </Dialog>
        </Row>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return { timers: state.timers, recipes: state.recipes };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateTimerField,
      cleanSelectedTimer,
      addTimer,
      editSingleRecipeTimer,
      updateTimer,
      updateStep,
      refreshSteps,
      deleteTimer
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerForm);
