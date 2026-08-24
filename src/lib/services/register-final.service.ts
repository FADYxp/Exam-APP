"use server";

import { RegisterStep3And4Type } from "@/lib/schemes/register-step3-4.schema";

export async function registerStep3And4Service(values: RegisterStep3And4Type) {
  const response = await fetch(`${process.env.API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const payload = await response.json();
  return payload;
}
