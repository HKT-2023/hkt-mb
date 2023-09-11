import {IUser} from '@app/definitions/TUser';
import UserAction from '../actions/UserAction';
import {IResponse} from '@app/definitions/TResponse';
import userManagement from '@app/api/userManagement';
import {call, put, takeLatest} from 'redux-saga/effects';
import notificationManagement from '@app/api/notificationManagement';
import {
  closeLoading,
  Logger,
  openLoading,
  UMessage,
} from 'react-native-gin-boilerplate';

// Get User Information
function* userInforRequestSaga() {
  try {
    openLoading();
    const response: IResponse<IUser> = yield call(() =>
      userManagement.getUserInformation(),
    );
    if (response.statusCode === 200 && response.data) {
      yield put(UserAction.userInforSuccess(response.data));
    } else {
      UMessage.showFailMessage(response.message ?? '');
      yield put(UserAction.userInforFailure(response.message ?? ''));
    }
    closeLoading();
  } catch (error) {
    UMessage.showFailMessage(String(error));
    yield put(UserAction.userInforFailure((error as string) ?? ''));
    closeLoading();
  }
}

// Get total unread notifications
function* totalUnreadRequestSaga() {
  try {
    const response: IResponse<number> = yield call(() =>
      notificationManagement.getTotalUnread(),
    );
    if (response.statusCode === 200) {
      yield put(UserAction.totalUnreadSuccess(response.data ?? 0));
    }
  } catch (error) {
    Logger.error(error);
  }
}

function* watchAll() {
  yield takeLatest('USER_INFOR_REQUEST', userInforRequestSaga);
  yield takeLatest('TOTAL_UNREAD_NOTIFY_REQUEST', totalUnreadRequestSaga);
}

export default watchAll();
