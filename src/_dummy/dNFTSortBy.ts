import i18n from '@app/i18n';
import {INFTSortBy} from '@app/definitions/TFilter';

const dNFTSortBy: INFTSortBy[] = [
  {key: 'EndingSoon', value: i18n.t('Wallet.EndingSoon')},
  {key: 'RecentListed', value: i18n.t('Wallet.RecentListed')},
  {key: 'priceHighToLow', value: i18n.t('Wallet.PriceHTL')},
  {key: 'priceLowToHigh', value: i18n.t('Wallet.PriceLTH')},
];

export default dNFTSortBy;
