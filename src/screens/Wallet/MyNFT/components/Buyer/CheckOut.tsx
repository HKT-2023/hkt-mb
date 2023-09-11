import React from 'react';
import {AutoImage, Button, Text} from '@app/components/atoms';
import {Header} from '@app/components/atoms/Header';
import {FlexView, RowContainer, ViewCondition} from '@app/components/organism';
import i18n from '@app/i18n';
import {ICheckOutScreenProps} from '@app/stacks/types/TNoFooterStack';
import {ratioW} from '@app/utils/UDimension';
import {useTheme} from '@app/theme';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {REALTokenImg} from '@app/assets/photos';
import nftManagement from '@app/api/nftManagement';
import {
  closeLoading,
  openLoading,
} from '@app/components/molecules/Loading/function';
import {showFailMessage, showSuccessMessage} from '@app/utils/UMessage';
import {goBack} from '@app/utils/UNavigation';
import useGetBalance from '@app/hooks/useGetBalance';
import mWallet from '@app/utils/methods/mWallet';

const CheckOut: React.FC<ICheckOutScreenProps> = ({route}) => {
  const {item} = route.params;
  const {userBalance} = useGetBalance();
  const {colors} = useTheme();

  const $title: TextStyle = {
    ...TPoppinsStyle.H1420Regular,
    color: colors.realestateTableTitle,
  };
  const $titleTotal: TextStyle = {
    ...TPoppinsStyle.H1624Medium,
    color: colors.transferTitle,
  };
  const $desc: TextStyle = {
    ...TPoppinsStyle.H1420Medium,
    color: colors.date,
  };
  const $container: ViewStyle = {backgroundColor: colors.mainBackground};

  const onPress = () => {
    if (item?._id) {
      mWallet.checkEnoughBalance(userBalance ?? 0, item.price, () => {
        openLoading();
        nftManagement
          .buyNFTFixedPrice(item?.sellingConfigId)
          .then(res => {
            closeLoading();
            showSuccessMessage(res.message);
            goBack();
          })
          .catch(err => {
            closeLoading();
            showFailMessage(String(err));
          });
      });
    }
  };

  return (
    <FlexView style={$container}>
      <Header title={i18n.t('Wallet.CheckOut')} />
      <FlexView style={styles.mainContainer}>
        <AutoImage uri={item?.images ?? ''} style={styles.nftImage} />
        <RowContainer style={styles.row}>
          <Text style={$title}>{i18n.t('common.Item')}</Text>
          <ViewCondition isVisible={!!item?.propertyAddress}>
            <Text style={$desc}>{item?.propertyAddress}</Text>
          </ViewCondition>
        </RowContainer>
        <RowContainer style={styles.row}>
          <Text style={$title}>{i18n.t('Wallet.SubTotal')}</Text>
          <ViewCondition isVisible={!!item?.price}>
            <RowContainer>
              <AutoImage source={REALTokenImg} style={styles.realToken} />
              <Text style={$desc}>{item?.price}</Text>
            </RowContainer>
          </ViewCondition>
        </RowContainer>
        <RowContainer style={styles.row}>
          <Text style={$title}>{i18n.t('Wallet.Fees')}</Text>
          <Text style={$desc}></Text>
        </RowContainer>
        <RowContainer style={styles.row}>
          <Text style={$titleTotal}>{i18n.t('Wallet.Total')}</Text>
          <ViewCondition isVisible={!!item?.price}>
            <RowContainer>
              <AutoImage source={REALTokenImg} style={styles.realToken} />
              <Text style={$titleTotal}>{item?.price}</Text>
            </RowContainer>
          </ViewCondition>
        </RowContainer>
        <Button
          title={i18n.t('Wallet.ConfirmCheckOut')}
          style={styles.btn}
          onPress={onPress}
        />
      </FlexView>
    </FlexView>
  );
};

export default CheckOut;

const styles = StyleSheet.create({
  realToken: {
    width: ratioW(24),
    height: ratioW(24),
    marginRight: ratioW(8),
  },
  nftImage: {
    width: ratioW(338),
    height: ratioW(254),
    alignSelf: 'center',
    marginBottom: ratioW(28),
    borderRadius: ratioW(12),
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: ratioW(20),
  },
  mainContainer: {
    marginTop: ratioW(12),
    marginHorizontal: ratioW(16),
  },
  btn: {position: 'absolute', bottom: ratioW(24)},
});
