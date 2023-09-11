import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {IRPGetListFavoriteListing} from '@app/definitions/TApi';
import mNumber from '@app/utils/methods/mNumber';
import {
  Text,
  ratioW,
  useTheme,
  Separator,
  AutoImage,
  RowContainer,
  TButtonVoid,
} from 'react-native-gin-boilerplate';
import {IcLocationPin} from '@app/assets/svg';
import {CategoryChip} from '@app/components/atoms';

interface INearYouItem {
  item: IRPGetListFavoriteListing;
  onPress: TButtonVoid;
}
const RecommendItem: React.FC<INearYouItem> = ({item, onPress}) => {
  const {colors} = useTheme();

  const $itemAddressText = StyleSheet.flatten([
    styles.locationText,
    {color: '#132E3B'},
  ]);
  const $itemPriceText = StyleSheet.flatten([
    styles.priceText,
    {color: colors.activeColor},
  ]);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <AutoImage style={styles.image} uri={item?.thumbnail ?? ''} />
      <View style={styles.flex1}>
        <CategoryChip item={item.propertySubType} />
        <RowContainer style={styles.locationContainer}>
          <IcLocationPin color={'#15191B'} />
          <Separator width={ratioW(5)} />
          <Text style={$itemAddressText} numberOfLines={1}>
            {!item?.location ? item?.city : item?.location}
          </Text>
        </RowContainer>
        <Text style={$itemPriceText}>
          {item.price && mNumber.formatUsaCurrency(item.price)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(RecommendItem);

const styles = StyleSheet.create({
  locationText: {
    ...TPoppinsStyle.H1420Medium,
  },
  locationContainer: {
    alignItems: 'center',
    marginVertical: ratioW(8),
    marginRight: ratioW(20),
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
