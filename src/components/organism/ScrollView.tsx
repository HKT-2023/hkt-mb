import React from 'react';
import {Animated, ScrollViewProps, StyleSheet} from 'react-native';
import {isIphoneX, ratioW, useTheme} from 'react-native-gin-boilerplate';

const ScrollView: React.FC<ScrollViewProps> = props => {
  const {colors} = useTheme();
  return (
    <Animated.ScrollView
      scrollEventThrottle={16}
      {...props}
      contentContainerStyle={[
        styles.scrollContent,
        props.contentContainerStyle,
      ]}
      style={[{backgroundColor: colors.mainBackground}, props.style]}>
      {props.children}
    </Animated.ScrollView>
  );
};

export default ScrollView;

const styles = StyleSheet.create({
  scrollContent: {
    padding: ratioW(16),
    paddingBottom: isIphoneX() ? 0 : ratioW(32),
  },
});
