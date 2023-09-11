import React from 'react';
import {Provider} from 'react-redux';
import AppContainer from './AppContainer';
import {colors} from './constants/colors';
import {
  Loading,
  UMessage,
  StatusBar,
  loadingRef,
  AlertModal,
  GlobalModal,
  BottomSheet,
  ThemeContext,
  newThemeState,
  alertModalRef,
  globalModalRef,
  bottomSheetRef,
  subscribeTheme,
  IThemePreference,
} from 'react-native-gin-boilerplate';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './redux/store/configureStore';
import {
  SafeAreaProvider,
  initialWindowMetrics,
  SafeAreaView,
} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {StyleSheet} from 'react-native';

type TSupportThemes = keyof typeof colors;

interface IState {
  theme: TSupportThemes;
  themePreferences: IThemePreference;
}

class Root extends React.Component<Record<string, never>, IState> {
  constructor(props: Record<string, never>) {
    super(props);
    const theme: IThemePreference = {
      currentTheme: 'light',
      darkLevel: 'dark',
    };
    this.state = {
      theme: 'light',
      themePreferences: theme,
    };
  }

  setTheme = (newTheme = {}) => {
    this.setState(
      prevState => newThemeState(prevState, newTheme as IThemePreference),
      () => {
        const {themePreferences} = this.state;
        subscribeTheme(themePreferences, this.setTheme);
      },
    );
  };

  render() {
    const {theme, themePreferences} = this.state;
    const themeValue = {
      theme,
      themePreferences,
      colors: colors[theme],
      setTheme: this.setTheme,
    };
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <ThemeContext.Provider value={themeValue}>
              <StatusBar barStyle={'light-content'} />
              <SafeAreaView
                edges={['left', 'right', 'bottom']}
                style={styles.container}>
                <AppContainer />
                <GlobalModal ref={globalModalRef} />
                <BottomSheet ref={bottomSheetRef} />
                <Toast config={UMessage.toastConfig} />
                <Loading ref={loadingRef} />
                <AlertModal ref={alertModalRef} />
              </SafeAreaView>
            </ThemeContext.Provider>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default Root;

const styles = StyleSheet.create({
  container: {flex: 1},
});
