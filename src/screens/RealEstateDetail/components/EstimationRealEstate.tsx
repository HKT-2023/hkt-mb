import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from '@app/components/atoms';
import {RowContainer} from '@app/components/organism';
import i18n from '@app/i18n';
import {useTheme} from '@app/theme';
import {ratioW} from '@app/utils/UDimension';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import EstimationItem from './EstimationItem';
import IcViewAll from '@app/assets/svg/RealEstateDetail/IcViewAll';
import {navigate} from '@app/utils/UNavigation';
import {useRealEstateDetailContext} from '@app/context';
import {IRPGetListEstimation} from '@app/definitions/TApi';
import EmptyComponent from '@app/components/atoms/EmptyComponent';

const EstimationRealEstate = ({data}: {data: IRPGetListEstimation[]}) => {
  const {colors} = useTheme();
  const {item} = useRealEstateDetailContext();

  const $title = StyleSheet.flatten([
    styles.title,
    {color: colors.transferTitle},
  ]);
  const $titleContainer = {backgroundColor: colors.transferItemBackground};

  const onPress = () =>
    navigate('HOUSE_DETAIL_SCREEN', {
      listItem: true,
      isInput: false,
      houseId: item?.id,
    });

  if (!data.length) {
    return <EmptyComponent />;
  }
  return (
    <View>
      <RowContainer style={$titleContainer}>
        <View style={styles.flex1}>
          <Text style={$title}>
            {i18n.t('RealEstateDetail.EstimationHistory.No')}
          </Text>
        </View>
        <View style={styles.flex2}>
          <Text style={$title}>
            {i18n.t('RealEstateDetail.EstimationHistory.Name')}
          </Text>
        </View>
        <RowContainer style={styles.flex3}>
          <Text style={$title}>
            {i18n.t('RealEstateDetail.EstimationHistory.Price')}
          </Text>
          <TouchableOpacity onPress={onPress}>
            <IcViewAll />
          </TouchableOpacity>
        </RowContainer>
      </RowContainer>
      {data.map((itemList, index) => {
        return <EstimationItem key={index} index={index} item={itemList} />;
      })}
    </View>
  );
};

export default EstimationRealEstate;

const styles = StyleSheet.create({
  title: {
    ...TPoppinsStyle.H1216Medium,
    textTransform: 'uppercase',
  },
  flex1: {flex: 1, margin: ratioW(12), justifyContent: 'center'},
  flex2: {flex: 2, margin: ratioW(12), justifyContent: 'center'},
  flex3: {
    flex: 3,
    margin: ratioW(12),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
