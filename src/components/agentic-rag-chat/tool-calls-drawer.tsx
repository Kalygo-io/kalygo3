import React from "react";
import {
  XMarkIcon,
  DocumentTextIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { RetrievalCall } from "@/ts/types/Message";
import { cn } from "@/shared/utils";

interface ToolCallsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  retrievalCalls: RetrievalCall[];
}

export function ToolCallsDrawer({
  isOpen,
  onClose,
  retrievalCalls,
}: ToolCallsDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-gray-900 border-l border-gray-700 shadow-2xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <WrenchScrewdriverIcon className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">
                Tool Calls & References
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {retrievalCalls.length === 0 ? (
              <div className="text-center py-8">
                <DocumentTextIcon className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">
                  No tool calls found for this message
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {retrievalCalls.map((call, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50"
                  >
                    {/* Tool Call Header */}
                    <div className="flex items-center space-x-2 mb-4">
                      <DocumentTextIcon className="w-5 h-5 text-blue-400" />
                      <h3 className="text-lg font-medium text-white">
                        Retrieval Call {index + 1}
                      </h3>
                    </div>

                    {/* Query */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">
                        Query:
                      </h4>
                      <p className="text-gray-100 bg-gray-800/50 p-3 rounded border border-gray-600/50">
                        {call.query}
                      </p>
                    </div>

                    {/* Namespace */}
                    {call.namespace && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-300 mb-2">
                          Namespace:
                        </h4>
                        <p className="text-gray-100 bg-gray-800/50 p-2 rounded border border-gray-600/50 text-sm">
                          {call.namespace}
                        </p>
                      </div>
                    )}

                    {/* Reranked Results */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">
                        Reranked Results ({call.reranked_results.length}):
                      </h4>
                      <div className="space-y-3">
                        {call.reranked_results.map((result, resultIndex) => (
                          <div
                            key={resultIndex}
                            className="bg-gray-800/30 rounded-lg p-3 border border-gray-600/30"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                                  Chunk {result.chunk_id}
                                </span>
                                {result.filename && (
                                  <span className="text-xs bg-gray-600/50 text-gray-300 px-2 py-1 rounded">
                                    {result.filename}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                                  Relevance: {result.relevance_score.toFixed(3)}
                                </span>
                                <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                                  Similarity:{" "}
                                  {result.similarity_score.toFixed(3)}
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-200 text-sm leading-relaxed">
                              {result.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Similarity Results */}
                    {call.similarity_results &&
                      call.similarity_results.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-300 mb-2">
                            Similarity Results ({call.similarity_results.length}
                            ):
                          </h4>
                          <div className="space-y-2">
                            {call.similarity_results.map(
                              (result, resultIndex) => (
                                <div
                                  key={resultIndex}
                                  className="bg-gray-800/30 rounded p-2 border border-gray-600/30"
                                >
                                  <p className="text-gray-200 text-sm">
                                    {typeof result === "string"
                                      ? result
                                      : JSON.stringify(result)}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {/* Message */}
                    {call.message && (
                      <div className="mt-4 pt-4 border-t border-gray-600/30">
                        <h4 className="text-sm font-medium text-gray-300 mb-2">
                          Message:
                        </h4>
                        <p className="text-gray-200 text-sm bg-gray-800/50 p-3 rounded border border-gray-600/50">
                          {call.message}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
