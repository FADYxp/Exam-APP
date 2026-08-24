import { LoginFields } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

export function useLogin() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: LoginFields) => {
      const response = await signIn("credentials", {
        username: fields.username,
        password: fields.password,
        redirect: false,
      });

      if (response?.error) {
        throw new Error(response?.error || "Login failed");
      }

      // redirect to callbackUrl
      const callbackUrl =
        new URLSearchParams(window.location.search).get("callbackUrl") || "/";
      window.location.href = callbackUrl;

      return response;
    },
  });

  return { isPending, error, login: mutate };
}
