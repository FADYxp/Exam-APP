import { getMyToken } from "@/lib/utils/get-my-token";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("Authentication token not found.");
  }

  const diplomaId = request.nextUrl.searchParams.get("diplomaId");

  const backendUrl = new URL(`${process.env.API}/exams`);
  if (diplomaId) {
    backendUrl.searchParams.append("diplomaId", diplomaId);
  }

  const response = await fetch(backendUrl.toString(), {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return NextResponse.json(data);
}
