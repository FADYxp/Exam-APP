"use server";
import { getMyToken } from "@/lib/utils/get-my-token";

export default async function DeleteAccountService() {
  const token = await getMyToken();
  if (!token) {
    throw new Error("Authentication token not found.");
  }
  const response = await fetch(`${process.env.API}/users/account`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
        "Authorization": `Bearer ${token.accessToken}`,
    },
  });

  const payload = await response?.json();

  return payload;
}
