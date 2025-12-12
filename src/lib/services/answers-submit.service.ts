"use server";

import { ExamResultResponse, ExamSubmitRequest } from "../types/answers-submit";
import { getMyToken } from "../utils/get-my-token";

export default async function AnswersSubmitService(answers: ExamSubmitRequest) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("Authentication token not found.");
  }
  const response = await fetch(`${process.env.API}/questions/check`, {
    method: "POST",
    headers: {
      token: token.accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(answers),
  });
  const payload: ApiResponse<ExamResultResponse> = await response?.json();
  return payload;
}
