import React, { Component } from "react";
import { Row, Col } from "react-flexbox-grid";
import { Tabs, Tab } from "material-ui/Tabs";

import FlavorForm from "../components/flavor_form/FlavorForm";
import FlavorUsageSummary from "../components/flavor_detail_page/FlavorUsageSummary";
import FlavorUsageList from "../components/flavor_detail_page/FlavorUsageList";

class FlavorDetailPage extends Component {
  render() {
    return (
      <Row style={{ margin: "0 1px 0 1px" }}>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Tabs style={{ marginTop: "5px" }}>
            <Tab
              label="FLAVOR"
              style={{ backgroundColor: "#673AB7" }}
              icon={<i className="fa fa-flask" aria-hidden="true" />}
            >
              <Col xs={12} sm={12} md={12} lg={12}>
                <FlavorForm
                  mode="UPDATE"
                  history={this.props.history}
                  flavorid={this.props.match.params.flavorid}
                />
              </Col>
            </Tab>
            {/* <Tab
              label="REVIEWS"
              style={{backgroundColor: "#673AB7"}}
            >
              <Col xs={12} sm={12} md={12} lg={12}>
                Something
              </Col>
            </Tab> */}
            <Tab
              label="USAGE"
              style={{ backgroundColor: "#673AB7" }}
              icon={<i className="fa fa-bar-chart" aria-hidden="true" />}
            >
              <Col xs={12} sm={12} md={12} lg={12}>
                <FlavorUsageSummary
                  flavorId={this.props.match.params.flavorid}
                />
                <FlavorUsageList flavorId={this.props.match.params.flavorid} />
              </Col>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    );
  }
}

export default FlavorDetailPage;
