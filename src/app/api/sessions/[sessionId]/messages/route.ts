import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const sessionId = params.sessionId;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Get JWT token from cookies (server-side)
    const cookieStore = cookies();
    const jwtCookie = cookieStore.get("jwt");

    if (!jwtCookie?.value) {
      return NextResponse.json(
        { error: "Authentication token not found" },
        { status: 401 }
      );
    }

    // Forward the DELETE request to the AI API with Bearer token
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_AI_API_URL}/api/sessions/${sessionId}/messages`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtCookie.value}`,
        },
      }
    );

    if (!resp.ok) {
      const errorText = await resp.text();
      console.error("Failed to clear session messages:", resp.status, errorText);
      return NextResponse.json(
        { error: errorText || `Failed to clear session messages: ${resp.status}` },
        { status: resp.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in clear session messages API route:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

