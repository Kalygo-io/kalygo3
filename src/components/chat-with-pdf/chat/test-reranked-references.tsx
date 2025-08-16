import { RerankedReferences } from "./reranked-references";
import { RerankedMatch } from "@/ts/types/Message";

// Test data to simulate backend response
const testRerankedMatches: RerankedMatch[] = [
  {
    chunk_id: "doc1_chunk2",
    total_chunks: 5,
    score: 0.95,
    relevance_score: 0.95,
    similarity_score: 0.87,
    content:
      "This is a test chunk content that should be displayed in the references section. It contains information about the topic being discussed.",
  },
  {
    chunk_id: "doc2_chunk1",
    total_chunks: 3,
    score: 0.87,
    relevance_score: 0.87,
    similarity_score: 0.82,
    content:
      "Another test chunk with different content. This helps verify that multiple references can be displayed correctly.",
  },
  {
    chunk_id: "doc3_chunk4",
    total_chunks: 7,
    score: 0.72,
    relevance_score: 0.72,
    similarity_score: 0.65,
    content:
      "A third test chunk with lower relevance score. This demonstrates the score display functionality.",
  },
];

export function TestRerankedReferences() {
  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">
          Test Reranked References
        </h1>

        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
          <h2 className="text-lg font-semibold text-white mb-4">AI Response</h2>
          <p className="text-gray-300 mb-4">
            This is a test AI response message. Below this, you should see the
            reranked references component.
          </p>

          <RerankedReferences rerankedMatches={testRerankedMatches} />
        </div>

        <div className="mt-6 text-sm text-gray-400">
          <p>
            This test component simulates the data structure that should come
            from the backend.
          </p>
          <p>
            If you can see the &quot;References (3)&quot; button above, the
            component is working correctly.
          </p>
        </div>
      </div>
    </div>
  );
}
