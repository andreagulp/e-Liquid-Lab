import React, { Component } from "react";
import CommentCard from "./CommentCard";

class CommentsList extends Component {
  render() {
    const { comments } = this.props;
    return (
      <div>
        {comments.map((comment, index) => {
          return <CommentCard key={index} comment={comment} />;
        })}
      </div>
    );
  }
}

export default CommentsList;
