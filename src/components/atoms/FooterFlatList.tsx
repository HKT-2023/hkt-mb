import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useTheme} from 'react-native-gin-boilerplate';

interface IProps {
  isLoadMore: boolean;
}

const FooterFlatList: React.FC<IProps> = ({isLoadMore}) => {
  const {colors} = useTheme();
  if (isLoadMore) {
    return <ActivityIndicator color={colors.mainBackground} />;
  }
  return <React.Fragment />;
};

export default React.memo(FooterFlatList);
