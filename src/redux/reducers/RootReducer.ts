import {combineReducers} from 'redux';
import AppReducer from './AppReducer';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import MKPFilterReducer from './MKPFilterReducer';

const RootReducer = combineReducers({
  AppReducer,
  AuthReducer,
  UserReducer,
  MKPFilterReducer,
});

export default RootReducer;
