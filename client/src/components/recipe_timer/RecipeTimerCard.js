import React, { Component } from "react";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";

class RecipeTimerCard extends Component {
  render() {
    const { timer } = this.props;
    return (
      <Card style={{ margin: "10px 0 10px 0" }}>
        <CardHeader title={timer.name} subtitle="Subtitle" />

        <CardText>
          <p> {timer.creationDate} </p>
        </CardText>

        <CardActions>
          <FlatButton label="Action1" />
          <FlatButton label="Action2" />
        </CardActions>
      </Card>
    );
  }
}

export default RecipeTimerCard;
