import {ILoginPayload} from '@app/definitions/TApi';
import {TUserRole} from '@app/definitions/TUser';
import {Action} from 'redux';

export type TAuth =
  | 'LOGIN_REQUEST'
  | 'LOGIN_SUCCESS'
  | 'LOGIN_FAILURE'
  | 'LOGOUT';

export interface IActionLoginRequest extends Action<TAuth> {
  payload: ILoginPayload;
}

export interface IActionLoginSuccess extends Action<TAuth> {
  payload: {
    jwtAccessToken: string | null;
    userId: string | null;
    role: TUserRole | null;
  };
}

export interface IActionLoginFailure extends Action<TAuth> {
  payload: {
    message: string;
  };
}

export interface IActionLogout extends Action<TAuth> {
  payload: {
    message: string;
  };
}

export type TActionsAuth = IActionLogout &
  IActionLoginRequest &
  IActionLoginSuccess &
  IActionLoginFailure;

export type TAuthState = {
  isAuthenticated: boolean;
  jwtAccessToken: string | null;
  userId: string | null;
  role: TUserRole | null;
};
