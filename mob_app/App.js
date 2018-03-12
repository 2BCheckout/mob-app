/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import configureStore from './src/Store';
import AppWithNavigationState from './src/navigation/containers/AppWithNavigationState';
import axios from 'axios';
import { API_URL } from './src/Constants';

const { persistor, store } = configureStore();
axios.defaults.baseURL = API_URL;

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>

          <AppWithNavigationState/>

        </PersistGate>
      </Provider>
    );
  }
}
