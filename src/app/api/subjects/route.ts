import { getMyToken } from "@/lib/utils/get-my-token";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = await getMyToken();

    // to get the page number from the query parameters
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";

    if (!token || !token.accessToken) {
      return NextResponse.json(
        { message: "Authentication token not found." }, 
        { status: 401 }
      );
    }

    // Make the API request with the access token
    const response = await fetch(`${process.env.API}/diplomas?page=${page}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { message: errorData.message || "Failed to fetch data" }, 
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("Route Error:", error instanceof Error ? error.message : error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}