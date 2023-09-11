import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import {FlexView, RowContainer} from '@app/components/organism';
import IcX from '@app/assets/svg/IcX';
import {
  Button,
  ButtonWrapper,
  Separator,
  TextInput,
} from '@app/components/atoms';
import {closeBottomSheet} from '@app/components/molecules/Modal/function';
import {ratioW} from '@app/utils/UDimension';
import i18n from '@app/i18n';
import {useTheme} from '@app/theme';

const EnterPrice = () => {
  const {colors} = useTheme();

  const $headerWrapper: ViewStyle = {
    ...styles.headerWrapper,
    borderBottomColor: colors.borderColor,
  };

  return (
    <FlexView>
      <RowContainer style={$headerWrapper}>
        <TouchableOpacity onPress={closeBottomSheet}>
          <IcX width={ratioW(30)} height={ratioW(30)} />
        </TouchableOpacity>
      </RowContainer>
      <FlexView style={styles.mainContent}>
        <TextInput label={i18n.t('Wallet.YourPrice')} />
        <Separator height={ratioW(16)} />
        <TextInput
          label={i18n.t('Wallet.MaxPrice')}
          value={'500'}
          editable={false}
        />
      </FlexView>
      <ButtonWrapper style={styles.btnWrapper}>
        <Button title={i18n.t('common.Apply')} />
      </ButtonWrapper>
    </FlexView>
  );
};

export default EnterPrice;

const styles = StyleSheet.create({
  mainContent: {
    paddingVertical: ratioW(16),
    paddingHorizontal: ratioW(27),
  },
  btnWrapper: {
    flexDirection: 'row',
  },
  headerWrapper: {
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: ratioW(16),
    paddingHorizontal: ratioW(20),
  },
});
