import {
  UMessage,
  openLoading,
  closeLoading,
} from 'react-native-gin-boilerplate';
import AuthAction from '../actions/AuthAction';
import UserAction from '../actions/UserAction';
import UNavigation from '@app/utils/UNavigation';
import {IActionLoginRequest} from '../types/TAuth';
import {getAuthHash} from '@app/api/userManagement';
import {ILoginResponse} from '@app/definitions/TApi';
import authentication from '@app/api/authentication';
import {IResponse} from '@app/definitions/TResponse';
import {call, put, takeLatest} from 'redux-saga/effects';

// Login
function* loginRequestSaga(action: IActionLoginRequest) {
  try {
    openLoading();
    const response: IResponse<ILoginResponse> = yield call(() =>
      authentication.login(action.payload),
    );
    if (response.statusCode === 200 && response.data) {
      const userId = response.data.userId;
      yield put(AuthAction.loginSuccess(response.data));
      yield put(UserAction.userInforRequest());
      UMessage.showSuccessMessage(response.message);
      getAuthHash({userId: userId}).then(res => {
        if (res.data?.hex) {
          // OneSignal.setOneSignalExternalId(userId, res.data?.hex);
        }
      });
      UNavigation.navigate('BOTTOM_TAB', {});
    } else {
      UMessage.showFailMessage(response.message ?? '');
      yield put(AuthAction.loginFailure(response.message ?? ''));
    }
    closeLoading();
  } catch (error) {
    UMessage.showFailMessage(String(error));
    yield put(AuthAction.loginFailure((error as string) ?? ''));
    closeLoading();
  }
}

function* watchAll() {
  yield takeLatest('LOGIN_REQUEST', loginRequestSaga);
}

export default watchAll();
