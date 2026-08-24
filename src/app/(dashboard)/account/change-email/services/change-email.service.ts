"use server";
import { getMyToken } from '@/lib/utils/get-my-token';

export default async function ChangeEmailOtpService(newEmail: string) {
  const token = await getMyToken();
 if (!token) {
     throw new Error("Authentication token not found.");
 }

  const response = await fetch(`${process.env.API}/users/email/request`, {
    method: "POST",
 headers: {
   "Authorization": `Bearer ${token.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newEmail }),
  });
  const payload  = await response?.json();
console.log(payload)
  return payload;
}
