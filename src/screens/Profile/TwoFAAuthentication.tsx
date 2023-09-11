import i18n from '@app/i18n';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import mNumber from '@app/utils/methods/mNumber';
import {IRPOTPFailed} from '@app/definitions/TApi';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {ScrollView} from '@app/components/organism';
import userManagement from '@app/api/userManagement';
import {TReduxState} from '@app/redux/store/configureStore';
import {ITwoFAAuthenticationScreenProps} from '@app/stacks/types/TNoFooterStack';
import {
  Text,
  Button,
  ratioW,
  UMessage,
  FlexView,
  TextInput,
  openLoading,
  closeLoading,
  withKeyboardAvoidingView,
} from 'react-native-gin-boilerplate';
import {HeaderCommon} from '@app/components/atoms/Header';

const TwoFAAuthentication: React.FC<ITwoFAAuthenticationScreenProps> = ({
  navigation,
}) => {
  const {user} = useSelector((state: TReduxState) => state.UserReducer);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (user?.isVerifyPhone) {
      setPhone(user.phoneVerify);
    }
  }, [user?.isVerifyPhone, user?.phoneVerify]);

  const onNext = () => {
    openLoading();
    userManagement
      .setUp2FA({phone: phone})
      .then(() => {
        closeLoading();
        navigation.navigate('CONFIRM_OTP_2FA_SCREEN', {phone: phone});
      })
      .catch((err: IRPOTPFailed) => {
        closeLoading();
        if (err.data) {
          UMessage.showFailMessage(String(err.message));
        } else {
          UMessage.showFailMessage(String(err));
        }
      });
  };
  const onChangePhone = (text: string) => {
    if (phone === '+' || text === '+') {
      setPhone('');
    } else {
      setPhone('+' + mNumber.removeAllExceptNumber(text));
    }
  };

  return (
    <FlexView>
      <HeaderCommon title={i18n.t('UserProfile.TwoFactorAuthentication')} />
      <ScrollView
        contentContainerStyle={styles.$container}
        style={styles.$content}>
        <FlexView>
          <Text style={styles.$subTitle}>
            {i18n.t('UserProfile.WeWillUseThisNumberOnlyFor')}
          </Text>
          <TextInput
            label={i18n.t('UserProfile.MobileNumber')}
            keyboardType="number-pad"
            value={phone}
            onChangeText={onChangePhone}
          />
        </FlexView>
        <Button
          title={i18n.t('common.Next')}
          onPress={onNext}
          disabled={!phone || phone === '+'}
        />
      </ScrollView>
    </FlexView>
  );
};

export default withKeyboardAvoidingView(TwoFAAuthentication);

const styles = StyleSheet.create({
  $subTitle: {
    marginBottom: ratioW(24),
    ...TPoppinsStyle.H2028Bold,
  },
  $container: {
    flexGrow: 1,
  },
  $content: {marginTop: ratioW(8)},
});
