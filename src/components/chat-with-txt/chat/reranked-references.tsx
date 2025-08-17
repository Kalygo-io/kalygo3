import { RerankedMatch } from "@/ts/types/Message";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useCopyToClipboard } from "@/shared/hooks/use-copy-to-clipboard";

interface RerankedReferencesProps {
  rerankedMatches: RerankedMatch[];
  kb_search_query?: string;
}

export function RerankedReferences({
  rerankedMatches,
  kb_search_query,
}: RerankedReferencesProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedChunks, setExpandedChunks] = useState<Set<number>>(new Set());
  const { copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  console.log("RerankedReferences component received:", rerankedMatches);
  console.log("expandedChunks state:", expandedChunks);

  // Debug: Check for kb_search_query
  if (kb_search_query) {
    console.log("KB Search Query found:", kb_search_query);
  }

  // Debug: Log each match to see what fields are available
  rerankedMatches.forEach((match, index) => {
    console.log(`Match ${index}:`, {
      chunk_id: match.chunk_id,
      filename: match.filename,
      content: match.content?.substring(0, 100) + "...",
      allKeys: Object.keys(match),
    });
  });

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

  const getPreviewContent = (content: string) => {
    if (!content) return "";

    // Get only the first line
    const firstLine = content.split("\n")[0].trim();

    // If the first line is longer than 150 characters, truncate it
    if (firstLine.length > 150) {
      return firstLine.substring(0, 150) + "...";
    }

    return firstLine;
  };

  const ellipsizeFilename = (filename: string, maxLength: number = 30) => {
    if (filename.length <= maxLength) return filename;

    const extension = filename.substring(filename.lastIndexOf("."));
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf("."));
    const maxNameLength = maxLength - extension.length - 3; // 3 for "..."

    if (maxNameLength <= 0) {
      return "..." + extension;
    }

    return nameWithoutExt.substring(0, maxNameLength) + "..." + extension;
  };

  const handleFilenameClick = (filename: string) => {
    copyToClipboard(filename);
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
            Chunks ({rerankedMatches.length})
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
            {/* Debug: Show KB Search Query */}
            {kb_search_query && (
              <div className="mb-4 p-3 bg-yellow-900/20 border border-yellow-700/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <svg
                    className="w-4 h-4 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-yellow-400">
                    KB Search Query (Debug)
                  </span>
                </div>
                <div className="text-sm text-yellow-200 font-mono bg-yellow-900/30 p-2 rounded border border-yellow-700/20">
                  {kb_search_query}
                </div>
              </div>
            )}
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
                {/* Filename Header */}
                {(match.filename ||
                  (match.chunk_id.includes("_") &&
                    match.chunk_id.split("_")[0])) && (
                  <div className="mb-2">
                    <span
                      className="text-sm font-medium text-blue-400 bg-blue-900/20 px-3 py-1 rounded-lg border border-blue-700/30 cursor-pointer hover:bg-blue-900/30 transition-colors"
                      title={match.filename || match.chunk_id.split("_")[0]}
                      onClick={() =>
                        handleFilenameClick(
                          match.filename || match.chunk_id.split("_")[0]
                        )
                      }
                    >
                      📃{" "}
                      {ellipsizeFilename(
                        match.filename || match.chunk_id.split("_")[0]
                      )}
                    </span>
                  </div>
                )}

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
