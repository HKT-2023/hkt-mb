import {
  Text,
  Button,
  ratioW,
  UMessage,
  TextInput,
  openLoading,
  closeLoading,
} from 'react-native-gin-boilerplate';
import i18n from '@app/i18n';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {BorderWrapper} from '../components';
import {validateEmail} from '@app/constants/regex';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import userManagement from '@app/api/userManagement';
import {IForgotPasswordEnterEmailScreenProps} from '@app/stacks/types/TAuthentication';

const EnterEmail: React.FC<IForgotPasswordEnterEmailScreenProps> = ({
  navigation,
}) => {
  const [email, setEmail] = useState(__DEV__ ? 'hoihd@vmogroup.com' : '');

  const onNext = async () => {
    openLoading();
    navigation.navigate('FORGOT_PASSWORD_ENTER_CODE_SCREEN', {email});
    await userManagement
      .forgotPassword(email)
      .then(res => {
        closeLoading();
        UMessage.showSuccessMessage(res.message);
        navigation.navigate('FORGOT_PASSWORD_ENTER_CODE_SCREEN', {email});
      })
      .catch(error => {
        console.log('error: ', error);
        closeLoading();
        UMessage.showFailMessage(String(error));
      });
  };

  const onChangeEmail = (e: string) => {
    setEmail(e.trim());
  };

  return (
    <BorderWrapper hasBack>
      <Text style={styles.$welcomeText}>
        {i18n.t('Authentication.ForgotPassword')}
      </Text>
      <Text style={styles.$introText}>
        {i18n.t('Authentication.PlsEnterAEmailForPasswordReset')}
      </Text>
      <TextInput
        value={email}
        autoCapitalize={'none'}
        onChangeText={onChangeEmail}
        label={i18n.t('common.Email')}
        containerStyles={styles.$input}
        isError={!!email && !validateEmail(email)}
        errorText={i18n.t('Authentication.InvalidEmailAddress')}
      />
      <Button
        onPress={onNext}
        title={i18n.t('common.Next')}
        disabled={!email || !validateEmail(email)}
      />
    </BorderWrapper>
  );
};

export default EnterEmail;

const styles = StyleSheet.create({
  $welcomeText: {
    ...TPoppinsStyle.H2028Medium,
    marginBottom: ratioW(4),
  },
  $introText: {
    ...TPoppinsStyle.H1624Regular,
    marginBottom: ratioW(24),
  },
  $input: {
    marginBottom: ratioW(16),
  },
});
