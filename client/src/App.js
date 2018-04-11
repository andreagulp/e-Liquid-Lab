import React, { Component } from 'react';
// import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CircularProgress from 'material-ui/CircularProgress';

import { fetchUser } from './actions/user_action'
import Header from './components/Header';
import Navigation from './components/Navigation';
import RecipesPage from './pages/RecipesPage';
import FlavorsPage from './pages/FlavorsPage';
import FlavorDetailPage from './pages/FlavorDetailPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import FlavorForm from './components/flavor_form/FlavorForm';
import RecipeForkPage from './pages/RecipeForkPage';
import FlavorsAlertPage from './pages/FlavorsAlertPage';
import PublicRecipesPage from './pages/PublicRecipesPage'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  componentDidMount = () => {
    this.props.fetchUser()
  }

  handleToggle = () => this.setState({ open: !this.state.open });
  handleClose = () => this.setState({ open: false });

  render() {
    if (!this.props) {
      return (
        <CircularProgress size={60} thickness={7} />
      )
    }
    // console.log('USER', this.props.user)
    return (
      <div>
        <BrowserRouter>
          <div>

            <Header
              handleToggle={this.handleToggle}
              handleClose={this.handleClose}
              open={this.state.open}
            />
            <Navigation
              handleToggle={this.handleToggle}
              handleClose={this.handleClose}
              open={this.state.open}
            />
            <Switch>
              <Route path="/recipes/fork/:recipeid" component={RecipeForkPage} />
              <Route path="/flavors/:flavorid" component={FlavorDetailPage} />
              <Route path="/recipes/:recipeid" component={RecipeDetailPage} />
              <Route path="/public-recipes" component={PublicRecipesPage} />
              <Route path="/recipes" component={RecipesPage} />
              <Route path="/flavors" component={FlavorsPage} />
              <Route path="/flavors-alert-page" component={FlavorsAlertPage} />
              <Route path="/createflavor" component={FlavorForm} />
              <Route path="/" component={PublicRecipesPage} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
};

const mapStateToProps = (state) => { return { user: state.user } }
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch)

export default compose(
  // withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App)