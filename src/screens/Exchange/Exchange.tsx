import i18n from '@app/i18n';
import React, {useRef, useState} from 'react';
import nftManagement from '@app/api/nftManagement';
import useGetList from '@app/hooks/useGetList';
import {
  LIMIT,
  MAX_PRICE,
  MIN_PRICE,
  defaultFlatListProps,
} from '@app/constants/keys';
import {INFTExchange} from '@app/definitions/INFTs';
import {
  TSaleType,
  IRQNFTSort,
  IRPViewNFT,
  IRQNFTMarketplace,
} from '@app/definitions/TApi';
import {NFTItem} from '@app/components/atoms/NFT';
import {IExchangeScreenProps} from '@app/stacks/types/TExchangeStack';
import {INFTSortBy, IPrice, TNFTSortByKey} from '@app/definitions/TFilter';
import {FooterFlatList, NFTFiltering, NFTSortBy} from '@app/components/atoms';
import {
  View,
  FlatList,
  ViewStyle,
  Pressable,
  StyleSheet,
  ListRenderItem,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {
  ratioW,
  FlexView,
  useTheme,
  RowContainer,
  screenHeight,
  RefreshControl,
} from 'react-native-gin-boilerplate';
import {IcFilter, IcSort} from '@app/assets/svg';
import SearchBar from '@app/components/atoms/SearchBar';
import {HeaderCommon} from '@app/components/atoms/Header';

const getSort = (key: TNFTSortByKey) => {
  const data: IRQNFTSort = {};
  switch (key) {
    case 'EndingSoon':
      data.sortByEndTime = 'ASC';
      break;
    case 'RecentListed':
      data.sortByCreatedAt = 'ASC';
      break;
    case 'pointHTL':
      data.sortByPoint = 'DESC';
      break;
    case 'pointLTH':
      data.sortByPoint = 'ASC';
      break;
    case 'priceHighToLow':
      data.sortByPrice = 'DESC';
      break;
    case 'priceLowToHigh':
      data.sortByPrice = 'ASC';
      break;
    default:
      break;
  }
  return data;
};

const Exchange: React.FC<IExchangeScreenProps> = () => {
  const {colors} = useTheme();
  const [sortByData, setSortByData] = useState<INFTSortBy>({
    key: 'EndingSoon',
    value: 'Ending soon',
  });
  const [onlySort, setOnlySort] = useState<IRQNFTSort>({sortByEndTime: 'ASC'});
  const priceRef = useRef<IPrice>({
    fromPrice: MIN_PRICE,
    toPrice: MAX_PRICE,
  }).current;
  const filterDataRef = useRef<{value: TSaleType[]}>({value: []}).current;
  const [params, setParams] = useState<IRQNFTMarketplace>({
    limit: LIMIT,
    search: '',
    fromPrice: MIN_PRICE,
    toPrice: MAX_PRICE,
    ...onlySort,
  });
  const [isVisibleSort, setIsVisibleSort] = React.useState<boolean>(false);
  const [isVisibleFilter, setIsVisibleFilter] = React.useState<boolean>(false);

  const {
    data,
    onRefresh,
    isLoadMore,
    onLoadMore,
    isForceUpdate,
    setIsForceUpdate,
    setCurrentPage,
  } = useGetList<IRQNFTMarketplace, INFTExchange>(
    nftManagement.getNFTMarketplace,
    params,
    {isUseFocus: true},
  );

  const $searchBar: ViewStyle = {
    flex: 1,
    borderWidth: 1,
    height: ratioW(48),
    marginVertical: ratioW(12),
    backgroundColor: colors.mainBackground,
    borderColor: '#C3CBCD',
  };

  const $sortingButton: ViewStyle = {
    ...styles.actionButton,
    borderColor: '#C3CBCD',
  };

  const $filteringButton: ViewStyle = {
    ...styles.actionButton,
    marginHorizontal: ratioW(12),
    borderColor: '#C3CBCD',
  };

  const $searchBarWrapper: ViewStyle = {
    alignItems: 'center',
    paddingHorizontal: ratioW(16),
    backgroundColor: colors.mainBackground,
  };

  const $modalContainer: ViewStyle = {
    backgroundColor: colors.mainBackground,
    maxHeight: screenHeight * 0.85,
    justifyContent: 'flex-end',
    flex: 1,
    borderTopLeftRadius: ratioW(24),
    borderTopRightRadius: ratioW(24),
    minHeight: screenHeight / 1.5,
    overflow: 'hidden',
    width: '100%',
    bottom: 0,
  };

  const renderItem: ListRenderItem<IRPViewNFT> = ({item, index}) => {
    return (
      <View style={styles.itemWrap}>
        <NFTItem item={item} index={index} style={styles.NFTItem} />
      </View>
    );
  };

  const onChangeFilter = (t: TSaleType) => {
    let tmp = [...filterDataRef.value];
    const check = tmp.some(e => e === t);
    if (check) {
      tmp = tmp.filter(e => e !== t);
    } else {
      tmp.push(t);
    }
    filterDataRef.value = tmp;
  };

  const onApplyFilter = () => {
    const _params = {...params};
    _params.fromPrice = priceRef.fromPrice;
    _params.toPrice = priceRef.toPrice;
    if (!filterDataRef.value.length) {
      if (_params?.sellType) {
        delete _params.sellType;
      }
    } else {
      _params.sellType = filterDataRef.value.join(',');
    }
    setParams({..._params, ...(onlySort && {...onlySort})});
    setCurrentPage(1);
    setIsForceUpdate(!isForceUpdate);
    setIsVisibleFilter(false);
  };

  const onCancelFilter = () => {
    setIsVisibleFilter(false);
  };

  const onCancelSort = () => {
    setIsVisibleSort(false);
  };

  const onResetFilter = () => {
    filterDataRef.value = [];
    priceRef.fromPrice = MIN_PRICE;
    priceRef.toPrice = MAX_PRICE;
    setOnlySort({sortByEndTime: 'ASC'});
  };

  const onChangeSortBy = (sb: INFTSortBy) => {
    Object.keys(params).forEach(pre => {
      if (Object.keys(onlySort).includes(pre)) {
        delete params[pre as keyof IRQNFTSort];
      }
    });
    const _onlySort = getSort(sb.key);
    setOnlySort(_onlySort);
    setParams({...params, ..._onlySort});
    setIsForceUpdate(!isForceUpdate);
    setSortByData(sb);
    setIsVisibleSort(false);
  };

  const onSearch = () => {
    setIsForceUpdate(!isForceUpdate);
  };

  const onRefreshReset = () => {
    priceRef.fromPrice = MIN_PRICE;
    priceRef.toPrice = MAX_PRICE;
    setOnlySort({sortByEndTime: 'ASC'});
    filterDataRef.value = [];
    setSortByData({
      key: 'EndingSoon',
      value: 'Ending soon',
    });
    setParams({
      limit: LIMIT,
      search: '',
      fromPrice: MIN_PRICE,
      toPrice: MAX_PRICE,
      sortByEndTime: 'ASC',
    });
    onRefresh?.();
  };

  const onChangeSearch = (kw: string) => {
    setParams({...params, search: kw});
  };

  const onChangePrices = (val: IPrice) => {
    priceRef.fromPrice = val.fromPrice;
    priceRef.toPrice = val.toPrice;
  };

  const onCloseFilterModal = () => setIsVisibleFilter(false);

  const onOpenFilterModal = () => setIsVisibleFilter(true);

  const onCloseSortModal = () => setIsVisibleSort(false);

  const onOpenSortModal = () => setIsVisibleSort(true);

  return (
    <FlexView>
      <HeaderCommon title={'Marketplace'} isShowBack={false} />
      <RowContainer style={$searchBarWrapper}>
        <SearchBar
          position={'right'}
          value={params.search}
          returnKeyType="search"
          wrapperStyles={$searchBar}
          onSubmitEditing={onSearch}
          onChangeText={onChangeSearch}
          placeholder={i18n.t('common.Search')}
          returnKeyLabel={i18n.t('common.Search')}
          iconSize={ratioW(17)}
        />
        <Pressable onPress={onOpenFilterModal} style={$filteringButton}>
          <IcFilter />
        </Pressable>
        <Pressable onPress={onOpenSortModal} style={$sortingButton}>
          <IcSort />
        </Pressable>
      </RowContainer>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={renderItem}
        onEndReached={onLoadMore}
        {...defaultFlatListProps}
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl onRefresh={onRefreshReset} />}
        ListFooterComponent={<FooterFlatList isLoadMore={isLoadMore} />}
      />
      <ReactNativeModal
        isVisible={isVisibleFilter}
        style={styles.modal}
        onDismiss={onCloseFilterModal}
        onBackdropPress={onCloseFilterModal}
        backdropTransitionOutTiming={1}>
        <View style={$modalContainer}>
          <NFTFiltering
            onApply={onApplyFilter}
            // @ts-ignore
            defaultPrices={priceRef}
            onCancel={onCancelFilter}
            value={filterDataRef.value}
            onChangeValue={onChangeFilter}
            onChangePrices={onChangePrices}
            onReset={onResetFilter}
          />
        </View>
      </ReactNativeModal>
      <ReactNativeModal
        isVisible={isVisibleSort}
        style={styles.modal}
        onDismiss={onCloseSortModal}
        onBackdropPress={onCloseSortModal}
        backdropTransitionOutTiming={1}>
        <View style={$modalContainer}>
          <NFTSortBy
            value={sortByData}
            onChangeValue={onChangeSortBy}
            onCancel={onCancelSort}
          />
        </View>
      </ReactNativeModal>
    </FlexView>
  );
};

export default Exchange;

const styles = StyleSheet.create({
  content: {
    paddingTop: ratioW(16),
  },
  actionButton: {
    borderWidth: 1,
    width: ratioW(48),
    height: ratioW(48),
    alignItems: 'center',
    borderRadius: ratioW(8),
    justifyContent: 'center',
  },
  NFTItem: {
    flex: 1,
    width: 'auto',
    marginBottom: ratioW(16),
  },
  itemWrap: {width: '50%'},
  modal: {
    padding: 0,
    margin: 0,
    justifyContent: 'flex-end',
  },
});
