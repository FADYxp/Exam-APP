import { RegisterStep1Type } from "@/lib/schemes/register-step1.schema";
import { useMutation } from "@tanstack/react-query";
import VerifyEmail from "@/lib/services/verify-email.service";

export function useRegisterStep1() {
  const { isPending, mutate } = useMutation({
    mutationFn: async (values: RegisterStep1Type) => {
      const response = await VerifyEmail(values);
      if (response?.code > 205) {
        throw new Error(response?.message || "Failed to send OTP");
      }
      return response;
    },
  });

  return { isPending, sendOTP: mutate };
}
