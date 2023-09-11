import i18n from '@app/i18n';
import useGetList from '@app/hooks/useGetList';
import {IMeta} from '@app/definitions/TResponse';
import React, {useEffect, useState} from 'react';
import {keyExtractor} from '@app/constants/keys';
import faqManagement from '@app/api/faqManagement';
import {IFAQ, IQuestion} from '@app/definitions/IFAQ';
import {IFAQScreenProps} from '@app/stacks/types/TNoFooterStack';
import {
  ViewStyle,
  SectionList,
  SectionListData,
  LayoutAnimation,
  ActivityIndicator,
  SectionListRenderItem,
} from 'react-native';
import FAQItem from './components/FAQItem';
import FAQItemHeader from './components/FAQItemHeader';
import {FlexView, Header, useTheme} from 'react-native-gin-boilerplate';

const FAQ: React.FC<IFAQScreenProps> = () => {
  const {colors} = useTheme();
  const {
    data,
    setIsLoadMore,
    setCurrentPage,
    currentPage,
    nextPage,
    isLoadMore,
  } = useGetList<Partial<IMeta>, IFAQ>(
    faqManagement.getList,
    {
      page: 1,
      limit: 10,
    },
    {isTrigger: true},
  );

  const [mapId, setMapId] = useState<Map<string, boolean>>();

  const makeIdMap = () => {
    const map = new Map<string, boolean>();
    data.forEach(e => {
      map.set(e.id, true);
    });
    setMapId(map);
  };

  useEffect(() => {
    makeIdMap();
  }, [data]);

  const $sectionList: ViewStyle = {
    backgroundColor: colors.mainBackground,
  };

  const renderItem: SectionListRenderItem<IQuestion, IFAQ> = ({
    item,
    section,
  }) => {
    return <FAQItem item={item} isShow={mapId?.get(section.id)} />;
  };

  const onHeaderPress = (id: string) => {
    const cp = new Map(mapId);
    if (mapId?.has(id)) {
      cp.set(id, !mapId.get(id));
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setMapId(cp);
    }
  };

  const renderHeader = (info: {
    section: SectionListData<IQuestion, IFAQ>;
  }): React.ReactElement => {
    return (
      <FAQItemHeader
        id={info.section.id}
        onPress={onHeaderPress}
        title={info.section.title}
      />
    );
  };

  const onEndReached = () => {
    if (currentPage < nextPage) {
      setIsLoadMore(true);
      setCurrentPage(nextPage);
    }
  };

  const renderFooter = () => {
    if (isLoadMore) {
      return <ActivityIndicator size="large" color={colors.primaryColor} />;
    }
    return <React.Fragment />;
  };

  return (
    <FlexView>
      <Header title={i18n.t('FAQ.title')} />
      <SectionList
        sections={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.9}
        renderSectionHeader={renderHeader}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={$sectionList}
      />
    </FlexView>
  );
};

export default FAQ;
