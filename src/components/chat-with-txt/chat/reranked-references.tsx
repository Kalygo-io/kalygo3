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
  const [isExpanded, setIsExpanded] = useState(false);

  console.log("RerankedReferences component received:", rerankedMatches);

  if (!rerankedMatches || rerankedMatches.length === 0) {
    console.log("No reranked matches to display");
    return null;
  }

  const toggleExpanded = () => setIsExpanded(!isExpanded);

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
                  {match.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
