import domain from './domain';
import AxiosClient from '@app/config/AxiosClient';
import {ILesson} from '@app/definitions/TCourse';
import {IResponse} from '@app/definitions/TResponse';
import {IGetLessonsPayload, IUpdateLessonPayload} from '@app/definitions/TApi';

const getLessons = (
  params: IGetLessonsPayload,
): Promise<IResponse<ILesson[]>> => {
  return AxiosClient.get(domain.lessonManagement.getLessons, {params});
};

const getDetailLesson = (id: string): Promise<IResponse<ILesson>> => {
  return AxiosClient.get(domain.lessonManagement.getDetailLesson(id));
};

const updateLesson = (
  payload: IUpdateLessonPayload,
): Promise<IResponse<ILesson>> => {
  return AxiosClient.put(domain.lessonManagement.updateLesson, payload);
};

export default {
  getLessons,
  updateLesson,
  getDetailLesson,
};
