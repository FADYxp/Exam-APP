
import { useMutation } from "@tanstack/react-query";
import ChangeEmailOtpConfirmService from "../services/change-email-otp-confirm.service";

export function useChangeEmailOtpConfirm() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (code: string) => {
      const payload = await ChangeEmailOtpConfirmService(code);

      if ( payload.code > 205) {
        throw new Error(payload.message);
      }

      return payload;
    },
  });
  return {
    confirmEmailOtpPending: isPending,
    confirmEmailOtpError: error,
    confirmEmailOtp: mutate,
  };
}
