import { getMyToken } from "@/lib/utils/get-my-token";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("Authentication token not found.");
  }
  const { searchParams } = new URL(request.url);
  const examId =  searchParams.get("id");
  const response = await fetch(`${process.env.API}/questions/exam/${examId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return NextResponse.json(data);
}
