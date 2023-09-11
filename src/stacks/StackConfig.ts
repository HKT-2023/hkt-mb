import {themes} from '@app/constants/colors';
import {
  DarkTheme,
  DefaultTheme,
  NavigationState,
  Route,
} from '@react-navigation/native';
import {StyleSheet, ViewStyle} from 'react-native';
import {ISupportTheme} from '@app/definitions/TTheme';

export const defaultHeader = {
  headerBackTitleVisible: false,
  cardOverlayEnabled: true,
  cardStyle: {backgroundColor: 'transparent'},
};

export const cardStyle = {
  backgroundColor: 'rgba(0,0,0,0)',
};

export const borderBottom = (theme: ISupportTheme): ViewStyle => ({
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderBottomColor: themes[theme].headerBorder,
  elevation: 0,
});

export const themedHeader = (theme: ISupportTheme) => ({
  headerStyle: {
    ...borderBottom(theme),
    backgroundColor: themes[theme].headerBackground,
  },
  headerTintColor: themes[theme].headerTintColor,
  headerTitleStyle: {color: themes[theme].headerTitleColor},
});

export const navigationTheme = (theme: ISupportTheme) => {
  const defaultNavTheme = theme === 'light' ? DefaultTheme : DarkTheme;
  return {
    ...defaultNavTheme,
    colors: {
      ...defaultNavTheme.colors,
      background: themes[theme].backgroundColor,
      border: themes[theme].borderColor,
      primary: themes[theme].backgroundColor,
    },
  };
};

// Gets the current screen from navigation state
export const getActiveRoute = (state: NavigationState): Route<string> => {
  const route = state?.routes[state?.index];
  if (route?.state) {
    // Dive into nested navigators
    return getActiveRoute(route.state as NavigationState);
  }

  return route;
};

export const getActiveRouteName = (state: NavigationState) =>
  getActiveRoute(state)?.name;
