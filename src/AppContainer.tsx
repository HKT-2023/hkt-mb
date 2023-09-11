import React, {useContext} from 'react';
import {useSelector} from 'react-redux';
import Dispatch from '@app/redux/Dispatch';
import {InteractionManager} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import UNavigation from '@app/utils/UNavigation';
import BottomStack from '@app/stacks/BottomStack';
import {ISupportTheme} from '@app/definitions/TTheme';
import NoFooterStack from '@app/stacks/NoFooterStack';
import {TGatherStackParamList} from './stacks/types/TStack';
import {TReduxState} from '@app/redux/store/configureStore';
import {createStackNavigator} from '@react-navigation/stack';
import AuthenticationStack from './stacks/AuthenticationStack';
import {Logger, ThemeContext} from 'react-native-gin-boilerplate';
import {TNoFooterStackParamList} from '@app/stacks/types/TNoFooterStack';
import {getActiveRouteName, navigationTheme} from './stacks/StackConfig';
import {NavigationContainer, NavigationState} from '@react-navigation/native';

const Stack = createStackNavigator<TGatherStackParamList>();

const defaultOptions = {
  gestureEnabled: false,
};

const AppContainer = () => {
  const {isAuthenticated} = useSelector(
    (state: TReduxState) => state.AuthReducer,
  );
  const {theme} = useContext(ThemeContext);
  const navTheme = navigationTheme(theme as ISupportTheme);

  const onStateChange = (state?: NavigationState) => {
    if (state) {
      UNavigation.routeNameRef.current = getActiveRouteName(state);
    }
  };

  const onNavigationReady = () => {
    InteractionManager.runAfterInteractions(() => {
      if (isAuthenticated) {
        Dispatch.getUserInfor();
      }
    }).then(() => {
      BootSplash.hide({fade: true}).then(() => Logger.info('Hide Splash'));
    });
  };

  return (
    <NavigationContainer
      theme={navTheme}
      onReady={onNavigationReady}
      onStateChange={onStateChange}
      ref={UNavigation.navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!isAuthenticated ? (
          <Stack.Screen
            options={defaultOptions}
            name="AUTHENTICATION_STACK"
            component={AuthenticationStack}
          />
        ) : (
          <Stack.Screen
            name="BOTTOM_TAB"
            component={BottomStack}
            options={defaultOptions}
          />
        )}
        {Object.entries({...NoFooterStack}).map(([name, configs]) => (
          <Stack.Screen
            key={name}
            options={configs.options}
            component={configs.component}
            name={name as keyof TNoFooterStackParamList}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
