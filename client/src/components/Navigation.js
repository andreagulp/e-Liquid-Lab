import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Book from 'material-ui/svg-icons/action/book';
import CardTravel from 'material-ui/svg-icons/action/card-travel';
import BatteryAlert from 'material-ui/svg-icons/device/battery-alert';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';

import LogIn from './LogIn';


class Navigation extends Component {

  render() {

    const { user } = this.props

    return (
      <div >
        <Drawer
          docked={false}
          width={200}
          open={this.props.open}
          onRequestChange={this.props.handleToggle}
        >
          <Link to="/recipes" style={{ textDecoration: 'none' }}>
            <MenuItem primaryText="Recipes" leftIcon={<Book />} onClick={this.props.handleClose} />
          </Link>
          {
            user ?
              <div>
                <Link to="/flavors" style={{ textDecoration: 'none' }}>
                  <MenuItem primaryText="My Flavors" leftIcon={<CardTravel />} onClick={this.props.handleClose} />
                </Link>
                <Link to="/flavors-alert-page" style={{ textDecoration: 'none' }}>
                  <MenuItem primaryText="My Flavors alert" leftIcon={<BatteryAlert />} onClick={this.props.handleClose} />
                </Link>
              </div> :

              <div></div>
          }

          <Divider />
          <LogIn user={user} />
        </Drawer>
      </div>
    )
  }
};

const mapStateToProps = (state) => { return { user: state.user } }

export default connect(mapStateToProps, null)(Navigation)
