export interface IQuestion {
  createdAt: string;
  updatedAt: string;
  _id: string;
  question: string;
  answer: string;
  show: boolean;
  faqCategoryId: string;
}

export interface IFAQ {
  id: string;
  title: string;
  data: IQuestion[];
}
