import React, {useRef, useState} from 'react';
import {
  View,
  Animated,
  TextStyle,
  ViewStyle,
  StyleSheet,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';
import {IQuestion} from '@app/definitions/IFAQ';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {
  Text,
  ratioW,
  useTheme,
  RowContainer,
} from 'react-native-gin-boilerplate';
import mAnimated from '@app/utils/methods/mAnimated';
import {IcArrowDown, IcQuestionMark} from '@app/assets/svg';

interface IFAQItemProps {
  item: IQuestion;
  isShow?: boolean;
}

const FAQItem: React.FC<IFAQItemProps> = ({item, isShow}) => {
  const {colors} = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const rotateQuestion = useRef(new Animated.Value(0)).current;
  const color = isOpen ? colors.primaryColor : colors.defaultText;

  const $questionWrapper: ViewStyle = {
    ...styles.questionWrapper,
  };

  const $answer: TextStyle = {
    ...styles.answer,
    display: isOpen ? 'flex' : 'none',
  };

  const $itemWrapper: ViewStyle = {
    ...styles.itemWrapper,
    display: isShow ? 'flex' : 'none',
    backgroundColor: colors.mainBackground,
    borderBottomColor: colors.separatorBackground,
  };

  const $questionTitle = {
    color,
    ...styles.questionTitle,
  };

  const onQuestionPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
    mAnimated.changeAnimated({
      value: rotateQuestion,
      toValue: !isOpen ? 1 : 0,
      duration: 400,
    });
  };

  const rQ = rotateQuestion.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
    extrapolate: 'clamp',
  });

  return (
    <View style={$itemWrapper}>
      <TouchableOpacity activeOpacity={0.8} onPress={onQuestionPress}>
        <RowContainer style={$questionWrapper}>
          <RowContainer style={styles.questionContainer}>
            <IcQuestionMark color={color} />
            <Text style={$questionTitle}>{item.question}</Text>
          </RowContainer>
          <Animated.View
            style={{
              transform: [{rotate: rQ}],
            }}>
            <IcArrowDown color={color} />
          </Animated.View>
        </RowContainer>
      </TouchableOpacity>
      <Text style={$answer}>{item.answer}</Text>
    </View>
  );
};

export default FAQItem;

const styles = StyleSheet.create({
  questionWrapper: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: ratioW(14),
  },
  itemWrapper: {
    borderBottomWidth: 1,
    marginHorizontal: ratioW(16),
  },
  questionTitle: {
    marginLeft: ratioW(8),
    ...TPoppinsStyle.H1624Regular,
    flex: 1,
  },
  answer: {
    ...TPoppinsStyle.H1624Regular,
    marginBottom: ratioW(8),
  },
  questionContainer: {
    flex: 1,
  },
});
