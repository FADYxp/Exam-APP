import { useMutation } from "@tanstack/react-query";
import DeleteAccountService from "../services/delete-account.service";
import { useToast } from "@/hooks/use-toast";
import { signOut } from "next-auth/react";

export function useDeleteAccount() {
  const { toast } = useToast();

  const {
    mutate: deleteAccount,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async () => {
      const payload = await DeleteAccountService();

      if (payload.code > 205) {
        throw new Error(payload.message);
      }
      return payload;
    },
    onSuccess: () => {
      toast({ title: "Account Deleted SuccessFully" });
      signOut();
    },
  });
  return { deleteAccount, isPending, isError };
}
