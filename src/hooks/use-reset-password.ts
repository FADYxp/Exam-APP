import { ResetPasswordFields } from "@/app/(authentication)/forgot-password/_types/forgot-password";
import ResetPasswordService from "@/lib/services/reset-password.service";
import { useMutation } from "@tanstack/react-query";

export function useResetPassword() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (values: ResetPasswordFields) => {
      const payload = await ResetPasswordService(values);

      if ( payload.code > 205) {
        throw new Error(payload.message);
      }

      return payload;
    },
  });
  return {
    ResetPasswordPending: isPending,
    ResetPasswordError: error,
    resetPassword: mutate,
  };
}
