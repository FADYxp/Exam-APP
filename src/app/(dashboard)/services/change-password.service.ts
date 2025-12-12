"use server";
import { ChangePasswordType } from "@/lib/schemes/change-password.schema";
import { getMyToken } from "@/lib/utils/get-my-token";

export default async function changePasswordService({
  values,
}: {
  values: ChangePasswordType;
}) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("Authentication token not found.");
  }
  const response = await fetch(`${process.env.API}/auth/changePassword`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      token: token.accessToken,
    },
    body: JSON.stringify({
      oldPassword: values.oldPassword,
      password: values.password,
      rePassword: values.rePassword,
    }),
  });
  const payload = await response.json();

  return payload;
}
