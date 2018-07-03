import React, { Component } from "react";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import moment from "moment";
import { Link } from "react-router-dom";

class RecipeTimerCard extends Component {
  render() {
    const { timer } = this.props;

    const timeLeft = moment(timer.timerEnd).fromNow();

    return (
      <Card style={{ margin: "10px 0 10px 0" }}>
        <CardHeader
          title={timer.name}
          subtitle={`created on ${moment(timer.creationDate).format(
            "DD MMM YYYY"
          )}`}
          actAsExpander={true}
          showExpandableButton={true}
        />

        <CardText>
          <h3>{`Ready ${timeLeft}`}</h3>
        </CardText>
        <CardText expandable={true}>
          <ol>
            {timer.steps.map(step => {
              return (
                <li key={step._id}>
                  {`${step.name} (ready ${moment(step.endDate).fromNow()})`}{" "}
                </li>
              );
            })}
          </ol>
        </CardText>

        <CardActions style={{ textAlign: "right" }}>
          <Link to={`/timers/${timer._id}`} style={{ textDecoration: "none" }}>
            <FlatButton label="open" primary={true} />
          </Link>
        </CardActions>
      </Card>
    );
  }
}

export default RecipeTimerCard;
