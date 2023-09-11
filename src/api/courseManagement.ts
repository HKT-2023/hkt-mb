import AxiosClient from '@app/config/AxiosClient';
import {IGetCoursePayload} from '@app/definitions/TApi';
import {ICourse, IUserCourse} from '@app/definitions/TCourse';
import {IResponse, IRQMeta} from '@app/definitions/TResponse';
import domain from './domain';

const getCourses = (
  params: IGetCoursePayload,
): Promise<IResponse<ICourse[]>> => {
  return AxiosClient.get(domain.courseManagement.getCourses, {params});
};

const getMyCourses = (
  params: Partial<IRQMeta>,
): Promise<IResponse<ICourse[]>> => {
  return AxiosClient.get(domain.courseManagement.getMyCourses, {params});
};

const getDetailCourse = (id: string): Promise<IResponse<ICourse>> => {
  return AxiosClient.get(domain.courseManagement.getDetailCourse(id));
};

const registerCourse = (payload: {
  courseId: string;
}): Promise<IResponse<IUserCourse>> => {
  return AxiosClient.post(domain.courseManagement.registerCourse, payload);
};

const claimToken = (payload: {
  courseId: string;
}): Promise<IResponse<object>> => {
  return AxiosClient.post(domain.courseManagement.claimToken, payload);
};

const getProgress = (id: string): Promise<IResponse<number>> => {
  return AxiosClient.get(domain.courseManagement.getProgress(id));
};

const deleteCourse = (id: string): Promise<IResponse<boolean>> => {
  return AxiosClient.delete(domain.courseManagement.deleleCourse(id), {
    params: {id},
  });
};

export default {
  claimToken,
  getCourses,
  getProgress,
  deleteCourse,
  getMyCourses,
  registerCourse,
  getDetailCourse,
};
