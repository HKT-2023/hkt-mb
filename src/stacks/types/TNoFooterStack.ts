import {IDefaultScreenProps} from './TStack';

export type TNoFooterStackParamList = {
  DETAILED_USER_INFOR_SCREEN: Record<string, unknown>;
  CHANGE_PASSWORD_SCREEN: Record<string, unknown>;
  FAQ_SCREEN: Record<string, unknown>;
  TWO_FA_AUTHENTICATION_SCREEN: Record<string, unknown>;
  CONFIRM_OTP_2FA_SCREEN: {
    phone: string;
  };
  VERIFICATION_SUCCESS_SCREEN: Record<string, unknown>;
  WALLET_SCREEN: Record<string, unknown>;
  TRANSFER_NFT_SCREEN: {
    walletId: string;
    receiverId?: string;
  };
  TRANSFER_TOKEN_SCREEN: {
    walletId: string;
    receiverId?: string;
  };
  WALLET_ACTIVITY_SCREEN: Record<string, unknown>;
  MY_NFT_SCREEN: Record<string, unknown>;
};
export type IDetailedUserInforScreenProps =
  IDefaultScreenProps<'DETAILED_USER_INFOR_SCREEN'>;
export type IChangePasswordScreenProps =
  IDefaultScreenProps<'CHANGE_PASSWORD_SCREEN'>;
export type IFAQScreenProps = IDefaultScreenProps<'FAQ_SCREEN'>;
export type ITwoFAAuthenticationScreenProps =
  IDefaultScreenProps<'TWO_FA_AUTHENTICATION_SCREEN'>;
export type IConfirmOTP2FAScreenProps =
  IDefaultScreenProps<'CONFIRM_OTP_2FA_SCREEN'>;
export type IVerificationSuccessScreenProps =
  IDefaultScreenProps<'VERIFICATION_SUCCESS_SCREEN'>;
export type IWalletScreenProps = IDefaultScreenProps<'WALLET_SCREEN'>;
export type ITransferNFTScreenProps =
  IDefaultScreenProps<'TRANSFER_NFT_SCREEN'>;
export type ITransferTokenScreenProps =
  IDefaultScreenProps<'TRANSFER_TOKEN_SCREEN'>;
export type IWalletActivityScreenProps =
  IDefaultScreenProps<'WALLET_ACTIVITY_SCREEN'>;
export type IMyNFTScreenProps = IDefaultScreenProps<'MY_NFT_SCREEN'>;
