import React, { Component } from "react";
import { Stepper, Step, StepButton, StepContent } from "material-ui/Stepper";
import ArrowForwardIcon from "material-ui/svg-icons/navigation/arrow-forward";
import ArrowDownwardIcon from "material-ui/svg-icons/navigation/arrow-downward";
// import StepCard from "./StepCard";
import Dialog from "material-ui/Dialog";
import Paper from "material-ui/Paper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getStepId } from "../../actions/timers_action";
import AddStepForm from "./AddStepForm";

class StepsList extends Component {
  state = {
    stepIndex: 0,
    stepDialogOpen: false
  };

  handleStepClick = (index, stepId) => {
    this.setState({ stepIndex: index });
    this.handleOpenStep();
    this.props.getStepId(stepId);

    //new approach to try:
    // dispatch an action from here with the recipeid
    //move dialog out of stepper
    // addStepForm component this.props.editStep(here will take the state.stepId) to populate the step field
    // maybe we nbeed to do a Promise to make sure the store is updated before the dialog is open
  };

  handleOpenStep = () => {
    this.setState({ stepDialogOpen: true });
  };
  handleCloseStep = () => {
    this.setState({ stepDialogOpen: false });
  };

  render() {
    const { steps } = this.props;
    const { stepIndex } = this.state;

    let width = window.innerWidth;

    return (
      <div>
        {steps.map((step, index) => {
          const renderDurationFormat = step.duration < 1 ? "hours" : "days";
          const renderStep = ` ${step.name} (${
            step.duration < 1 ? parseInt(step.duration * 24, 10) : step.duration
          } ${renderDurationFormat} ) `;
          return (
            <Paper
              zDepth={1}
              key={index}
              onClick={() => this.handleStepClick(index, step._id)}
            >
              {renderStep}
            </Paper>
          );
        })}

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
          <AddStepForm
            handleCloseStep={this.handleCloseStep}
            mode="UPDATE"
            stepid={this.props.timers.selectedStepId}
          />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { timers: state.timers };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getStepId }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepsList);

// <Dialog
//   title="Add Step"
//   modal={true}
//   open={this.state.stepDialogOpen}
//   contentStyle={{
//     height: "100%",
//     maxHeight: "100%",
//     width: "85%",
//     maxWidth: "98%"
//   }}
//   autoScrollBodyContent={true}
// >
//   <AddStepForm
//     handleCloseStep={this.handleCloseStep}
//     mode="UPDATE"
//   />
// </Dialog>
