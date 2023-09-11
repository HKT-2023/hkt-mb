import {ratioW, screenHeight} from '@app/utils/UDimension';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {StyleSheet} from 'react-native';

const realEstateStyles = StyleSheet.create({
  bookmarkButton: {
    position: 'absolute',
    bottom: ratioW(10),
    right: ratioW(10),
    width: ratioW(24),
    height: ratioW(24),
    borderRadius: ratioW(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignCenter: {alignItems: 'center'},
  iconLine: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  line1: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  price: {
    ...TPoppinsStyle.H2028Bold,
    fontSize: 22,
  },
  address: {
    ...TPoppinsStyle.H1624Bold,
  },
  checkInLabel: {
    marginRight: ratioW(10),
    ...TPoppinsStyle.H1420Medium,
  },
  buttonCheckIn: {
    borderWidth: ratioW(1.5),
    padding: ratioW(10),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: ratioW(12),
    alignSelf: 'baseline',
  },
  content: {
    marginHorizontal: ratioW(16),
    marginTop: ratioW(12),
    marginBottom: ratioW(12),
  },
  photo: {
    width: '100%',
    height: ratioW(277),
  },
  locationContainer: {
    marginTop: ratioW(10),
    marginBottom: ratioW(8),
    alignItems: 'center',
  },
  circleSeparator: {
    borderRadius: ratioW(100),
    marginHorizontal: ratioW(8),
    padding: ratioW(3),
  },
  avgPriceTitle: {
    ...TPoppinsStyle.H1420Medium,
    marginBottom: ratioW(4),
  },
  avgPriceDesc: {
    ...TPoppinsStyle.H1624Regular,
  },
  modal: {
    maxHeight: screenHeight * 0.85,
    justifyContent: 'flex-end',
    bottom: 0,
    flex: 1,
  },
  processModal: {alignItems: 'stretch', flex: 1},
});

export default realEstateStyles;
