import {Platform} from 'react-native';
import {IFile} from '@app/definitions/TLink';
import {store} from '@app/redux/store/configureStore';

const makeFormPayload = (files: IFile[], data: FormData) => {
  const accessToken = store.getState().AuthReducer.jwtAccessToken;
  files.forEach(f => {
    const uri =
      Platform.OS === 'android' ? f.uri : f.uri?.replace('file://', '');
    data.append('file', {
      name: f.fileName,
      type: f.type,
      uri,
    });
  });

  return {
    method: 'post',
    headers: {
      Accept: '*/*',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessToken}` ?? '',
    },
    timeout: 20000,
    body: data,
  };
};

export default makeFormPayload;
