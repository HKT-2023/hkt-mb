import React, {useRef} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  LayoutChangeEvent,
} from 'react-native';
import i18n from '@app/i18n';
import debounce from 'lodash/debounce';
import {useSelector} from 'react-redux';
import SectionInput from './SectionInput';
import Dispatch from '@app/redux/Dispatch';
import SliderComponent from './SliderComponent';
import SectionCheckbox from './SectionCheckbox';
import {IFilter} from '@app/definitions/TFilter';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import data from '@app/_dummy/d_marketplace_filter';
import {TReduxState} from '@app/redux/store/configureStore';
import FilterHouseSaleStatus from './FilterHouseSaleStatus';
import {
  Button,
  ButtonWrapper,
  ratioW,
  RowContainer,
  Separator,
  TButtonVoid,
  Text,
  useTheme,
  withKeyboardAvoidingView,
} from 'react-native-gin-boilerplate';
import {IcClose} from '@app/assets/svg';

const Filter = ({
  onClose,
  propertyType,
  onSelect,
}: {
  onClose: TButtonVoid;
  onSelect: TButtonVoid;
  propertyType: IFilter[];
}) => {
  const {colors} = useTheme();
  const {user} = useSelector((state: TReduxState) => state.UserReducer);
  const selectionInputRef = useRef(0);
  const scrollRef = useRef<ScrollView>(null);
  const listingData = data.filter((val: IFilter) => {
    if (user?.typeOfUser === 'User') {
      return val.key.includes('ListingStatusUser');
    } else {
      return val.key.includes('ListingStatus');
    }
  });
  const amenityData = data.filter((val: IFilter) =>
    val.key.includes('Amenity'),
  );

  const $container = StyleSheet.flatten([
    styles.container,
    {backgroundColor: colors.mainBackground},
  ]);
  const $borderBottom = StyleSheet.flatten([
    styles.borderBottom,
    {borderBottomColor: colors.separatorBackground},
  ]);
  const $headerTitle = StyleSheet.flatten([styles.title, {color: '#424242'}]);

  const onApply = () => {
    onClose();
    onSelect();
  };

  function onReset() {
    Dispatch.mkpOnReset?.();
  }

  const onSelectInput = (val: boolean) => {
    if (val) {
      debounce(() => scrollRef.current?.scrollToEnd(), 250)();
    }
  };

  const onSelectionInput = (event: LayoutChangeEvent) => {
    selectionInputRef.current = event.nativeEvent.layout.y;
  };

  return (
    <View style={$container}>
      <RowContainer style={styles.headerContainer}>
        <Text style={$headerTitle}>{i18n.t('common.Filter')}</Text>
        <TouchableOpacity onPress={onClose}>
          <IcClose />
        </TouchableOpacity>
      </RowContainer>
      <View style={$borderBottom} />
      <ScrollView ref={scrollRef}>
        <SliderComponent containerStyle={styles.sliderComponent} />
        <Separator height={ratioW(12)} />
        <FilterHouseSaleStatus />
        <SectionCheckbox
          type="propertyData"
          data={propertyType}
          title={i18n.t('Marketplace.Home.Filter.PropertyType.PropertyType')}
        />
        <SectionCheckbox
          data={listingData}
          type="listingData"
          title={i18n.t('Marketplace.Home.Filter.ListingStatus.ListingStatus')}
        />
        <View onLayout={onSelectionInput}>
          <SectionInput data={amenityData} onPress={onSelectInput} />
        </View>
      </ScrollView>
      <ButtonWrapper style={styles.buttonWrapper}>
        <Button
          onPress={onReset}
          style={styles.button}
          buttonType={'bordered'}
          title={i18n.t('Marketplace.Home.Filter.ButtonBottom.Reset')}
        />
        <Separator width={ratioW(16)} />
        <Button
          onPress={onApply}
          style={styles.button}
          title={i18n.t('Marketplace.Home.Filter.ButtonBottom.Apply')}
        />
      </ButtonWrapper>
    </View>
  );
};

export default withKeyboardAvoidingView(Filter);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: ratioW(16),
    borderTopEndRadius: ratioW(20),
    borderTopStartRadius: ratioW(20),
  },
  title: {
    ...TPoppinsStyle.H1624Bold,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: ratioW(16),
    paddingHorizontal: ratioW(16),
    justifyContent: 'space-between',
  },
  borderBottom: {
    borderBottomWidth: ratioW(1),
  },
  sliderComponent: {
    marginTop: ratioW(16),
    marginHorizontal: ratioW(16),
  },
  button: {
    flexGrow: 1,
    width: undefined,
    paddingVertical: ratioW(12),
  },
  buttonWrapper: {flexDirection: 'row', alignItems: 'center'},
});
