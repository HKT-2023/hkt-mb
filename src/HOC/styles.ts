import {StyleSheet} from 'react-native';
import {ratioW} from '@app/utils/UDimension';
import {TPoppinsStyle} from '@app/utils/UTextStyle';

export default StyleSheet.create({
  bidRightButton: {
    flex: 1,
    flexGrow: 1,
    width: undefined,
    padding: ratioW(0),
    paddingVertical: ratioW(16),
    paddingHorizontal: ratioW(1),
  },
  bidLeftButton: {
    flex: 1,
    marginRight: ratioW(20),
  },
  bidTimeTitle: {
    ...TPoppinsStyle.H1420Medium,
    letterSpacing: 0.1,
  },
  bidTimeValue: {
    ...TPoppinsStyle.H2228Medium,
  },
  btnWrapper: {
    padding: ratioW(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
});
