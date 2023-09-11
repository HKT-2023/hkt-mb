import {TRootParamsList} from '@app/stacks/types/TStack';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';

interface INavigationProps {
  route?: RouteProp<TRootParamsList, keyof TRootParamsList>;
  navigation?: NavigationProp<TRootParamsList, keyof TRootParamsList>;
}

export type TNavigationOptions = {
  navigationOptions?(props: INavigationProps): StackNavigationOptions;
};
