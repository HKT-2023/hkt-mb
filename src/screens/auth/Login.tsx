import React, {useState} from 'react';
import {
  Pressable,
  StyleProp,
  TextStyle,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Dispatch from '@app/redux/Dispatch';
import {
  Text,
  Button,
  ratioW,
  useTheme,
  TextInput,
} from 'react-native-gin-boilerplate';
import i18n from '@app/i18n';
import {validateEmail} from '@app/constants/regex';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import BorderWrapper from './components/BorderWrapper';
import useChangeStatusBar from '@app/hooks/useChangeStatusBar';
import {ILoginScreenProps} from '@app/stacks/types/TAuthentication';

const Login: React.FC<ILoginScreenProps> = ({navigation}) => {
  const {colors} = useTheme();
  useChangeStatusBar('light-content');
  const [email, setEmail] = useState(__DEV__ ? 'hoihd@vmogroup.com' : '');
  const [password, setPassword] = useState(__DEV__ ? '123456a@A' : '');

  const onSignIn = async () => {
    Dispatch.loginDispatch({email: email.trim(), password: password.trim()});
  };

  const onForgotPassword = () => {
    navigation.navigate('FORGOT_PASSWORD_ENTER_EMAIL_SCREEN', {});
  };

  const $forgotPassword: StyleProp<TextStyle> = {
    ...styles.forgotPassword,
    color: colors.menuText,
  };

  const onChangeEmail = (e: string) => {
    setEmail(e.trim());
  };

  const onChangePassword = (p: string) => {
    setPassword(p.trim());
  };

  return (
    <BorderWrapper>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.welcomeText}>
          {i18n.t('Authentication.WelcomeToRealEstateMKP')}
        </Text>
        <Text style={styles.introText}>
          {i18n.t('Authentication.PlsEnterAEmail')}
        </Text>
        <TextInput
          value={email}
          autoCapitalize="none"
          onChangeText={onChangeEmail}
          label={i18n.t('common.Email')}
          containerStyles={styles.input}
          isError={!!email && !validateEmail(email)}
          errorText={i18n.t('Authentication.InvalidEmailAddress')}
        />
        <TextInput
          isPassword
          value={password}
          containerStyles={styles.input}
          onChangeText={onChangePassword}
          label={i18n.t('common.Password')}
        />
        <Pressable onPress={onForgotPassword} style={styles.$buttonForgot}>
          <Text style={$forgotPassword}>
            {i18n.t('Authentication.ForgotPassword')}?
          </Text>
        </Pressable>
        <Button
          onPress={onSignIn}
          style={styles.signInButton}
          title={i18n.t('Authentication.SignIn')}
          disabled={!email || !password || !validateEmail(email)}
        />
      </ScrollView>
    </BorderWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  scrollView: {
    padding: ratioW(8),
  },
  $buttonForgot: {
    alignSelf: 'flex-end',
  },
  signInButton: {
    marginBottom: ratioW(24),
  },
  input: {
    marginBottom: ratioW(16),
  },
  forgotPassword: {
    ...TPoppinsStyle.H1420Medium,
    textAlign: 'right',
    marginBottom: ratioW(24),
    textDecorationLine: 'underline',
  },
  welcomeText: {
    ...TPoppinsStyle.H2028Medium,
    marginBottom: ratioW(4),
  },
  introText: {
    ...TPoppinsStyle.H1624Regular,
    marginBottom: ratioW(24),
  },
});
