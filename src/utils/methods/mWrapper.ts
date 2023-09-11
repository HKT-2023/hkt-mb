import debounce from 'lodash/debounce';
import {
  closeBottomSheet,
  closeLoading,
  openLoading,
  TButtonAny,
  TButtonVoid,
} from 'react-native-gin-boilerplate';

function onChangeByKey<T extends object>(
  key: keyof T,
  value: string,
  sample?: T,
  func?: TButtonAny<T>,
  isTrim = true,
) {
  if (sample !== undefined) {
    func?.({...sample, [key]: isTrim ? value.trim() : value});
  }
}

function wrapperFuncCloseBottomSheet<T>(
  func: TButtonAny<T>,
  payload: T,
  milliseconds = 1000,
) {
  openLoading();
  closeBottomSheet();
  debounce(() => {
    closeLoading();
    func?.(payload);
  }, milliseconds)();
}

const wCloseBottomSheetVoid = (func?: TButtonVoid) => {
  openLoading();
  closeBottomSheet();
  debounce(() => {
    closeLoading();
    func?.();
  }, 1000)();
};

export default {
  onChangeByKey,
  wCloseBottomSheetVoid,
  wrapperFuncCloseBottomSheet,
};
