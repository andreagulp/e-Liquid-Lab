import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise'
import reduxThunk from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import reducers from './reducers';
import './index.css';
import App from './App';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, reduxThunk)(createStore)
// const store = createStore(reducers, {}, applyMiddleware(promiseMiddleware, reduxThunk));

ReactDOM.render(
  // <Provider store={store}>
  <Provider store={createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>
  , document.getElementById('root'));