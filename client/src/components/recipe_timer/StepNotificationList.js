import React, { Component } from "react";
import moment from "moment";
import { List, ListItem } from "material-ui/List";
import Subheader from "material-ui/Subheader";
import Divider from "material-ui/Divider";
import _ from "lodash";
import { Link } from "react-router-dom";
import Toggle from "material-ui/Toggle";

class StepNotificationList extends Component {
  render() {
    let {
      stepsNotifications,
      showMoreStepNotifications,
      handleShowMoreStepNotifications,
      recipeId
    } = this.props;
    stepsNotifications = _.sortBy(stepsNotifications, "endDate").reverse();
    return (
      <List>
        <div>
          <Subheader>Step Notifications</Subheader>
          <Toggle
            label="Show All"
            labelPosition="right"
            style={{ marginLeft: "15px" }}
            onToggle={handleShowMoreStepNotifications}
            toggled={showMoreStepNotifications}
          />
        </div>
        {stepsNotifications.map((step, i) => {
          return (
            <div key={i}>
              <Link
                to={`/timers/${recipeId}/${step.timerId}`}
                style={{ textDecoration: "none" }}
              >
                <ListItem
                  primaryText={` Step ${step.name} (Timer ${step.timerName})`}
                  // rightIcon="click"
                  secondaryText={
                    <p>
                      {`Completed on ${moment(step.endDate).format(
                        "DD MMM YYYY HH:MM"
                      )} `}
                    </p>
                  }
                />
              </Link>
              <Divider inset={false} />
            </div>
          );
        })}
      </List>
    );
  }
}

export default StepNotificationList;
