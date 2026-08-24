import { LoginFields, LoginResponse } from "@/lib/types/auth";

export default async function LoginService(fields: LoginFields) {
  const response = await fetch(`${process.env.API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: fields.username,
      password: fields.password,
    }),
  });
  const payload: LoginResponse = await response?.json();

  return payload;
}
