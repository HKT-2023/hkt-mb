import {IDefaultScreenProps} from './TStack';

export type TAuthenticationStackParamList = {
  LOGIN_SCREEN: Record<string, unknown>;
  FORGOT_PASSWORD_ENTER_EMAIL_SCREEN: Record<string, unknown>;
  FORGOT_PASSWORD_ENTER_PASSWORD_SCREEN: {
    email: string;
    code: string;
  };
  FORGOT_PASSWORD_ENTER_CODE_SCREEN: {
    email: string;
  };
};

export type ILoginScreenProps = IDefaultScreenProps<'LOGIN_SCREEN'>;
export type IForgotPasswordEnterEmailScreenProps =
  IDefaultScreenProps<'FORGOT_PASSWORD_ENTER_EMAIL_SCREEN'>;
export type IForgotPasswordEnterPasswordScreenProps =
  IDefaultScreenProps<'FORGOT_PASSWORD_ENTER_PASSWORD_SCREEN'>;
export type IForgotPasswordEnterCodeScreenProps =
  IDefaultScreenProps<'FORGOT_PASSWORD_ENTER_CODE_SCREEN'>;
