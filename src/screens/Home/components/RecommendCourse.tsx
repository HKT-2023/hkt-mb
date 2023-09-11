import i18n from '@app/i18n';
import ItemCourse from '@app/screens/Course/components/ItemCourse';
import React from 'react';
import {ratioW} from '@app/utils/UDimension';
import {StyleSheet, View} from 'react-native';
import {Text} from '@app/components/atoms';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {ICourse} from '@app/definitions/TCourse';

interface IRecommendCourse {
  listCourse: ICourse[];
}

const RecommendCourse: React.FC<IRecommendCourse> = ({listCourse}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('Homepage.RecommendCourse')}</Text>
      {listCourse?.map((item, index) => (
        <ItemCourse key={index} item={item} style={styles.item} />
      ))}
    </View>
  );
};

export default RecommendCourse;

const styles = StyleSheet.create({
  container: {
    padding: ratioW(16),
  },
  title: {
    ...TPoppinsStyle.H1624Medium,
  },
  item: {
    padding: ratioW(8),
    marginTop: ratioW(16),
  },
});
