import i18n from '../i18n';
import {IFilter} from './../definitions/TFilter';
export default [
  {
    key: 'ListingStatusUser',
    value: i18n.t('Marketplace.Home.Filter.ListingStatus.Active'),
  },
  {
    key: 'ListingStatusUser',
    value: i18n.t('Marketplace.Home.Filter.ListingStatus.Contingent'),
  },
  {
    key: 'ListingStatusUser',
    value: i18n.t('Marketplace.Home.Filter.ListingStatus.Pending'),
  },
  {
    key: 'ListingStatusUser',
    value: i18n.t('Marketplace.Home.Filter.ListingStatus.Sold'),
  },
  {
    key: 'ListingStatusAgent',
    value: i18n.t('Marketplace.Home.Filter.ListingStatus.Withdrawn'),
  },
  {
    key: 'ListingStatusAgent',
    value: i18n.t('Marketplace.Home.Filter.ListingStatus.Cancelled'),
  },
  {
    key: 'ListingStatusAgent',
    value: i18n.t('Marketplace.Home.Filter.ListingStatus.Expired'),
  },
  {
    key: 'ListingStatusAgent',
    value: i18n.t('Marketplace.Home.Filter.ListingStatus.Hold'),
  },
  {
    key: 'ListingStatusAgent',
    value: i18n.t('Marketplace.Home.Filter.ListingStatus.ActiveUnderContract'),
  },
  {
    key: 'Amenity',
    value: 'bed',
    title: i18n.t('RealEstateDetail.Description.Beds'),
  },
  {
    key: 'Amenity',
    value: 'bath',
    title: i18n.t('Marketplace.Home.Filter.Amenity.Baths'),
  },
  {
    key: 'Amenity',
    value: 'sqft',
    title: i18n.t('Marketplace.Home.Filter.Amenity.Sqft'),
  },
  {
    key: 'Amenity',
    value: 'lotSqft',
    title: i18n.t('RealEstateDetail.Description.LotSize'),
  },
  {
    key: 'Amenity',
    value: 'hoaAmount',
    title: i18n.t('RealEstateDetail.Description.MonthlyHOA'),
  },
  {
    key: 'Amenity',
    value: 'stories',
    title: i18n.t('Marketplace.Home.Filter.Amenity.Stories'),
  },
  {
    key: 'Amenity',
    value: 'unit',
    title: i18n.t('RealEstateDetail.Description.Units'),
  },
  {
    key: 'Amenity',
    value: 'daysOnMarket',
    title: i18n.t('RealEstateDetail.Description.DaysOnMarket'),
  },
  {
    key: 'Amenity',
    value: 'yearBuilt',
    title: i18n.t('Marketplace.Home.Filter.Amenity.YearBuilt'),
  },
] as IFilter[];
