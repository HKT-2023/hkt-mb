import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {TWalletStackParamList} from './types/TWalletStack';
import useChangeStatusBar from '@app/hooks/useChangeStatusBar';
import Wallet from '@app/screens/Wallet/Wallet';

const mScreen: Record<
  keyof TWalletStackParamList,
  {component: any; options?: StackNavigationOptions}
> = {
  WALLET_FOOTER_SCREEN: {component: Wallet},
};

const Stack = createStackNavigator();

const WalletStack = () => {
  useChangeStatusBar('light-content');

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {Object.entries({...mScreen}).map(([name, configs]) => (
        <Stack.Screen
          key={name}
          options={configs.options}
          component={configs.component}
          name={name as keyof TWalletStackParamList}
        />
      ))}
    </Stack.Navigator>
  );
};

export default WalletStack;
