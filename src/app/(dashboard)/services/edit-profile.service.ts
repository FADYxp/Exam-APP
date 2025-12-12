"use server"
import { getMyToken } from "@/lib/utils/get-my-token";

export default async function EditProfileService( values: unknown ) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("Authentication token not found.");
  }
  const response = await fetch(`${process.env.API}/auth/editProfile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: token.accessToken,
    },
    body: JSON.stringify(values),
  });

  const payload = await response?.json()

  return payload
}

