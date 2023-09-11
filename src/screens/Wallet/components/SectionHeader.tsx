import React from 'react';
import {IRPListActivity} from '@app/definitions/TApi';
import {ITransferSection} from '@app/definitions/TItem';
import {View, ViewStyle, SectionListData} from 'react-native';
import {
  Text,
  ratioW,
  withTheme,
  IThemeContextProps,
} from 'react-native-gin-boilerplate';

type Props = IThemeContextProps &
  SectionListData<IRPListActivity, ITransferSection>;

const SectionHeader = ({colors, title}: Partial<Props>) => {
  const $header: ViewStyle = {
    borderBottomWidth: 1,
    paddingVertical: ratioW(12),
    backgroundColor: colors?.mainBackground,
    borderBottomColor: colors?.borderColor,
  };

  return (
    <View style={$header}>
      <Text>{title}</Text>
    </View>
  );
};

export default withTheme<Partial<Props>>(SectionHeader);
