"use server";

import { ExamResultResponse, ExamSubmitRequest } from "@/lib/types/answers-submit";
import { getMyToken } from "@/lib/utils/get-my-token";

export default async function SubmitExamAnswersService(data: ExamSubmitRequest) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("Authentication token not found.");
  }
  
  const response = await fetch(`${process.env.API}/submissions`, {
    method: "POST",
   headers: {
      "Authorization": `Bearer ${token.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  const payload: ApiResponse<ExamResultResponse> = await response?.json();
  return payload;
}
