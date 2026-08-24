"use server"
import { getMyToken } from "@/lib/utils/get-my-token";

export default async function EditProfileService( values: unknown ) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("Authentication token not found.");
  }
  
  const response = await fetch(`${process.env.API}/users/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token.accessToken}`,
    },
    body: JSON.stringify(values),
  });

  const payload = await response?.json()

  console.log(payload)
  return payload
}

