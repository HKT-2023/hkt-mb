import {useSelector} from 'react-redux';
import Dispatch from '@app/redux/Dispatch';
import SectionFilter from './SectionFilter';
import {IFilter} from '@app/definitions/TFilter';
import mAnimated from '@app/utils/methods/mAnimated';
import React, {useEffect, useRef, useState} from 'react';
import {TReduxState} from '@app/redux/store/configureStore';
import {Animated, StyleSheet, TextStyle, View} from 'react-native';
import {
  ratioW,
  RowContainer,
  SelectionButton,
  Separator,
  useTheme,
} from 'react-native-gin-boilerplate';

interface ISectionCheckbox {
  type: string;
  title: string;
  data: IFilter[];
}

const SectionCheckbox: React.FC<ISectionCheckbox> = ({title, data, type}) => {
  const {colors} = useTheme();
  const {propertyType, listingStatus} = useSelector(
    (state: TReduxState) => state.MKPFilterReducer,
  );
  const animatedRef = useRef(new Animated.Value(0));
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (isShow) {
      mAnimated.changeAnimated({
        toValue: 1,
        duration: 250,
        value: animatedRef.current,
      });
    } else {
      mAnimated.changeAnimated({
        toValue: 0,
        duration: 250,
        value: animatedRef.current,
      });
    }
  }, [isShow]);

  const checkExist = (value: string) => {
    switch (type) {
      case 'propertyData': {
        return propertyType?.some(e => e === value);
      }
      case 'listingData': {
        return listingStatus?.some(e => e === value);
      }
      default:
        return false;
    }
  };
  const onPress = (itemValue: string) => {
    const condition = checkExist(itemValue) && propertyType && listingStatus;
    if (condition) {
      if (type === 'propertyData') {
        Dispatch.mkpSetPropertyType?.(
          propertyType.filter(g => g !== itemValue),
        );
      } else if (type === 'listingData') {
        Dispatch.mkpSetListingStatus?.(
          listingStatus.filter(h => h !== itemValue),
        );
      }
    } else {
      if (type === 'propertyData') {
        const temp = propertyType?.concat(itemValue) ?? [];
        Dispatch.mkpSetPropertyType?.(temp);
      } else if (type === 'listingData') {
        const tmp = listingStatus?.concat(itemValue) ?? [];
        Dispatch.mkpSetListingStatus?.(tmp);
      }
    }
  };

  const $headerTab = StyleSheet.flatten([
    styles.lineSeparator,
    {borderBottomColor: colors.borderColor},
  ]);

  const $body = StyleSheet.flatten([
    styles.flexWrap,
    isShow ? styles.displayFlex : styles.displayNone,
  ]);

  const $titleStyle: TextStyle = {
    color: '#424242',
    marginLeft: ratioW(15),
  };

  return (
    <>
      <View style={$headerTab} />
      <SectionFilter title={title} onPress={setIsShow} />
      <Separator height={ratioW(12)} />
      <RowContainer style={$body}>
        {data.map((item, index) => {
          return (
            <SelectionButton
              key={index}
              isBorder={false}
              title={item.value}
              type={'multi_selection'}
              onPress={() => onPress(item.value)}
              containerStyle={styles.selectionButton}
              isCheck={checkExist(item.value) ?? false}
              titleStyle={$titleStyle}
            />
          );
        })}
      </RowContainer>
    </>
  );
};
export default SectionCheckbox;

const styles = StyleSheet.create({
  lineSeparator: {
    marginVertical: ratioW(13),
    borderBottomWidth: ratioW(1),
    marginHorizontal: ratioW(16),
  },
  tabHeaderContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: ratioW(16),
    justifyContent: 'space-between',
  },
  flexWrap: {flexWrap: 'wrap'},
  displayNone: {display: 'none'},
  displayFlex: {display: 'flex'},
  selectionButton: {
    padding: 0,
    width: '50%',
    paddingHorizontal: ratioW(16),
    paddingVertical: ratioW(12),
  },
});
