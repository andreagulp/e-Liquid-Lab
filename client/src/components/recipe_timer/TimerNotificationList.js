import React, { Component } from "react";
import moment from "moment";
import { List, ListItem } from "material-ui/List";
import Subheader from "material-ui/Subheader";
import Divider from "material-ui/Divider";
import _ from "lodash";
import { Link } from "react-router-dom";
import Toggle from "material-ui/Toggle";

class TimerNotificationList extends Component {
  render() {
    let {
      timerNotifications,
      handleShowMoreTimerNotifications,
      showMoreTimerNotifications
    } = this.props;

    timerNotifications = _.sortBy(timerNotifications, "timerEnd").reverse();

    return (
      <List>
        <div>
          <Subheader>Timer Notifications</Subheader>
          <Toggle
            label="Show All"
            labelPosition="right"
            style={{ marginLeft: "15px" }}
            onToggle={handleShowMoreTimerNotifications}
            toggled={showMoreTimerNotifications}
          />
        </div>
        {timerNotifications.map((timer, i) => {
          return (
            <div key={i}>
              <Link
                to={`/timers/${timer._id}`}
                style={{ textDecoration: "none" }}
              >
                <ListItem
                  primaryText={`Timer ${timer.name}`}
                  // rightIcon="click"
                  secondaryText={
                    <p>
                      {`Completed on ${moment(timer.timerEnd).format(
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

export default TimerNotificationList;
