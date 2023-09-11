import React from 'react';
import {FlexView, RowContainer, ViewCondition} from '@app/components/organism';
import {AutoImage, Text} from '@app/components/atoms';
import {ratioW} from '@app/utils/UDimension';
import {TextStyle, View, ViewStyle} from 'react-native';
import {IAgent} from '@app/definitions/TApi';
import {useTheme} from '@app/theme';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {ImageStyle} from 'react-native-fast-image';
import i18n from '@app/i18n';

interface IRealEstateAgentItem {
  item: IAgent;
  dataLength: number;
  index: number;
}

const RealEstateAgentItem: React.FC<IRealEstateAgentItem> = ({
  item,
  dataLength,
  index,
}) => {
  const {colors} = useTheme();

  const $name: TextStyle = {
    ...TPoppinsStyle.H1420Medium,
    marginBottom: ratioW(4),
    color: colors.searchIcon,
  };
  const $desc: TextStyle = {
    ...TPoppinsStyle.H1420Medium,
    marginBottom: ratioW(4),
    color: colors.walletBackground,
  };
  const $company: TextStyle = {
    ...TPoppinsStyle.H1420Medium,
    marginBottom: ratioW(4),
    color: colors.priceTextMkp,
  };
  const $avatar: ImageStyle = {
    width: ratioW(72),
    height: ratioW(72),
    borderRadius: ratioW(36),
    marginRight: ratioW(16),
    borderWidth: item.typeOfUser === 'RealifiAgent' ? 1 : 0,
  };
  const $separator: ViewStyle = {
    borderTopWidth: dataLength - 1 === index ? 0 : 1,
    marginTop: ratioW(12),
    borderTopColor: colors.borderColor,
  };
  const $wrapper: ViewStyle = {
    backgroundColor:
      item.typeOfUser === 'RealifiAgent' ? colors.agent : colors.mainBackground,
    padding: ratioW(12),
    alignItems: 'center',
  };
  const $container: ViewStyle = {marginTop: ratioW(12)};

  return (
    <View style={$container}>
      <RowContainer style={$wrapper}>
        <ViewCondition isVisible={item.typeOfUser === 'RealifiAgent'}>
          <AutoImage uri={item?.avatarUrl} style={$avatar} />
        </ViewCondition>
        <FlexView>
          <Text numberOfLines={1} style={$name}>
            {item?.firstName + ' ' + item?.lastName}
          </Text>
          <ViewCondition isVisible={!!item?.listAgentMlsId}>
            <Text numberOfLines={1} style={$desc}>
              {i18n.t('RealEstateDetail.Description.DRE')}{' '}
              {item?.listAgentMlsId}
            </Text>
          </ViewCondition>
          <ViewCondition isVisible={!!item?.businessName}>
            <Text numberOfLines={1} style={$company}>
              {item?.businessName}
            </Text>
          </ViewCondition>
        </FlexView>
      </RowContainer>
      <View style={$separator} />
    </View>
  );
};

export default RealEstateAgentItem;
