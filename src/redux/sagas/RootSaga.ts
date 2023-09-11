import {all} from 'redux-saga/effects';
import AuthSaga from './AuthSaga';
import UserSaga from './UserSaga';

const RootSaga = function* root() {
  yield all([...AuthSaga, ...UserSaga]);
};

export default RootSaga;
