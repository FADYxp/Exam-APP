"use server";

export default async function VerifyOtpService(code: string) {
  const response = await fetch(`${process.env.API}/auth/verifyResetCode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      resetCode: code,
    }),
  });
  const payload = await response.json();

  return payload;
}
