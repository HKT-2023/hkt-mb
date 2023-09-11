import {Action} from 'redux';

export type TApp = 'SET_FIRST_INSTALL';

export interface IActionSetFirstInstall extends Action<TApp> {
  payload: {
    isFirstInstall: boolean;
  };
}

export type TActionsApp = IActionSetFirstInstall;

export type TAppState = {
  isFirstInstall: boolean;
};
