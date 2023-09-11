import {IRPListActivity} from './TApi';

export interface IItem {
  address: string;
  price: string;
  photo: number | string;
  location: string;
  category: string;
}

export type TTransferState = 'complete' | 'pending';

export type TTransfer = 'sold' | 'purchase' | 'bonus';

export interface ITransferItem {
  title: string;
  date: string;
  state: TTransferState;
  value: string;
  type: TTransfer;
}

export interface ITransferSection {
  title: string;
  data: IRPListActivity[];
}
