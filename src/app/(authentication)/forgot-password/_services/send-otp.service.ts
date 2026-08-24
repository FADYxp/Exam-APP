"use server";
import { ForgotPasswordResponse } from "../_types/forgot-password";

export default async function SendOtpService(email: string) {
  const response = await fetch(`${process.env.API}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const payload: ForgotPasswordResponse = await response?.json();

  return payload;
}
