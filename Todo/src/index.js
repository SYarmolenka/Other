import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import combineReducers from './reducers/index';
import 'semantic-ui-css/semantic.min.css';
import "./style.css";
import {App} from './app';

const store = createStore(combineReducers, composeWithDevTools(applyMiddleware(thunk)));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
