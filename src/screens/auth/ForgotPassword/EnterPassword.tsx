import i18n from '@app/i18n';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {BorderWrapper} from '../components';
import mText from '@app/utils/methods/mText';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import userManagement from '@app/api/userManagement';
import {IForgotPasswordEnterPasswordScreenProps} from '@app/stacks/types/TAuthentication';
import {
  Text,
  Button,
  ratioW,
  UMessage,
  TextInput,
  openLoading,
  closeLoading,
} from 'react-native-gin-boilerplate';

const EnterPassword: React.FC<IForgotPasswordEnterPasswordScreenProps> = ({
  navigation,
  route,
}) => {
  const {email, code} = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onConfirm = async () => {
    openLoading();
    await userManagement
      .resetPassword({
        email,
        code,
        newPassword: password,
        confirmPassword,
      })
      .then(res => {
        closeLoading();
        UMessage.showSuccessMessage(res.message);
        navigation.navigate('LOGIN_SCREEN', {});
      })
      .catch(error => {
        UMessage.showFailMessage(String(error));
        closeLoading();
      });
  };

  const passwordError = mText.validatePassword(password);
  const confirmPasswordError = mText.validatePassword(
    confirmPassword,
    true,
    password,
  );
  const disabled = !!passwordError || !!confirmPasswordError;

  return (
    <BorderWrapper hasBack>
      <Text style={styles.$welcomeText}>
        {i18n.t('Authentication.ForgotPassword')}
      </Text>
      <Text style={styles.$introText}>
        {i18n.t(
          'Authentication.PleaseEnterNewPasswordAndConfirmPasswordForNewPassword',
        )}
      </Text>
      <TextInput
        isPassword
        value={password}
        isError={!!passwordError}
        errorText={passwordError}
        onChangeText={setPassword}
        label={i18n.t('common.Password')}
        containerStyles={styles.$input}
      />
      <TextInput
        isPassword
        value={confirmPassword}
        containerStyles={styles.$input}
        isError={!!confirmPasswordError}
        errorText={confirmPasswordError}
        onChangeText={setConfirmPassword}
        label={i18n.t('Authentication.ConfirmPassword')}
      />
      <Button
        disabled={disabled}
        onPress={onConfirm}
        title={i18n.t('common.Confirm')}
      />
    </BorderWrapper>
  );
};

export default EnterPassword;

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
