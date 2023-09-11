import {useTheme} from '@app/theme';
import React from 'react';
import {IRouteTabView} from './interface';
import {ratioW} from '@app/utils/UDimension';
import {
  NavigationState,
  SceneRendererProps,
  TabBar,
} from 'react-native-tab-view';
import {ColorValue, ViewStyle} from 'react-native';

export type TTabBarRoundedProps = SceneRendererProps & {
  navigationState: NavigationState<IRouteTabView>;
} & {
  activeColor?: ColorValue;
  borderColor?: ColorValue;
  scrollEnabled?: boolean;
  inactiveColor?: ColorValue;
  inactiveColorText?: string;
  style?: ViewStyle;
};

const TabBarRounded: React.FC<TTabBarRoundedProps> = propsTab => {
  const {colors} = useTheme();
  const {
    scrollEnabled,
    borderColor,
    inactiveColor,
    inactiveColorText,
    activeColor,
    style,
  } = propsTab;

  const $style: ViewStyle = {
    overflow: 'hidden',
    borderRadius: ratioW(24),
    borderWidth: ratioW(1.5),
    borderColor: borderColor ?? colors.mainBackground,
    backgroundColor: inactiveColor ?? colors.mainBackground,
    ...style,
  };

  const $indicatorStyle: ViewStyle = {
    height: '100%',
    backgroundColor: activeColor ?? colors.primaryColor,
  };

  return (
    <TabBar
      {...propsTab}
      style={$style}
      indicatorStyle={$indicatorStyle}
      activeColor={colors.mainBackground}
      scrollEnabled={scrollEnabled ?? false}
      getLabelText={({route}) => route.title}
      inactiveColor={inactiveColorText ?? colors.mainBackground}
    />
  );
};

export default TabBarRounded;
