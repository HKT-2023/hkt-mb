import React from 'react';
import i18n from '@app/i18n';
import ItemFiltering from './ItemFiltering';
import mNumber from '@app/utils/methods/mNumber';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import dNFTFiltering from '@app/_dummy/dNFTFiltering';
import {IMultiSelect, INFTFiltering} from '@app/definitions/TFilter';
import {keyExtractor, MAX_PRICE, MIN_PRICE} from '@app/constants/keys';
import SliderWithInput, {ISliderWithInputProps} from '../SliderWithInput';
import {
  View,
  FlatList,
  ViewStyle,
  StyleSheet,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Button,
  ratioW,
  FlexView,
  useTheme,
  TButtonVoid,
  RowContainer,
  ButtonWrapper,
} from 'react-native-gin-boilerplate';
import {IcClose} from '@app/assets/svg';

interface IProps extends IMultiSelect, ISliderWithInputProps {
  onApply?: TButtonVoid;
  onCancel?: TButtonVoid;
  onReset?: TButtonVoid;
}

const NFTFiltering: React.FC<IProps> = ({
  value,
  onApply,
  onCancel,
  onReset,
  onChangeValue,
  defaultPrices,
  onChangePrices,
}) => {
  const {colors} = useTheme();

  const $headerWrapper: ViewStyle = {
    ...styles.headerWrapper,
    borderBottomColor: colors.borderColor,
  };

  const renderItem: ListRenderItem<INFTFiltering> = ({item}) => {
    return (
      <ItemFiltering item={item} value={value} onChangeValue={onChangeValue} />
    );
  };

  const renderHeader: React.FC = () => {
    return (
      <View>
        <RowContainer style={styles.priceWrap}>
          <Text style={styles.priceRange}>
            {`${i18n.t('Wallet.PriceRange')}:   `}
          </Text>
          {/*<AutoImage source={REALTokenImg} style={styles.token} />*/}
          <Text style={styles.priceRange}>{` ${MIN_PRICE} - `}</Text>
          {/*<AutoImage source={REALTokenImg} style={styles.token} />*/}
          <Text style={styles.priceRange}>{` ${mNumber.formatBidValue(
            String(MAX_PRICE),
          )}`}</Text>
        </RowContainer>
        <SliderWithInput {...{defaultPrices, onChangePrices}} />
      </View>
    );
  };

  return (
    <FlexView>
      <RowContainer style={$headerWrapper}>
        <Text style={styles.title}>{i18n.t('common.Filter')}</Text>
        <TouchableOpacity onPress={onCancel}>
          <IcClose width={ratioW(30)} height={ratioW(30)} />
        </TouchableOpacity>
      </RowContainer>
      <FlatList
        data={dNFTFiltering}
        scrollEnabled={false}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.content}
      />
      <ButtonWrapper style={styles.btnWrapper}>
        <Button
          onPress={onReset}
          mainColor={'#15191B'}
          buttonType="bordered"
          style={styles.cancelBtn}
          title={i18n.t('Marketplace.Home.Filter.ButtonBottom.Reset')}
        />
        <Button
          onPress={onApply}
          style={styles.applyBtn}
          title={i18n.t('common.Apply')}
        />
      </ButtonWrapper>
    </FlexView>
  );
};

export default NFTFiltering;

const styles = StyleSheet.create({
  priceWrap: {
    alignItems: 'center',
    marginVertical: ratioW(16),
  },
  token: {
    width: ratioW(24),
    height: ratioW(24),
  },
  content: {
    paddingHorizontal: ratioW(16),
  },
  priceRange: {
    letterSpacing: 0.5,
    ...TPoppinsStyle.H1624Medium,
  },
  title: {
    flex: 1,
    letterSpacing: 0.15,
    ...TPoppinsStyle.H1624Medium,
  },
  btnWrapper: {
    flexDirection: 'row',
    marginBottom: ratioW(16),
  },
  applyBtn: {
    flex: 1,
    flexGrow: 1,
    width: undefined,
  },
  cancelBtn: {
    flex: 1,
    flexGrow: 1,
    width: undefined,
    marginRight: ratioW(16),
    borderWidth: 0.5,
  },
  headerWrapper: {
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: ratioW(16),
    paddingHorizontal: ratioW(20),
  },
});
