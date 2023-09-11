import {StyleSheet} from 'react-native';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {ratioW} from 'react-native-gin-boilerplate';

const styles = StyleSheet.create({
  checkLogsBtn: {
    marginRight: ratioW(8),
  },
  cartButton: {
    marginRight: ratioW(8),
  },
  container: {
    paddingBottom: ratioW(8),
    paddingHorizontal: ratioW(20),
  },
  row: {
    alignItems: 'center',
    paddingTop: ratioW(15),
    paddingBottom: ratioW(4),
    justifyContent: 'space-between',
  },
  headerNormal: {
    alignItems: 'center',
    paddingTop: ratioW(15),
    paddingBottom: ratioW(4),
  },
  title: {
    ...TPoppinsStyle.H1624Medium,
    marginHorizontal: ratioW(12),
  },
  avatar: {
    width: ratioW(30),
    height: ratioW(30),
    borderRadius: ratioW(24),
  },
  homeRight: {alignItems: 'center'},
  headerText: {
    ...TPoppinsStyle.H2028Regular,
    lineHeight: 30,
  },
});

export default styles;
