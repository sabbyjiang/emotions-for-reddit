import { createStore, combineReducers, applyMiddleware } from 'redux';
import user from './reducers/userReducer';
import math from './reducers/mathReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const store = createStore(
  combineReducers({
    user, math
  })
  ,
  {},
  applyMiddleware(logger, thunk)
);

export default store;