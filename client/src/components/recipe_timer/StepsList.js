import React, { Component } from "react";
import { Stepper, Step, StepButton, StepContent } from "material-ui/Stepper";
// import Remove from "material-ui/svg-icons/content/remove";
// import ArrowForwardIcon from "material-ui/svg-icons/navigation/arrow-forward";
// import ArrowDownwardIcon from "material-ui/svg-icons/navigation/arrow-downward";
import Dialog from "material-ui/Dialog";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

import "../commons/dialog.css";
import { getStepId } from "../../actions/timers_action";
import AddStepForm from "./AddStepForm";

class StepsList extends Component {
  state = {
    stepIndex: 0,
    stepDialogOpen: false
  };

  handleStepClick = (index, stepId) => {
    this.setState({ stepIndex: index });
    if (this.props.mode === "UPDATE") {
      this.handleOpenStep();
    }
    this.props.getStepId(stepId);
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

    // let width = window.innerWidth;

    return (
      <div>
        <Stepper
          linear={false}
          activeStep={stepIndex}
          orientation="vertical"
          // connector={width > 500 ? <Remove /> : ""}
        >
          {steps.map((step, index) => {
            const renderDurationFormat = step.duration <= 1 ? "hours" : "days";
            const renderStepDuration =
              step.duration <= 1
                ? moment(step.endDate)
                    .diff(moment(step.startDate), "hours", true)
                    .toFixed(0)
                : step.duration;

            const stepTimeLeft = moment(step.endDate).fromNow();
            console.log("step.startDate", step.startDate);
            console.log("Date.now()", Date.now());
            // const stepStatus =
            //   moment(step.startDate) <= Date.now() &&
            //   moment(step.endDate) > Date.now()
            //     ? "In Progress"
            //     : "Not Started";

            const stepStatus = () => {
              if (
                moment(step.startDate) <= Date.now() &&
                moment(step.endDate) > Date.now()
              ) {
                return "In Progress";
              } else if (
                moment(step.startDate) <= Date.now() &&
                moment(step.endDate) < Date.now()
              ) {
                return "Completed";
              } else {
                return "Not Started";
              }
            };

            const renderStep = ` ${
              step.name
            } (${renderStepDuration} ${renderDurationFormat}) `;
            return (
              <Step key={index}>
                <StepButton
                  onClick={() => this.handleStepClick(index, step._id)}
                >
                  {renderStep}
                </StepButton>
                <StepContent>
                  <p>
                    {" "}
                    {`${stepStatus()}, ready ${stepTimeLeft} on ${moment(
                      step.endDate
                    ).format("DD MMM YYYY")} `}
                  </p>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
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
              mode="UPDATE"
              stepid={this.props.timers.selectedStepId}
            />
          </div>
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
