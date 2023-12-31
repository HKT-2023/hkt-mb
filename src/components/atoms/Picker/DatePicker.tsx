import i18n from '@app/i18n';
import React, {useState} from 'react';
import {
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  Text as RNText,
} from 'react-native';
import RNDatePicker from 'react-native-date-picker';
import mDate from '@app/utils/methods/mDate';
import dayjs from 'dayjs';
import {
  Text,
  ratioW,
  useTheme,
  TButtonAny,
  RowContainer,
  fontSizeText,
} from 'react-native-gin-boilerplate';
import {IcCalendar, IcCloseCircle} from '@app/assets/svg';

export interface IDatePickerProps {
  value?: string;
  maximumDate?: Date;
  disabled?: boolean;
  onChange: TButtonAny<Date | string>;
  pickerStyle?: StyleProp<ViewStyle>;
  isShowDelete?: boolean;
  title?: string;
  minimumDate?: Date;
  pickerMode?: 'time' | 'datetime' | 'date';
  returnValue?: string;
}

const DatePicker: React.FC<IDatePickerProps> = props => {
  const {colors} = useTheme();
  const {
    value,
    pickerStyle,
    disabled,
    onChange,
    maximumDate,
    minimumDate,
    isShowDelete = true,
    title = i18n.t('common.DateOfBirth'),
    returnValue,
  } = props;
  const [open, setOpen] = useState(false);

  const $container: StyleProp<ViewStyle> = {
    borderWidth: 1,
    borderColor: colors.inputInactiveBorder,
    padding: ratioW(16),
    borderRadius: ratioW(4),
  };

  const $row: StyleProp<ViewStyle> = {
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const $value: StyleProp<TextStyle> = {
    fontSize: fontSizeText(16),
    color: !value ? colors.menuText : colors.defaultText,
    flex: 1,
  };

  const $label: StyleProp<TextStyle> = {
    top: ratioW(-8),
    left: ratioW(12),
    position: 'absolute',
    alignSelf: 'baseline',
    paddingHorizontal: ratioW(4),
    display: !value ? 'none' : 'flex',
    backgroundColor: colors.mainBackground,
  };

  const $close: ViewStyle = {
    marginHorizontal: ratioW(8),
    display: value ? 'flex' : 'none',
  };

  const onPick = () => {
    setOpen(true);
  };

  const onCancel = () => {
    setOpen(false);
  };

  const onChangeDate = (dt: Date) => {
    onChange?.(dt);
    onCancel();
  };

  const onClearDate = () => {
    onChange?.('');
  };

  return (
    <TouchableOpacity
      onPress={onPick}
      disabled={disabled}
      activeOpacity={0.8}
      style={[$container, pickerStyle]}>
      <Text style={$label}>{title}</Text>
      <RowContainer style={$row}>
        <RNText style={$value}>
          {value ? returnValue ?? mDate.formatDate(value) : title}
        </RNText>
        {isShowDelete && (
          <TouchableOpacity onPress={onClearDate} style={$close}>
            <IcCloseCircle width={ratioW(15)} height={ratioW(15)} />
          </TouchableOpacity>
        )}
        <IcCalendar />
      </RowContainer>
      <RNDatePicker
        mode={props.pickerMode ?? 'date'}
        open={open}
        modal={true}
        onCancel={onCancel}
        locale={dayjs.locale()}
        onConfirm={onChangeDate}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        date={value ? new Date(value) : new Date()}
      />
    </TouchableOpacity>
  );
};

export default React.memo(DatePicker);
