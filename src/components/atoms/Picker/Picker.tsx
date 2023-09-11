import React, {useEffect, useRef} from 'react';
import mAnimated from '@app/utils/methods/mAnimated';
import {
  View,
  Text,
  Animated,
  ViewStyle,
  StyleProp,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import {
  ratioW,
  useTheme,
  withPopup,
  fontSizeText,
  RowContainer,
  IWithPopUpBase,
} from 'react-native-gin-boilerplate';
import {IcArrowDown} from '@app/assets/svg';

export interface IPickerProps extends IWithPopUpBase {
  label?: string;
  disabled?: boolean;
  isVisible?: boolean;
  value?: string;
  style?: StyleProp<ViewStyle>;
  isError?: boolean;
  errorText?: string;
}

const Picker: React.FC<IPickerProps> = props => {
  const {style, disabled, isVisible, label, value} = props;
  const {colors} = useTheme();
  const animatedRef = useRef(new Animated.Value(0));

  const $container: StyleProp<ViewStyle> = {
    borderWidth: 1,
    padding: ratioW(16),
    borderRadius: ratioW(4),
    borderColor: colors.inputInactiveBorder,
  };

  const $row: StyleProp<ViewStyle> = {
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const $value: StyleProp<TextStyle> = {
    flex: 1,
    fontSize: fontSizeText(16),
    opacity: disabled ? 0.5 : 1,
    color: !value?.length ? colors.menuText : colors.defaultText,
  };

  const $label: StyleProp<TextStyle> = {
    color: colors.defaultText,
    opacity: disabled ? 0.5 : 1,
    backgroundColor: colors.mainBackground,
  };

  const $labelWrapper: ViewStyle = {
    top: ratioW(-8),
    left: ratioW(12),
    position: 'absolute',
    alignSelf: 'baseline',
    paddingHorizontal: ratioW(4),
    display: !value?.length ? 'none' : 'flex',
    backgroundColor: colors.mainBackground,
  };

  const onPick = () => {
    props.onShow?.();
  };

  useEffect(() => {
    if (isVisible) {
      mAnimated.changeAnimated({toValue: 1, value: animatedRef.current});
    } else {
      mAnimated.changeAnimated({toValue: 0, value: animatedRef.current});
    }
  }, [isVisible]);

  const rotate = animatedRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
    extrapolate: 'clamp',
  });

  return (
    <TouchableOpacity
      onPress={onPick}
      disabled={disabled}
      activeOpacity={0.8}
      style={[$container, style]}>
      <View style={$labelWrapper}>
        <Text style={$label}>{label}</Text>
      </View>
      <RowContainer style={$row}>
        <Text style={$value} numberOfLines={1}>
          {!value?.length ? label : value}
        </Text>
        <Animated.View style={{transform: [{rotate}]}}>
          <IcArrowDown
            color={disabled ? colors.inputInactiveBorder : colors.defaultText}
          />
        </Animated.View>
      </RowContainer>
    </TouchableOpacity>
  );
};

export default withPopup<IPickerProps>(Picker);
