import React, { Component } from "react";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import { Row, Col } from "react-flexbox-grid";
import Paper from "material-ui/Paper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

import {
  updateCommentField,
  addComment,
  cleanSelectedComment
} from "../../actions/timers_action";

class CommentForm extends Component {
  handleFieldChange = e => {
    this.props.updateCommentField(e.target.value, e.target.name);
  };

  enableSubmit = () => {
    const selectedComment = this.props.timers.selectedComment;
    if (!selectedComment.text.length > 0) {
      return true;
    }
    return false;
  };

  addComment = () => {
    const { selectedComment, selectedTimer } = this.props.timers;
    const newComment = {
      creationDate: moment(Date.now()).format("YYYY-MM-DDTHH:mm:ss.SSSSZ"),
      text: selectedComment.text,
      daysSince: parseInt(
        moment(Date.now()).diff(selectedTimer.creationDate, "days"),
        10
      ).toFixed(0)
    };
    console.log("newComment", newComment);
    this.props.addComment(newComment);
    this.props.cleanSelectedComment();
  };

  render() {
    const { selectedComment } = this.props.timers;
    return (
      <Paper zDepth={5} style={{ margin: "10px 0 10px 0" }}>
        <form>
          <Row>
            <Col xs={7} sm={7} md={8} lg={8}>
              <TextField
                name="text"
                hintText="add a comment..."
                floatingLabelText="Comment"
                fullWidth={true}
                multiLine={true}
                rows={3}
                rowsMax={175}
                onChange={this.handleFieldChange}
                value={selectedComment.text}
                style={{ marginLeft: "10px" }}
              />
            </Col>
            <Col xs={3} sm={3} md={3} lg={3}>
              <FlatButton
                label="ADD"
                primary={true}
                onClick={this.addComment}
                disabled={this.enableSubmit()}
                style={{ marginTop: "30px" }}
              />
            </Col>
          </Row>
        </form>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return { timers: state.timers };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { updateCommentField, addComment, cleanSelectedComment },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm);
