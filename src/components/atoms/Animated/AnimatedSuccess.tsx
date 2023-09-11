import React from 'react';
import {Animated} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SuccessfulImg} from '@app/assets/photos';
import mAnimated from '@app/utils/methods/mAnimated';
import {ratioW} from 'react-native-gin-boilerplate';

const AnimatedSuccess = () => {
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
    aspectRatio: 1.2,
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

  return <AnimatedFastImage source={SuccessfulImg} style={$imageSuccess} />;
};

export default AnimatedSuccess;
