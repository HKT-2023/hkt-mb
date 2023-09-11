import {IUser} from '@app/definitions/TUser';
import {Action} from 'redux';

export type TUser =
  | 'USER_INFOR_REQUEST'
  | 'USER_INFOR_SUCCESS'
  | 'USER_INFOR_FAILURE'
  | 'TOTAL_UNREAD_NOTIFY_REQUEST'
  | 'TOTAL_UNREAD_NOTIFY_SUCCESS';

export interface IActionUserInforRequest extends Action<TUser> {
  payload: Record<string, unknown>;
}

export interface IActionUserInforSuccess extends Action<TUser> {
  payload: {
    user: IUser | null;
  };
}

export interface IActionUserInforFailure extends Action<TUser> {
  payload: {
    message: string;
  };
}

export interface IActionTotalUnreadNotifyRequest extends Action<TUser> {
  payload: Record<string, unknown>;
}

export interface IActionTotalUnreadNotifySuccess extends Action<TUser> {
  payload: {
    total: number;
  };
}

export type TActionsUser = IActionUserInforRequest &
  IActionUserInforSuccess &
  IActionUserInforFailure &
  IActionTotalUnreadNotifyRequest &
  IActionTotalUnreadNotifySuccess;

export type TUserState = {
  user: IUser | null;
  totalUnreadNotify: number;
};
