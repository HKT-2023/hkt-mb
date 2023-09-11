import {TActionsApp, TAppState} from '../types/TApp';

const initialState: TAppState = {
  isFirstInstall: true,
};

function AppReducer(state = initialState, action: TActionsApp): TAppState {
  if (action.type === 'SET_FIRST_INSTALL') {
    return {
      ...state,
      isFirstInstall: action.payload.isFirstInstall,
    };
  } else {
    return state;
  }
}

export default AppReducer;
