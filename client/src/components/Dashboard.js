import React, { Component } from 'react';
import {connect} from 'react-redux'

class Dashboard extends Component {

  render () {
    if(!this.props.auth) {
      return <p>...loading</p>
    }
    const user = this.props.auth
    console.log(user.googleId)
    return (
        <div>
          <h4>Dashboard Component Working</h4>
          <div>
            Your Google id is: {user.googleId}
          </div>
          <div>
            process env is: {process.env.NODE_ENV}
          </div>
          <div>
            process env personal key is: {process.env.REACT_APP_STRIPE_KEY}
          </div>
        </div>
    )
  }
};

const mapStateToProps = (state) => {console.log(state); return {auth: state.auth}}

export default connect(mapStateToProps, null)(Dashboard);
