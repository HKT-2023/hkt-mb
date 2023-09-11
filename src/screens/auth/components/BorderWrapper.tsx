import {
  View,
  ViewStyle,
  StyleProp,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {LoginBgImg} from '@app/assets/photos';
import React, {PropsWithChildren} from 'react';
import {ScrollView} from '@app/components/organism';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  ratioW,
  FlexView,
  useTheme,
  screenHeight,
} from 'react-native-gin-boilerplate';
import {IcArrowLeft} from '@app/assets/svg';
import {LogoTile} from '@app/components/atoms';
import UNavigation from '@app/utils/UNavigation';

interface IProps extends PropsWithChildren {
  hasBack?: boolean;
}

const BorderWrapper: React.FC<IProps> = props => {
  const {colors} = useTheme();
  const {top} = useSafeAreaInsets();

  const $scroll: StyleProp<ViewStyle> = {
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    backgroundColor: colors.mainBackground,
  };

  const $containerScroll: StyleProp<ViewStyle> = {
    paddingTop: ratioW(20),
  };

  const $arrowLeft: StyleProp<ViewStyle> = {
    marginLeft: ratioW(20),
  };

  const $mainContent: StyleProp<ViewStyle> = {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const $floatWrapper: ViewStyle = {
    left: 0,
    top: top,
    zIndex: 99,
    position: 'absolute',
    alignSelf: 'baseline',
  };

  return (
    <FlexView style={{backgroundColor: colors.mainBackground}}>
      <ImageBackground source={LoginBgImg} style={styles.photo}>
        <FlexView style={$mainContent}>
          <View style={$floatWrapper}>
            {(props.hasBack && (
              <TouchableOpacity onPress={UNavigation.goBack}>
                <IcArrowLeft color={colors.mainBackground} style={$arrowLeft} />
              </TouchableOpacity>
            )) || <View style={[$arrowLeft, styles.$defaultIcon]} />}
          </View>
          <LogoTile />
        </FlexView>
      </ImageBackground>
      <FlexView style={styles.$container}>
        <ScrollView style={$scroll} contentContainerStyle={$containerScroll}>
          {props.children}
        </ScrollView>
      </FlexView>
    </FlexView>
  );
};

export default BorderWrapper;

const styles = StyleSheet.create({
  $container: {
    top: ratioW(-20),
  },
  photo: {
    height: screenHeight * 0.3,
    width: '100%',
  },
  $defaultIcon: {
    height: ratioW(16),
    width: ratioW(16),
  },
});
