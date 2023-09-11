import i18n from '@app/i18n';
import IcLocationPin from '@app/assets/svg/RealEstateDetail/IcLocationPin';
import mNumber from '@app/utils/methods/mNumber';
import React from 'react';
import styles from '../styles/realEstateStyles';
import ViewInfo from '@app/screens/Browser/components/ViewInfo';
import {FlexView, RowContainer, ViewCondition} from '@app/components/organism';
import {IRPGetListFavoriteListing} from '@app/definitions/TApi';
import {ratioW} from '@app/utils/UDimension';
import {Separator, Text} from '@app/components/atoms';
import {
  DeviceEventEmitter,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {useTheme} from '@app/theme';
import CategoryChip from '@app/components/atoms/CategoryChip';
import {CHANGE_TAB_REAL_ESTATE} from '@app/constants/keys';
import {REAL_ESTATE_TABS} from '../RealEstateDetail';

interface IRealEstateMainProps {
  item: IRPGetListFavoriteListing;
  isForLeaseAndActive?: boolean;
}

const RealEstateMain: React.FC<IRealEstateMainProps> = ({
  item,
  isForLeaseAndActive,
}) => {
  const {colors} = useTheme();

  const $itemAddressText: TextStyle = {
    ...styles.address,
    color: colors.transferTitle,
  };
  const $itemPriceText: TextStyle = {
    ...styles.price,
    color: colors.activeColor,
  };
  const $circleSeparatorStyle: ViewStyle = {
    ...styles.circleSeparator,
    backgroundColor: colors.transferTitle,
  };
  const $priceSeparator: ViewStyle = {
    borderBottomWidth: 1,
    marginTop: ratioW(12),
    marginBottom: ratioW(8),
    borderBottomColor: colors.borderColor,
  };
  const $avgPriceTitle: TextStyle = {
    ...styles.avgPriceTitle,
    color: colors.code,
  };
  const $avgPriceDesc: TextStyle = {
    ...styles.avgPriceDesc,
    color: colors.realestateTableTitle,
  };

  const bedName = `${item?.numberOfBeds} ${
    item?.numberOfBeds <= 1
      ? i18n.t('Marketplace.Home.Filter.Amenity.Bed')
      : i18n.t('RealEstateDetail.Description.Beds')
  }`;
  const bathName = `${item?.numberOfBaths} ${
    item?.numberOfBaths <= 1
      ? i18n.t('Marketplace.Home.Filter.Amenity.Bath')
      : i18n.t('Marketplace.Home.Filter.Amenity.Baths')
  }`;
  const sqrtName = `${item?.squareFt} ${i18n.t(
    'Marketplace.Home.Filter.Amenity.Sqft',
  )}`;

  const onPress = () =>
    DeviceEventEmitter.emit(
      CHANGE_TAB_REAL_ESTATE,
      REAL_ESTATE_TABS.REAL_ESTATE_DETAIL_ESTIMATE_HISTORY,
    );

  const $statusContainer: ViewStyle = {
    backgroundColor: colors.primaryBackground,
  };
  const $statusText: TextStyle = {color: colors.priceTextMkp};
  const $containerPrice: ViewStyle = {width: '50%'};

  return (
    <FlexView style={styles.content}>
      <RowContainer>
        <CategoryChip item={item.propertySubType} />
        <Separator width={ratioW(8)} />
        <CategoryChip
          item={item.listingStatus}
          containerStyle={$statusContainer}
          textStyle={$statusText}
        />
      </RowContainer>
      <RowContainer style={styles.locationContainer}>
        <IcLocationPin />
        <Separator width={ratioW(5)} />
        <Text style={$itemAddressText}>
          {!item?.location ? item?.city : item?.location}
        </Text>
      </RowContainer>
      <RowContainer style={styles.alignCenter}>
        {!!item.numberOfBeds && <ViewInfo title={bedName} />}
        <ViewCondition
          isVisible={!!item?.numberOfBeds && !!item?.numberOfBaths}
          style={$circleSeparatorStyle}
        />
        <ViewCondition
          isVisible={
            !item?.numberOfBaths && !!item?.numberOfBeds && !!item?.squareFt
          }
          style={$circleSeparatorStyle}
        />
        {!!item.numberOfBaths && <ViewInfo title={bathName} />}
        <ViewCondition
          isVisible={!!item?.numberOfBaths && !!item?.squareFt}
          style={$circleSeparatorStyle}
        />
        {!!item.squareFt && <ViewInfo title={sqrtName} />}
      </RowContainer>
      <View style={$priceSeparator} />
      <Text style={$itemPriceText}>
        {mNumber.formatUsaCurrency(item?.price)}
        {isForLeaseAndActive
          ? i18n.t('RealEstateDetail.Description.PerMonth')
          : ''}
      </Text>
      <Separator height={ratioW(8)} />
      <TouchableOpacity onPress={onPress} style={$containerPrice}>
        <Text style={$avgPriceTitle}>
          {i18n.t('RealEstateDetail.AvgEstimatedPrice')}
        </Text>
        <Text style={$avgPriceDesc}>
          {mNumber.formatUsaCurrency(item.avgEstimatePrice ?? 0)}
        </Text>
      </TouchableOpacity>
    </FlexView>
  );
};

export default React.memo(RealEstateMain);
