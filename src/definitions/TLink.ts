import {DocumentPickerResponse} from 'react-native-document-picker';

export interface ILink extends DocumentPickerResponse {
  link: string;
  order: number;
}

export interface IFile extends Partial<ILink> {
  fileName?: string;
  fileSize?: string;
}
