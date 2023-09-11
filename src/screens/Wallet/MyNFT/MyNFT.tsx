import i18n from '@app/i18n';
import {IcLoup} from '@app/assets/svg';
import NFTTab from './components/NFTTab';
import React, {useMemo, useState} from 'react';
import SellingTab from './components/SellingTab';
import {StyleSheet, ViewStyle} from 'react-native';
import {INFTSortBy} from '@app/definitions/TFilter';
import SearchBar from '@app/components/atoms/SearchBar';
import {HeaderCommon} from '@app/components/atoms/Header';
import {IMyNFTContextProps, MyNFTContext} from '@app/context';
import useChangeStatusBar from '@app/hooks/useChangeStatusBar';
import {IMyNFTScreenProps} from '@app/stacks/types/TNoFooterStack';
import {
  ratioW,
  TabView,
  useTheme,
  FlexView,
  IRouterProps,
  screenWidth,
} from 'react-native-gin-boilerplate';

const MyNFTRoutes: {key: 'NFT' | 'Selling'; title: string}[] = [
  {key: 'NFT', title: i18n.t('Wallet.MyNFTs')},
  {key: 'Selling', title: i18n.t('common.Selling')},
];

const MyNFT: React.FC<IMyNFTScreenProps> = () => {
  const {colors} = useTheme();

  const [nftSortBy, setNftSortBy] = useState<INFTSortBy | null>({
    key: 'priceHighToLow',
    value: 'Price High To Low',
  });
  const [soldSortBy, setSoldSortBy] = useState<INFTSortBy | null>({
    key: 'priceHighToLow',
    value: 'Price High To Low',
  });
  const [sellingSortBy, setSellingSortBy] = useState<INFTSortBy | null>({
    key: 'priceHighToLow',
    value: 'Price High To Low',
  });
  const [isTrigger, setIsTrigger] = useState(false);
  const [searchText, setSearchText] = useState('');

  useChangeStatusBar('light-content');

  const renderScene = ({item}: {item: IRouterProps}): JSX.Element => {
    switch (item.key) {
      case 'NFT':
        return <NFTTab />;
      case 'Selling':
        return <SellingTab />;
      default:
        return <React.Fragment />;
    }
  };

  const $container: ViewStyle = {
    backgroundColor: colors.mainBackground,
  };
  const $searchbar: ViewStyle = {
    flex: 0,
    borderWidth: 1,
    borderColor: '#C3CBCD',
    marginVertical: ratioW(12),
    marginHorizontal: ratioW(15),
    backgroundColor: colors.mainBackground,
  };

  const value: IMyNFTContextProps = useMemo(
    () => ({
      nftSortBy,
      soldSortBy,
      sellingSortBy,
      onChangeNFTSortBy: setNftSortBy,
      onChangeSoldSortBy: setSoldSortBy,
      onChangeSellingSortBy: setSellingSortBy,
      searchText,
      isTrigger,
      setSearchText,
    }),
    [nftSortBy, soldSortBy, sellingSortBy, searchText, isTrigger],
  );

  const onSubmitSearch = () => setIsTrigger(!isTrigger);

  return (
    <MyNFTContext.Provider value={value}>
      <FlexView style={$container}>
        <HeaderCommon title={i18n.t('Wallet.MyNFTs')} />
        <SearchBar
          position={'right'}
          value={searchText}
          iconRight={<IcLoup />}
          wrapperStyles={$searchbar}
          onChangeText={setSearchText}
          onSubmitEditing={onSubmitSearch}
          placeholder={i18n.t('Wallet.NFTName')}
        />
        <FlexView>
          <TabView
            routes={MyNFTRoutes}
            scrollEnabled={false}
            style={styles.sceneStyle}
            renderRoutes={renderScene}
            initialWidth={screenWidth / 2}
            indicatorStyle={styles.indicator}
          />
        </FlexView>
      </FlexView>
    </MyNFTContext.Provider>
  );
};

export default MyNFT;

const styles = StyleSheet.create({
  sceneStyle: {
    marginTop: 0,
    flexGrow: 1,
  },
  indicator: {
    height: ratioW(3),
    borderTopLeftRadius: ratioW(100),
    borderTopRightRadius: ratioW(100),
  },
});
