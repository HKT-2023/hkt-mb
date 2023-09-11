import i18n from '@app/i18n';
import {TButtonVoid, UMessage} from 'react-native-gin-boilerplate';

const checkEnoughBalance = (
  balance: number,
  price: number,
  callback: TButtonVoid,
) => {
  if (balance && balance > price) {
    callback();
  } else {
    UMessage.showFailMessage(
      i18n.t('common.YouDontHaveEnoughBalanceToContinue'),
    );
  }
};

export default {
  checkEnoughBalance,
};
