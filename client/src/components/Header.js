import React, { Component } from 'react';
import {connect} from 'react-redux'

class Header extends Component {

  renderContent = () => {
    switch(this.props.auth) {
      case null:
        return
      case false:
        return <a href="/auth/google">Sign in</a>
      default:
        return <a href="/api/logout">log out</a>
    }
  }

  render () {
    console.log(this.props)
    return (
        <div>
          <nav>
            <div>
              <h1>Header Component Working</h1>
              {this.renderContent()}
            </div>
          </nav>
        </div>
    )
  }
};

const mapStateToProps = (state) => {console.log(state); return {auth: state.auth}}

export default connect(mapStateToProps, null)(Header);
