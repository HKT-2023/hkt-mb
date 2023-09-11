import React, {useEffect, useState} from 'react';
import i18n from '@app/i18n';
import {useSelector} from 'react-redux';
import Dispatch from '@app/redux/Dispatch';
import data from '@app/_dummy/d_marketplace_sort';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {TReduxState} from '@app/redux/store/configureStore';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  ratioW,
  RowContainer,
  SelectionButton,
  TButtonVoid,
  Text,
  useTheme,
} from 'react-native-gin-boilerplate';
import {IcClose} from '@app/assets/svg';

const Sort = ({
  onClose,
  isHideNearest,
  onSelect,
}: {
  onClose: TButtonVoid;
  isHideNearest: boolean;
  onSelect: TButtonVoid;
}) => {
  const {colors} = useTheme();
  const {sortBy} = useSelector((state: TReduxState) => state.MKPFilterReducer);
  const [sortData, setSortData] = useState(data);

  useEffect(() => {
    if (isHideNearest) {
      setSortData(data.filter(e => e.key !== 'nearest'));
    }
  }, [isHideNearest]);

  const $container = StyleSheet.flatten([
    styles.container,
    {backgroundColor: colors.mainBackground},
  ]);
  const $header = StyleSheet.flatten([
    styles.marginBot16,
    styles.paddingContent,
    styles.tabHeaderContainer,
  ]);
  const $borderBottom = StyleSheet.flatten([
    styles.borderBottom,
    {borderBottomColor: colors.separatorBackground},
  ]);
  const $headerTitle = StyleSheet.flatten([styles.title, {color: '#424242'}]);

  return (
    <View style={$container}>
      <RowContainer style={$header}>
        <Text style={$headerTitle}>{i18n.t('SortBy.title')}</Text>
        <TouchableOpacity onPress={onClose}>
          <IcClose />
        </TouchableOpacity>
      </RowContainer>
      <View style={$borderBottom} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {sortData.map((item: {value: string}, index: number) => {
          const checkExist = sortBy === item.value;
          const onPress = () => {
            Dispatch.mkpSetSortBy?.(item.value);
            onSelect();
            onClose();
          };
          return (
            <SelectionButton
              key={index}
              type={'radio'}
              isBorder={false}
              onPress={onPress}
              title={item.value}
              isCheck={checkExist}
              titleStyle={{color: '#424242'}}
              containerStyle={(styles.selectionButton, $borderBottom)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Sort;

const styles = StyleSheet.create({
  container: {
    paddingVertical: ratioW(16),
    borderTopEndRadius: ratioW(20),
    borderTopStartRadius: ratioW(20),
    flex: 1,
  },
  title: {
    ...TPoppinsStyle.H1624Bold,
  },
  paddingContent: {paddingHorizontal: ratioW(16)},
  tabHeaderContainer: {alignItems: 'center', justifyContent: 'space-between'},
  borderBottom: {borderBottomWidth: ratioW(1)},
  marginBot16: {marginBottom: ratioW(16)},
  marginBot70: {marginBottom: ratioW(70)},
  buttonBottomContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  selectionButton: {
    padding: 0,
    paddingVertical: ratioW(16),
  },
});
