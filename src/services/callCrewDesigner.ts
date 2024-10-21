export async function callCrewDesigner(prompt: string) {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_CREWAI_API_URL}/api/hierarchical-crew/design`,
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
