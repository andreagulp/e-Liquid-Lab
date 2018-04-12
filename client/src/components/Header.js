import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';

import LogIn from './commons/LogIn';

class Header extends Component {

  renderTitle = () => {
    switch (window.location.pathname) {
      case '/':
        return 'Shared Recipes'
      case '/public-recipes':
        return 'Shared Recipes'
      case '/recipes':
        return 'My Recipes'
      case '/flavors':
        return 'My Flavors'
      case '/flavors-alert-page':
        return 'Flavors Alert'
      default:
        return window.location.pathname;
    }
  }

  render() {
    // console.log('Header', window.location.pathname)
    return (
      <AppBar
        title={this.renderTitle()}
        onLeftIconButtonTouchTap={this.props.handleToggle}
        iconElementRight={<LogIn user={this.props.user} />}
      />
    )
  }
};

const mapStateToProps = (state) => { return { user: state.user } }

export default connect(mapStateToProps, null)(Header);
