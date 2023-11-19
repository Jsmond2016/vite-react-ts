'use strict';
import { applyMiddleware, combineReducers, compose, legacy_createStore } from 'redux';
import reduxThunk from 'redux-thunk';

import num from './num/reducer';
import user from './user/reducer';

const reducers = combineReducers({
  user,
  num,
});
// const store = legacy_createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;
const store = legacy_createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));
export default store;
