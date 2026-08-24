import { RegisterStep2Type } from "@/lib/schemes/register-step2.schema";
import { useMutation } from "@tanstack/react-query";
import VerifyCode from "@/lib/services/verify-code.service";

export function useRegisterStep2() {
  const { isPending, mutate } = useMutation({
    mutationFn: async (values: RegisterStep2Type) => {
      const response = await VerifyCode(values);
      if (response?.code > 205) {
        throw new Error(response?.message || "Failed to verify code");
      }
      return response;
    },
  });

  return { isPending, verifyOTP: mutate };
}
