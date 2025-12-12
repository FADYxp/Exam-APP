import AnswersSubmitService from "@/lib/services/answers-submit.service";
import { ExamSubmitRequest } from "@/lib/types/answers-submit";
import { useMutation } from "@tanstack/react-query";

export function useSubmitAnswers() {
  const { data, mutate, isPending, error } = useMutation({
    mutationFn: async (answers: ExamSubmitRequest) => {
      const payload = await AnswersSubmitService(answers);

      if ("code" in payload) {
        throw new Error(payload.message);
      }

      return payload;
    },
   
   
  });
  return {
    submitPending: isPending,
    submitError: error,
    submitAnswers: mutate,
    submitData: data,
  };
}
