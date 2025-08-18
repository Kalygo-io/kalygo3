"use client";

import { useState } from "react";
import { RerankedMatch } from "@/ts/types/Message";
import {
  XMarkIcon,
  DocumentTextIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  InformationCircleIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import { useCopyToClipboard } from "@/shared/hooks/use-copy-to-clipboard";

interface ChunksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  rerankedMatches: RerankedMatch[];
  kb_search_query?: string;
  messageContent?: string;
}

export function ChunksDrawer({
  isOpen,
  onClose,
  rerankedMatches,
  kb_search_query,
  messageContent,
}: ChunksDrawerProps) {
  const [expandedChunks, setExpandedChunks] = useState<Set<number>>(new Set());
  const { copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const toggleChunkExpanded = (index: number) => {
    const newExpanded = new Set(expandedChunks);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedChunks(newExpanded);
  };

  const copyChunkContent = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      console.log("Chunk content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy chunk content:", err);
    }
  };

  const getPreviewContent = (content: string) => {
    if (!content) return "";
    const firstLine = content.split("\n")[0].trim();
    if (firstLine.length > 150) {
      return firstLine.substring(0, 150) + "...";
    }
    return firstLine;
  };

  const ellipsizeFilename = (filename: string, maxLength: number = 30) => {
    if (filename.length <= maxLength) return filename;
    const extension = filename.substring(filename.lastIndexOf("."));
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf("."));
    const maxNameLength = maxLength - extension.length - 3;
    if (maxNameLength <= 0) {
      return "..." + extension;
    }
    return nameWithoutExt.substring(0, maxNameLength) + "..." + extension;
  };

  const handleFilenameClick = (filename: string) => {
    copyToClipboard(filename);
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-96 bg-gray-900 border-l border-gray-700 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <DocumentTextIcon className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-white">
                Knowledge Chunks
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
                title="Close panel"
              >
                <XMarkIcon className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Contextual Information */}
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                <InformationCircleIcon className="w-5 h-5 text-blue-400 mr-2" />
                What You're Looking At
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                These are the knowledge base chunks that were retrieved and used
                to generate the AI's response. Each chunk represents a piece of
                information from your uploaded documents that was relevant to
                your query.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-400 font-medium">
                    Chunks Found:
                  </span>
                  <span className="text-white">{rerankedMatches.length}</span>
                </div>
                {kb_search_query && (
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-400 font-medium">
                      Search Query:
                    </span>
                    <span className="text-white text-xs bg-gray-800 p-2 rounded">
                      {kb_search_query}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Chunks List */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-white mb-3">
                Retrieved Chunks ({rerankedMatches.length})
              </h4>

              {rerankedMatches.map((match, index) => (
                <div
                  key={`${match.chunk_id}-${index}`}
                  className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4"
                >
                  {/* Header with scores */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400">
                        #{index + 1}
                      </span>
                      <span className="text-xs font-mono text-gray-500 bg-gray-700/50 px-2 py-1 rounded">
                        {match.chunk_id}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-gray-400">
                          Relevance:
                        </span>
                        <span className="text-xs font-medium text-white">
                          {(match.relevance_score * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-gray-400">
                          Similarity:
                        </span>
                        <span className="text-xs font-medium text-blue-400">
                          {(match.similarity_score * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Filename */}
                  {(match.filename ||
                    (match.chunk_id.includes("_") &&
                      match.chunk_id.split("_")[0])) && (
                    <div className="mb-3">
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

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-600/30">
                    <button
                      onClick={() => toggleChunkExpanded(index)}
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center"
                    >
                      {expandedChunks.has(index) ? (
                        <>
                          <ChevronUpIcon className="w-4 h-4 mr-1" />
                          Hide Chunk
                        </>
                      ) : (
                        <>
                          <ChevronDownIcon className="w-4 h-4 mr-1" />
                          Show Chunk
                        </>
                      )}
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

                  {/* Content - Only shown when expanded */}
                  {expandedChunks.has(index) && (
                    <div className="mt-3 bg-gray-900/50 p-3 rounded border border-gray-600/30 overflow-x-auto">
                      <div className="text-xs text-gray-500 mb-2 flex items-center">
                        <ChevronDownIcon className="w-3 h-3 mr-1" />
                        Full Content
                      </div>
                      <div
                        className="text-sm text-gray-300 leading-relaxed font-mono"
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        {match.content}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Add missing ChevronUpIcon
const ChevronUpIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 15l7-7 7 7"
    />
  </svg>
);
