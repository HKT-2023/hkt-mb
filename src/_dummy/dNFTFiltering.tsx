import React from 'react';
import i18n from '@app/i18n';
import {IcMoney, IcPrice, IcSell} from '@app/assets/svg';
import {INFTFiltering, ISellType} from '@app/definitions/TFilter';

const dNFTFiltering: INFTFiltering[] = [
  {value: i18n.t('Wallet.FixedPrice'), key: 'sellFixedPrice'},
  {value: i18n.t('Wallet.Auction'), key: 'bid'},
  {value: i18n.t('Wallet.Offer'), key: 'offer'},
];

export const dNFTSellType: ISellType[] = [
  {
    value: i18n.t('Wallet.FixedPrice'),
    key: 'sellFixedPrice',
    icon: <IcSell />,
  },
  {
    value: i18n.t('Wallet.Auction'),
    key: 'bid',
    icon: <IcPrice />,
  },
  {
    value: i18n.t('Wallet.Offer'),
    key: 'offer',
    icon: <IcMoney />,
  },
];

export default dNFTFiltering;
