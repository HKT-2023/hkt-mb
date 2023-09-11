import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import Login from '@app/screens/auth/Login';
import EnterCode from '@app/screens/auth/ForgotPassword/EnterCode';
import EnterEmail from '@app/screens/auth/ForgotPassword/EnterEmail';
import {TAuthenticationStackParamList} from './types/TAuthentication';
import EnterPassword from '@app/screens/auth/ForgotPassword/EnterPassword';

const mScreen: Record<
  keyof TAuthenticationStackParamList,
  {component: any; options?: StackNavigationOptions}
> = {
  LOGIN_SCREEN: {component: Login, options: {gestureEnabled: false}},
  FORGOT_PASSWORD_ENTER_EMAIL_SCREEN: {component: EnterEmail},
  FORGOT_PASSWORD_ENTER_PASSWORD_SCREEN: {component: EnterPassword},
  FORGOT_PASSWORD_ENTER_CODE_SCREEN: {component: EnterCode},
};

const Stack = createStackNavigator();

const AuthenticationStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {Object.entries({...mScreen}).map(([name, configs]) => (
        <Stack.Screen
          key={name}
          options={configs.options}
          component={configs.component}
          name={name as keyof TAuthenticationStackParamList}
        />
      ))}
    </Stack.Navigator>
  );
};

export default AuthenticationStack;
