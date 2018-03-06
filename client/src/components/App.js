import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import {connect} from 'react-redux'

import * as actions from '../actions'
import Header from './Header';
import Dashboard from './Dashboard';
import Home from './Home';

class App extends Component {

  componentDidMount = () => {
    this.props.fetchUser()
  }

  render () {
    return (
        <div>
          <Header />
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
    )
  }
};



export default connect(null, actions)(App);
