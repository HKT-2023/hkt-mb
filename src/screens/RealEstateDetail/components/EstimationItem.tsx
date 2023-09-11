import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import IcUnhide from '@app/assets/svg/RealEstateDetail/IcUnhide';
import {Text} from '@app/components/atoms';
import {RowContainer} from '@app/components/organism';
import {IRPGetListEstimation} from '@app/definitions/TApi';
import {useTheme} from '@app/theme';
import {ratioW} from '@app/utils/UDimension';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {navigate} from '@app/utils/UNavigation';
import mNumber from '@app/utils/methods/mNumber';
import {useSelector} from 'react-redux';
import {TReduxState} from '@app/redux/store/configureStore';

interface IEstimationItem {
  item: IRPGetListEstimation;
  index: number;
}
const EstimationItem: React.FC<IEstimationItem> = ({item, index}) => {
  const {colors} = useTheme();
  const {user} = useSelector((state: TReduxState) => state.UserReducer);
  const $content = StyleSheet.flatten([
    styles.content,
    {color: colors.transferTitle},
  ]);

  const onPress = () =>
    navigate('HOUSE_DETAIL_SCREEN', {houseDetail: item, isInput: false});

  const $container = StyleSheet.flatten([
    styles.container,
    {
      backgroundColor:
        user?._id === item.userId
          ? colors.primaryBackground
          : colors.mainBackground,
    },
  ]);
  return (
    <TouchableOpacity style={$container} onPress={onPress}>
      <View style={styles.flex1}>
        <Text style={$content}>{index + 1}</Text>
      </View>
      <View style={styles.flex2}>
        <Text style={$content}>{item?.name}</Text>
      </View>
      <RowContainer style={styles.flex3}>
        <Text style={$content}>{mNumber.formatUsaCurrency(item?.price)}</Text>
        <IcUnhide />
      </RowContainer>
    </TouchableOpacity>
  );
};

export default EstimationItem;

const styles = StyleSheet.create({
  content: {
    ...TPoppinsStyle.H1420Regular,
  },
  flex1: {
    flex: 1,
    margin: ratioW(12),
    justifyContent: 'center',
  },
  flex2: {
    flex: 2,
    margin: ratioW(12),
    justifyContent: 'center',
  },
  flex3: {
    flex: 3,
    margin: ratioW(12),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {flexDirection: 'row'},
});
