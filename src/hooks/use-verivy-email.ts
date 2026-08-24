import VerifyEmail from "@/lib/services/verify-email.service";
import { useMutation } from "@tanstack/react-query";

export function useEmailVerification() {
  const { data, mutate, isPending, error } = useMutation({
    mutationFn: async (values : EmailVerify) => {
      const payload = await VerifyEmail(values);

      if (payload.status === false) {
        throw new Error(payload.message);
      }

      return payload;
    },
   
  });
  return {
    verifyPending: isPending,
    verifyError: error,
    verifyEmail: mutate,
    verifyResponse: data as VerifyEmailResponse,
  };
}
