import 'regenerator-runtime/runtime';
import React, { Component } from 'react';
import Config from 'react-native-config';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger';

import reducer from './src/ducks';
import Router from './src/Router';
import rootSaga from './src/sagas';

const loggerMiddleware = createLogger({ predicate: (getState, action) => { return __DEV__; } });
const sagaMiddleware = createSagaMiddleware();

function configureStore(initialState) {
  const enhancer = compose(applyMiddleware(sagaMiddleware));
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});
sagaMiddleware.run(rootSaga);

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router />
      </Provider>
    );
  }
}

// 에뮬레이터 경고창 없애기
console.disableYellowBox = true;

export default App;

AppRegistry.registerComponent('bbbbbb', () => App);
