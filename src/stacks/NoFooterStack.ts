import FAQ from '@app/screens/Profile/FAQ';
import Wallet from '@app/screens/Wallet/Wallet';
import MyNFT from '@app/screens/Wallet/MyNFT/MyNFT';
import TransferNFT from '@app/screens/Wallet/TransferNFT';
import TransferToken from '@app/screens/Wallet/TransferToken';
import ConfirmOTP2FA from '@app/screens/Profile/ConfirmOTP2FA';
import {StackNavigationOptions} from '@react-navigation/stack';
import {TNoFooterStackParamList} from './types/TNoFooterStack';
import ChangePassword from '@app/screens/Profile/ChangePassword';
import DetailedUserInfor from '@app/screens/Profile/DetailedUserInfor';
import WalletActivity from '@app/screens/Wallet/Activity/WalletActivity';
import TwoFAAuthentication from '@app/screens/Profile/TwoFAAuthentication';
import VerificationSuccess from '@app/screens/Profile/VerificationSuccess';

const NoFooterStack: Record<
  keyof TNoFooterStackParamList,
  {component: any; options?: StackNavigationOptions}
> = {
  DETAILED_USER_INFOR_SCREEN: {
    component: DetailedUserInfor,
  },
  CHANGE_PASSWORD_SCREEN: {
    component: ChangePassword,
  },
  FAQ_SCREEN: {
    component: FAQ,
  },
  TWO_FA_AUTHENTICATION_SCREEN: {component: TwoFAAuthentication},
  CONFIRM_OTP_2FA_SCREEN: {component: ConfirmOTP2FA},
  VERIFICATION_SUCCESS_SCREEN: {
    component: VerificationSuccess,
    options: {gestureEnabled: false},
  },
  WALLET_SCREEN: {
    component: Wallet,
  },
  TRANSFER_NFT_SCREEN: {
    component: TransferNFT,
  },
  TRANSFER_TOKEN_SCREEN: {
    component: TransferToken,
  },
  WALLET_ACTIVITY_SCREEN: {
    component: WalletActivity,
  },
  MY_NFT_SCREEN: {component: MyNFT},
};

export default NoFooterStack;
