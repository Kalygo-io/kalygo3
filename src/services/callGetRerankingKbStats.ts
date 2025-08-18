export interface KbStats {
  index_name: string;
  index_dimension: number;
  namespace: string;
  namespace_vector_count: number;
}

export async function callGetRerankingKbStats(): Promise<KbStats> {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_AI_API_URL}/api/reranking/kb-stats`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Error fetching reranking KB stats:", error);
    throw error;
  }
}
