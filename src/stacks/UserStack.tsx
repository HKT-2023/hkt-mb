import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {TUserStackParamList} from './types/TUserStack';
import UserProfile from '@app/screens/Profile/UserProfile';
import useChangeStatusBar from '@app/hooks/useChangeStatusBar';

const mScreen: Record<
  keyof TUserStackParamList,
  {component: any; options?: StackNavigationOptions}
> = {
  USER_PROFILE_SCREEN: {component: UserProfile},
};

const Stack = createStackNavigator();

const UserStack = () => {
  useChangeStatusBar('light-content');

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {Object.entries({...mScreen}).map(([name, configs]) => (
        <Stack.Screen
          key={name}
          options={configs.options}
          component={configs.component}
          name={name as keyof TUserStackParamList}
        />
      ))}
    </Stack.Navigator>
  );
};

export default UserStack;
