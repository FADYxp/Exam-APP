"use client";

import SubmitExamAnswersService from "@/app/(dashboard)/exams/_services/submit-exam-answers.service";
import { ExamSubmitRequest, ExamResultResponse } from "@/lib/types/answers-submit";
import { useMutation } from "@tanstack/react-query";

export function useSubmitExamAnswers() {
  const { data, mutate, isPending, error } = useMutation<ExamResultResponse, Error, ExamSubmitRequest>({
    mutationFn: async (answers: ExamSubmitRequest) => {
      const payload: ApiResponse<ExamResultResponse> = await SubmitExamAnswersService(answers);
      console.log(payload);
      
      // Check if response status is successful (200-299 range)
      if (!payload.status || payload.code < 200 || payload.code >= 300) {
        throw new Error("Failed to submit answers");
      }

      // Return the payload data (contains submission and analytics)
      return (payload as SuccessResponse<ExamResultResponse>).payload;
    },
  });

  return {
    submitPending: isPending,
    submitError: error,
    submitExamAnswers: mutate,
    submitData: data,
  };
}
