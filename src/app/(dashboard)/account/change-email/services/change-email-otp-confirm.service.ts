"use server";
import { getMyToken } from '@/lib/utils/get-my-token';

export default async function ChangeEmailOtpConfirmService( code: string) {
  const token = await getMyToken();
 if (!token) {
     throw new Error("Authentication token not found.");
 }

  const response = await fetch(`${process.env.API}/users/email/confirm`, {
    method: "POST",
 headers: {
   "Authorization": `Bearer ${token.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });
  const payload  = await response?.json();
console.log(payload)
  return payload;
}
