import React, {useState} from 'react';
import RenderScene from '../RenderScene';
import routes from '@app/constants/routes';
import {IWrapperNFTBaseProps} from '@app/HOC/wrapperNFT';
import {FlexView, ViewCondition} from '@app/components/organism';
import {ratioW} from '@app/utils/UDimension';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {TRouteNFT} from '@app/definitions/INFTs';
import {useTheme} from '@app/theme';
import {AutoImage, Separator, Text} from '@app/components/atoms';
import TabViewComponent, {
  SceneProps,
} from '@app/components/molecules/TabView/TabViewComponent';
import {TButtonAny} from '@app/definitions/TButton';
import {IRPListOffer} from '@app/definitions/TApi';
import i18n from '@app/i18n';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {useCountdown} from '@app/hooks/useCountdown';

interface IBuyerView extends IWrapperNFTBaseProps {
  selectedOffer: IRPListOffer | null;
  setSelectedOffer: TButtonAny<IRPListOffer | null>;
}

const BuyerView: React.FC<IBuyerView> = ({
  item,
  selectedOffer,
  setSelectedOffer,
}) => {
  const {colors} = useTheme();
  const [index, setIndex] = useState(0);
  const salesType = item?.salesType?.key;
  const defaultRoutes = routes.getRoutes(salesType);
  const scrollEnable = defaultRoutes.length > 2 ? true : false;
  const {days, hours, minutes} = useCountdown(item.endDate);

  const convertDay = days > 0 ? `${days}d ` : '0d ';
  const convertHour = hours > 0 ? `${hours}h ` : '0h ';
  const convertMin = minutes > 0 ? `${minutes}m` : '0m';

  const $tabBar: ViewStyle = {
    backgroundColor: colors.mainBackground,
  };
  const $separator: ViewStyle = {
    height: ratioW(8),
    backgroundColor: colors.NFTBackground,
  };
  const $auctionTitle = StyleSheet.flatten([
    styles.auctionTitle,
    {color: colors.headerTitleColor},
  ]);
  const $auctionDesc = StyleSheet.flatten([
    styles.auctionDesc,
    {color: colors.houseTypeBtn},
  ]);
  const $auctionTimeContainer = StyleSheet.flatten([
    styles.auctionTimeContainer,
    {backgroundColor: colors.mainBackground},
  ]);

  const renderScene = ({route}: SceneProps): JSX.Element => {
    return RenderScene.renderScene(
      selectedOffer,
      setSelectedOffer,
      route.key as TRouteNFT,
      index,
      salesType,
      item,
    );
  };

  return (
    <FlexView>
      <FlexView>
        <AutoImage uri={item?.images} style={styles.nftPhoto} />
        <View style={$separator} />
        <ViewCondition isVisible={salesType === 'bid'}>
          <View style={$auctionTimeContainer}>
            <Text style={$auctionTitle}>{i18n.t('Wallet.AuctionTime')}</Text>
            <Separator height={ratioW(8)} />
            <Text style={$auctionDesc}>
              {convertDay}
              {convertHour}
              {convertMin}
            </Text>
          </View>
        </ViewCondition>
      </FlexView>
      <TabViewComponent
        index={index}
        styleTabBar={$tabBar}
        routes={defaultRoutes}
        onChangeIndex={setIndex}
        renderScene={renderScene}
        scrollEnable={scrollEnable}
        styleIndicator={styles.indicator}
      />
    </FlexView>
  );
};

export default BuyerView;

const styles = StyleSheet.create({
  nftPhoto: {
    height: ratioW(380),
    borderRadius: ratioW(12),
    margin: ratioW(16),
    marginTop: ratioW(8),
  },
  indicator: {
    height: ratioW(3),
    borderTopLeftRadius: ratioW(100),
    borderTopRightRadius: ratioW(100),
  },
  auctionTitle: {
    ...TPoppinsStyle.H1420Regular,
  },
  auctionDesc: {
    ...TPoppinsStyle.H2228Medium,
    fontStyle: 'italic',
  },
  auctionTimeContainer: {
    width: ratioW(263),
    position: 'absolute',
    bottom: 0,
    borderRadius: ratioW(10),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: ratioW(16),
  },
});
