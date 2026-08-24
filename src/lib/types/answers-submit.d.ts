export interface Answer {
  id: string;
  text: string;
}

export interface QuestionAnalytic {
  questionId: string;
  questionText: string;
  selectedAnswer: Answer;
  isCorrect: boolean;
  correctAnswer: Answer;
}

export interface ExamSubmission {
  id: string;
  examId: string;
  examTitle: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  submittedAt: string;
}

export interface ExamResultResponse {
  submission: ExamSubmission;
  analytics: QuestionAnalytic[];
}

export interface ExamSubmitResponse {
  status: boolean;
  code: number;
  payload: ExamResultResponse;
}

// Answers Request type
export interface ExamSubmitAnswer {
  questionId: string;
  answerId: string;
}

export interface ExamSubmitRequest {
  examId: string;
  answers: ExamSubmitAnswer[];
  startedAt: string;
}
