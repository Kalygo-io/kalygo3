export async function validateToken(token: string) {
  console.log("--- validateToken ---");
  console.log(`${process.env.NEXT_PUBLIC_AUTH_API_URL}`);

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/auth/is-authed`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!resp.ok) {
    throw new Error("Failed to validate token");
  }
}
