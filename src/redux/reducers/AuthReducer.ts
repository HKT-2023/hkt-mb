import {TActionsAuth, TAuthState} from '../types/TAuth';

const initialState: TAuthState = {
  isAuthenticated: false,
  jwtAccessToken: null,
  userId: null,
  role: null,
};

function AuthReducer(state = initialState, action: TActionsAuth): TAuthState {
  switch (action.type) {
    case 'LOGIN_REQUEST':
    case 'LOGOUT':
    case 'LOGIN_FAILURE':
      return {
        isAuthenticated: false,
        jwtAccessToken: null,
        userId: null,
        role: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        role: action.payload.role,
        userId: action.payload.userId,
        jwtAccessToken: action.payload.jwtAccessToken,
      };
    default:
      return state;
  }
}

export default AuthReducer;
