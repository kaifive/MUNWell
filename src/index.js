import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'core-js';
import './polyfill'

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { icons } from './assets/icons'

import { Provider } from 'react-redux'
import store from './store'

import { Auth0Provider } from "@auth0/auth0-react";

require('dotenv').config()

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

React.icons = icons

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={`${window.location.origin}/MUNWell/#/dashboard`}
  >
    <Provider store={store}>
      <App />
    </Provider>,
  </Auth0Provider>,
  document.getElementById('root')
);