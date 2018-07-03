import React, { Component } from "react";
import Divider from "material-ui/Divider";
import { Card, CardHeader, CardText } from "material-ui/Card";

class CommentCard extends Component {
  render() {
    const { comment } = this.props;
    return (
      <div>
        <Card style={{ boxShadow: "white" }}>
          <CardHeader
            title={`${comment.daysSince} days since start `}
            // subtitle={moment(review.creationDate).format('DD MMM YYYY')}
            // avatar={review._user.photo}
          />

          <CardText>{comment.text}</CardText>
        </Card>
        <Divider />
      </div>
    );
  }
}

export default CommentCard;
