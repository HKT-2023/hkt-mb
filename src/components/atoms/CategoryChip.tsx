import React from 'react';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {ratioW, Text} from 'react-native-gin-boilerplate';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';

interface ICategoryChip {
  item: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const CategoryChip = ({item, containerStyle, textStyle}: ICategoryChip) => {
  const $categoryContainer = StyleSheet.flatten([
    styles.categoryWrapper,
    {backgroundColor: '#E8EBEC'},
  ]);
  const $itemCategoryText = StyleSheet.flatten([
    styles.category,
    {color: '#0E232C'},
  ]);

  if (!item) {
    return <React.Fragment />;
  }
  return (
    <View style={[$categoryContainer, containerStyle]}>
      <Text style={[$itemCategoryText, textStyle]}>{item}</Text>
    </View>
  );
};

export default CategoryChip;

const styles = StyleSheet.create({
  categoryWrapper: {
    borderRadius: ratioW(8),
    paddingVertical: ratioW(5),
    paddingHorizontal: ratioW(8),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  category: {
    ...TPoppinsStyle.H1216Medium,
  },
});
