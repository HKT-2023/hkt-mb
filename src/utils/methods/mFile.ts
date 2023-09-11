import FileViewer from 'react-native-file-viewer';
import i18n from '@app/i18n';
import ImagePicker, {
  ImageOrVideo,
  Options,
} from 'react-native-image-crop-picker';
import RnFs from 'react-native-fs';
import {DEFAULT_STORAGE_FILE} from '@app/constants/keys';
import {
  Logger,
  UMessage,
  TButtonAny,
  openLoading,
  closeLoading,
  closeBottomSheet,
} from 'react-native-gin-boilerplate';

const CONFIG: Options = {
  compressImageQuality: 1,
  cropping: false,
  includeBase64: false,
};

const SIZE_10MB = 10485760; // 10MB

const ALLOW_EXT = ['png', 'jpg', 'jpeg'];

const formatSizeUnits = (bts: number): string => {
  let bytes = '';
  if (bts >= 1073741824) {
    bytes = (bts / 1073741824).toFixed(2) + ' GB';
  } else if (bts >= 1048576) {
    bytes = (bts / 1048576).toFixed(2) + ' MB';
  } else if (bts >= 1024) {
    bytes = (bts / 1024).toFixed(2) + ' KB';
  } else if (bts > 1) {
    bytes = bts + ' bytes';
  } else if (bts === 1) {
    bytes = bts + ' byte';
  } else {
    bytes = '0 bytes';
  }
  return bytes;
};

async function wrapperImagePicker<T>(
  func: (payload: T) => Promise<ImageOrVideo>,
  payload: T,
  onSuccess: TButtonAny<ImageOrVideo>,
) {
  await func(payload)
    .then(image => {
      const ext = getUrlExtension(image?.filename ?? '')?.toLowerCase();
      if (image.size > SIZE_10MB) {
        throw new Error(i18n.t('common.MaximumUploadFileSizeIs10MB'));
      } else if (image.filename && ext && !ALLOW_EXT.includes(ext)) {
        throw new Error(i18n.t('common.CannotUploadImageNotImageType'));
      } else {
        onSuccess(image);
      }
      closeBottomSheet();
    })
    .catch((error: Error) => {
      UMessage.showFailMessage(error.message);
      closeBottomSheet();
      Logger.debug(error.message);
    });
}

const openCamera = async (onSuccess: (arg0: ImageOrVideo) => void) => {
  await wrapperImagePicker(ImagePicker.openCamera, CONFIG, onSuccess);
};

const openImageBrowse = async (onSuccess: (arg0: ImageOrVideo) => void) => {
  await wrapperImagePicker(ImagePicker.openPicker, {...CONFIG}, onSuccess);
};

const openImageMultipleBrowse = async (
  onSuccess: (arg0: ImageOrVideo[]) => void,
) => {
  await ImagePicker.openPicker({
    ...CONFIG,
    maxFiles: 10,
    multiple: true,
    mediaType: 'photo',
    freeStyleCropEnabled: true,
  })
    .then(images => {
      if (images?.length > 0) {
        const totalPrice = images?.reduce(
          (previousValue, currentValue) => previousValue + currentValue?.size,
          0,
        );
        if (totalPrice > SIZE_10MB) {
          UMessage.showFailMessage(
            i18n.t('common.MaximumUploadFileSizeIs10MB'),
          );
          return;
        } else {
          onSuccess(images);
        }
      }
      closeBottomSheet();
    })
    .catch((error: Error) => {
      closeBottomSheet();
      Logger.debug(error.message);
    });
};

const checkFileExistPath = async (path: string) => {
  let isExist = false;
  await RnFs.exists(path).then(exist => {
    isExist = exist;
  });
  return isExist;
};

const getUrlExtension = (url: string) => {
  return url.split(/[#?]/)[0].split('.').pop()?.trim();
};

const getFileNameWithExt = (filePath: string) => {
  return filePath.split('/').pop();
};
const getFileNameNoExt = (filePath: string) => {
  return filePath.split('/').pop()?.split('.').slice(0, -1).join('.');
};

const revertUrlEncodeSpaces = (path: string) => {
  return path.replace('%20', ' ');
};

const previewFile = async (localFile: string) => {
  await FileViewer.open(localFile)
    .then(() => {
      Logger.info('View file success');
    })
    .catch(error => {
      Logger.error(error);
    });
};

const downloadAndSave = async (url: string) => {
  openLoading();
  const extension = getUrlExtension(url);
  const localFile = `${RnFs.DocumentDirectoryPath}/${DEFAULT_STORAGE_FILE}.${extension}`;
  const options = {
    fromUrl: url,
    toFile: localFile,
  };

  const isFileExisted = await checkFileExistPath(localFile);
  if (isFileExisted) {
    await previewFile(localFile);
  } else {
    await RnFs.downloadFile(options).promise.then(async () => {
      await previewFile(localFile);
    });
  }
  closeLoading();
};

export default {
  openCamera,
  previewFile,
  formatSizeUnits,
  downloadAndSave,
  getUrlExtension,
  openImageBrowse,
  getFileNameNoExt,
  getFileNameWithExt,
  revertUrlEncodeSpaces,
  openImageMultipleBrowse,
};
