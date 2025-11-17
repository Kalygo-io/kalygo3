export interface CurrentUser {
  email: string;
  id: number;
}

/**
 * Get current user information
 * Uses a Next.js API route that reads the JWT cookie server-side
 * and forwards the request with Bearer token authentication
 */
export async function getCurrentUser(): Promise<CurrentUser> {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/auth/me`,
    {
      method: "GET",
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
    console.error("Failed to get current user:", resp.status, errorMessage);
    throw new Error(`Failed to get current user: ${errorMessage}`);
  }

  const userData = await resp.json();
  return userData;
}
