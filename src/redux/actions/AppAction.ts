import {IActionSetFirstInstall} from '../types/TApp';

function setFirstInstall(payload: boolean): IActionSetFirstInstall {
  return {
    type: 'SET_FIRST_INSTALL',
    payload: {
      isFirstInstall: payload,
    },
  };
}

export default {
  setFirstInstall,
};
