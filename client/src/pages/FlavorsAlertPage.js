import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

import {getFlavorAlertList} from '../selectors';
import {fetchFlavors} from '../actions/flavors_action';

import FlavorList from '../components/commons/FlavorsList';

class FlavorAlertsPage extends Component {
  componentDidMount = () => {
    this.props.fetchFlavors()
  }

  render () {
    // console.log('this.props.flavorAlertList', this.props.flavorAlertList)
    return (
      <div>
        <FlavorList flavors={this.props.flavorAlertList}/>
      </div>
    )
  }
};

const mapStateToProps = (state) => {return {flavorAlertList: getFlavorAlertList(state)}}
const mapDispatchToProps  = (dispatch) => bindActionCreators({fetchFlavors}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FlavorAlertsPage);
