import i18n from '@app/i18n';
import React, {useEffect} from 'react';
import {LoadingImg} from '@app/assets/photos';
import FastImage from 'react-native-fast-image';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {Animated, Easing, StyleSheet} from 'react-native';
import {ratioW, Separator, Text, useTheme} from 'react-native-gin-boilerplate';

const AnimatedSpin = ({
  showProcessText = true,
}: {
  showProcessText?: boolean;
}) => {
  const spinValue = new Animated.Value(0);
  const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

  const $title = StyleSheet.flatten([styles.subTitle, {color: '#15191B'}]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        delay: 0,
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      {iterations: -1, resetBeforeIteration: true},
    ).start();
  }, []);

  return (
    <React.Fragment>
      <AnimatedFastImage
        source={LoadingImg}
        style={[styles.imageLoading, {transform: [{rotate: spin}]}]}
      />
      {showProcessText && (
        <>
          <Separator height={ratioW(40)} />
          <Text style={$title}>{i18n.t('common.Processing')}...</Text>
        </>
      )}
    </React.Fragment>
  );
};

export default AnimatedSpin;

const styles = StyleSheet.create({
  imageLoading: {
    width: ratioW(100),
    height: ratioW(100),
  },
  subTitle: {
    textAlign: 'center',
    marginBottom: ratioW(16),
    ...TPoppinsStyle.H2436Medium,
  },
});
