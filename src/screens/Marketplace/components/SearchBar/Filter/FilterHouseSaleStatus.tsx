import React from 'react';
import i18n from '@app/i18n';
import {useSelector} from 'react-redux';
import Dispatch from '@app/redux/Dispatch';
import {StyleSheet, TextStyle} from 'react-native';
import {TReduxState} from '@app/redux/store/configureStore';
import {
  ratioW,
  RowContainer,
  SelectionButton,
} from 'react-native-gin-boilerplate';

const FilterHouseSaleStatus = () => {
  const {filterHouseStatus} = useSelector(
    (state: TReduxState) => state.MKPFilterReducer,
  );

  const $titleStyle: TextStyle = {
    color: '#424242',
    marginLeft: ratioW(15),
  };

  const checkExist = (value: string) =>
    filterHouseStatus?.some(e => e === value);

  const onPress = (type: string) => {
    const condition = filterHouseStatus && checkExist(type);
    if (condition) {
      Dispatch.mkpSetFilterHouseStatus?.(
        filterHouseStatus.filter(g => g !== type),
      );
    } else {
      const temp = filterHouseStatus?.concat(type) ?? [];
      Dispatch.mkpSetFilterHouseStatus?.(temp);
    }
  };

  return (
    <RowContainer>
      <SelectionButton
        isBorder={false}
        title={i18n.t('Marketplace.Home.Filter.PropertyType.ForSale')}
        type={'multi_selection'}
        onPress={() => onPress('forSale')}
        containerStyle={styles.selectionButton}
        isCheck={checkExist('forSale') ?? false}
        titleStyle={$titleStyle}
      />
      <SelectionButton
        isBorder={false}
        title={i18n.t('Marketplace.Home.Filter.PropertyType.ForLease')}
        type={'multi_selection'}
        onPress={() => onPress('forLease')}
        containerStyle={styles.selectionButton}
        isCheck={checkExist('forLease') ?? false}
        titleStyle={$titleStyle}
      />
    </RowContainer>
  );
};

export default FilterHouseSaleStatus;

const styles = StyleSheet.create({
  selectionButton: {
    padding: 0,
    width: '50%',
    paddingHorizontal: ratioW(16),
    paddingVertical: ratioW(12),
  },
});
