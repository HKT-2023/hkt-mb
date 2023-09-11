import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import IcLocationPin from '@app/assets/svg/RealEstateDetail/IcLocationPin';
import {AutoImage, Separator, Text} from '@app/components/atoms';
import {RowContainer} from '@app/components/organism';
import {useTheme} from '@app/theme';
import {ratioW} from '@app/utils/UDimension';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {TButtonVoid} from '@app/definitions/TButton';
import {IRPGetListFavorite} from '@app/definitions/TApi';
import mNumber from '@app/utils/methods/mNumber';
import CategoryChip from '@app/components/atoms/CategoryChip';

interface INearYouItem {
  item: IRPGetListFavorite;
  onPress: TButtonVoid;
}
const SavedHomeItem: React.FC<INearYouItem> = ({item, onPress}) => {
  const {colors} = useTheme();

  const $itemAddressText = StyleSheet.flatten([
    styles.locationText,
    {color: colors.walletBackground},
  ]);
  const $itemPriceText = StyleSheet.flatten([
    styles.priceText,
    {color: colors.activeColor},
  ]);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <AutoImage style={styles.image} uri={item?.photo} />
      <View style={styles.flex1}>
        <CategoryChip item={item.propertySubType} />
        <RowContainer style={styles.locationContainer}>
          <IcLocationPin color={colors.transferTitle} />
          <Separator width={ratioW(5)} />
          <Text style={$itemAddressText} numberOfLines={1}>
            {!item?.location ? item.city : item?.location}
          </Text>
        </RowContainer>
        <Text style={$itemPriceText}>
          {'$'}
          {item?.price && mNumber.formatBidValue(String(item?.price))}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SavedHomeItem;

const styles = StyleSheet.create({
  locationText: {
    ...TPoppinsStyle.H1420Medium,
  },
  locationContainer: {
    alignItems: 'center',
    marginVertical: ratioW(8),
  },
  priceText: {
    ...TPoppinsStyle.H1624Bold,
  },
  image: {
    width: ratioW(110),
    height: ratioW(110),
    marginRight: ratioW(16),
    borderRadius: ratioW(8),
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: ratioW(16),
  },
  flex1: {flex: 1},
});
