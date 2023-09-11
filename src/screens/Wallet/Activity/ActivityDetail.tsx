import React, {useEffect, useState} from 'react';
import i18n from '@app/i18n';
import {
  FlexView,
  RowContainer,
  ScrollView,
  ViewCondition,
} from '@app/components/organism';
import {Header} from '@app/components/atoms/Header';
import {IWalletActivityDetailScreenProps} from '@app/stacks/types/TNoFooterStack';
import {AutoImage, Text} from '@app/components/atoms';
import {ratioW} from '@app/utils/UDimension';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {useTheme} from '@app/theme';
import activityManagement from '@app/api/activityManagement';
import {
  closeLoading,
  openLoading,
} from '@app/components/molecules/Loading/function';
import {showFailMessage} from '@app/utils/UMessage';
import {IRPListActivity} from '@app/definitions/TApi';
import mDate from '@app/utils/methods/mDate';
import {HBA, REALTokenImg} from '@app/assets/photos';
import mNumber from '@app/utils/methods/mNumber';

const ActivityDetail: React.FC<IWalletActivityDetailScreenProps> = ({
  route,
}) => {
  const {activityId} = route.params;
  const {colors} = useTheme();
  const [data, setData] = useState<IRPListActivity>();
  const isHideNFTName = [
    'ReceiveTokenFromLearning',
    'TransferToken',
    'ReceiveToken',
    'ApproveNFT',
    'ApproveToken',
    'ReceiveTokenFromEstimation',
    'ReceiveTokenByLossBid',
  ].includes(data?.transactionType ?? '');
  const isShowRoyalty = [
    'ReceiveTokenFromSaleAtFixedPrice',
    'EarlyFinishAuction',
    'ReceiveTokenFromAuction',
    'ReceiveNFTFromAuction',
    'ApproveOffer',
    'ReceiveTokenFromAuctionNoFee',
    'ReceiveNFTFromAuctionNoFee',
  ].includes(data?.transactionType ?? '');
  const isShowMemo = [
    'TransferNFT',
    'TransferToken',
    'ReceiveNFT',
    'ReceiveToken',
  ].includes(data?.transactionType ?? '');
  const isShowPoint = [
    'TransferNFT',
    'ReceiveNFT',
    'EarlyFinishAuction',
    'ReceiveTokenFromAuction',
    'ReceiveNFTFromAuction',
    'ApproveOffer',
    'ReceiveNFTFromOffer',
    'ReceiveTokenFromAuctionNoFee',
    'ReceiveNFTFromAuctionNoFee',
  ].includes(data?.transactionType ?? '');
  const isPriceNamePrice = [
    'TransferNFT',
    'ReceiveNFT',
    'PurchasedNFT',
    'ReceiveTokenFromSaleAtFixedPrice',
    'SendAuction',
    'EarlyFinishAuction',
    'ReceiveNFTFromAuction',
    'SendOffer',
    'ApproveOffer',
    'ReceiveNFTFromOffer',
    'ReceiveNFTFromAuctionNoFee',
    'CancelSaleWithOfferNoFee',
    'CancelSaleWithOffer',
  ].includes(data?.transactionType ?? '');
  const isPriceNameAmount = [
    'TransferToken',
    'ReceiveToken',
    'ReceiveTokenFromLearning',
    'ReceiveTokenFromAuction',
    'ReceiveTokenFromEstimation',
    'ReceiveTokenByLossBid',
    'ReceiveTokenFromAuctionNoFee',
  ].includes(data?.transactionType ?? '');
  const isHidePrice = !isPriceNamePrice && !isPriceNameAmount;

  useEffect(() => {
    openLoading();
    if (activityId) {
      activityManagement
        .activityDetail(activityId)
        .then(res => {
          closeLoading();
          if (res.data) {
            setData(res.data);
          }
        })
        .catch(err => {
          showFailMessage(String(err));
          closeLoading();
        });
    }
  }, [activityId]);

  const $balance: TextStyle = {
    ...TPoppinsStyle.H3248Medium,
    color: colors.activeColor,
  };
  const $sectionFirst: ViewStyle = {
    borderBottomWidth: 1,
    paddingVertical: ratioW(28),
    borderBottomColor: colors.borderColor,
    backgroundColor: colors.mainBackground,
  };
  const $columnTitle = StyleSheet.flatten([
    styles.columnTitle,
    {color: colors.realestateTableTitle},
  ]);
  const $columnDesc = StyleSheet.flatten([
    styles.columnDesc,
    {color: colors.date},
  ]);

  const renderColumn = (label: string, value: string) => {
    return (
      <RowContainer style={styles.row}>
        <Text style={$columnTitle}>{label}</Text>
        <Text style={[$columnDesc, styles.width50]}>{value}</Text>
      </RowContainer>
    );
  };
  const renderColumnWithLogo = (
    label: string,
    value?: string,
    logo = REALTokenImg,
  ) => {
    return (
      <RowContainer style={styles.row}>
        <Text style={$columnTitle}>{label}</Text>
        <ViewCondition isVisible={!!value}>
          <RowContainer style={styles.alignCenter}>
            <AutoImage source={logo} style={styles.leftIconInput} />
            <Text style={$columnDesc}>{value}</Text>
          </RowContainer>
        </ViewCondition>
      </RowContainer>
    );
  };
  const renderPriceName = () => {
    if (isPriceNamePrice) {
      return i18n.t('common.Price');
    } else if (isPriceNameAmount) {
      return i18n.t('Wallet.Amount');
    } else {
      return '';
    }
  };

  return (
    <FlexView>
      <Header title={i18n.t('common.Activity')} />
      <View style={$sectionFirst}>
        <Text style={styles.title}>{data?.transactionDescription}</Text>
        <RowContainer style={styles.balanceContainer}>
          <AutoImage
            source={!isHidePrice ? REALTokenImg : HBA}
            style={styles.bigToken}
          />
          <Text style={$balance}>
            {mNumber.formatNumberWithDots(
              String(
                Math.abs(
                  !isHidePrice
                    ? data?.content.price ?? 0
                    : Number(data?.gasFee ?? 0),
                ),
              ),
            )}
          </Text>
        </RowContainer>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <FlexView>
          {renderColumn(
            i18n.t('Wallet.TransactionType'),
            data?.transactionDescription ?? '',
          )}
          {renderColumn(
            i18n.t('Wallet.TransactionDate'),
            mDate.formatDate(data?.createdAt, mDate.FORMAT_DATE_WALLET),
          )}
          {renderColumn(
            i18n.t('Wallet.Status'),
            data?.status ? i18n.t('common.Complete') : i18n.t('common.Failed'),
          )}
          <ViewCondition isVisible={!isHideNFTName}>
            {renderColumn(i18n.t('Wallet.NFTName'), data?.nftName ?? '')}
          </ViewCondition>
          <ViewCondition isVisible={!isHidePrice}>
            {renderColumnWithLogo(
              renderPriceName(),
              mNumber.formatNumberWithDots(
                String(Math.abs(data?.content.price ?? 0) ?? ''),
              ),
            )}
          </ViewCondition>
          <ViewCondition isVisible={isShowPoint}>
            {renderColumn(
              i18n.t('common.Point'),
              mNumber.formatNumberWithDots(
                String(Math.abs(data?.content.point ?? 0) ?? ''),
              ),
            )}
          </ViewCondition>
          <ViewCondition isVisible={isShowRoyalty}>
            {renderColumnWithLogo(
              i18n.t('Wallet.RoyaltyOfEveryTransction'),
              mNumber.formatNumberWithDots(String(data?.content.royalty ?? '')),
            )}
          </ViewCondition>
          {renderColumnWithLogo(
            i18n.t('NFTDetail.GasFee'),
            mNumber.formatNumberWithDots(data?.gasFee ?? ''),
            HBA,
          )}
          <ViewCondition isVisible={isShowMemo}>
            {renderColumn(i18n.t('Wallet.Memo'), data?.memo ?? '')}
          </ViewCondition>
        </FlexView>
      </ScrollView>
    </FlexView>
  );
};

export default ActivityDetail;

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    marginBottom: ratioW(20),
    alignItems: 'center',
  },
  scroll: {
    flexGrow: 1,
    marginTop: ratioW(16),
  },
  title: {
    textAlign: 'center',
    marginBottom: ratioW(4),
    ...TPoppinsStyle.H1420Medium,
  },
  leftIconInput: {
    width: ratioW(24),
    height: ratioW(24),
    marginRight: ratioW(8),
  },
  bigToken: {
    width: ratioW(32),
    height: ratioW(32),
    marginRight: ratioW(8),
  },
  alignCenter: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  balanceContainer: {alignSelf: 'center', alignItems: 'center'},
  columnTitle: {
    ...TPoppinsStyle.H1420Regular,
    width: '50%',
  },
  columnDesc: {
    ...TPoppinsStyle.H1420Medium,
    textAlign: 'right',
  },
  width50: {width: '50%'},
});
