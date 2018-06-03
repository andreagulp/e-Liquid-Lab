import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Row, Col } from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchFlavors, deleteFlavor } from '../actions/flavors_action';
import { fetchUser } from '../actions/user_action';
import FlavorsList from '../components/commons/FlavorsList';
import FlavorForm from '../components/flavor_form/FlavorForm';


class FlavorsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  componentDidMount = () => {
    this.props.fetchFlavors();
    // this.props.fetchUser()
  }

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
          <FlavorsList flavors={this.props.flavors.inventoryFlavors} />
        </Col>

        <FloatingActionButton
          style={{ position: 'fixed', bottom: 20, right: 20 }}
          onClick={this.handleOpen}
        >
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Add Flavor to Inventory"
          modal={true}
          open={this.state.open}
          contentStyle={{ width: '98%', maxWidth: '98%', }}
          // contentStyle={{ height: '98%', maxHeight: '98%', width: '80%', maxWidth: '98%' }}
          autoScrollBodyContent={true}
        >
          <FlavorForm
            mode="CREATE"
            handleClose={this.handleClose}
            flavorid={this.props.match.params.flavorid}
          />
        </Dialog>
      </Row>
    )
  }
};

const mapStateToProps = (state) => { return { flavors: state.flavors } }
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchFlavors, deleteFlavor, fetchUser }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FlavorsPage)
