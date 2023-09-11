import React from 'react';
import {RowContainer} from '@app/components/organism';
import {Text} from '@app/components/atoms';
import {Rating} from 'react-native-ratings';
import {useTheme} from '@app/theme';
import {TButtonAny} from '@app/definitions/TButton';
import {ViewStyle} from 'react-native';

export interface IEstimateRatingItem {
  key: number;
  title:
    | 'Natural lighting'
    | 'Noise'
    | 'Condition'
    | 'Floor Plan'
    | 'Outdoor Space'
    | 'Vibe';
  rate: number;
}

interface IEstimateRating {
  item: IEstimateRatingItem;
  onChangeRating?: TButtonAny<number>;
  isReadonly: boolean;
  isOwner: boolean;
}

const EstimateRating: React.FC<IEstimateRating> = props => {
  const {colors} = useTheme();

  const $container: ViewStyle = {
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  return (
    <RowContainer style={$container}>
      <Text>
        {props.item.key}. {props.item.title}
      </Text>
      <Rating
        type="custom"
        imageSize={40}
        ratingCount={5}
        showRating={false}
        startingValue={props.item.rate}
        {...(!props.isReadonly && {onFinishRating: props.onChangeRating})}
        ratingColor={colors.primaryColor}
        tintColor={
          props.isOwner ? colors.primaryBackground : colors.mainBackground
        }
        ratingBackgroundColor={colors.borderColor}
        jumpValue={0.5}
        fractions={1}
        readonly={props.isReadonly}
      />
    </RowContainer>
  );
};

export default EstimateRating;
