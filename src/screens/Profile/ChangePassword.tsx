import i18n from '@app/i18n';
import React, {useState} from 'react';
import mText from '@app/utils/methods/mText';
import {StyleSheet, ViewStyle} from 'react-native';
import {ScrollView} from '@app/components/organism';
import userManagement from '@app/api/userManagement';
import {
  Button,
  ratioW,
  FlexView,
  UMessage,
  useTheme,
  TextInput,
  openLoading,
  closeLoading,
} from 'react-native-gin-boilerplate';
import {HeaderCommon} from '@app/components/atoms/Header';
import {IChangePasswordScreenProps} from '@app/stacks/types/TNoFooterStack';

const ChangePassword: React.FC<IChangePasswordScreenProps> = ({navigation}) => {
  const {colors} = useTheme();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onConfirm = async () => {
    openLoading();
    await userManagement
      .changePassword({
        oldPassword,
        newPassword,
        confirmPassword,
      })
      .then(res => {
        navigation.goBack();
        closeLoading();
        UMessage.showSuccessMessage(res.message);
      })
      .catch(error => {
        closeLoading();
        UMessage.showFailMessage(String(error));
      });
  };
  const onChangeOldPass = (inputOld: string) => {
    setOldPassword(inputOld.trimStart());
  };
  const onChangeNewPass = (inputNew: string) => {
    setNewPassword(inputNew.trimStart());
  };
  const onChangeConfirmPass = (inputConfirm: string) => {
    setConfirmPassword(inputConfirm.trimStart());
  };

  const newPasswordError = mText.validatePassword(newPassword);
  const newConfirmPasswordError = mText.validatePassword(
    confirmPassword,
    true,
    newPassword,
  );
  const disabled =
    !oldPassword ||
    !newPassword ||
    !confirmPassword ||
    !!newPasswordError ||
    !!newConfirmPasswordError;

  const $scroll: ViewStyle = {
    marginTop: ratioW(8),
    backgroundColor: colors.mainBackground,
  };

  return (
    <FlexView>
      <HeaderCommon title={i18n.t('ChangePassword.title')} />
      <ScrollView style={$scroll}>
        <TextInput
          isPassword
          value={oldPassword}
          onChangeText={onChangeOldPass}
          containerStyles={styles.input}
          label={i18n.t('ChangePassword.CurrentPassword')}
        />
        <TextInput
          isPassword
          value={newPassword}
          isError={!!newPasswordError}
          errorText={newPasswordError}
          onChangeText={onChangeNewPass}
          containerStyles={styles.input}
          label={i18n.t('ChangePassword.NewPassword')}
        />
        <TextInput
          isPassword
          value={confirmPassword}
          containerStyles={styles.input}
          onChangeText={onChangeConfirmPass}
          isError={!!newConfirmPasswordError}
          errorText={newConfirmPasswordError}
          label={i18n.t('ChangePassword.ConfirmNewPassword')}
        />
        <Button
          onPress={onConfirm}
          disabled={disabled}
          title={i18n.t('common.Confirm')}
        />
      </ScrollView>
    </FlexView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  input: {
    marginBottom: ratioW(16),
  },
});
