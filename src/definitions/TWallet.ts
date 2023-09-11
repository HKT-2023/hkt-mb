import {IDate} from '@app/utils/methods/mDate';

export type TTransaction = 'sent' | 'received';

export interface IActivity {
  title: string;
  total: number;
  type: TTransaction;
  time: IDate;
}

export type TWalletTab =
  | 'LISTED_ON_EXCHANGE'
  | 'TRANSFERRED'
  | 'RECEIVED'
  | 'FIXED_PRICE'
  | 'BID'
  | 'APPROVED'
  | 'CANCEL'
  | 'OFFER';

export interface IWalletActivityRoute {
  key: TWalletTab;
  title: string;
}
