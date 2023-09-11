import React from 'react';
import {StyleSheet, TextStyle, View} from 'react-native';
import {useTheme} from '@app/theme';
import {ratioW} from '@app/utils/UDimension';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import i18n from '@app/i18n';
import RowItem from './RowItem';
import {Separator, Text} from '@app/components/atoms';
import {useRealEstateDetailContext} from '@app/context';
import mNumber from '@app/utils/methods/mNumber';
import RealEstateDetail from '@app/assets/svg/RealEstateDetail';
import RealEstateAgent from './RealEstateAgent';
import {IAgent} from '@app/definitions/TApi';

const DescriptionRealEstate = ({listAgent}: {listAgent: IAgent[]}) => {
  const {colors} = useTheme();
  const {item} = useRealEstateDetailContext();

  const tableHeaderStyle = StyleSheet.flatten([
    styles.textHeader,
    {
      color: colors.chipText,
    },
  ]);
  const $description: TextStyle = {
    ...styles.description,
    color: colors.realestateTableTitle,
    textAlign: 'justify',
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={$description}>{item?.description}</Text>
        <Separator height={ratioW(32)} />
        <View>
          <Text style={tableHeaderStyle}>
            {i18n.t('RealEstateDetail.Description.Details')}
          </Text>
          <RowItem
            leftIcon={<RealEstateDetail.IcBed />}
            title={i18n.t('RealEstateDetail.Description.Beds')}
            desc={String(item?.numberOfBeds ?? '')}
          />
          <RowItem
            leftIcon={<RealEstateDetail.IcBath />}
            title={i18n.t('RealEstateDetail.Description.TotalBaths')}
            desc={String(item?.numberOfBaths ?? '')}
          />
          <RowItem
            leftIcon={<RealEstateDetail.IcBath />}
            title={i18n.t('RealEstateDetail.Description.BathroomsFull')}
            desc={String(item?.bathroomsFull ?? '')}
          />
          <RowItem
            leftIcon={<RealEstateDetail.IcBath />}
            title={i18n.t('RealEstateDetail.Description.BathroomsThreeQuarter')}
            desc={String(item?.bathroomsThreeQuarter ?? '')}
          />
          <RowItem
            leftIcon={<RealEstateDetail.IcBath />}
            title={i18n.t('RealEstateDetail.Description.BathroomsHalf')}
            desc={String(item?.bathroomsHalf ?? '')}
          />
          <RowItem
            leftIcon={<RealEstateDetail.IcBath />}
            title={i18n.t('RealEstateDetail.Description.BathroomsOneQuarter')}
            desc={String(item?.bathroomsOneQuarter ?? '')}
          />
          <RowItem
            leftIcon={<RealEstateDetail.IcSquare />}
            title={i18n.t('RealEstateDetail.Description.SquareFootage')}
            desc={mNumber.formatBidValue(String(item?.squareFt)) ?? ''}
          />
          <RowItem
            leftIcon={<RealEstateDetail.IcDollar />}
            title={i18n.t('RealEstateDetail.Description.PriceSqft')}
            desc={mNumber.formatUsaCurrency(item?.priceSquareFt ?? 0)}
          />
          <RowItem
            leftIcon={<RealEstateDetail.IcSquare />}
            title={i18n.t('RealEstateDetail.Description.LotSize')}
            desc={mNumber.formatBidValue(String(item?.lotSizeArea)) ?? ''}
          />
          <RowItem
            leftIcon={<RealEstateDetail.IcCalendar />}
            title={i18n.t('RealEstateDetail.Description.YearBuilt')}
            desc={String(item?.yearBuilt ?? '')}
          />
          <RowItem
            leftIcon={<RealEstateDetail.IcDollar />}
            title={i18n.t('RealEstateDetail.Description.MonthlyHOA')}
            desc={mNumber.formatUsaCurrency(item?.hoaAmount ?? 0)}
          />
          <RowItem
            leftIcon={<RealEstateDetail.IcDollar />}
            title={i18n.t(
              'RealEstateDetail.Description.AssociationFeeFrequency',
            )}
            desc={String(item?.associationFeeFrequency ?? '')}
          />
          <RowItem
            leftIcon={<RealEstateDetail.IcCooling />}
            title={i18n.t('RealEstateDetail.Description.Cooling')}
            desc={String(item?.cooling ?? '')}
          />
          <RowItem
            leftIcon={<RealEstateDetail.IcHeating />}
            title={i18n.t('RealEstateDetail.Description.Heating')}
            desc={item?.heating ? i18n.t('common.Yes') : i18n.t('common.No')}
          />
          <RowItem
            leftIcon={<RealEstateDetail.IcAppliance />}
            title={i18n.t('RealEstateDetail.Description.Appliances')}
            desc={String(item?.appliances ?? '')}
          />
          <RowItem
            leftIcon={<RealEstateDetail.IcFireplace />}
            title={i18n.t('RealEstateDetail.Description.Fireplaces')}
            desc={String(item?.fireplace ?? '')}
          />
          <RowItem
            leftIcon={<RealEstateDetail.IcInterior />}
            title={i18n.t('RealEstateDetail.Description.InteriorFeatures')}
            desc={String(item?.interiorFeatures ?? '')}
          />
          <RowItem
            leftIcon={<RealEstateDetail.IcFlooring />}
            title={i18n.t('RealEstateDetail.Description.Flooring')}
            desc={String(item?.flooring ?? '')}
          />
          <RowItem
            leftIcon={<RealEstateDetail.IcParking />}
            title={i18n.t('RealEstateDetail.Description.ParkingSpaces')}
            desc={String(item?.parkingSpaces ?? '')}
          />
          <RowItem
            leftIcon={<RealEstateDetail.IcPool />}
            title={i18n.t('RealEstateDetail.Description.Pool')}
            desc={String(item?.pool ?? '')}
          />
          <RowItem
            leftIcon={<RealEstateDetail.IcLaundry />}
            title={i18n.t('RealEstateDetail.Description.Laundry')}
            desc={String(item?.laundryFeatures ?? '')}
          />
          <RowItem
            leftIcon={<RealEstateDetail.IcView />}
            title={i18n.t('RealEstateDetail.Description.View')}
            desc={String(item?.view ?? '')}
          />
          <RowItem
            leftIcon={<RealEstateDetail.IcStories />}
            title={i18n.t('RealEstateDetail.Description.Stories')}
            desc={String(item?.numberOfStories ?? '')}
          />
          <RowItem
            leftIcon={<RealEstateDetail.IcUnits />}
            title={i18n.t('RealEstateDetail.Description.Units')}
            desc={String(item?.units ?? '')}
          />
          <RowItem
            leftIcon={<RealEstateDetail.IcPropertyType />}
            title={i18n.t('RealEstateDetail.Description.PropertyType')}
            desc={String(item?.propertyType ?? '')}
          />
          <RowItem
            leftIcon={<RealEstateDetail.IcArchitectural />}
            title={i18n.t('RealEstateDetail.Description.ArchitectualStyle')}
            desc={String(item?.architecturalStyle ?? '')}
          />
          <RowItem
            leftIcon={<RealEstateDetail.IcParcel />}
            title={i18n.t('RealEstateDetail.Description.ParcelNumber')}
            desc={String(item?.parcelNumber ?? '')}
          />
          <RowItem
            leftIcon={<RealEstateDetail.IcZoning />}
            title={i18n.t('RealEstateDetail.Description.ZoningDescription')}
            desc={String(item?.zoningDescription ?? '')}
          />
          <RowItem
            leftIcon={<RealEstateDetail.IcCounty />}
            title={i18n.t('RealEstateDetail.Description.County')}
            desc={String(item?.countyOrParish ?? '')}
          />
        </View>
      </View>
      <Separator
        height={ratioW(8)}
        width="100%"
        backgroundColor={colors.transferItemBackground}
      />
      <RealEstateAgent data={listAgent ?? []} />
    </View>
  );
};

export default DescriptionRealEstate;

const styles = StyleSheet.create({
  textHeader: {
    ...TPoppinsStyle.H1624Bold,
    marginBottom: ratioW(12),
  },
  textContent: {
    ...TPoppinsStyle.H1624Regular,
  },
  rowView: {
    borderBottomWidth: 1,
    paddingVertical: ratioW(12),
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  container: {margin: ratioW(16)},
  description: {
    ...TPoppinsStyle.H1420Regular,
  },
});
