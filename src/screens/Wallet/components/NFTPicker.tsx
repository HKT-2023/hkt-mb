import i18n from '@app/i18n';
import React, {useState} from 'react';
import {ViewStyle} from 'react-native';
import {IRPViewNFT} from '@app/definitions/TApi';
import ListNFT from '../MyNFT/components/ListNFT';
import {
  FlexView,
  ratioW,
  TButtonAny,
  TButtonVoid,
  useTheme,
} from 'react-native-gin-boilerplate';
import {HeaderCommon} from '@app/components/atoms/Header';
import SearchBar from '@app/components/atoms/SearchBar';
import {IcLoup} from '@app/assets/svg';

interface INFTPicker {
  onPress?: TButtonAny<IRPViewNFT>;
  onHide?: TButtonVoid;
}

const NFTPicker = ({onPress, onHide}: INFTPicker) => {
  const {colors} = useTheme();
  const [searchText, setSearchText] = useState('');
  const [isTrigger, setIsTrigger] = useState(false);

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
  const $content: ViewStyle = {
    backgroundColor: '#F2F2F2',
    paddingTop: ratioW(16),
  };

  const onSubmitSearch = () => setIsTrigger(!isTrigger);

  return (
    <FlexView style={$container}>
      <HeaderCommon title={i18n.t('Wallet.MyNFT')} onGoBack={onHide} />
      <SearchBar
        value={searchText}
        position={'right'}
        iconRight={<IcLoup />}
        wrapperStyles={$searchbar}
        onChangeText={setSearchText}
        onSubmitEditing={onSubmitSearch}
        placeholder={i18n.t('Wallet.NFTName')}
      />
      <FlexView style={$content}>
        <ListNFT
          onPress={onPress}
          listNotSaleOnly
          isSearchModal={isTrigger}
          searchModal={searchText}
          setSearchModal={setSearchText}
        />
      </FlexView>
    </FlexView>
  );
};

export default NFTPicker;
