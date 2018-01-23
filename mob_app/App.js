/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import configureStore from './src/Store';
import Test from './Test';



import { AuthSuccess } from './src/auth/AuthAction';

const { persistor, store } = configureStore();

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>

          <Test/>

        </PersistGate>
      </Provider>
    );
  }
}
