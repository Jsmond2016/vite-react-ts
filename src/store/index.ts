"use strict"
import { legacy_createStore, combineReducers, compose, applyMiddleware } from "redux"
import reduxThunk from "redux-thunk"
import user from "./user/reducer"
import num from "./num/reducer"

const reducers = combineReducers({
  user,
  num
})
// const store = legacy_createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose
const store = legacy_createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)))
export default store
