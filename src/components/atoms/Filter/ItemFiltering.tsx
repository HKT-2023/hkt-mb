import React, {useEffect, useState} from 'react';
import {TextStyle, ViewStyle} from 'react-native';
import {IMultiSelect, INFTFiltering} from '@app/definitions/TFilter';
import {ratioW, SelectionButton} from 'react-native-gin-boilerplate';

export interface IItemFilteringProps extends IMultiSelect {
  item: INFTFiltering;
}

const ItemFiltering: React.FC<IItemFilteringProps> = ({
  item,
  value,
  onChangeValue,
}) => {
  const [isCheck, setIsCheck] = useState(value.some(e => e === item.key));

  useEffect(() => {
    setIsCheck(value.some(e => e === item.key));
  }, [item.key, value]);

  const onPress = () => {
    setIsCheck(!isCheck);
    onChangeValue?.(item.key);
  };

  const $selectionButton: ViewStyle = {
    padding: 0,
    paddingHorizontal: ratioW(16),
    paddingVertical: ratioW(12),
  };
  const $titleStyle: TextStyle = {
    marginLeft: ratioW(15),
  };

  return (
    <SelectionButton
      isBorder
      onPress={onPress}
      isCheck={isCheck}
      title={item.value}
      type="multi_selection"
      containerStyle={$selectionButton}
      titleStyle={$titleStyle}
    />
  );
};

export default ItemFiltering;
