import {TUserRole} from './TUser';

export type TCourseTab = 'all' | 'video' | 'ebook' | 'myCourse';
export type TClaimTokenStatus = 'doing' | 'completed';
export type TUserCourseProgressStatus = 'new' | 'continue' | 'done';

export interface IUserCourse {
  _id: string;
  userId: string;
  courseId: string;
  totalVideo: number;
  totalTime: number;
  totalPage: number;
  type: 'video' | 'ebook';
  createdAt: string;
  updatedAt: string;
  __v: number;
  percent: number;
  claimTokenStatus: TClaimTokenStatus;
  progressStatus: TUserCourseProgressStatus;
}

export interface ICourse {
  _id: string;
  name: string;
  type: 'video' | 'ebook';
  token: number;
  thumbnail: string;
  userType: TUserRole;
  createdAt: string;
  updatedAt: string;
  page?: number;
  video?: number;
  duration?: number;
  userCourse: IUserCourse | null;
  description?: string;
  author?: string;
  isRemoved: boolean;
}
export interface IQuestion {
  id: string;
  value: string;
}

export type TQuestion = 'single' | 'multi';

export interface IQuiz {
  _id: string;
  title: string;
  order: number;
  answers: IQuestion[];
  type: TQuestion;
  quizId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IVideo {
  description: string;
  source: string;
  subtitle: string;
  thumb: string;
  title: string;
}

export interface IUserLesson {
  userId: string;
  courseId: string;
  lessonId: string;
  status: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  currentTime?: number;
  currentPage?: number;
}

export interface ILesson {
  _id: string;
  name: string;
  link: string;
  createdAt: string;
  updatedAt: string;
  userLesson: IUserLesson | null;
  time?: number;
  thumbnail?: string;
}

export interface IAnswer {
  questionId: string;
  answers: string[];
}

export type TUserQuiz = 'Inprogress' | 'New' | 'Completed';

export interface IUserQuiz {
  userId?: string;
  quizId?: string;
  answers?: IAnswer[];
  status?: TUserQuiz;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
  __v?: number;
}

export interface IQuizList {
  _id: string;
  order: number;
  location: number;
  userQuiz: IUserQuiz;
  numberQuestions: number;
}

export interface IQuizDetail {
  _id: string;
  userQuiz: IUserQuiz | null;
  questions: IQuiz[];
}

export interface ICorrectAnswer {
  questionId: string;
  answers: string[];
}
