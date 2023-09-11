import {StyleSheet} from 'react-native';
import React from 'react';
import i18n from '@app/i18n';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {ScrollView} from '@app/components/organism';
import {StackActions} from '@react-navigation/native';
import useBackHardware from '@app/hooks/useBackHardware';
import AnimatedSuccess from '@app/components/atoms/Animated/AnimatedSuccess';
import {IVerificationSuccessScreenProps} from '@app/stacks/types/TNoFooterStack';
import {
  Text,
  Button,
  ratioW,
  FlexView,
  Separator,
} from 'react-native-gin-boilerplate';

const VerificationSuccess: React.FC<IVerificationSuccessScreenProps> = ({
  navigation,
}) => {
  useBackHardware();

  const onFinish = () => {
    const popAction = StackActions.pop(3);
    navigation.dispatch(popAction);
  };

  return (
    <FlexView>
      <ScrollView contentContainerStyle={styles.$container}>
        <FlexView style={styles.$content}>
          <AnimatedSuccess />
          <Separator height={ratioW(90)} />
          <Text style={styles.$subTitle}>{i18n.t('common.Successful')}!</Text>
          <Text style={styles.$body}>
            {i18n.t('UserProfile.YouHaveSuccessfullyVerifiedUrMobileNumber')}
          </Text>
        </FlexView>
        <Button title={i18n.t('common.Finish')} onPress={onFinish} />
      </ScrollView>
    </FlexView>
  );
};

export default VerificationSuccess;

const styles = StyleSheet.create({
  $content: {alignItems: 'center', justifyContent: 'center'},
  $body: {
    textAlign: 'center',
    ...TPoppinsStyle.H1624Regular,
  },
  $subTitle: {
    textAlign: 'center',
    marginBottom: ratioW(16),
    ...TPoppinsStyle.H3248Medium,
  },
  $container: {
    flexGrow: 1,
  },
});
