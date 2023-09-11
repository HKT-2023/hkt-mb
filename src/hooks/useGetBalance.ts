import {useEffect, useState} from 'react';
import wallet from '@app/api/wallet';
import Config from 'react-native-config';

const useGetBalance = () => {
  const [userBalance, setUserBalance] = useState<number>();
  const [userHba, setUserHba] = useState<number>();
  const [forceLoad, setForceLoad] = useState(false);

  const formatReal = (number: number) =>
    parseFloat((number * Math.pow(10, -2)).toFixed(2));
  const formatHba = (number: number) =>
    parseFloat((number * Math.pow(10, -8)).toFixed(2));

  const getBalance = () => {
    wallet.myWallet().then(res => {
      if (res.data) {
        const accountId = res.data.accountId;
        wallet.getBalance(accountId).then(resp => {
          const balance = resp?.balances
            .filter(e => e.account === accountId)?.[0]
            ?.tokens?.filter(
              g => g.token_id === Config.HEDERA_TOKEN_ID,
            )?.[0]?.balance;
          const hba = resp?.balances?.filter(e => e.account === accountId)?.[0]
            ?.balance;
          setUserBalance(formatReal(balance ?? 0));
          setUserHba(formatHba(hba ?? 0));
        });
      }
    });
  };

  useEffect(() => {
    getBalance();
  }, [forceLoad]);

  return {userBalance, userHba, setForceLoad, forceLoad};
};

export default useGetBalance;
