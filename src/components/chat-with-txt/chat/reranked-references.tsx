import { RerankedMatch } from "@/ts/types/Message";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

interface RerankedReferencesProps {
  rerankedMatches: RerankedMatch[];
}

export function RerankedReferences({
  rerankedMatches,
}: RerankedReferencesProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedChunks, setExpandedChunks] = useState<Set<number>>(new Set());

  console.log("RerankedReferences component received:", rerankedMatches);
  console.log("expandedChunks state:", expandedChunks);

  if (!rerankedMatches || rerankedMatches.length === 0) {
    console.log("No reranked matches to display");
    return null;
  }

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const toggleChunkExpanded = (index: number) => {
    console.log("Toggling chunk", index, "current expanded:", expandedChunks);
    const newExpanded = new Set(expandedChunks);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
      console.log("Collapsing chunk", index);
    } else {
      newExpanded.add(index);
      console.log("Expanding chunk", index);
    }
    setExpandedChunks(newExpanded);
  };

  const copyChunkContent = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      // You could add a toast notification here if you have a toast system
      console.log("Chunk content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy chunk content:", err);
    }
  };

  const getPreviewContent = (content: string, maxChars: number = 200) => {
    if (!content) return "";

    if (content.length <= maxChars) {
      return content;
    }

    // Find the last complete sentence within the character limit
    const truncated = content.substring(0, maxChars);
    const lastPeriod = truncated.lastIndexOf(".");
    const lastExclamation = truncated.lastIndexOf("!");
    const lastQuestion = truncated.lastIndexOf("?");

    const lastSentenceEnd = Math.max(lastPeriod, lastExclamation, lastQuestion);

    if (lastSentenceEnd > maxChars * 0.7) {
      // If we have a reasonable sentence ending
      return truncated.substring(0, lastSentenceEnd + 1) + "...";
    } else {
      return truncated + "...";
    }
  };

  return (
    <div className="mt-4 border border-gray-600/50 rounded-lg overflow-hidden">
      <button
        onClick={toggleExpanded}
        className="w-full px-4 py-3 bg-gray-800/50 hover:bg-gray-700/50 transition-colors flex items-center justify-between text-left"
      >
        <div className="flex items-center space-x-2">
          <DocumentTextIcon className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-gray-200">
            References ({rerankedMatches.length})
          </span>
        </div>
        <div className="flex items-center space-x-4">
          {isExpanded ? (
            <ChevronDownIcon className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronRightIcon className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="bg-gray-900/30 border-t border-gray-600/50">
          <div className="p-4 space-y-3">
            {rerankedMatches.map((match, index) => (
              <div
                key={`${match.chunk_id}-${index}`}
                className="p-3 bg-gray-800/30 rounded-md border border-gray-600/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{index + 1})</span>
                    <span className="text-xs font-mono text-gray-400 bg-gray-700/50 px-2 py-1 rounded">
                      Chunk ID: {match.chunk_id}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-400">Relevance:</span>
                      <span className="text-xs font-medium text-white">
                        {(match.relevance_score * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-400">Similarity:</span>
                      <span className="text-xs font-medium text-blue-400">
                        {(match.similarity_score * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="text-sm text-gray-300 leading-relaxed font-mono bg-gray-900/50 p-3 rounded border border-gray-600/30 overflow-x-auto"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {expandedChunks.has(index) ? (
                    <div>
                      <div className="text-xs text-gray-500 mb-2">
                        [EXPANDED]
                      </div>
                      {match.content}
                    </div>
                  ) : (
                    <div>
                      <div className="text-xs text-gray-500 mb-2">
                        [PREVIEW]
                      </div>
                      {getPreviewContent(match.content)}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <button
                    onClick={() => toggleChunkExpanded(index)}
                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {expandedChunks.has(index) ? "Show Less" : "More..."}
                  </button>
                  <button
                    onClick={() => copyChunkContent(match.content)}
                    className="text-xs text-gray-400 hover:text-gray-300 transition-colors flex items-center space-x-1"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Copy</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
