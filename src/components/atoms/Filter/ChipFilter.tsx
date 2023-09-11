import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ListRenderItem,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {IFilter} from '@app/definitions/TFilter';
import {keyExtractor} from '@app/constants/keys';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {ratioW, TButtonAny, Text, useTheme} from 'react-native-gin-boilerplate';

interface IChipFilterProps {
  data: IFilter[];
  activeItem: string;
  onChange: TButtonAny<string>;
  style?: ViewStyle;
}

const ChipFilter: React.FC<IChipFilterProps> = ({
  data,
  style,
  onChange,
  activeItem,
}) => {
  const {colors} = useTheme();

  const renderItem: ListRenderItem<IFilter> = ({item}) => {
    const onPress = () => onChange(item.key);
    const sButton = StyleSheet.flatten([
      styles.itemContainer,
      {
        backgroundColor:
          activeItem === item.key ? colors.primaryColor : '#ffffff',
      },
    ]);
    const sText = StyleSheet.flatten([
      styles.value,
      {
        color: activeItem === item.key ? '#ffffff' : colors.inactiveColor,
      },
    ]);
    return (
      <TouchableOpacity style={sButton} onPress={onPress} activeOpacity={0.8}>
        <Text style={sText}>{item.value}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={style}>
      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

export default ChipFilter;

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: ratioW(30),
    paddingVertical: ratioW(4),
    borderRadius: ratioW(8),
    marginRight: ratioW(10),
  },
  value: {
    ...TPoppinsStyle.H1420Regular,
  },
});
