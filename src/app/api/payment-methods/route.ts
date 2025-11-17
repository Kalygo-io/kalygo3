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

    // Forward the GET request to the API with Bearer token
    // Assuming your backend has an endpoint like /api/stripe/payment-methods
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_AI_API_URL}/api/stripe/payment-methods`,
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
      console.error("Failed to get payment methods:", resp.status, errorText);
      return NextResponse.json(
        { error: errorText || `Failed to get payment methods: ${resp.status}` },
        { status: resp.status }
      );
    }

    const data = await resp.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in get payment methods API route:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

