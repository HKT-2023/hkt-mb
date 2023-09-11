import React from 'react';
import {TouchableOpacity, View, ViewStyle} from 'react-native';
import IcX from '@app/assets/svg/IcX';
import {Text} from '@app/components/atoms';
import {TButtonVoid} from '@app/definitions/TButton';
import {useTheme} from '@app/theme';
import {ratioW} from '@app/utils/UDimension';
import {TPoppinsStyle} from '@app/utils/UTextStyle';

interface IChipItem {
  index: number;
  name: string;
  onPress: TButtonVoid;
}

const ChipItem = ({index, name, onPress}: IChipItem) => {
  const {colors} = useTheme();

  const $chip: ViewStyle = {
    flex: 1,
    borderWidth: 1,
    minWidth: '30%',
    maxWidth: '47.5%',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: ratioW(8),
    marginBottom: ratioW(8),
    borderRadius: ratioW(8),
    paddingVertical: ratioW(4),
    paddingHorizontal: ratioW(8),
    justifyContent: 'space-between',
    borderColor: colors.inputInactiveBorder,
  };
  const $chipText = {
    flex: 1,
    color: colors.chipText,
    ...TPoppinsStyle.H1420Regular,
  };

  return (
    <View key={index} style={$chip}>
      <Text style={$chipText} numberOfLines={1}>
        {name}
      </Text>
      <TouchableOpacity onPress={onPress}>
        <IcX />
      </TouchableOpacity>
    </View>
  );
};

export default ChipItem;
