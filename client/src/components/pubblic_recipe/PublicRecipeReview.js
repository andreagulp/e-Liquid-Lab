import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col } from "react-flexbox-grid";

import PublicRecipeReviewForm from "./PublicRecipeReviewForm";
import PublicRecipeReviewList from "./PublicRecipeReviewList";
import { fetchRecipeReview } from "../../actions/reviews_action";

class PublicRecipeReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openReviewForm: false
    };
  }

  componentDidMount = () => {
    this.props.fetchRecipeReview(this.props.recipeId);
  };

  handleOpenReviewForm = () => {
    this.setState({ openReviewForm: true });
  };
  handleCloseReviewForm = () => {
    this.setState({ openReviewForm: false });
  };

  render() {
    const { user, reviews, recipeId } = this.props;
    return (
      <div>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            {user ? (
              <PublicRecipeReviewForm
                handleCloseReviewForm={this.handleCloseReviewForm}
                recipeId={recipeId}
              />
            ) : (
              <div>You need to be logged in to add a comment</div>
            )}
          </Col>
        </Row>
        <PublicRecipeReviewList reviews={reviews} user={user} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { reviews: state.reviews, user: state.user };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchRecipeReview }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicRecipeReview);
// export default PublicRecipeReview
