export interface DeleteVectorsResponse {
  success: boolean;
  deleted_count?: number;
  namespace: string;
  error?: string;
}

export async function callDeleteVectorsInNamespace(
  namespace: string
): Promise<DeleteVectorsResponse> {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_AI_API_URL}/api/reranking-with-llm/delete-vectors`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          namespace: namespace,
        }),
        credentials: "include",
      }
    );

    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Error deleting vectors:", error);
    throw error;
  }
}
