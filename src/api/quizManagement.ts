import AxiosClient from '@app/config/AxiosClient';
import domain from './domain';
import {IGetQuizzesPayload, IPostAnswerPayload} from '@app/definitions/TApi';
import {
  ICorrectAnswer,
  IQuizDetail,
  IQuizList,
  IUserQuiz,
} from '@app/definitions/TCourse';
import {IResponse} from '@app/definitions/TResponse';

const getQuizzes = (
  params: IGetQuizzesPayload,
): Promise<IResponse<IQuizList[]>> => {
  return AxiosClient.get(domain.quizManagement.getQuizzes, {params});
};
const getQuizDetail = (params: {
  id: string;
}): Promise<IResponse<IQuizDetail>> => {
  return AxiosClient.get(domain.quizManagement.getQuizDetail(params.id), {
    params,
  });
};

const getCorrectAnswers = (params: {
  id: string;
}): Promise<IResponse<ICorrectAnswer[]>> => {
  return AxiosClient.get(domain.quizManagement.correctAnswers(params.id), {
    params,
  });
};

const postAnswers = (
  payload: IPostAnswerPayload,
): Promise<IResponse<IUserQuiz>> => {
  return AxiosClient.post(domain.quizManagement.postAnswer, payload);
};

export default {
  getQuizzes,
  postAnswers,
  getQuizDetail,
  getCorrectAnswers,
};
