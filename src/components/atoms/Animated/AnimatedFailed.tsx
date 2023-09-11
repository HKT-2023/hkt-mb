import React from 'react';
import {Animated} from 'react-native';
import {Failed} from '@app/assets/photos';
import FastImage from 'react-native-fast-image';
import mAnimated from '@app/utils/methods/mAnimated';
import {ratioW} from 'react-native-gin-boilerplate';

const AnimatedFailed = () => {
  const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
  const zoomValue = new Animated.Value(0);

  mAnimated.changeAnimated({
    value: zoomValue,
    toValue: 1,
    useNativeDriver: true,
  });

  const $imageSuccess = {
    width: ratioW(50),
    height: ratioW(50),
    aspectRatio: 1,
    transform: [
      {
        translateX: zoomValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 3],
        }),
      },
      {
        translateY: zoomValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -30],
        }),
      },
      {
        scaleX: zoomValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 3],
        }),
      },
      {
        scaleY: zoomValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 3],
        }),
      },
    ],
  };

  return <AnimatedFastImage source={Failed} style={$imageSuccess} />;
};

export default AnimatedFailed;
