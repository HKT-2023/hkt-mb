import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ratioW, useTheme} from 'react-native-gin-boilerplate';

const SliderMarker = () => {
  const {colors} = useTheme();
  const $outerMarker = StyleSheet.flatten([
    styles.outerMarker,
    {backgroundColor: '#2CC2D3'},
  ]);
  const $innerMarker = StyleSheet.flatten([
    styles.innerMarker,
    {backgroundColor: colors.mainBackground},
  ]);
  return (
    <View style={$outerMarker}>
      <View style={$innerMarker} />
    </View>
  );
};

export default React.memo(SliderMarker);

const styles = StyleSheet.create({
  outerMarker: {
    width: ratioW(32),
    height: ratioW(32),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ratioW(100),
  },
  innerMarker: {
    width: ratioW(15.36),
    height: ratioW(15.36),
    borderRadius: ratioW(100),
  },
});
