import Sort from './Filter/Sort';
import React, {useEffect} from 'react';
import Filter from './Filter/Filter';
import SearchInput from './SearchInput';
import {useSelector} from 'react-redux';
import Dispatch from '@app/redux/Dispatch';
import ReactNativeModal from 'react-native-modal';
import {TReduxState} from '@app/redux/store/configureStore';
import {View, StyleSheet, ViewStyle, TouchableOpacity} from 'react-native';
import listing from '@app/api/listing';
import {IFilter} from '@app/definitions/TFilter';
import {
  ratioW,
  UMessage,
  FlexView,
  useTheme,
  TButtonAny,
  TButtonVoid,
  RowContainer,
  screenHeight,
} from 'react-native-gin-boilerplate';
import {IcClose, IcFilter, IcLoup, IcSort} from '@app/assets/svg';

interface ISearchBarProps {
  searchIconColor?: string;
  wrapperStyles?: ViewStyle;
  isShowFilterSort?: boolean;
  isShowUserLocation?: boolean;
  isFocusUser?: boolean;
  setIsFocusUser?: TButtonAny<boolean>;
  onTrigger: TButtonVoid;
  isHideNearest?: boolean;
}

const SearchBar: React.FC<ISearchBarProps> = ({
  wrapperStyles,
  searchIconColor,
  isShowFilterSort,
  isShowUserLocation = false,
  isFocusUser,
  setIsFocusUser,
  onTrigger,
  isHideNearest = false,
}) => {
  const {colors} = useTheme();
  const [isVisibleSort, setIsVisibleSort] = React.useState<boolean>(false);
  const [isVisibleFilter, setIsVisibleFilter] = React.useState<boolean>(false);
  const [inputBorder, setInputBorder] = React.useState('#C3CBCD');
  const [propertyData, setPropertyData] = React.useState<IFilter[]>([]);
  const {searchText} = useSelector(
    (state: TReduxState) => state.MKPFilterReducer,
  );

  useEffect(() => {
    listing
      .getPropertyType()
      .then(res => {
        if (res.data) {
          Dispatch.mkpSetForLease(res.data.propertySubTypeForLease);
          Dispatch.mkpSetForSale(res.data.propertySubForSale);
          const respData = res?.data.propertySubType.map(item => {
            return {key: 'PropertyType', value: item};
          });
          setPropertyData(respData as IFilter[]);
        }
      })
      .catch(err => UMessage.showFailMessage(err));
  }, []);

  const $container = StyleSheet.flatten([
    styles.container,
    {
      backgroundColor: '#ffffff',
      borderColor: inputBorder,
    },
  ]);
  const $filterBtn = StyleSheet.flatten([
    styles.filterBtn,
    {borderColor: colors.inputInactiveBorder},
  ]);
  const $sortBtn = StyleSheet.flatten([
    styles.sortBtn,
    {borderColor: colors.inputInactiveBorder},
  ]);

  const onCloseFilterModal = () => setIsVisibleFilter(false);
  const onOpenFilterModal = () => setIsVisibleFilter(true);
  const onCloseSortModal = () => setIsVisibleSort(false);
  const onOpenSortModal = () => setIsVisibleSort(true);
  const toggleBorder = (val?: string) => {
    if (val) {
      setInputBorder('#15191B');
    } else {
      setInputBorder('#C3CBCD');
    }
  };
  const onSubmitEditing = () => {
    toggleBorder(searchText);
    if (searchText) {
      onTrigger();
      Dispatch.mkpSetKeyword(searchText);
    }
  };
  const onChangeSearchBar = (value: string) => {
    toggleBorder(value);
    Dispatch.mkpSetKeyword(value);
    if (!value) {
      onTrigger();
    }
  };
  const onClearSearch = () => {
    setInputBorder('#C3CBCD');
    Dispatch.mkpSetKeyword('');
    Dispatch.mkpSetReturnCoordinate?.([]);
    onTrigger();
  };

  function renderRightIcon() {
    if (!searchText) {
      return <IcLoup color={searchIconColor ?? '#414E54'} />;
    } else {
      return (
        <TouchableOpacity onPress={onClearSearch} activeOpacity={0.8}>
          <IcClose />
        </TouchableOpacity>
      );
    }
  }

  const onFocus = () => setInputBorder('#15191B');

  if (!isShowFilterSort) {
    return <React.Fragment />;
  }

  return (
    <RowContainer style={wrapperStyles}>
      <FlexView>
        <SearchInput
          onFocus={onFocus}
          value={searchText}
          defaultValue={searchText}
          onSubmitEditing={onSubmitEditing}
          contentStyles={$container}
          {...(!isShowUserLocation && {rightIcon: renderRightIcon()})}
          onChangeText={onChangeSearchBar}
          isShowUserLocation={isShowUserLocation}
          {...(isShowUserLocation && {
            isFocusUser: isFocusUser,
            setIsFocusUser: setIsFocusUser,
          })}
        />
      </FlexView>
      <TouchableOpacity
        style={$filterBtn}
        onPress={onOpenFilterModal}
        activeOpacity={0.8}>
        <IcFilter />
      </TouchableOpacity>
      <TouchableOpacity
        style={$sortBtn}
        onPress={onOpenSortModal}
        activeOpacity={0.8}>
        <IcSort />
      </TouchableOpacity>
      <ReactNativeModal
        style={styles.modalFilter}
        isVisible={isVisibleFilter}
        onDismiss={onCloseFilterModal}
        onBackdropPress={onCloseFilterModal}
        backdropTransitionOutTiming={1}>
        <View style={[styles.containerFilter, styles.modal]}>
          <Filter
            onClose={onCloseFilterModal}
            propertyType={propertyData}
            onSelect={onTrigger}
          />
        </View>
      </ReactNativeModal>
      <ReactNativeModal
        isVisible={isVisibleSort}
        style={styles.modalFilter}
        onDismiss={onCloseSortModal}
        onBackdropPress={onCloseSortModal}
        backdropTransitionOutTiming={1}>
        <View style={[styles.containerFilter, styles.modal]}>
          <Sort
            onClose={onCloseSortModal}
            isHideNearest={isHideNearest}
            onSelect={onTrigger}
          />
        </View>
      </ReactNativeModal>
    </RowContainer>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    height: ratioW(56),
    borderRadius: ratioW(8),
  },
  filterBtn: {
    width: ratioW(56),
    height: ratioW(56),
    borderWidth: ratioW(1),
    borderRadius: ratioW(8),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: ratioW(8),
  },
  sortBtn: {
    width: ratioW(56),
    height: ratioW(56),
    borderWidth: ratioW(1),
    borderRadius: ratioW(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex1: {flex: 1},
  modal: {
    maxHeight: screenHeight * 0.85,
    justifyContent: 'flex-end',
    bottom: 0,
    flex: 1,
  },
  modalFilter: {
    padding: 0,
    margin: 0,
    justifyContent: 'flex-end',
  },
  containerFilter: {
    borderTopLeftRadius: ratioW(24),
    borderTopRightRadius: ratioW(24),
    minHeight: screenHeight / 1.5,
    overflow: 'hidden',
    width: '100%',
    bottom: 0,
    maxHeight: screenHeight,
  },
  itemPickerOne: {
    borderBottomWidth: 0,
  },
});
