import { useMutation } from "@tanstack/react-query";
import SendOtpService from "../_services/send-otp.service";

export function useSendOtp() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (email: string) => {
      const payload = await SendOtpService(email);

      if ( payload.code > 203) {
        throw new Error(payload.message);
      }

      return payload;
    },
  });
  return { isPending, error, sendOtp: mutate };
}
