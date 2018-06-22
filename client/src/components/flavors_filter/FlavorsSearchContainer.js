import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import SearchBar from "../commons/SearchBar";
import { searchFlavor } from "../../actions/flavorsFilter_action";
import { getVisibleFlavors } from "../../selectors/flavorsFiltered_selector";

class FlavorsSearchContainer extends Component {
  handleFieldChange = e => {
    e.preventDefault();
    this.props.searchFlavor(e.target.value);
  };

  componentWillUnmount = () => {
    this.props.searchFlavor("");
  };

  render() {
    return (
      <SearchBar
        handleFieldChange={this.handleFieldChange}
        keyword={this.props.flavorsFilter.keyword}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    flavorsFilter: state.flavorsFilter,
    flavors: state.flavors,
    visibleFlavors: getVisibleFlavors(state)
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ searchFlavor }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlavorsSearchContainer);
