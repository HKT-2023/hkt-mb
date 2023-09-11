import React from 'react';
import i18n from '@app/i18n';
import {
  Text,
  Button,
  ratioW,
  FlexView,
  Separator,
  screenWidth,
  TButtonVoid,
  closeGlobalModal,
} from 'react-native-gin-boilerplate';
import {StyleSheet, ViewStyle} from 'react-native';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {ScrollView} from '@app/components/organism';
import {HeaderCommon} from '@app/components/atoms/Header';
import {AnimatedSpin} from '@app/components/atoms/Animated';
import {SafeAreaView} from 'react-native-safe-area-context';
import AnimatedSuccess from '@app/components/atoms/Animated/AnimatedSuccess';

interface IEstimateProcessing {
  screenType: 'Process' | 'SuccessCheckIn' | 'Failed' | 'SuccessEstimation';
  onFinish?: TButtonVoid;
  showBack?: boolean;
  coordinate?: number[][];
}
const EstimateProcessing: React.FC<IEstimateProcessing> = ({
  screenType,
  onFinish,
  showBack,
}) => {
  const $button: ViewStyle = {
    marginBottom: ratioW(24),
    display: screenType === 'Process' ? 'none' : 'flex',
  };

  const onPress = () => {
    closeGlobalModal();
  };
  const $title = StyleSheet.flatten([styles.$subTitle, {color: '#15191B'}]);

  const renderImage = () => {
    switch (screenType) {
      case 'Process':
        return <AnimatedSpin />;
      case 'SuccessCheckIn':
        return (
          <>
            <AnimatedSuccess />
            <Separator height={ratioW(40)} />
            <Text style={$title}>
              {i18n.t('RealEstateDetail.YouHaveCheckedInSuccessfully')}
            </Text>
          </>
        );
      case 'SuccessEstimation':
        return (
          <>
            <AnimatedSuccess />
            <Separator height={ratioW(40)} />
            <Text style={$title}>
              {i18n.t('RealEstateDetail.EstimateSubmittedSuccessfully')}
            </Text>
          </>
        );
      case 'Failed':
        return (
          <Text style={$title}>
            {i18n.t('RealEstateDetail.OopsUrAtTheWrongPosition')}
          </Text>
        );
      default:
        return <React.Fragment />;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlexView>
        <HeaderCommon
          title={''}
          isShowBack={showBack ?? true}
          onGoBack={onFinish ?? onPress}
        />
        <ScrollView contentContainerStyle={styles.$container}>
          <FlexView style={styles.$content}>{renderImage()}</FlexView>
          <Button
            style={$button}
            title={i18n.t('common.Done')}
            onPress={onFinish ?? onPress}
          />
        </ScrollView>
      </FlexView>
    </SafeAreaView>
  );
};

export default EstimateProcessing;

const styles = StyleSheet.create({
  container: {flex: 1},
  $content: {alignItems: 'center', justifyContent: 'center'},
  $subTitle: {
    textAlign: 'center',
    marginBottom: ratioW(16),
    ...TPoppinsStyle.H2436Medium,
    fontSize: 28,
  },
  $container: {
    flexGrow: 1,
  },
  mapWrapper: {width: screenWidth - 32, height: ratioW(192)},
  flex1: {flex: 1},
});
