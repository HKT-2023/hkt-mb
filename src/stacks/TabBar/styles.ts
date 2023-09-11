import {StyleSheet} from 'react-native';
import sharedStyles from '@app/sharedStyles';
import {ratioW} from 'react-native-gin-boilerplate';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    ...sharedStyles.shadowTab,
  },
  btn: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: ratioW(18),
    paddingBottom: ratioW(4),
  },
});

export default styles;
