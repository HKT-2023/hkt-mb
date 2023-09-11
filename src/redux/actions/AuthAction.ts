import {ILoginPayload, ILoginResponse} from '@app/definitions/TApi';
import {
  IActionLoginFailure,
  IActionLoginRequest,
  IActionLoginSuccess,
  IActionLogout,
} from '../types/TAuth';

function loginRequest(payload: ILoginPayload): IActionLoginRequest {
  return {
    type: 'LOGIN_REQUEST',
    payload,
  };
}

function loginSuccess(payload: ILoginResponse): IActionLoginSuccess {
  return {
    type: 'LOGIN_SUCCESS',
    payload: {
      jwtAccessToken: payload.accessToken,
      role: payload.role,
      userId: payload.userId,
    },
  };
}

function loginFailure(message: string): IActionLoginFailure {
  return {
    type: 'LOGIN_FAILURE',
    payload: {message},
  };
}

function logout(message?: string): IActionLogout {
  return {
    type: 'LOGOUT',
    payload: {message: message ?? ''},
  };
}

export default {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
};
