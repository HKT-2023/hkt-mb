import React, {useRef, useState} from 'react';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import mAnimated from '@app/utils/methods/mAnimated';
import {Animated, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {
  Text,
  ratioW,
  useTheme,
  TButtonAny,
  RowContainer,
} from 'react-native-gin-boilerplate';
import {IcArrowDown} from '@app/assets/svg';

interface IFAQItemHeaderProps {
  id: string;
  title: string;
  onPress: TButtonAny<string>;
}

const FAQItemHeader: React.FC<IFAQItemHeaderProps> = ({id, title, onPress}) => {
  const {colors} = useTheme();

  const rotate = useRef(new Animated.Value(1)).current;
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const onHeaderPress = () => {
    setIsOpen(!isOpen);
    mAnimated.changeAnimated({
      value: rotate,
      toValue: isOpen ? 0 : 1,
      duration: 400,
    });
    onPress(id);
  };

  const r = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
    extrapolate: 'clamp',
  });

  const $sectionWrapper: ViewStyle = {
    ...styles.sectionWrapper,
    backgroundColor: colors.mainBackground,
  };

  return (
    <TouchableOpacity onPress={onHeaderPress} activeOpacity={1}>
      <RowContainer style={$sectionWrapper}>
        <Text style={styles.bigTitle}>{title}</Text>
        <Animated.View style={{transform: [{rotate: r}]}}>
          <IcArrowDown />
        </Animated.View>
      </RowContainer>
    </TouchableOpacity>
  );
};

export default FAQItemHeader;

const styles = StyleSheet.create({
  sectionWrapper: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: ratioW(12),
    paddingHorizontal: ratioW(16),
  },
  bigTitle: {
    flex: 1,
    ...TPoppinsStyle.H2028Bold,
  },
});
