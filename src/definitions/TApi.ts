import {ICourse} from './TCourse';
import {IRQMeta} from './TResponse';
import {TSocial, TUserRole} from './TUser';
import {IDate} from '@app/utils/methods/mDate';
import {INFTExchange, ISalesHistory} from './INFTs';

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  role: TUserRole;
  userId: string;
}

export interface IChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IValidateCodePayload {
  code: string;
  email: string;
}

export interface IResetPasswordPayload {
  email: string;
  newPassword: string;
  confirmPassword: string;
  code: string;
}

export interface IRQGoogleLogin {
  token: string;
  clientId: string;
}

export interface IRQAppleLogin {
  token: string;
  nonce: string;
}

export interface IRQSetExternalId {
  userId: string;
}
export interface IRPGetAuthHash {
  hex: string;
}

export interface IUpdateUserPayload {
  phone: string;
  lastName: string;
  avatarUrl?: string;
  firstName: string;
  dateOfBirth?: string;
}

export interface IUpdateAgentUserPayload extends IUpdateUserPayload {
  license: string;
  agentName: string;
  agentEmail: string;
  description?: string;
  socialMedia?: {type: TSocial; link: string}[];
}

export interface IUpdateVendorUserPayload extends IUpdateUserPayload {
  license: string;
  vendorType: string[];
  vendorEmail: string;
  description?: string;
  businessName: string;
  primaryContact: string;
  vendorLocation: string;
}
export interface IRPMyWallet {
  _id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  accountId: string;
  address: string;
  nodeId: string;
  createdTxId: string;
  createdTxHash: string;
  publicKey: string;
  point: string;
  __v: number;
}

export interface IRPLeaderboardUser {
  _id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  point: number;
  __v: number;
  rank: number;
  userImage: string;
  userName: string;
}

export interface IRPViewLeaderboard {
  myRanking: number;
  myTotalPoints: number;
  myEstimateAccuracy: number;
  topThreeRanking: IRPLeaderboardUser[];
  totalUser: number;
}

export interface IRPSearchLocationItem {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: IRPSearchLocationItemProperties;
  text: string;
  place_name: string;
  bbox: number[];
  center: number[];
  geometry: IRPSearchLocationItemGeometry;
  zipCode: string;
  city: string;
}

export interface IRPSearchLocationItemProperties {
  short_code: string;
  wikidata: string;
}

export interface IRPSearchLocationItemGeometry {
  type: string;
  coordinates: number[];
}

export interface IRQAddInterestAreaItem {
  center: number[];
  aliasName: string;
  mapboxId: string;
  bbox: number[];
  zipCode: string;
  city: string;
}

export interface IRQAddInterestArea {
  listAreaInterest: IRQAddInterestAreaItem[];
}

export interface IRPGetInterestAreaItem {
  _id: string;
  createdAt: string;
  updatedAt: string;
  bbox: number[];
  center: number[];
  userId: string;
  mapboxId: string;
  aliasName: string;
  __v: number;
  zipCode: string;
  city: string;
}
export interface IContactAgentPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
  listingId: string;
  location: string;
}

export interface ICheckInPayload {
  listingId: string;
  userGpsLat: number;
  userGpsLong: number;
}

export interface IEstimatePayload {
  listingId: string;
  price: number;
  feedback: string;
  ratings: any[];
}

export interface IGetListOfEstimationsPayload extends Partial<IRQMeta> {
  listingId?: string;
  sortByPrice?: '1' | '-1';
  sortByCreatedAt?: '1' | '-1';
}

export interface IRQViewNFT extends Partial<IRQMeta> {
  search?: string;
  isContainMKP?: boolean;
}
export interface IRPViewNFT {
  _id: string;
  images: string;
  name: string;
  endDate: string;
  price: number;
  userId: string;
  propertyAddress: string;
  salesPrice: number;
  salesDate: string;
  theListDate: string;
  salesType: {
    key: TSaleType;
    title: string;
  };
  point: number;
  winningPrice: number;
  agentName: string;
  customer: string;
  tokenId: number;
  contractAddress: string;
  ownerAccountId: string;
  ownerAddress: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  transactionId: string;
  ownerName: string;
  putSaleTime: string;
  putSaleType: string;
  saleStatus: string;
}

export type TSaleType = 'sellFixedPrice' | 'bid' | 'offer';

export interface IRPViewNFTDetail {
  _id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  propertyAddress: string;
  salesPrice: number;
  salesDate: string;
  theListDate: string;
  endDate: string;
  salesType: {
    key: TSaleType;
    title: string;
  };
  price: number;
  point: number;
  winningPrice: number;
  agentName: string;
  __v: number;
  images: string;
  listingId: string;
  nftType: 'buyer' | 'seller' | 'agent' | 'referral';
  salesHistory?: ISalesHistory[];
  sellingConfigId: string;
  ownerName: string;
}

export interface IRPAddFavourite {
  userId: string;
  listingId: string;
  createdAt: string;
}

export interface IRPGetListFavorite {
  _id: string;
  createdAt: string;
  dayOnMarket: number;
  hoaAmount: number;
  listingId: string;
  listingStatus: string;
  lotSizeArea: number;
  numberOfBaths: number;
  numberOfBeds: number;
  numberOfParking: number;
  numberOfStories: number;
  photo: string;
  price: number;
  priceSquareFt: number;
  propertyType?: string;
  propertySubType: string;
  units: number;
  updatedAt: string;
  userId: string;
  yearBuilt: number;
  city: string;
  location: string;
  latitude: number;
  longitude: number;
}

export interface IRPGetListFavoriteListing {
  id: string;
  location: string;
  city?: string;
  price: number;
  hoaAmount: number;
  heating?: boolean;
  petsAllowed?: string[];
  propertyType?: string;
  propertySubType: string;
  zipCode?: string;
  priceSquareFt: number;
  numberOfBaths: number;
  numberOfParking: number;
  listingStatus: string;
  numberOfBeds: number;
  squareFt?: number;
  lotSizeArea: number;
  numberOfStories: number;
  yearBuilt: number;
  dayOnMarket: number;
  cooling?: string[];
  fireplace?: number;
  pool?: string[];
  units: number;
  description?: string;
  commission?: string;
  owner?: string;
  photo: IRPGetListFavoritePhoto[];
  tour?: string;
  favorite?: IFavorite | null;
  latitude: number;
  longitude: number;
  avgEstimatePrice?: number;
  agents?: IAgent[];
  virtualTourURLZillow?: string;
  onMarketDate?: string;
  closeDate?: Date;
  commissionType?: string[];
  closePrice?: string[];
  originalListPrice?: number;
  bathroomsFull?: number;
  bathroomsHalf?: number;
  bathroomsOneQuarter?: number;
  bathroomsThreeQuarter?: number;
  interiorFeatures?: string[];
  appliances?: string[];
  associationFeeFrequency?: string;
  architecturalStyle?: string[];
  country?: string;
  countyOrParish?: string;
  flooring?: string[];
  garageSpaces?: number;
  laundryFeatures?: string[];
  parcelNumber?: number;
  view?: string[];
  zoningDescription?: string;
  buyerAgencyCompensation?: string;
  buyerAgencyCompensationType?: string;
  listAgentMlsId?: string;
  listAgentFirstName?: string;
  listAgentLastName?: string;
  listAgentStateLicense?: string;
  listOfficeName?: string;
  coListAgentMlsId?: string;
  coListAgentFirstName?: string;
  coListAgentLastName?: string;
  coListAgentStateLicense?: string;
  coListOfficeName?: string;
  isAssignedRealifiAgent?: boolean;
  parkingSpaces?: number;
  thumbnail?: string;
}

export interface IAgent {
  _id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  listAgentMlsId: string;
  typeOfUser: 'RealifiAgent' | 'NonRealifiAgent';
  businessName: string;
}

export interface IFavorite {
  __v: number;
  _id: string;
  createdAt: string;
  listingId: string;
  updatedAt: string;
  userId: string;
}

export interface IRPGetListFavoritePhoto {
  Order?: number;
  MediaURL: string;
  ResourceRecordKey?: string;
  ResourceName?: string;
  ClassName?: string;
  MediaCategory?: string;
  MimeType?: string;
  MediaObjectID?: string;
  ShortDescription?: string;
}

export interface IRQGetListing extends Partial<IRQMeta> {
  sortBy?: string;
  order?: string;
  location?: string;
  city?: string;
  zipCode?: string;
  propertyType?: string;
  fromPrice?: number;
  toPrice?: number;
  fromBeds?: number;
  toBeds?: number;
  fromBaths?: number;
  toBaths?: number;
  listingStatus?: string;
  fromSquareFt?: number;
  toSquareFt?: number;
  fromLotSizeArea?: number;
  toLotSizeArea?: number;
  hoaAmount?: number;
  fromParkings?: number;
  toParkings?: number;
  fromStories?: number;
  toStories?: number;
  fromYearBuilt?: number;
  toYearBuilt?: number;
  fromDayOnMarket?: number;
  toDayOnMarket?: number;
  fields?: string;
  search?: string;
  isRecommend?: boolean;
  propertySubType?: string;
  box?: string;
}

export interface IGetListNotificationPayload extends Partial<IRQMeta> {
  type?: 'request' | 'contact';
}

export interface IRPGetListEstimation {
  price: number;
  feedback: string;
  ratings: any[];
  image: string;
  name: string;
  userId: string;
  ratingAvg?: number;
}

export interface IRPGetUserEstimation {
  _id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  listingId: string;
  __v: number;
  explain: string;
  feedback: string;
  price?: number;
}

export interface IRPHedera {
  timestamp: string;
  balances: IRPHederaBalance[];
}

export interface IRPHederaBalance {
  account: string;
  balance: number;
  tokens: IRPHederaBalanceTokens[];
}

export interface IRPHederaBalanceTokens {
  token_id: string;
  balance: number;
}

export interface IRQRequestTour {
  listingId: string;
  day: string;
  timeFrame: string;
  location: string;
}

export interface IRPRequestTour {
  day: string;
  timeFrame: string;
  listingId: string;
  userId: string;
}

export interface IRQReportListing {
  name: string;
  email: string;
  phone: string;
  listingId: string;
  location: string;
  reason: string;
}

export interface IRPReportListing {
  createdAt: string;
  updatedAt: string;
  name: string;
  phone: string;
  email: string;
  listingId: string;
  location: string;
  reportListingStatus: string;
  reason: string;
  _id: string;
}

export interface IRQSendToken {
  accountId: string;
  amount: number;
  memo?: string;
}

export interface IRPSendToken {
  createdAt: string;
  updatedAt: string;
  accountId: string;
  transactionId: string;
  transactionType: string;
  content: string;
  _id: string;
  __v: number;
}

export interface IRQSendNFT {
  NFTId: string;
  receiveAccount: string;
  memo?: string;
}

export interface IRPSendNFT {
  createdAt: string;
  updatedAt: string;
  accountId: string;
  transactionId: string;
  transactionType: string;
  content: string;
  _id: string;
  __v: number;
}

/**
*- type:
 NFTMinted
 PurchasedNFT
 SoldNFT
 BonusPoint
 TransferNFT
 TransferToken
 ReceiveNFT
 ReceiveToken
 ApproveNFT
 ApproveToken
 SellNFTFixedPrice
 SellNFTWithOffer
 PutNFTOff
 OfferNFT
 */
export interface IRQListActivity extends Partial<IRQMeta> {
  type?: string;
}

export interface IRPListActivity {
  _id: string;
  createdAt: string;
  updatedAt: string;
  accountId: string;
  transactionId: string;
  transactionType: string;
  transactionDescription: string;
  content: IRPListActivityContent;
  memo: string;
  gasFee?: string;
  nftName?: string;
  status?: string;
}

export interface IRPListActivityContent {
  point: number;
  price: number;
  royalty: number;
}

export interface IRQSetUp2FA {
  phone: string;
}

export interface IRQValidatePhoneCode {
  phone: string;
  code: string;
}

export type TNFTSort = -1 | 1 | 'DESC' | 'ASC';

export interface IRQNFTSort {
  sortByPrice?: TNFTSort;
  sortByPoint?: TNFTSort;
  sortByCreatedAt?: TNFTSort;
  sortByEndTime?: TNFTSort;
}

export interface IRQNFTMarketplace extends Partial<IRQMeta & IRQNFTSort> {
  search?: string;
  sellType?: string;
  fromPrice?: number;
  toPrice?: number;
  isMyNFT?: boolean;
}

export interface IRQConfigSell {
  nftId: string;
  price: number;
}

export interface IRPConfigSell {
  createdAt: string;
  updatedAt: string;
  userId: string;
  nftId: string;
  type: string;
  price: number;
  currency: string;
  status: string;
  _id: string;
  __v: number;
}

export interface IRPBuyNFTFixedPrice {
  createdAt: string;
  updatedAt: string;
  userId: string;
  images: string;
  name: string;
  propertyAddress: string;
  salesPrice: number;
  salesDate: string;
  theListDate: string;
  endDate: string;
  salesType: string;
  price: number;
  point: number;
  winningPrice: number;
  agentName: string;
  customer: string;
  tokenId: number;
  contractAddress: string;
  ownerAccountId: string;
  ownerAddress: string;
  transactionId: string;
  ownerName: string;
  putSaleType: string;
  putSaleTime: string;
  saleStatus: string;
  _id: string;
  __v: number;
}

export interface IRQConfigOffer {
  nftId: string;
  price: number;
}

export interface IRPConfigOffer {
  createdAt: string;
  updatedAt: string;
  userId: string;
  nftId: string;
  type: string;
  currency: string;
  status: string;
  _id: string;
  __v: number;
}

export interface IRQConfigAuction {
  nftId: string;
  endTime: IDate;
  winningPrice?: number;
  startPrice: number;
}

export interface IRPConfigAuction {
  createdAt: string;
  updatedAt: string;
  nftId: string;
  type: string;
  currency: string;
  startTime: string;
  endTime: string;
  status: string;
  _id: string;
  __v: number;
}

export interface IRQListOffer extends Partial<IRQMeta> {
  NFTId: string;
}

export interface IRPListOfferOffer {
  _id: string;
  createdAt: string;
  updatedAt: string;
  sellingConfigId: string;
  userId: string;
  nftId: string;
  price: number;
  currency: string;
  description: string;
  status: string;
  __v: number;
}

export interface IRPListOfferUser {
  _id: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
}

export interface IRPListOffer {
  offer: IRPListOfferOffer;
  userOffer: IRPListOfferUser;
}

export interface IRQMakeOffer {
  sellingConfigId: string;
  price: number;
  description?: string;
}

export interface IRPListBid {
  bid: IRPListOfferOffer;
  userBid: IRPListOfferUser;
}

export type TCourse = 'video' | 'ebook' | 'all';

export interface IGetCoursePayload extends Partial<IRQMeta> {
  type: TCourse;
  search?: string;
  sortCreatedAt?: '-1';
}

export interface IRPListSale {
  name: string;
  createdAt: string;
  price: number;
}

export interface IGetLessonsPayload extends Partial<IRQMeta> {
  courseId: string;
}

export interface IUpdateLessonPayload {
  status?: string;
  lessonId: string;
  currentPage?: number;
  currentTime?: number;
}

export interface IGetQuizzesPayload extends Partial<IRQMeta> {
  courseId: string;
}

export interface IPostAnswerPayload {
  quizId: string;
  isSubmit: boolean;
  answers: {questionId: string; answers: string[]}[];
}

export interface IRPCancelOffer {
  createdAt: string;
  updatedAt: string;
  sellingConfigId: string;
  userId: string;
  nftId: string;
  price: number;
  currency: string;
  status: string;
  _id: string;
  __v: number;
}

export interface IRPEstimateFee {
  gasFee: number;
  royaltyPercentage: number;
}

export interface IRPAgentHomepage {
  courses: ICourse[];
  nfts: INFTExchange[];
  vendors: IRPVendorList[];
}

export interface IRPUserHomepage {
  courses: ICourse[];
  listings: IRPGetListFavoriteListing[];
  vendors: IRPVendorList[];
}

export interface IRPVendorList {
  _id: string;
  name: string;
  thumbnail: string;
  rating: number;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  token?: number;
}

export interface IRQVendorCategory extends Partial<IRQMeta> {
  name?: string;
  status?: 'Active' | 'Inactive';
}

export interface IRQVendorCategoryDetail extends Partial<IRQMeta> {
  id: string;
}

export interface IRPVendorCategoryDetail {
  _id: string;
  avatarUrl: string;
  businessName: string;
  token: number;
  primaryContact: string;
  email: string;
  phone: string;
  rating: number;
}

export interface IRPVendorServiceDetail {
  _id: string;
  businessName: string;
  avatarUrl: string;
  email: string;
  phone: string;
  description: string;
  primaryContact: string;
}

export interface IRQAverageRating {
  vendorId: string;
  vendorCateId: string;
}

export interface IRQEditReview {
  comment: string;
  parentId: string;
}

export interface IRQCreateReview {
  vendorId: string;
  vendorCateId: string;
  rating?: number;
  comment?: string;
  parentId?: string;
}

export interface IRQGetReview extends Partial<IRQMeta> {
  vendorId: string;
  vendorCateId: string;
  parentId?: string;
  sortCreatedAt: '1' | '-1';
}

export interface IRPGetReview {
  _id: string;
  comment: string;
  isTemp?: boolean;
  isError?: boolean;
  createdAt: string;
  updatedAt: string;
  parentId?: string;
  vendorId?: string;
  vendorCateId?: string;
  totalSubReviews?: number;
  subReviews?: IRPGetReview[];
  userInfo: IRPGetReviewUserInfo;
}

export interface IRPGetReviewUserInfo {
  avatarUrl: string;
  fullName: string;
}

export interface IRPOTPFailed {
  message: string;
  data: IRPOTPFailedData;
}

export interface IRPOTPFailedData {
  blockPhoneTime: number;
  invalidPhoneCodeTime: number;
}

export interface IRPPropertyType {
  propertySubForSale: string[];
  propertySubType: string[];
  propertySubTypeForLease: string[];
}

export type TPointType = 'client' | 'agent' | 'referral';

export interface IRQViewLeaderboard extends Partial<IRQMeta> {
  pointType: TPointType;
}
