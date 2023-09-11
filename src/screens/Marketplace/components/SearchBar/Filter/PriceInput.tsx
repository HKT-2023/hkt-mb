import React from 'react';
import i18n from '@app/i18n';
import {StyleSheet} from 'react-native';
import Dispatch from '@app/redux/Dispatch';
import mNumber from '@app/utils/methods/mNumber';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {MAX_PRICE_MKP, MIN_PRICE} from '@app/constants/keys';
import {
  Text,
  ratioW,
  TextInput,
  TButtonVoid,
} from 'react-native-gin-boilerplate';

interface IPriceInput {
  price: string;
  isMin: boolean;
  label: string;
  onBlur: TButtonVoid;
  onSubmitEditing: TButtonVoid;
}

const PriceInput: React.FC<IPriceInput> = ({
  price,
  isMin,
  label,
  onBlur,
  onSubmitEditing,
}) => {
  const $priceInput = StyleSheet.flatten({
    ...styles.textInput,
    borderColor: '#C8CFD7',
  });
  const $textInputText = StyleSheet.flatten([
    styles.textInputText,
    {color: '#242424'},
  ]);

  const onChange = (e: string) => {
    const value = Number(mNumber.removeComma(mNumber.formatBidValue(e)));
    if (value < MIN_PRICE || value > MAX_PRICE_MKP) {
      isMin
        ? Dispatch.mkpSetMinPrice?.(String(MIN_PRICE))
        : Dispatch.mkpSetMaxPrice?.(
            mNumber.formatBidValue(String(MAX_PRICE_MKP)) + '+',
          );
    } else {
      isMin
        ? Dispatch.mkpSetMinPrice?.(mNumber.formatBidValue(String(value)))
        : Dispatch.mkpSetMaxPrice?.(mNumber.formatBidValue(String(value)));
    }
  };
  const onChangeText = (e: string) => onChange(e);

  return (
    <TextInput
      value={price}
      label={label}
      onBlur={onBlur}
      blurOnSubmit={false}
      onChangeText={onChangeText}
      keyboardType={'number-pad'}
      containerStyles={$priceInput}
      textInputStyles={$textInputText}
      onSubmitEditing={onSubmitEditing}
      leftIcon={<Text style={$textInputText}>{i18n.t('common.USD')} </Text>}
    />
  );
};

export default PriceInput;

const styles = StyleSheet.create({
  textInput: {borderRadius: ratioW(8), flex: 1},
  textInputText: {...TPoppinsStyle.H1420Medium},
});
