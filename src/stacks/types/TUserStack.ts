import {IDefaultScreenProps} from './TStack';

export type TUserStackParamList = {
  USER_PROFILE_SCREEN: Record<string, unknown>;
};

export type IUserProfileScreenProps =
  IDefaultScreenProps<'USER_PROFILE_SCREEN'>;
