import {
  BottomTabBarOptions,
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import UserStack from './UserStack';
import WalletStack from './WalletStack';
import {useSelector} from 'react-redux';
import Dispatch from '@app/redux/Dispatch';
import ExchangeStack from './ExchangeStack';
import {StackAnimation} from './StackAnimation';
import {IBottomStackProps} from './types/TStack';
import React, {useContext, useEffect} from 'react';
import {ISupportTheme} from '@app/definitions/TTheme';
import TabBarCustomize from './TabBar/TabBarCustomize';
import {TBottomStackParamList} from './types/TBottomBar';
import {defaultHeader, themedHeader} from './StackConfig';
import {TReduxState} from '@app/redux/store/configureStore';
import {StatusBar, ThemeContext, useTheme} from 'react-native-gin-boilerplate';

const BottomTabStack = createBottomTabNavigator<TBottomStackParamList>();

const BottomStack: React.FC<IBottomStackProps> = () => {
  const {theme} = useContext(ThemeContext);
  const {colors} = useTheme();
  const {role} = useSelector((state: TReduxState) => state.AuthReducer);
  const isVendor = role === 'Vendor';

  const screenOptions = {
    ...defaultHeader,
    ...themedHeader(theme as ISupportTheme),
    ...StackAnimation,
  } as BottomTabNavigationOptions;

  const tabBarOptions: BottomTabBarOptions = {
    showLabel: false,
    allowFontScaling: false,
    keyboardHidesTabBar: true,
    activeTintColor: colors.activeColor,
    inactiveTintColor: colors.inactiveColor,
  };

  useEffect(() => {
    // Only user is not a vendor can receive notify and have menu notification
    if (!isVendor) {
      Dispatch.requestTotalUnreadNotify();
    }
  }, [isVendor]);

  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" />
      <BottomTabStack.Navigator
        tabBarOptions={tabBarOptions}
        screenOptions={screenOptions}
        tabBar={props => <TabBarCustomize {...props} />}>
        {isVendor && (
          <BottomTabStack.Screen name="WALLET_STACK" component={WalletStack} />
        )}
        {!isVendor && (
          <React.Fragment>
            <BottomTabStack.Screen
              name="EXCHANGE_STACK"
              component={ExchangeStack}
            />
          </React.Fragment>
        )}
        <BottomTabStack.Screen name="USER_STACK" component={UserStack} />
      </BottomTabStack.Navigator>
    </React.Fragment>
  );
};

export default BottomStack;
