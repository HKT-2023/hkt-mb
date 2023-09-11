export type TUserRole =
  | 'RealifiAgent'
  | 'Admin'
  | 'Vendor'
  | 'User'
  | 'NonRealiFiAgent';

export type TUserStatus = 'Active' | 'Inactive';

export type TUserSource = 'google' | 'created-by-admin' | 'apple';

export type TVendor =
  | 'FurnitureStaging'
  | 'Escrow'
  | 'HomeInspection'
  | 'Painting'
  | 'Title'
  | 'Termite'
  | 'Plumbing'
  | 'Photography'
  | 'Videography';

export type TSocial =
  | 'facebook'
  | 'instagram'
  | 'linkedIn'
  | 'twitter'
  | 'tiktok';

export interface IUser {
  _id: string;
  createdAt: string;
  updatedAt: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  typeOfUser: TUserRole;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  status: TUserStatus;
  expireCode: number;
  invalidCodeTime: number;
  source?: TUserSource;
  businessName: string;
  description?: string;
  license: string;
  primaryContact: string;
  vendorEmail: string;
  vendorLocation: string;
  vendorType: string[];
  agentEmail: string;
  agentName: string;
  socialMedia: {type: TSocial; link: string}[];
  isVerifyPhone: boolean;
  phoneVerify: string;
}
