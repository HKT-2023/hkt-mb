import React from 'react';
import sharedStyles from '@app/sharedStyles';
import FastImage from 'react-native-fast-image';
import mNumber from '@app/utils/methods/mNumber';
import UNavigation from '@app/utils/UNavigation';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {INFTMarketplace} from '@app/definitions/TNFTMarketplace';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ratioW, RowContainer, useTheme} from 'react-native-gin-boilerplate';

interface IProps {
  item: INFTMarketplace;
}

const Item: React.FC<IProps> = ({item}) => {
  const {colors} = useTheme();
  const onPress = () =>
    UNavigation.navigate('REAL_ESTATE_DETAIL_SCREEN', {item: item});
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <View>
          <FastImage source={item.photo as number} style={styles.photo} />
          <Text style={[styles.points, {color: colors.backgroundColor}]}>
            {mNumber.formatNumber(item.points.toString())} Points
          </Text>
        </View>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <RowContainer style={styles.rowWrapper}>
          <RowContainer style={styles.rowLogo}>
            {/*<FastImage source={logo} style={styles.logo} />*/}
            <Text style={styles.price}>{item.price}</Text>
          </RowContainer>
          <Text style={styles.remainTime}>{item.remainTime as string}</Text>
        </RowContainer>
      </View>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  points: {
    ...TPoppinsStyle.H1216Bold,
    position: 'absolute',
    top: ratioW(10),
    left: ratioW(10),
  },
  rowWrapper: {
    alignItems: 'center',
    marginTop: ratioW(10),
    justifyContent: 'space-between',
  },
  rowLogo: {
    alignItems: 'center',
  },
  logo: {
    width: ratioW(15),
    height: ratioW(15),
    marginRight: ratioW(4),
  },
  price: {
    ...TPoppinsStyle.H1216Regular,
    color: '#1fc7d4',
  },
  remainTime: {
    ...TPoppinsStyle.H1216Regular,
  },
  name: {
    ...TPoppinsStyle.H1420Medium,
  },
  photo: {
    width: '100%',
    height: ratioW(130),
    alignSelf: 'center',
    marginBottom: ratioW(10),
    borderRadius: ratioW(20),
  },
  container: {
    width: '50%',
    padding: ratioW(10),
  },
  content: {
    flex: 1,
    borderRadius: ratioW(24),
    padding: ratioW(10),
    paddingBottom: ratioW(15),
    ...sharedStyles.shadow,
    backgroundColor: '#EEF5F6',
  },
});
