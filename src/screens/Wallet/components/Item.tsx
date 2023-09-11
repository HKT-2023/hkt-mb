import {
  View,
  TextStyle,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import i18n from '@app/i18n';
import isNumber from 'lodash/isNumber';
import mDate from '@app/utils/methods/mDate';
import mNumber from '@app/utils/methods/mNumber';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {TNavigation} from '@app/stacks/types/TStack';
import {IRPListActivity} from '@app/definitions/TApi';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  ratioW,
  useTheme,
  RowContainer,
} from 'react-native-gin-boilerplate';
import {IcArrowDown, IcArrowUp} from '@app/assets/svg';

interface IProps {
  item: IRPListActivity;
  index: number;
}

const Item: React.FC<IProps> = ({item}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<TNavigation>();

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
  ].includes(item?.transactionType ?? '');
  const isPriceNameAmount = [
    'TransferToken',
    'ReceiveToken',
    'ReceiveTokenFromLearning',
    'ReceiveTokenFromAuction',
    'ReceiveTokenFromEstimation',
    'ReceiveTokenByLossBid',
  ].includes(item?.transactionType ?? '');
  const isHidePrice = !isPriceNamePrice && !isPriceNameAmount;

  const $container: ViewStyle = {
    paddingVertical: ratioW(14),
    backgroundColor: colors.mainBackground,
  };

  const getColor = () => {
    if (!isNumber(item?.content?.price)) {
      return '#E8EBEC';
    } else {
      if (isHidePrice) {
        return '#F8E9ED';
      } else if (item?.content?.price === 0) {
        if (item?.content?.point < 0) {
          return '#F8E9ED';
        } else {
          return '#E9F9FB';
        }
      } else if (item?.content?.price < 0) {
        return '#F8E9ED';
      } else {
        return '#E9F9FB';
      }
    }
  };

  const renderIcon = () => {
    if (!isNumber(item?.content?.price)) {
      return <React.Fragment />;
    } else {
      if (isHidePrice) {
        return <IcArrowDown color={'#8A1734'} />;
      } else if (item?.content?.price === 0) {
        if (item?.content?.point < 0) {
          return <IcArrowDown color={'#8A1734'} />;
        } else {
          return <IcArrowUp color={colors.activeColor} />;
        }
      } else if (item?.content?.price < 0) {
        return <IcArrowDown color={'#8A1734'} />;
      } else {
        return <IcArrowUp color={colors.activeColor} />;
      }
    }
  };
  const renderPriceName = () => {
    if (isPriceNamePrice) {
      return i18n.t('common.Price');
    } else if (isPriceNameAmount) {
      return i18n.t('Wallet.Amount');
    } else {
      return i18n.t('NFTDetail.GasFee');
    }
  };

  const $iconWrapper: ViewStyle = {
    width: ratioW(32),
    height: ratioW(32),
    alignItems: 'center',
    marginRight: ratioW(12),
    justifyContent: 'center',
    borderRadius: ratioW(22),
    backgroundColor: getColor(),
  };
  const $state: TextStyle = {
    letterSpacing: 0.1,
    textTransform: 'capitalize',
    ...TPoppinsStyle.H1420Medium,
    color: item.status ? colors.activeColor : '#B81E45',
  };
  const $stateWrapper: ViewStyle = {
    alignSelf: 'flex-start',
    borderRadius: ratioW(8),
    paddingVertical: ratioW(2),
    paddingHorizontal: ratioW(8),
    backgroundColor: item.status ? '#E9F9FB' : '#FFFBF9',
  };
  const $title: TextStyle = {
    letterSpacing: 0.1,
    ...TPoppinsStyle.H1624Medium,
    color: '#15191B',
    flex: 1,
  };

  const $itemTitle: TextStyle = {
    ...TPoppinsStyle.H1420Regular,
  };
  const $itemDesc: TextStyle = {
    color: '#4A575D',
    ...TPoppinsStyle.H1420Medium,
  };

  const onItemPress = () =>
    navigation.navigate('WALLET_ACTIVITY_DETAIL_SCREEN', {
      activityId: item._id,
    });

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onItemPress}>
      <RowContainer style={$container}>
        <View style={$iconWrapper}>{renderIcon()}</View>
        <View style={styles.row}>
          <RowContainer style={[styles.row, styles.rowTitle]}>
            <Text style={$title}>{item?.transactionDescription}</Text>
            <View style={$stateWrapper}>
              <Text style={$state}>
                {item?.status
                  ? i18n.t('common.Complete')
                  : i18n.t('common.Failed')}
              </Text>
            </View>
          </RowContainer>
          <RowContainer style={styles.row}>
            <Text style={$itemTitle}>
              {i18n.t('RealEstateDetail.RequestTour.Time')}
            </Text>
            <Text style={$itemDesc}>
              {item?.createdAt
                ? mDate.formatDate(item?.createdAt, mDate.FORMAT_DATE_WALLET)
                : ''}
            </Text>
          </RowContainer>
          <RowContainer style={styles.row}>
            <Text style={$itemTitle}>{renderPriceName()}</Text>
            <RowContainer style={styles.alignCenter}>
              {/*<AutoImage*/}
              {/*  source={!isHidePrice ? REALTokenImg : HBA}*/}
              {/*  style={styles.leftIconInput}*/}
              {/*/>*/}
              <Text style={$itemDesc}>
                {mNumber.formatNumberWithDots(
                  String(
                    Math.abs(
                      !isHidePrice
                        ? item?.content?.price ?? 0
                        : Number(item?.gasFee ?? 0),
                    ),
                  ),
                ) ?? ''}
              </Text>
            </RowContainer>
          </RowContainer>
          <RowContainer style={styles.row}>
            <Text style={$itemTitle}>{i18n.t('common.Points')}</Text>
            <Text style={$itemDesc}>
              {mNumber.formatNumberWithDots(
                String(Math.abs(item?.content.point ?? 0)),
              )}
            </Text>
          </RowContainer>
        </View>
      </RowContainer>
    </TouchableOpacity>
  );
};

export default React.memo(Item);

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: ratioW(8),
  },
  rowTitle: {paddingVertical: ratioW(4)},
  leftIconInput: {
    width: ratioW(24),
    height: ratioW(24),
    marginRight: ratioW(8),
  },
  alignCenter: {alignItems: 'center'},
});
