import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get JWT token from cookies (server-side)
    const cookieStore = cookies();
    const jwtCookie = cookieStore.get("jwt");

    if (!jwtCookie?.value) {
      return NextResponse.json(
        { error: "Authentication token not found" },
        { status: 401 }
      );
    }

    // Forward the GET request to the auth API with Bearer token
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/auth/me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtCookie.value}`,
        },
      }
    );

    if (!resp.ok) {
      const errorText = await resp.text();
      console.error("Failed to get current user:", resp.status, errorText);
      return NextResponse.json(
        { error: errorText || `Failed to get current user: ${resp.status}` },
        { status: resp.status }
      );
    }

    const userData = await resp.json();
    return NextResponse.json(userData);
  } catch (error) {
    console.error("Error in get current user API route:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

