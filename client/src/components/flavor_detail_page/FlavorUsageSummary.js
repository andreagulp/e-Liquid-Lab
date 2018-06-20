import React, { Component } from "react";
import Paper from "material-ui/Paper";
import { Row, Col } from "react-flexbox-grid";
import { List, ListItem } from "material-ui/List";
import Avatar from "material-ui/Avatar";
import { blue500, greenA200, orange500 } from "material-ui/styles/colors";
import { connect } from "react-redux";

import { flavorUsageMetrics } from "../../selectors/flavors_selector";

class FlavorUsageSummary extends Component {
  render() {
    const flavorMetrics = this.props.flavorMetrics;
    // console.log('metrics', this.props.flavorMetrics)
    return (
      <Paper zDepth={1} style={{ marginTop: "10px" }}>
        <Row>
          <Col xs={6} sm={6} md={6} lg={6}>
            <List>
              <ListItem
                leftAvatar={
                  <Avatar
                    color={blue500}
                    icon={<i className="fa fa-industry" aria-hidden="true" />}
                  />
                }
                primaryText="Total ml Produced"
                secondaryText={`${parseFloat(flavorMetrics.totMlUsed).toFixed(
                  1
                )} ml`}
              />
              <ListItem
                leftAvatar={
                  <Avatar
                    color={greenA200}
                    icon={<i className="fa fa-folder-o" aria-hidden="true" />}
                  />
                }
                primaryText="Total number of Recipes"
                secondaryText={`${flavorMetrics.countRecipesWithFlavor}`}
              />
            </List>
          </Col>
          <Col xs={6} sm={6} md={6} lg={6}>
            <List>
              <ListItem
                leftAvatar={
                  <Avatar
                    color={orange500}
                    icon={<i className="fa fa-flask" aria-hidden="true" />}
                  />
                }
                primaryText="Average Percentage of Flavor"
                secondaryText={`${parseFloat(flavorMetrics.percArray).toFixed(
                  1
                )} %`}
              />
            </List>
          </Col>
        </Row>
      </Paper>
    );
  }
}
const mapStateToProps = state => {
  return { flavorMetrics: flavorUsageMetrics(state) };
};

export default connect(mapStateToProps)(FlavorUsageSummary);
