import { useMutation } from "@tanstack/react-query";
import changePasswordService from "../services/change-password.service";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { ChangePasswordType } from "@/lib/schemes/change-password.schema";

export function useChangePassword() {
  const { toast } = useToast();
  const { update } = useSession();

  const {
    mutate: changePassword,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async (values: ChangePasswordType) => {
      const payload = await changePasswordService({ values });

      if ("code" in payload) {
        throw new Error(payload.message);
      }
      return payload;
    },
    onSuccess: async (data) => {
      toast({ title: "Your password has been updated" });
      const newToken = data.token;

      await update({
        accessToken: newToken,
      });

      location.reload();
    },
  });

  return { changePassword, isPending, isError };
}
