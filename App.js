import React, { Component } from 'react';
import Config from 'react-native-config';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { createLogger } from 'redux-logger';

import reducer from './src/reducers';
import Router from './src/Router';

const loggerMiddleware = createLogger({ predicate: (getState, action) => { return __DEV__; } });

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(loggerMiddleware)
  );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router />
      </Provider>
    );
  }
}

console.disableYellowBox = true;

export default App;

AppRegistry.registerComponent('bbbbbb', () => App);
