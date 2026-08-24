export type Answer = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type Exam = {
  id: string;
  title: string;
};

export type Question = {
  id: string;
  text: string;
  examId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  answers: Answer[];
  exam: Exam;
};

export type QuestionsResponse = {
  status: boolean;
  code: number;
  payload: {
    questions: Question[];
  };
};
