import React, { Component } from "react";
import { Row, Col } from "react-flexbox-grid";
import RecipeTimerCard from "./RecipeTimerCard";

//recipeid={this.props.recipeid}

class RecipeTimersList extends Component {
  render() {
    const { timersList, handleOpenEditTimer } = this.props;

    return (
      <Row>
        {timersList.map(timer => {
          return (
            <Col xs={12} sm={6} md={6} lg={4} key={timer._id}>
              <RecipeTimerCard
                timer={timer}
                handleOpenEditTimer={handleOpenEditTimer}
                recipeid={this.props.recipeid}
              />
            </Col>
          );
        })}
      </Row>
    );
  }
}

export default RecipeTimersList;
