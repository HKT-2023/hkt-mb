import _ from 'lodash';
import React from 'react';
import SectionList from './SectionList';
import {LIMIT} from '@app/constants/keys';
import mDate from '@app/utils/methods/mDate';
import useGetList from '@app/hooks/useGetList';
import activityManagement from '@app/api/activityManagement';
import FooterFlatList from '@app/components/atoms/FooterFlatList';
import {IRPListActivity, IRQListActivity} from '@app/definitions/TApi';
import {EmptyComponent, RefreshControl} from 'react-native-gin-boilerplate';

interface IActivityTab {
  type: string;
}
const ActivityTab: React.FC<IActivityTab> = ({type}) => {
  const {data, isLoadMore, onLoadMore, onRefresh} = useGetList<
    IRQListActivity,
    IRPListActivity
  >(
    activityManagement.listActivity,
    {
      limit: LIMIT,
      type: type,
    },
    {isTrigger: true},
  );
  const convertedData = _(data)
    .groupBy(tran => mDate.formatDate(tran.createdAt, mDate.FORMAT_DATE_WALLET))
    .map(function (items, date) {
      return {
        title: date,
        data: items,
      };
    })
    .value();

  return (
    <SectionList
      data={convertedData}
      onEndReached={onLoadMore}
      ListEmptyComponent={EmptyComponent}
      refreshControl={<RefreshControl onRefresh={onRefresh} />}
      ListFooterComponent={<FooterFlatList isLoadMore={isLoadMore} />}
    />
  );
};

export default React.memo(ActivityTab);
