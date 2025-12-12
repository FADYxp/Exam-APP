export type Exam = {
  _id: string;
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: number;
  active: boolean;
  createdAt: string;
};

export type Metadata = {
  currentPage: number;
  numberOfPages: number;
  limit: number;
};

export type ExamsResponse = {
  message: string;
  metadata: Metadata;
  exams: Exam[];
};

export type SavedAnswersType = {
  [questionId: string]: {
    answers: {
      [answerKey: string]: string;
    };
  };
};
