import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import { Row, Col } from "react-flexbox-grid";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import Dialog from "material-ui/Dialog";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  updateTimerField,
  cleanSelectedTimer,
  addTimer,
  editSingleRecipeTimer,
  updateTimer
} from "../../actions/timers_action";
import AddStepForm from "./AddStepForm";
import StepsList from "./StepsList";

class TimerForm extends Component {
  state = {
    stepDialogOpen: false
  };

  componentDidMount = () => {
    // console.log(
    //   "this.props.recipes.selectedRecipe._id",
    //   this.props.recipes.selectedRecipe._id
    // );
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
      (a, b) => (a.startDate < b.startDate ? a.startDate : b.startDate)
    );
    const timerEnd = selectedTimer.steps.reduce(
      (a, b) => (a.endDate > b.endDate ? a.endDate : b.endDate)
    );

    const newTimer = {
      ...this.props.timers.selectedTimer,
      recipeId: selectedRecipe._id,
      timerStart: timerStart,
      timerEnd: timerEnd,
      recipeTimerName: `${selectedRecipe.name} - ${selectedTimer.name}`
    };
    this.props.addTimer(newTimer, selectedRecipe._id);
    this.props.handleCloseTimer();
  };

  updateTimer = () => {
    const { selectedRecipe } = this.props.recipes;
    const { selectedTimer } = this.props.timers;

    const newTimer = {
      ...this.props.timers.selectedTimer
    };
    this.props.updateTimer(selectedTimer._id, newTimer, selectedRecipe._id);
    this.props.history.goBack();
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

  componentWillUnmount = () => {
    this.props.cleanSelectedTimer();
  };

  render() {
    const { handleCloseTimer, mode } = this.props;
    const { selectedTimer } = this.props.timers;

    // console.log(selectedTimer);
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
              contentStyle={{
                height: "100%",
                maxHeight: "100%",
                width: "85%",
                maxWidth: "98%"
              }}
              autoScrollBodyContent={true}
            >
              <AddStepForm handleCloseStep={this.handleCloseStep} />
            </Dialog>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <StepsList steps={this.props.timers.selectedTimer.steps} />
        </Row>

        <Row end="xs" style={{ margin: "10px 0 10px 0" }}>
          <FlatButton label="Back" onClick={handleCloseTimer} />
          <FlatButton
            label={mode}
            primary={true}
            disabled={this.enableSubmit()}
            onClick={mode === "CREATE" ? this.addTimer : this.updateTimer}
          />
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
      updateTimer
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerForm);
