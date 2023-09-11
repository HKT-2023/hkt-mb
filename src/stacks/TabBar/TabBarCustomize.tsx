import TabBarItem from './TabBarItem';
import React, {useCallback} from 'react';
import sharedStyles from '@app/sharedStyles';
import UNavigation from '@app/utils/UNavigation';
import {StyleProp, View, ViewStyle} from 'react-native';
import {ratioW, useTheme} from 'react-native-gin-boilerplate';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {TBottomStackParamList} from '@app/stacks/types/TBottomBar';

const TabBarCustomize = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const {colors} = useTheme();
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  useFocusEffect(
    useCallback(() => {
      UNavigation.isTabRef.current = true;
      return () => {
        UNavigation.isTabRef.current = false;
      };
    }, []),
  );

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const $container: StyleProp<ViewStyle> = {
    flexDirection: 'row',
    ...sharedStyles.shadowTab,
    paddingHorizontal: ratioW(16),
    backgroundColor: colors.mainBackground,
  };

  return (
    <View style={$container}>
      {state.routes.map((route, index) => (
        <TabBarItem
          tabBarProps={{state, descriptors, navigation}}
          route={
            route as RouteProp<
              TBottomStackParamList,
              keyof TBottomStackParamList
            >
          }
          index={index}
          key={route.key}
        />
      ))}
    </View>
  );
};

export default React.memo(TabBarCustomize);
