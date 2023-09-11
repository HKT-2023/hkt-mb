import i18n from '@app/i18n';
import mNumber from '@app/utils/methods/mNumber';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, {useState} from 'react';
import {IPrice} from '@app/definitions/TFilter';
import {MAX_PRICE, MIN_PRICE} from '@app/constants/keys';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {
  ratioW,
  TextInput,
  TButtonAny,
  screenWidth,
  RowContainer,
} from 'react-native-gin-boilerplate';
import {SliderMarker} from '@app/components/atoms/index';

const sliderLength = screenWidth - ratioW(32) - ratioW(32);

export interface ISliderWithInputProps {
  defaultPrices?: IPrice;
  onChangePrices?: TButtonAny<IPrice>;
}

const SliderWithInput: React.FC<ISliderWithInputProps> = ({
  defaultPrices,
  onChangePrices,
}) => {
  const [fromPrice, setFromPrice] = useState<number>(
    defaultPrices?.fromPrice ?? 0,
  );
  const [toPrice, setToPrice] = useState<number>(defaultPrices?.toPrice ?? 0);

  const $slider: ViewStyle = {
    backgroundColor: '#2CC2D3',
  };

  const $trackStyle: ViewStyle = {
    ...styles.slider,
    backgroundColor: '#F3F3F3',
  };

  const onChangeFromPrice = (fp: string) => {
    const fromValRemovedComma = Number(mNumber.removeComma(fp));
    if (fromValRemovedComma <= MAX_PRICE) {
      setFromPrice(fromValRemovedComma);
      if (defaultPrices) {
        onChangePrices?.({...defaultPrices, fromPrice: fromValRemovedComma});
      }
      if (toPrice < fromValRemovedComma) {
        setToPrice(fromValRemovedComma);
        if (defaultPrices) {
          onChangePrices?.({...defaultPrices, toPrice: fromValRemovedComma});
        }
      }
    }
  };

  const onChangeToPrice = (tp: string) => {
    const toValRemovedComma = Number(mNumber.removeComma(tp));
    if (toValRemovedComma <= MAX_PRICE) {
      setToPrice(toValRemovedComma);
      if (defaultPrices) {
        onChangePrices?.({...defaultPrices, toPrice: toValRemovedComma});
      }
      if (toValRemovedComma < fromPrice) {
        setFromPrice(toValRemovedComma);
        if (defaultPrices) {
          onChangePrices?.({...defaultPrices, fromPrice: toValRemovedComma});
        }
      }
    }
  };

  const multiSliderValuesChange = (values: number[]) => {
    setFromPrice(values[0]);
    setToPrice(values[1]);
    onChangePrices?.({fromPrice: values[0], toPrice: values[1]});
  };

  return (
    <View>
      <View style={styles.alignCenter}>
        <MultiSlider
          step={1000}
          min={MIN_PRICE}
          max={MAX_PRICE}
          selectedStyle={$slider}
          trackStyle={$trackStyle}
          customMarker={SliderMarker}
          sliderLength={sliderLength}
          values={[fromPrice, toPrice]}
          onValuesChangeFinish={multiSliderValuesChange}
        />
      </View>
      <RowContainer>
        <TextInput
          keyboardType="number-pad"
          containerStyles={styles.from}
          onChangeText={onChangeFromPrice}
          value={mNumber.formatBidValue(String(fromPrice), false)}
          label={i18n.t('Marketplace.Home.Filter.MinPrice')}
        />
        <TextInput
          keyboardType="number-pad"
          containerStyles={styles.to}
          onChangeText={onChangeToPrice}
          value={mNumber.formatBidValue(String(toPrice))}
          label={i18n.t('Marketplace.Home.Filter.MaxPrice')}
        />
      </RowContainer>
    </View>
  );
};

export default SliderWithInput;

const styles = StyleSheet.create({
  slider: {
    height: ratioW(5),
    borderRadius: ratioW(4),
    marginBottom: ratioW(16),
  },
  to: {
    flex: 1,
    width: undefined,
    marginLeft: ratioW(12),
  },
  from: {
    flex: 1,
    width: undefined,
    marginRight: ratioW(12),
  },
  alignCenter: {alignItems: 'center'},
});
