
import { useMutation } from "@tanstack/react-query";
import ChangeEmailOtpService from "../services/change-email.service";

export function useChangeEmailOtp() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (email: string) => {
      const payload = await ChangeEmailOtpService(email);

      if ( payload.code > 205) {
        throw new Error(payload.message);
      }

      return payload;
    },
  });
  return {
    ChangeEmailOtpPending: isPending,
    ChangeEmailOtpError: error,
    changeEmailOtp: mutate,
  };
}
