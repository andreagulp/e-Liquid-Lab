import React, { Component } from "react";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import { Row, Col } from "react-flexbox-grid";
import Avatar from "material-ui/Avatar";
import Paper from "material-ui/Paper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AccountCircle from "material-ui/svg-icons/action/account-circle";

import { fetchRecipeReview, addReview } from "../../actions/reviews_action";

class PublicRecipeReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  handleFieldChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  enableSubmit = () => {
    const text = this.state.text;
    if (!text.length > 0) {
      return true;
    }
    return false;
  };

  submitReview = () => {
    const newReview = {
      text: this.state.text,
      recipeId: this.props.recipeId
    };
    this.props.addReview(newReview, this.props.recipeId);
    this.setState({ text: "" });
  };

  render() {
    const { user } = this.props;
    return (
      <Paper zDepth={3} style={{ margin: "10px 0 10px 0" }}>
        <form>
          <Row>
            <Col xs={2} sm={2} md={1} lg={1}>
              {user ? (
                <Avatar
                  size={50}
                  src={user.photo}
                  style={{ margin: "10px 30px 0 10px" }}
                />
              ) : (
                <AccountCircle />
              )}
            </Col>
            <Col xs={7} sm={7} md={8} lg={8}>
              <TextField
                name="comment"
                hintText="add a comment..."
                floatingLabelText="Comment"
                fullWidth={true}
                multiLine={true}
                rows={1}
                rowsMax={175}
                onChange={this.handleFieldChange}
                value={this.state.text}
              />
            </Col>
            <Col xs={3} sm={3} md={3} lg={3}>
              <FlatButton
                label="Submit"
                primary={true}
                onClick={this.submitReview}
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
  return { reviews: state.reviews, user: state.user };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchRecipeReview, addReview }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicRecipeReviewForm);
