import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col } from "react-flexbox-grid";

import { fetchSingleRecipeTimer } from "../../actions/timers_action";
import RecipeTimersList from "./RecipeTimersList";

class TimerContainer extends Component {
  componentDidMount = () => {
    this.props.fetchSingleRecipeTimer(this.props.recipeid);
  };
  render() {
    // const { recipeid } = this.props;
    const { timersList } = this.props.timers;
    return (
      <Row>
        <Col xs={12} sm={8} md={8} lg={8}>
          <RecipeTimersList timersList={timersList} />
        </Col>
        <Col xs={12} sm={4} md={4} lg={4}>
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
