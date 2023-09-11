import i18n from '@app/i18n';
import {
  Text,
  Button,
  ratioW,
  useTheme,
  UMessage,
  openLoading,
  closeLoading,
} from 'react-native-gin-boilerplate';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {BorderWrapper} from '../components';
import {VerifyCode} from '@app/components/atoms';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import userManagement from '@app/api/userManagement';
import {useCountNumberDown} from '@app/hooks/useCountNumberDown';
import {IForgotPasswordEnterCodeScreenProps} from '@app/stacks/types/TAuthentication';

const numberOfCodes = 5;
const EnterCode: React.FC<IForgotPasswordEnterCodeScreenProps> = ({
  navigation,
  route,
}) => {
  const email = route.params.email;
  const {colors} = useTheme();
  const {countDown} = useCountNumberDown(120);
  const [count, setCount] = useState<number>(0);

  const [listOfCodes, setListOfCodes] = useState<string[]>([]);
  const codeString = listOfCodes.slice(0, numberOfCodes).join('');

  const onNext = async () => {
    setCount(count + 1);
    if (count === 5) {
      navigation.navigate('LOGIN_SCREEN', {});
    } else {
      openLoading();
      await userManagement
        .validateCode({
          code: codeString,
          email,
        })
        .then(res => {
          closeLoading();
          UMessage.showSuccessMessage(res.message);
          navigation.navigate('FORGOT_PASSWORD_ENTER_PASSWORD_SCREEN', {
            email,
            code: codeString,
          });
        })
        .catch(error => {
          UMessage.showFailMessage(String(error));
          closeLoading();
        });
    }
  };

  const disabled = codeString.length !== 5 || !countDown;

  return (
    <BorderWrapper hasBack>
      <Text style={styles.$welcomeText}>
        {i18n.t('Authentication.ForgotPassword')}
      </Text>
      <Text style={styles.$introText}>
        {i18n.t('Authentication.WeHaveSentASecurityCodeToUrEmail')}
      </Text>
      <VerifyCode
        numberOfCodes={numberOfCodes}
        value={listOfCodes}
        onchange={setListOfCodes}
      />
      <Text style={styles.$warningText}>
        {i18n.t('Authentication.IfUDidNotReceiveACodePlsWait')}{' '}
        <Text style={[styles.$warningText, {color: colors.primaryColor}]}>
          {countDown}
        </Text>{' '}
        {i18n.t('Authentication.SecondsToReceiveCode')}
      </Text>
      <Button
        onPress={onNext}
        disabled={disabled}
        title={i18n.t('common.Next')}
      />
    </BorderWrapper>
  );
};

export default EnterCode;

const styles = StyleSheet.create({
  $warningText: {
    ...TPoppinsStyle.H1624Regular,
    marginBottom: ratioW(24),
  },
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
