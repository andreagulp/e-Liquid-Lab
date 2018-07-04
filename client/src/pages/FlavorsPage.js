import React, { Component } from "react";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Row, Col } from "react-flexbox-grid";
import Dialog from "material-ui/Dialog";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "../components/commons/dialog.css";

import { fetchFlavors, deleteFlavor } from "../actions/flavors_action";
import { getVisibleFlavors } from "../selectors/flavorsFiltered_selector";
import { fetchUser } from "../actions/user_action";
import FlavorsList from "../components/commons/FlavorsList";
import FlavorForm from "../components/flavor_form/FlavorForm";

class FlavorsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  componentDidMount = () => {
    this.props.fetchFlavors();
    // this.props.fetchUser()
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <FlavorsList flavors={this.props.flavors} />
        </Col>

        <FloatingActionButton
          style={{ position: "fixed", bottom: 20, right: 20 }}
          onClick={this.handleOpen}
        >
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Add Flavor to Inventory"
          modal={true}
          open={this.state.open}
          repositionOnUpdate={false}
          autoDetectWindowHeight={false}
          autoScrollBodyContent={false}
          className="dialog-root"
          contentClassName="dialog-content"
          bodyClassName="dialog-body"
        >
          <div className="dialog-scroll">
            <FlavorForm
              mode="CREATE"
              handleClose={this.handleClose}
              flavorid={this.props.match.params.flavorid}
            />
          </div>
        </Dialog>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    // flavors: state.flavors,
    flavors: getVisibleFlavors(state)
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchFlavors, deleteFlavor, fetchUser }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlavorsPage);
