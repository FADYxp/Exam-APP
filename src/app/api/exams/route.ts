import { getMyToken } from "@/lib/utils/get-my-token";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await getMyToken();
  if (!token) {
    throw new Error("Authentication token not found.");
  }
  const response = await fetch(`${process.env.API}/exams`, {
    method: "GET",
    headers: {
      token: token.accessToken,
    },
  });
  const data = await response.json();
  return NextResponse.json(data);
}
