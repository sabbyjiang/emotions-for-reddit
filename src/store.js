import { createStore, combineReducers, applyMiddleware } from 'redux';
import user from './reducers/userReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const store = createStore(
  // combineReducers({
    user
  // })
  ,
  // {},
  applyMiddleware(logger, thunk)
);

export default store;