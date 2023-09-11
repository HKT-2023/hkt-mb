import {useTheme} from '@app/theme';
import SearchBar from './SearchBar/SearchBar';
import {goBack} from '@app/utils/UNavigation';
import {Separator} from '@app/components/atoms';
import React, {useState} from 'react';
import IcArrowLeft from '@app/assets/svg/IcArrowLeft';
import {ratioW, screenWidth} from '@app/utils/UDimension';
import {FlexView, RowContainer} from '@app/components/organism';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ISubMarketplaceScreenProps} from '@app/stacks/types/TNoFooterStack';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import i18n from '@app/i18n';
import TabViewComponent, {
  SceneProps,
} from '@app/components/molecules/TabView/TabViewComponent';
import AllMarketplace from '../AllMarketplace';
import RecommendMarketplace from '../RecommendMarketplace';
import SavedHomeMarketplace from '../SavedHomeMarketplace';
import Dispatch from '@app/redux/Dispatch';
import {TMKPActiveTab} from '@app/redux/types/TMKPFilter';

type TMarketplace =
  | 'MARKETPLACE_RECOMMENDED'
  | 'MARKETPLACE_SAVED_HOME'
  | 'MARKETPLACE_ALL';

interface IMarketplace {
  key: TMarketplace;
  title: string;
}

const MarketplaceRoute: IMarketplace[] = [
  {
    key: 'MARKETPLACE_ALL',
    title: i18n.t('Marketplace.Home.All'),
  },
  {
    key: 'MARKETPLACE_RECOMMENDED',
    title: i18n.t('Marketplace.Home.Recommended'),
  },
  {
    key: 'MARKETPLACE_SAVED_HOME',
    title: i18n.t('Marketplace.Home.Saved'),
  },
];

const SubMarketplace: React.FC<ISubMarketplaceScreenProps> = () => {
  const {colors} = useTheme();
  const {top} = useSafeAreaInsets();
  const [index, setIndex] = useState<number>(0);
  const [isTrigger, setIsTrigger] = useState(false);

  const $headerContainer: ViewStyle = {
    ...styles.headerContainer,
    paddingTop: top + 8,
    backgroundColor: colors.headerWhite71,
    width: '100%',
  };
  const $container = {
    backgroundColor: colors.mainBackground,
  };
  const $tabBar = {backgroundColor: colors.mainBackground};
  const $tabView = {marginHorizontal: ratioW(16)};
  const $sceneStyle = {marginTop: ratioW(24)};

  const onPress = () => {
    goBack();
  };
  const onUpdate = () => {
    setIsTrigger(!isTrigger);
  };
  const onChangeIndex = (i: number) => {
    setIndex(i);
    Dispatch.mkpSetActiveTab(i as TMKPActiveTab);
  };

  function renderScene({route: tabRoute}: SceneProps): JSX.Element {
    switch (tabRoute.key) {
      case 'MARKETPLACE_ALL':
        return (
          <AllMarketplace isTrigger={isTrigger} setIsTrigger={setIsTrigger} />
        );
      case 'MARKETPLACE_RECOMMENDED':
        return (
          <RecommendMarketplace
            isTrigger={isTrigger}
            setIsTrigger={setIsTrigger}
          />
        );
      case 'MARKETPLACE_SAVED_HOME':
        return <SavedHomeMarketplace />;
      default:
        return <React.Fragment />;
    }
  }

  return (
    <FlexView style={$container}>
      <RowContainer style={$headerContainer}>
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
          <IcArrowLeft />
        </TouchableOpacity>
        <Separator width={ratioW(16)} />
        <SearchBar
          wrapperStyles={styles.flex1}
          isShowFilterSort={index !== 2}
          onTrigger={onUpdate}
        />
      </RowContainer>
      <TabViewComponent
        index={index}
        scrollEnable={false}
        styleTabBar={$tabBar}
        routes={MarketplaceRoute}
        renderScene={renderScene}
        onChangeIndex={onChangeIndex}
        styleTabView={$tabView}
        sceneStyle={$sceneStyle}
      />
    </FlexView>
  );
};

export default SubMarketplace;

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    paddingBottom: ratioW(8),
    paddingHorizontal: ratioW(20),
  },
  searchBar: {
    maxWidth: screenWidth * 0.54,
  },
  flex1: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
