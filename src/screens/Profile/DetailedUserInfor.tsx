import AgentInfor from './components/AgentInfor';
import ClientInfor from './components/ClientInfor';
import Dispatch from '@app/redux/Dispatch';
import i18n from '@app/i18n';
import React, {useCallback, useMemo, useState} from 'react';
import useNavBeforeRemove from '@app/hooks/useNavBeforeRemove';
import userManagement from '@app/api/userManagement';
import VendorInfor from './components/VendorInfor';
import {
  DetailedUserInformationContext,
  IDetailedUserInformationContextProps,
} from '@app/context';
import {IDetailedUserInforScreenProps} from '@app/stacks/types/TNoFooterStack';
import {
  InteractionManager,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {
  IUpdateAgentUserPayload,
  IUpdateUserPayload,
  IUpdateVendorUserPayload,
} from '@app/definitions/TApi';
import {TReduxState} from '@app/redux/store/configureStore';
import {useSelector} from 'react-redux';
import {IResponse} from '@app/definitions/TResponse';
import {IUser} from '@app/definitions/TUser';
import mFile from '@app/utils/methods/mFile';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {getPhotoLink} from '@app/api/default';
import ChangePhotoAction from './components/ChangePhotoAction';
import {useFocusEffect} from '@react-navigation/native';
import mText from '@app/utils/methods/mText';
import {
  Button,
  ratioW,
  UMessage,
  useTheme,
  FlexView,
  AutoImage,
  openLoading,
  closeLoading,
  ButtonWrapper,
  openBottomSheet,
  withKeyboardAvoidingView,
} from 'react-native-gin-boilerplate';
import {IcPhoto} from '@app/assets/svg';
import {HeaderCommon} from '@app/components/atoms/Header';

const DetailedUserInfor: React.FC<IDetailedUserInforScreenProps> = ({
  navigation,
}) => {
  const [isForceQuit, setIsForceQuit] = useState(true);
  const {colors} = useTheme();
  const [imageFile, setImageFile] = useState<ImageOrVideo>();
  const {user} = useSelector((state: TReduxState) => state.UserReducer);
  const {role} = useSelector((state: TReduxState) => state.AuthReducer);
  const [userFields, setUserFields] = useState<IUpdateUserPayload>({
    phone: user?.phone ?? '',
    lastName: user?.lastName ?? '',
    avatarUrl: user?.avatarUrl ?? '',
    firstName: user?.firstName ?? '',
    dateOfBirth: user?.dateOfBirth ?? '',
  });
  const [agentFields, setAgentFields] = useState<IUpdateAgentUserPayload>({
    phone: user?.phone ?? '',
    license: user?.license ?? '',
    lastName: user?.lastName ?? '',
    firstName: user?.firstName ?? '',
    agentName: user?.agentName ?? '',
    avatarUrl: user?.avatarUrl ?? '',
    agentEmail: user?.agentEmail ?? '',
    dateOfBirth: user?.dateOfBirth ?? '',
    description: user?.description ?? '',
    socialMedia: user?.socialMedia ?? [{type: 'facebook', link: ''}],
  });
  const [vendorFields, setVendorFields] = useState<IUpdateVendorUserPayload>({
    phone: user?.phone ?? '',
    license: user?.license ?? '',
    lastName: user?.lastName ?? '',
    firstName: user?.firstName ?? '',
    avatarUrl: user?.avatarUrl ?? '',
    vendorType: user?.vendorType ?? [],
    vendorEmail: user?.vendorEmail ?? '',
    dateOfBirth: user?.dateOfBirth ?? '',
    description: user?.description ?? '',
    businessName: user?.businessName ?? '',
    primaryContact: user?.primaryContact ?? '',
    vendorLocation: user?.vendorLocation ?? '',
  });

  useNavBeforeRemove(isForceQuit);

  const $avatarWrapper: StyleProp<ViewStyle> = {
    padding: ratioW(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: ratioW(8),
    backgroundColor: colors.mainBackground,
  };

  const $button: StyleProp<ViewStyle> = {
    width: undefined,
    padding: ratioW(10),
    alignSelf: 'center',
    marginTop: ratioW(12),
    backgroundColor: colors.mainBackground,
  };

  const $mainContent: StyleProp<ViewStyle> = {
    padding: ratioW(16),
    backgroundColor: colors.mainBackground,
  };

  const renderMain = () => {
    switch (role) {
      case 'User':
        return <ClientInfor />;
      case 'Vendor':
        return <VendorInfor />;
      case 'RealifiAgent':
      default:
        return <AgentInfor />;
    }
  };

  async function wpFunc<T>(
    func: (payload: T) => Promise<IResponse<IUser>>,
    payload: T,
  ) {
    const onCallMain = async (pd: T) => {
      await func(pd)
        .then(res => {
          InteractionManager.runAfterInteractions(() => {
            if (res.data) {
              Dispatch.getUserInforSuccess(res.data);
            }
          }).then(() => {
            UMessage.showSuccessMessage(res.message);
          });
        })
        .catch(error => {
          UMessage.showFailMessage(String(error));
        })
        .finally(() => {
          closeLoading();
          navigation.goBack();
        });
    };
    openLoading();
    if (imageFile?.path) {
      await getPhotoLink(imageFile)
        .then(async link => {
          await onCallMain({...payload, avatarUrl: link});
        })
        .catch(error => {
          closeLoading();
          UMessage.showFailMessage(error);
        });
    } else {
      await onCallMain(payload);
    }
  }

  const onUpdateUser = async () => {
    await wpFunc(userManagement.onUpdateUser, {
      phone: userFields.phone,
      lastName: userFields.lastName,
      firstName: userFields.firstName,
      dateOfBirth: userFields.dateOfBirth,
    });
  };

  const onUpdateAgent = async () => {
    await wpFunc(userManagement.onUpdateAgent, {
      phone: agentFields.phone,
      license: agentFields.license,
      lastName: agentFields.lastName,
      firstName: agentFields.firstName,
      agentName: agentFields.agentName,
      agentEmail: agentFields.agentEmail,
      description: agentFields.description,
      dateOfBirth: agentFields.dateOfBirth,
      socialMedia: agentFields.socialMedia?.filter(sm => !!sm.link),
    });
  };

  const onUpdateVendor = async () => {
    await wpFunc(userManagement.onUpdateVendor, {
      phone: vendorFields.phone,
      license: vendorFields.license,
      lastName: vendorFields.lastName,
      firstName: vendorFields.firstName,
      vendorType: vendorFields.vendorType,
      vendorEmail: vendorFields.vendorEmail,
      dateOfBirth: vendorFields.dateOfBirth,
      description: vendorFields.description,
      businessName: vendorFields.businessName,
      vendorLocation: vendorFields.vendorLocation,
      primaryContact: vendorFields.primaryContact,
    });
  };

  const onConfirm = async () => {
    setIsForceQuit(true);
    switch (user?.typeOfUser) {
      case 'User':
        await onUpdateUser();
        break;
      case 'Vendor':
        await onUpdateVendor();
        break;
      case 'RealifiAgent':
      default:
        await onUpdateAgent();
        break;
    }
  };

  const value: IDetailedUserInformationContextProps = useMemo(
    () => ({
      userFields,
      agentFields,
      vendorFields,
      onChangeUserFields: u => {
        setUserFields(u);
        setIsForceQuit(false);
      },
      onChangeAgentFields: a => {
        setAgentFields(a);
        setIsForceQuit(false);
      },
      onChangeVendorFields: v => {
        setVendorFields(v);
        setIsForceQuit(false);
      },
    }),
    [userFields, agentFields, vendorFields],
  );

  const onChangeAvatar = (arg0: ImageOrVideo) => {
    setImageFile(arg0);
    setIsForceQuit(false);
    switch (user?.typeOfUser) {
      case 'Vendor':
        setVendorFields({...vendorFields, avatarUrl: arg0.path});
        break;
      case 'User':
        setUserFields({...userFields, avatarUrl: arg0.path});
        break;
      case 'RealifiAgent':
      default:
        setAgentFields({...agentFields, avatarUrl: arg0.path});
        break;
    }
  };

  const onCameraChoose = async () => {
    await mFile.openCamera(onChangeAvatar);
  };

  const onLibraryChoose = async () => {
    await mFile.openImageBrowse(onChangeAvatar);
  };

  const onGetPhoto = () => {
    openBottomSheet({
      element: (
        <ChangePhotoAction
          onCameraChoose={onCameraChoose}
          onLibraryChoose={onLibraryChoose}
        />
      ),
      containerStyles: {
        backgroundColor: colors.mainBackground,
        minHeight: ratioW(196),
      },
    });
  };

  const computeDisabled = (): boolean => {
    let check: boolean;
    switch (user?.typeOfUser) {
      case 'User':
        check =
          !userFields?.firstName || !userFields?.lastName || !userFields?.phone;
        break;
      case 'Vendor':
        check =
          !vendorFields.businessName ||
          !vendorFields.primaryContact ||
          !vendorFields.phone ||
          !vendorFields.vendorType.length ||
          !!mText.emailValidator(vendorFields?.vendorEmail, false);
        break;
      case 'RealifiAgent':
      default:
        check =
          !agentFields?.firstName ||
          !agentFields.lastName ||
          !agentFields.phone ||
          !agentFields.license ||
          !agentFields.agentEmail;
        break;
    }
    return check;
  };

  const getAvatarUrl = (): string => {
    switch (user?.typeOfUser) {
      case 'User':
        return userFields?.avatarUrl ?? '';
      case 'Vendor':
        return vendorFields?.avatarUrl ?? '';
      case 'RealifiAgent':
      default:
        return agentFields?.avatarUrl ?? '';
    }
  };

  useFocusEffect(
    useCallback(() => {
      Dispatch.getUserInfor();
    }, []),
  );

  return (
    <DetailedUserInformationContext.Provider value={value}>
      <FlexView>
        <HeaderCommon title={i18n.t('UserProfile.DetailedUserInformation')} />
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <FlexView>
            <View style={$avatarWrapper}>
              <AutoImage style={styles.$avatar} uri={getAvatarUrl()} />
              <Button
                style={$button}
                onPress={onGetPhoto}
                buttonType="bordered"
                mainColor={'#425862'}
                title={i18n.t('UserProfile.ChangePhotoLogo')}
                leftIcon={<IcPhoto style={styles.$iconCamera} />}
              />
            </View>
            <FlexView style={$mainContent}>{renderMain()}</FlexView>
          </FlexView>
          <ButtonWrapper>
            <Button
              onPress={onConfirm}
              disabled={computeDisabled()}
              title={i18n.t('common.Confirm')}
            />
          </ButtonWrapper>
        </ScrollView>
      </FlexView>
    </DetailedUserInformationContext.Provider>
  );
};

export default withKeyboardAvoidingView(DetailedUserInfor);

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
  $input: {
    marginBottom: ratioW(16),
  },
  $picker: {
    marginBottom: ratioW(16),
  },
  $avatar: {
    width: ratioW(120),
    height: ratioW(120),
    borderRadius: ratioW(60),
  },
  $iconCamera: {marginRight: ratioW(8)},
});
