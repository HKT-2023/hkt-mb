import React from 'react';
import styles from './styles';
import RenderIcon from './RenderIcon';
import {RouteProp} from '@react-navigation/native';
import {TBottomStackParamList} from '../types/TBottomBar';
import {TouchableOpacity, View, StyleProp, ViewStyle} from 'react-native';
import {
  BottomTabBarOptions,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {ratioW, useTheme} from 'react-native-gin-boilerplate';

interface IProps {
  tabBarProps: BottomTabBarProps<BottomTabBarOptions>;
  route: RouteProp<TBottomStackParamList, keyof TBottomStackParamList>;
  index: number;
}

const TabBarItem: React.FC<IProps> = ({tabBarProps, route, index}) => {
  const {colors} = useTheme();
  const {descriptors, navigation, state} = tabBarProps;
  const isFocused = state.index === index;

  const {options} = descriptors[route.key];

  const $separator: StyleProp<ViewStyle> = {
    width: '80%',
    top: ratioW(1),
    height: ratioW(2),
    position: 'absolute',
    borderRadius: ratioW(1),
    backgroundColor: colors.activeColor,
    display: isFocused ? 'flex' : 'none',
  };

  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  const onLongPress = () => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityState={isFocused ? {selected: true} : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onLongPress={onLongPress}
      onPress={onPress}
      style={[styles.btn]}>
      <View style={$separator} />
      <RenderIcon
        routeName={route.name as keyof TBottomStackParamList}
        isFocused={isFocused}
      />
    </TouchableOpacity>
  );
};

export default React.memo(TabBarItem);
