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
  const response = await fetch(`${process.env.API}/users/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
     "Authorization": `Bearer ${token.accessToken}`,
    },
    body: JSON.stringify({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    }),
  });
  const payload = await response.json();

  return payload;
}
