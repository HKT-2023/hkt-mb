import i18n from '@app/i18n';
import domain from './domain';
import {IFile} from '@app/definitions/TLink';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import makeFormPayload from '@app/utils/methods/makeFormPayload';
import Config from 'react-native-config';

export const uploadFiles = async (files: IFile[]): Promise<IFile[]> => {
  const data = new FormData();
  const payload = makeFormPayload(files, data);
  return fetch(`${Config.API_URL}${domain.default.uploadFiles}`, payload)
    .then(async res => {
      const response: {data: IFile[]} = await res.json();
      return Promise.resolve(response?.data);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

export const getPhotoLink = async (file: ImageOrVideo) => {
  if (file) {
    const params = {
      uri: file?.path,
      type: file?.mime ?? 'image/jpeg',
      fileName: file?.filename ?? 'Image',
    };
    return uploadFiles([params])
      .then(async res => {
        return Promise.resolve(res?.[0].link);
      })
      .catch(error => {
        return Promise.reject(String(error));
      });
  } else {
    return Promise.reject(i18n.t('common.DoesNotExistAnyPhoto'));
  }
};
