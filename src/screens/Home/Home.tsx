import React from 'react';
import {useSelector} from 'react-redux';
import UserHomepage from './components/UserHomepage';
import {TReduxState} from '@app/redux/store/configureStore';
import {IHomeScreenProps} from '@app/stacks/types/THomeStack';
import {FlexView} from 'react-native-gin-boilerplate';

const Home: React.FC<IHomeScreenProps> = () => {
  const {role} = useSelector((state: TReduxState) => state.AuthReducer);
  const isVendor = role === 'Vendor';

  return <FlexView>{!isVendor && <UserHomepage />}</FlexView>;
};

export default Home;
