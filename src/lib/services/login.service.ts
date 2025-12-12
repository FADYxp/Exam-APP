import { LoginFields, LoginResponse } from "@/lib/types/auth";

export default async function LoginService(fields: LoginFields) {
  const response = await fetch(`${process.env.API}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: fields.email,
      password: fields.password,
    }),
  });
  const payload: ApiResponse<LoginResponse> = await response?.json();

  return payload;
}
