import React from 'react';
import Item from './components/Item';
import {keyExtractor} from '@app/constants/keys';
import {FlatList, ListRenderItem} from 'react-native';
import {FlexView, Header} from 'react-native-gin-boilerplate';
import {INFTMarketplace} from '@app/definitions/TNFTMarketplace';
import {INFTMarketPlaceScreenProps} from '@app/stacks/types/THomeStack';

const NFTMarketplace: React.FC<INFTMarketPlaceScreenProps> = () => {
  const renderItem: ListRenderItem<INFTMarketplace> = ({item}) => {
    return <Item item={item} />;
  };
  return (
    <FlexView>
      <Header title="NFT Marketplace" />
      <FlatList
        data={[]}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </FlexView>
  );
};

export default NFTMarketplace;
