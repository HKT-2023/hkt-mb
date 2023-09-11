import React from 'react';
import {ViewStyle} from 'react-native';
import ListSellingNFT from './ListSellingNFT';
import {FlexView, ratioW} from 'react-native-gin-boilerplate';

const SellingTab = () => {
  const $content: ViewStyle = {
    paddingTop: ratioW(16),
    backgroundColor: '#F2F2F2',
  };

  return (
    <FlexView style={$content}>
      <ListSellingNFT />
    </FlexView>
  );
};

export default SellingTab;
