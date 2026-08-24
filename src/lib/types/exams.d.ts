export type Diploma = {
  id: string;
  title: string;
};

export type Exam = {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: number;
  questionsCount: number;
  diplomaId: string;
  diploma: Diploma;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Metadata = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ExamsResponse = {
  status: boolean;
  code: number;
  payload: {
    data: Exam[];
    metadata: Metadata;
  };
};

export type ApiError = {
  path: string;
  message: string;
  messages: string[];
};

export type ErrorResponse = {
  status: false;
  code: number;
  message: string;
  errors: ApiError[];
};

export type SavedAnswersType = {
  [questionId: string]: {
    answers: {
      [answerKey: string]: string;
    };
  };
};

