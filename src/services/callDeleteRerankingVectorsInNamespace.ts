export interface DeleteVectorsResponse {
  success: boolean;
  error?: string;
  deleted_count?: number;
}

export async function callDeleteRerankingVectorsInNamespace(
  namespace: string
): Promise<DeleteVectorsResponse> {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_AI_API_URL}/api/reranking/delete-vectors`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ namespace }),
      }
    );

    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Error deleting reranking vectors:", error);
    throw error;
  }
}
