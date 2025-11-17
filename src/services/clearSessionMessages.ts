/**
 * Clear all messages from a session
 * DELETE /sessions/{session_id}/messages
 *
 * Uses a Next.js API route that reads the JWT cookie server-side
 * and forwards the request with Bearer token authentication
 */
export async function clearSessionMessages(sessionId: string): Promise<void> {
  if (!sessionId) {
    throw new Error("Session ID is required");
  }

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_AI_API_URL}/api/ai-school-agent/chat-sessions/${sessionId}/messages`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!resp.ok) {
    const errorData = await resp
      .json()
      .catch(() => ({ error: "Unknown error" }));
    const errorMessage = errorData.error || `HTTP ${resp.status}`;
    console.error(
      "Failed to clear session messages:",
      resp.status,
      errorMessage
    );
    throw new Error(`Failed to clear session messages: ${errorMessage}`);
  }

  console.log("Session messages cleared successfully");
}
