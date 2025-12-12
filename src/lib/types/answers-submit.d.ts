export interface ExamResultResponse {
  message: string;
  correct: number;
  wrong: number;
  total: string;
  WrongQuestions: WrongQuestion[];
  correctQuestions: CorrectQuestion[];
}

export interface WrongQuestion {
  QID: string;
  Question: string;
  inCorrectAnswer: string;
  correctAnswer: string;
  answers: Record<string, string>;
}

export interface CorrectQuestion {
  QID: string;
  Question: string;
  correctAnswer: string;
  answers: Record<string, string>;
}

// Answers Request type
export interface ExamSubmitAnswer {
  questionId: string;
  correct: string;
}
export interface ExamSubmitRequest {
  answers: ExamSubmitAnswer[];
}
