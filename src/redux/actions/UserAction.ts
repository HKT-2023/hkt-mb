import {IUser} from '@app/definitions/TUser';
import {
  IActionTotalUnreadNotifyRequest,
  IActionTotalUnreadNotifySuccess,
  IActionUserInforFailure,
  IActionUserInforRequest,
  IActionUserInforSuccess,
} from '../types/TUser';

function userInforRequest(): IActionUserInforRequest {
  return {
    type: 'USER_INFOR_REQUEST',
    payload: {},
  };
}

function userInforSuccess(user: IUser): IActionUserInforSuccess {
  return {
    type: 'USER_INFOR_SUCCESS',
    payload: {user},
  };
}

function userInforFailure(message: string): IActionUserInforFailure {
  return {
    type: 'USER_INFOR_FAILURE',
    payload: {message},
  };
}

function totalUnreadRequest(): IActionTotalUnreadNotifyRequest {
  return {
    type: 'TOTAL_UNREAD_NOTIFY_REQUEST',
    payload: {},
  };
}

function totalUnreadSuccess(total: number): IActionTotalUnreadNotifySuccess {
  return {
    type: 'TOTAL_UNREAD_NOTIFY_SUCCESS',
    payload: {total},
  };
}

export default {
  userInforRequest,
  userInforSuccess,
  userInforFailure,
  totalUnreadRequest,
  totalUnreadSuccess,
};
