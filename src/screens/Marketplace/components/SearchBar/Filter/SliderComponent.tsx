import React from 'react';
import i18n from '@app/i18n';
import PriceInput from './PriceInput';
import {useSelector} from 'react-redux';
import Dispatch from '@app/redux/Dispatch';
import mNumber from '@app/utils/methods/mNumber';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {MAX_PRICE_MKP, MIN_PRICE} from '@app/constants/keys';
import {TReduxState} from '@app/redux/store/configureStore';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {
  ratioW,
  RowContainer,
  screenWidth,
  Separator,
  Text,
  useTheme,
} from 'react-native-gin-boilerplate';

interface ISliderComponent {
  containerStyle: ViewStyle;
}
const SliderComponent: React.FC<ISliderComponent> = ({containerStyle}) => {
  const {colors} = useTheme();
  const {priceMax, priceMin} = useSelector(
    (state: TReduxState) => state.MKPFilterReducer,
  );

  const multiSliderValuesChange = (values: number[]) => {
    Dispatch.mkpSetMinPrice?.(mNumber.formatBidValue(String(values[0]), false));
    if (values[1] === MAX_PRICE_MKP) {
      Dispatch.mkpSetMaxPrice?.(
        mNumber.formatBidValue(String(values[1])) + '+',
      );
    } else {
      Dispatch.mkpSetMaxPrice?.(mNumber.formatBidValue(String(values[1])));
    }
  };

  const validateMin = () => {
    if (Number(mNumber.removeComma(priceMin)) > MAX_PRICE_MKP) {
      Dispatch.mkpSetMinPrice?.(
        mNumber.formatBidValue(String(MIN_PRICE), false),
      );
    } else if (
      Number(mNumber.removeComma(priceMin)) >
      Number(mNumber.removeComma(priceMax))
    ) {
      Dispatch.mkpSetMaxPrice?.(
        mNumber.formatBidValue(String(MAX_PRICE_MKP)) + '+',
      );
    }
  };
  const validateMax = () => {
    if (Number(mNumber.removeComma(priceMax)) > MAX_PRICE_MKP) {
      Dispatch.mkpSetMaxPrice?.(
        mNumber.formatBidValue(String(MAX_PRICE_MKP)) + '+',
      );
    } else if (
      Number(mNumber.removeComma(priceMax)) <
      Number(mNumber.removeComma(priceMin))
    ) {
      Dispatch.mkpSetMinPrice?.(
        mNumber.formatBidValue(String(MIN_PRICE), false),
      );
    }
  };

  const $outerMarker = StyleSheet.flatten([
    styles.outerMarker,
    {backgroundColor: '#2CC2D3'},
  ]);
  const $innerMarker = StyleSheet.flatten([
    styles.innerMarker,
    {backgroundColor: colors.mainBackground},
  ]);
  const $trackStyle = StyleSheet.flatten([
    styles.slider,
    {backgroundColor: '#F3F3F3'},
  ]);
  const $slider = {
    backgroundColor: '#2CC2D3',
  };

  const SliderMarker = () => {
    return (
      <View style={$outerMarker}>
        <View style={$innerMarker} />
      </View>
    );
  };

  const Slider = () => {
    return (
      <View style={[styles.tabHeaderContainer, styles.sliderWrapper]}>
        <MultiSlider
          selectedStyle={$slider}
          trackStyle={$trackStyle}
          values={[
            Number(mNumber.removeComma(priceMin)),
            Number(priceMax?.replace(/[^0-9]/g, '')),
          ]}
          sliderLength={screenWidth - 32 - 32}
          onValuesChangeFinish={multiSliderValuesChange}
          min={MIN_PRICE}
          max={MAX_PRICE_MKP}
          step={1000}
          customMarker={() => {
            return <SliderMarker />;
          }}
        />
      </View>
    );
  };

  return (
    <View style={containerStyle}>
      <Text style={styles.priceRange}>
        {i18n.t('Marketplace.Home.Filter.PriceRange')}
      </Text>
      <Slider />
      <RowContainer style={styles.tabHeaderContainer}>
        <PriceInput
          isMin={true}
          onBlur={validateMin}
          price={priceMin ?? ''}
          onSubmitEditing={validateMin}
          label={i18n.t('Marketplace.Home.Filter.MinPrice')}
        />
        <Separator width={ratioW(16)} />
        <PriceInput
          isMin={false}
          onBlur={validateMax}
          price={priceMax ?? ''}
          onSubmitEditing={validateMax}
          label={i18n.t('Marketplace.Home.Filter.MaxPrice')}
        />
      </RowContainer>
    </View>
  );
};

export default SliderComponent;

const styles = StyleSheet.create({
  outerMarker: {
    width: ratioW(32),
    height: ratioW(32),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ratioW(100),
  },
  innerMarker: {
    width: ratioW(15.36),
    height: ratioW(15.36),
    borderRadius: ratioW(100),
  },
  slider: {
    height: ratioW(5),
    borderRadius: ratioW(4),
  },
  priceRange: {
    ...TPoppinsStyle.H1624Bold,
  },
  priceRangeItalic: {
    ...TPoppinsStyle.H1624Regular,
    fontStyle: 'italic',
  },
  tabHeaderContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sliderWrapper: {
    marginVertical: ratioW(16),
  },
});
