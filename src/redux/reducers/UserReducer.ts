import {TActionsUser, TUserState} from '../types/TUser';

const initialState: TUserState = {
  user: null,
  totalUnreadNotify: 0,
};

function UserReducer(state = initialState, action: TActionsUser): TUserState {
  switch (action.type) {
    case 'TOTAL_UNREAD_NOTIFY_SUCCESS':
      return {
        ...state,
        totalUnreadNotify: action.payload.total,
      };
    case 'USER_INFOR_FAILURE':
      return {
        ...state,
        user: null,
      };
    case 'USER_INFOR_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
      };
    case 'TOTAL_UNREAD_NOTIFY_REQUEST':
    case 'USER_INFOR_REQUEST':
    default:
      return state;
  }
}

export default UserReducer;
