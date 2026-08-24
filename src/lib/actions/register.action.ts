"use server";

import { RegistrationSchemaType } from "@/lib/schemes/registration.schema";

export async function registerAction({
  values,
}: {
  values: RegistrationSchemaType;
}) {
  const response: Response = await fetch(`${process.env.API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  const payload: RegistrationPayloadType = await response.json();

  return payload;
}
