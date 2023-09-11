import {IcArrowUp} from '@app/assets/svg';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import mAnimated from '@app/utils/methods/mAnimated';
import React, {useEffect, useRef, useState} from 'react';
import {ratioW, TButtonAny, Text} from 'react-native-gin-boilerplate';
import {StyleSheet, TouchableOpacity, Animated, TextStyle} from 'react-native';

interface IProps {
  title: string;
  onPress?: TButtonAny<boolean>;
}

const SectionFilter: React.FC<IProps> = ({title, onPress}) => {
  const animatedRef = useRef(new Animated.Value(0));
  const [isShow, setIsShow] = useState(false);

  const $headerTabTitle: TextStyle = {
    ...styles.tabTitle,
    color: '#424242',
  };

  const rotate = animatedRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
    extrapolate: 'clamp',
  });

  const onPressHeader = () => {
    setIsShow(!isShow);
    onPress?.(!isShow);
  };

  useEffect(() => {
    if (isShow) {
      mAnimated.changeAnimated({
        toValue: 1,
        value: animatedRef.current,
      });
    } else {
      mAnimated.changeAnimated({
        toValue: 0,
        value: animatedRef.current,
      });
    }
  }, [isShow]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPressHeader}
      style={styles.tabHeaderContainer}>
      <Text style={$headerTabTitle}>{title}</Text>
      <Animated.View style={{transform: [{rotate}]}}>
        <IcArrowUp />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default SectionFilter;

const styles = StyleSheet.create({
  tabTitle: {
    ...TPoppinsStyle.H1624Bold,
  },
  tabHeaderContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: ratioW(16),
    justifyContent: 'space-between',
  },
});
