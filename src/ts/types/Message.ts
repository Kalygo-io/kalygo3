export interface Message {
  id: string;
  content: string;
  role: "human" | "ai";
  error: any;
  parallelGroupId?: string;
  blocks?: Message[];
  rerankedMatches?: RerankedMatch[];
  kb_search_query?: string;
  retrievalCalls?: RetrievalCall[];
}

export interface RetrievalCall {
  query: string;
  reranked_results: RerankedMatch[];
  similarity_results: any[];
  message: string;
  namespace: string;
}

export interface RerankedMatch {
  chunk_id: string;
  total_chunks: number;
  score: number;
  relevance_score: number;
  similarity_score: number;
  content: string;
  filename?: string;
  kb_search_query?: string;
}
