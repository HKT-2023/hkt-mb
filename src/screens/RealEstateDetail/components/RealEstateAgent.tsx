import React from 'react';
import {FlexView} from '@app/components/organism';
import {Text} from '@app/components/atoms';
import RealEstateAgentItem from './RealEstateAgentItem';
import {IAgent} from '@app/definitions/TApi';
import {ratioW} from '@app/utils/UDimension';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {TextStyle, ViewStyle} from 'react-native';
import i18n from '@app/i18n';

interface IRealEstateAgent {
  data: IAgent[];
}

const RealEstateAgent: React.FC<IRealEstateAgent> = ({data}) => {
  const $container: ViewStyle = {
    paddingHorizontal: ratioW(16),
    paddingVertical: ratioW(12),
  };
  const $label: TextStyle = {...TPoppinsStyle.H1624Medium};

  return (
    <FlexView style={$container}>
      <Text style={$label}>{i18n.t('RealEstateDetail.ListedBy')}</Text>
      {data.map((item, index) => {
        return (
          <RealEstateAgentItem
            key={index}
            item={item}
            dataLength={data.length}
            index={index}
          />
        );
      })}
    </FlexView>
  );
};

export default RealEstateAgent;
