import React from 'react';
import {StackActions, NavigationContainerRef} from '@react-navigation/native';
import {TGatherStackParamList} from '@app/stacks/types/TStack';

const isTabRef: React.MutableRefObject<boolean | null> = React.createRef();
const navigationRef = React.createRef<NavigationContainerRef>();
const routeNameRef: React.MutableRefObject<string | null> = React.createRef();

function navigate(
  name: keyof TGatherStackParamList,
  params?: TGatherStackParamList[keyof TGatherStackParamList],
) {
  navigationRef.current?.navigate(name as string, params);
}
function pushToPage(
  name: keyof TGatherStackParamList,
  params?: TGatherStackParamList[keyof TGatherStackParamList],
): void {
  navigationRef.current?.dispatch(StackActions.push(name as string, params));
}
function replace(
  name: keyof TGatherStackParamList,
  params?: TGatherStackParamList[keyof TGatherStackParamList],
) {
  navigationRef.current?.dispatch(StackActions.replace(name as string, params));
}
function popToTop() {
  navigationRef.current?.dispatch(StackActions.popToTop());
}
function pop(number = 1) {
  navigationRef.current?.dispatch(StackActions.pop(number));
}
function goBack() {
  if (navigationRef.current?.canGoBack()) {
    navigationRef.current?.goBack();
  }
}
function setRoot(routeName: keyof TGatherStackParamList, params = {}) {
  navigationRef.current?.reset({
    index: 0,
    routes: [
      {
        name: routeName as string,
        params,
      },
    ],
  });
}

const getCurrentRoute = () => {
  const currentRoute = navigationRef.current?.getCurrentRoute();
  return currentRoute?.name;
};

export default {
  pop,
  goBack,
  setRoot,
  replace,
  navigate,
  isTabRef,
  popToTop,
  pushToPage,
  routeNameRef,
  navigationRef,
  getCurrentRoute,
};
