import React, { Component } from "react";
import CommentForm from "./CommentForm";
import { Row, Col } from "react-flexbox-grid";
import CommentsList from "./CommentsList";
import { connect } from "react-redux";
import _ from "lodash";

class CommentsContainer extends Component {
  render() {
    const sortedComments = _
      .sortBy(this.props.timers.selectedTimer.comments, "creationDate")
      .reverse();

    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <CommentForm />
        </Col>
        <Col xs={12} sm={12} md={12} lg={12}>
          <CommentsList comments={sortedComments} />
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = state => {
  return { timers: state.timers };
};

export default connect(mapStateToProps)(CommentsContainer);

// _.sortBy(this.props.timers.selectedTimer.comments, "creationDate");
