import React from 'react';
import ListNFT from './ListNFT';
import {ViewStyle} from 'react-native';
import {FlexView, ratioW} from 'react-native-gin-boilerplate';

const NFTTab = () => {
  const $content: ViewStyle = {
    paddingTop: ratioW(16),
    backgroundColor: '#F2F2F2',
  };
  return (
    <FlexView style={$content}>
      <ListNFT />
    </FlexView>
  );
};

export default NFTTab;
