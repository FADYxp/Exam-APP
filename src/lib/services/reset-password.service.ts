"use server";

import { ResetPasswordFields } from "@/app/(authentication)/forgot-password/_types/forgot-password";

export default async function ResetPasswordService(
  values: ResetPasswordFields
) {
  const response = await fetch(`${process.env.API}/auth/resetPassword`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email : values.email,
      newPassword: values.newPassword,
    }),
  });
  const payload = await response.json();

  return payload;
}
