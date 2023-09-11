import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {TExchangeStackParamList} from './types/TExchangeStack';
import Exchange from '@app/screens/Exchange/Exchange';

const mScreen: Record<
  keyof TExchangeStackParamList,
  {component: any; options?: StackNavigationOptions}
> = {
  EXCHANGE_SCREEN: {component: Exchange},
};

const Stack = createStackNavigator();

const ExchangeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {Object.entries({...mScreen}).map(([name, configs]) => (
        <Stack.Screen
          key={name}
          options={configs.options}
          component={configs.component}
          name={name as keyof TExchangeStackParamList}
        />
      ))}
    </Stack.Navigator>
  );
};

export default ExchangeStack;
