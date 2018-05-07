import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import Avatar from 'material-ui/Avatar';

class LogIn extends Component {

  renderLogin = () => {
    switch (this.props.user) {
      case null:
        return
      case false:
        return (
          <a href={process.env.REACT_APP_GOOGLE_AUTH_LOGIN} style={{ textDecoration: 'none' }}>
            <MenuItem primaryText="Login" leftIcon={<AccountCircle />} />
          </a>
        )
      default:
        return (
          <a href={process.env.REACT_APP_GOOGLE_AUTH_LOGOUT} style={{ textDecoration: 'none' }}>
            <MenuItem primaryText='Logout' leftIcon={<Avatar src={this.props.user.photo} />} />
          </a>
        )
    }
  }

  render() {
    return (
      <div>
        {this.renderLogin()}
      </div>
    )
  }
};

export default LogIn
