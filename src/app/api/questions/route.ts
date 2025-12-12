import { getMyToken } from "@/lib/utils/get-my-token";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("Authentication token not found.");
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("exam");
  const response = await fetch(`${process.env.API}/questions?exam=${id}`, {
    method: "GET",
    headers: {
      token: token.accessToken,
    },
  });
  const data = await response.json();
  return NextResponse.json(data);
}
