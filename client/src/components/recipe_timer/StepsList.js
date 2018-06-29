import React, { Component } from "react";
import { Stepper, Step, StepButton } from "material-ui/Stepper";
import ArrowForwardIcon from "material-ui/svg-icons/navigation/arrow-forward";
import ArrowDownwardIcon from "material-ui/svg-icons/navigation/arrow-downward";
// import StepCard from "./StepCard";

class StepsList extends Component {
  state = {
    stepIndex: 0
  };

  handleStepClick = index => {
    this.setState({ stepIndex: index });
  };

  render() {
    const { steps } = this.props;
    const { stepIndex } = this.state;

    let width = window.innerWidth;

    return (
      <Stepper
        linear={false}
        activeStep={stepIndex}
        orientation={width > 500 ? "horizontal" : "vertical"}
        connector={width > 500 ? <ArrowForwardIcon /> : <ArrowDownwardIcon />}
      >
        {steps.map((step, index) => {
          const renderStep = ` ${step.name} (${step.duration} days) `;
          return (
            <Step key={index}>
              <StepButton onClick={() => this.setState({ stepIndex: index })}>
                {renderStep}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
    );
  }
}

export default StepsList;
