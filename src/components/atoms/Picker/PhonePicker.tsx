import {
  View,
  ViewStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import i18n from '@app/i18n';
import {
  Text,
  ratioW,
  useTheme,
  TextInput,
  TButtonAny,
  RowContainer,
  ITextInputProps,
} from 'react-native-gin-boilerplate';
import {IcArrowDown} from '@app/assets/svg';

export interface IPhonePickerProps extends ITextInputProps {
  phoneStyle?: StyleProp<ViewStyle>;
  code: string;
  onChangeCode?: TButtonAny<string>;
}

const PhonePicker: React.FC<IPhonePickerProps> = props => {
  const {phoneStyle, code} = props;
  const {colors} = useTheme();

  const $picker: StyleProp<ViewStyle> = {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: ratioW(85),
    borderRadius: ratioW(4),
    marginRight: ratioW(12),
    paddingVertical: ratioW(14),
    paddingHorizontal: ratioW(8),
    justifyContent: 'space-between',
    borderColor: colors.inputInactiveBorder,
  };

  const onPick = () => {
    // do anything to get region code
  };

  return (
    <RowContainer style={phoneStyle}>
      <TouchableOpacity style={$picker} activeOpacity={0.8} onPress={onPick}>
        <View style={styles.$japanFlag}>
          <View style={styles.$japan} />
        </View>
        <Text style={styles.$region}>{code}</Text>
        <IcArrowDown />
      </TouchableOpacity>
      <TextInput
        containerStyles={styles.$input}
        label={i18n.t('common.PhoneNumber')}
        {...props}
      />
    </RowContainer>
  );
};

export default PhonePicker;

const styles = StyleSheet.create({
  $input: {
    flex: 1,
  },
  $region: {
    ...TPoppinsStyle.H1420Regular,
    marginHorizontal: ratioW(4),
  },
  $japan: {
    width: ratioW(8),
    backgroundColor: 'red',
    height: ratioW(8),
    borderRadius: ratioW(4),
  },
  $japanFlag: {
    width: ratioW(16),
    height: ratioW(16),
    borderRadius: ratioW(8),
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
