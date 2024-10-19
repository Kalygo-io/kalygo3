export async function callSwarmDesigner(prompt: string) {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_AI_API_URL}/api/design-and-run-swarm/design`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
      credentials: "include",
    }
  );

  if (!resp.ok) throw "Network response was not OK";

  return resp;
}
