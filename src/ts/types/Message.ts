export interface Message {
  id: string;
  content: string;
  role: "human" | "ai";
  error: any;
  parallelGroupId?: string;
  blocks?: Message[];
  rerankedMatches?: RerankedMatch[];
}

export interface RerankedMatch {
  chunk_id: string;
  total_chunks: number;
  score: number;
  content: string;
}
