import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getVisibleFlavorsAlert } from "../selectors/flavorsFiltered_selector";
import { fetchFlavors } from "../actions/flavors_action";
import FlavorList from "../components/commons/FlavorsList";

class FlavorAlertsPage extends Component {
  componentDidMount = () => {
    this.props.fetchFlavors();
  };

  render() {
    return (
      <div>
        <FlavorList flavors={this.props.flavorAlertList} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { flavorAlertList: getVisibleFlavorsAlert(state) };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchFlavors }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlavorAlertsPage);
