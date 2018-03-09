import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {connect} from 'react-redux'

import LogIn from './LogIn';

class Header extends Component {

  render () {
    return (
      <AppBar
        title="eLiquid Lab"
        onLeftIconButtonTouchTap={this.props.handleToggle}
        iconElementRight={<LogIn user={this.props.user}/>}
      />
    )
  }
};

const mapStateToProps = (state) => { return {user: state.user}}

export default connect(mapStateToProps, null)(Header);
