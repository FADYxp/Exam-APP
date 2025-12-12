export type Answer = {
  key: string;
  answer: string;
};

export type Question = {
  _id: string;
  question: string;
  answers: Answer[];
  type: "single_choice" | "multiple_choice";
  correct: string;
  subject: string | null;
  exam: {
    _id: string;
    title: string;
  } | null;
  createdAt: string;
};

export type QuestionsResponse = {
  message: string;
  questions: Question[];
};
