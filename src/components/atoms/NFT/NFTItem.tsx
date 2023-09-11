import React from 'react';
import i18n from '@app/i18n';
import {IRPViewNFT} from '@app/definitions/TApi';
import mNumber from '@app/utils/methods/mNumber';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {useCountdown} from '@app/hooks/useCountdown';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {
  Text,
  ratioW,
  useTheme,
  AutoImage,
  TButtonAny,
  screenWidth,
  RowContainer,
} from 'react-native-gin-boilerplate';

interface IProps {
  item: IRPViewNFT;
  index: number;
  style?: ViewStyle;
  disabled?: boolean;
  onGetItem?: TButtonAny<IRPViewNFT>;
}

const NFTItem: React.FC<IProps> = props => {
  const {style, item, index, onGetItem} = props;
  const {colors} = useTheme();
  const {days, hours, minutes} = useCountdown(item.endDate);

  const convertDay = days > 0 ? `${days}d ` : '0d ';
  const convertHour = hours > 0 ? `${hours}h ` : '0h ';
  const convertMin = minutes > 0 ? `${minutes}m` : '0m';

  const $container: ViewStyle = {
    padding: ratioW(8),
    borderRadius: ratioW(4),
    backgroundColor: colors.mainBackground,
    marginLeft: index % 2 === 0 ? ratioW(16) : ratioW(8),
    marginRight: index % 2 === 0 ? ratioW(8) : ratioW(16),
    width: (screenWidth - 32 - 20) / 2,
    ...style,
  };
  const $timeWrapper = StyleSheet.flatten([
    styles.timeWrapper,
    {backgroundColor: '#E9F9FB'},
  ]);
  const $name = StyleSheet.flatten([styles.name, {color: '#041315'}]);
  const $price = StyleSheet.flatten([styles.price, {color: '#041315'}]);
  const $time = StyleSheet.flatten([styles.time, {color: '#148F9D'}]);

  const onItemPress = () => {
    if (!onGetItem) {
      // do anything
    } else {
      onGetItem(item);
    }
  };

  const renderPrice = () => {
    if (item.salesType?.key) {
      switch (item.salesType.key) {
        case 'offer':
          return item?.winningPrice ?? 0;
        case 'bid':
        case 'sellFixedPrice':
          return item?.price ?? 0;
        default:
          return 0;
      }
    }
  };
  const renderPointName = () => {
    if (item.point > 1) {
      return i18n.t('common.points');
    } else {
      return i18n.t('common.point');
    }
  };

  return (
    <TouchableOpacity
      style={$container}
      disabled={true}
      activeOpacity={0.8}
      onPress={onItemPress}>
      <AutoImage uri={item.images} style={styles.photo} />
      <Text style={$name} numberOfLines={1}>
        {item.name}
      </Text>
      <RowContainer style={styles.priceRow}>
        <Text style={$price} numberOfLines={1}>
          {mNumber.formatNumberWithDots(String(item.point ?? 0))}{' '}
          {renderPointName()}
        </Text>
      </RowContainer>
      {!item.salesType?.key || !item.price ? (
        <View style={[styles.userAvatar, styles.priceRow]} />
      ) : (
        <RowContainer style={styles.priceRow}>
          {/*<AutoImage source={REALTokenImg} style={styles.userAvatar} />*/}
          <Text style={$price} numberOfLines={1}>
            {mNumber.formatNumberWithDots(String(renderPrice() ?? '0'))}
          </Text>
        </RowContainer>
      )}
      {!item.salesType?.key || item.salesType.key !== 'bid' ? (
        <View style={styles.viewTime} />
      ) : (
        <View style={$timeWrapper}>
          <Text style={$time}>
            {convertDay}
            {convertHour}
            {convertMin}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(NFTItem);

const styles = StyleSheet.create({
  userAvatar: {
    width: ratioW(20),
    height: ratioW(20),
    marginRight: ratioW(8),
    borderRadius: ratioW(10),
  },
  name: {
    marginTop: ratioW(12),
    ...TPoppinsStyle.H1420Medium,
  },
  time: {
    ...TPoppinsStyle.H1216Medium,
    marginVertical: ratioW(6),
  },
  photo: {
    width: '100%',
    height: ratioW(158),
    borderRadius: ratioW(4),
  },
  priceRow: {
    alignItems: 'center',
    marginTop: ratioW(8),
  },
  price: {
    letterSpacing: 0.1,
    ...TPoppinsStyle.H1420Medium,
  },
  timeWrapper: {
    alignItems: 'center',
    borderRadius: ratioW(4),
    marginTop: ratioW(8),
  },
  viewTime: {
    paddingVertical: ratioW(14),
    marginTop: ratioW(8),
  },
});
