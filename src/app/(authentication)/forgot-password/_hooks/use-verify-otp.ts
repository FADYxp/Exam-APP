import { useMutation } from "@tanstack/react-query";
import VerifyOtpService from "../_services/verify-otp.sevice";

export function useVerifyOtp() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (code: string) => {
      const payload = await VerifyOtpService(code);

      if ("code" in payload) {
        throw new Error(payload.info);
      }
      return payload;
    },
  });
  return { verifyIsPending: isPending, verifyError: error, verifyOtp: mutate };
}
