"use client";

import { useState, useEffect } from "react";
import {
  InformationCircleIcon,
  XMarkIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CogIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import {
  callGetChatWithTxtKbStats,
  KbStats,
} from "@/services/callGetChatWithTxtKbStats";
import { errorToast } from "@/shared/toasts";

interface ContextualAsideProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContextualAside({ isOpen, onClose }: ContextualAsideProps) {
  const [activeTab, setActiveTab] = useState("kb-stats");
  const [kbStats, setKbStats] = useState<KbStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchKbStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const stats = await callGetChatWithTxtKbStats();
      setKbStats(stats);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch KB stats";
      setError(errorMessage);
      errorToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && activeTab === "kb-stats") {
      fetchKbStats();
    }
  }, [isOpen, activeTab]);

  const tabs = [
    { id: "kb-stats", name: "KB Stats", icon: DocumentTextIcon },
    { id: "update-kb", name: "Update KB", icon: CogIcon },
  ];

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
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
            <h2 className="text-lg font-semibold text-white">Chat with TXT</h2>
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

          {/* Tabs */}
          <div className="border-b border-gray-700 overflow-x-auto">
            <div className="flex min-w-max">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? "text-blue-400 border-b-2 border-blue-400 bg-gray-800"
                        : "text-gray-400 hover:text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="hidden sm:inline">{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === "kb-stats" && (
              <div className="space-y-4">
                <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      Knowledge Base Statistics
                    </h3>
                    <button
                      onClick={fetchKbStats}
                      disabled={loading}
                      className="p-1 hover:bg-blue-700/30 rounded transition-colors disabled:opacity-50"
                      title="Refresh stats"
                    >
                      <ArrowPathIcon
                        className={`w-4 h-4 text-blue-400 ${
                          loading ? "animate-spin" : ""
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Overview of your current knowledge base content and
                    performance metrics.
                  </p>
                </div>

                {loading && (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                    <span className="ml-2 text-gray-300">Loading stats...</span>
                  </div>
                )}

                {error && (
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                    <p className="text-red-300 text-sm">{error}</p>
                    <button
                      onClick={fetchKbStats}
                      className="mt-2 text-red-300 hover:text-red-200 text-sm underline"
                    >
                      Try again
                    </button>
                  </div>
                )}

                {!loading && !error && kbStats && (
                  <div className="space-y-3">
                    <h4 className="text-md font-semibold text-white">
                      Index Information:
                    </h4>
                    <div className="space-y-3">
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-300">
                            Index Name
                          </span>
                          <span className="text-sm font-medium text-white">
                            {kbStats.index_name || "N/A"}
                          </span>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-300">
                            Dimensions
                          </span>
                          <span className="text-sm font-medium text-white">
                            {kbStats.index_dimension || "N/A"}
                          </span>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-300">
                            Namespace
                          </span>
                          <span className="text-sm font-medium text-white">
                            {kbStats.namespace || "N/A"}
                          </span>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-300">
                            Total Vectors
                          </span>
                          <span className="text-sm font-medium text-white">
                            {formatNumber(kbStats.total_vector_count || 0)}
                          </span>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-300">
                            Vectors in Namespace
                          </span>
                          <span className="text-sm font-medium text-white">
                            {formatNumber(kbStats.namespace_vector_count || 0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "update-kb" && (
              <div className="space-y-4">
                <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Update Knowledge Base
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    Add new documents or update existing content in your
                    knowledge base.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-md font-semibold text-white">
                    Upload New Documents:
                  </h4>
                  <div className="space-y-3">
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors cursor-pointer">
                      <DocumentTextIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-300">
                        Click to upload or drag files here
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Supports TXT, PDF, DOCX
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-md font-semibold text-white">
                    Processing Options:
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">
                          Chunk Size
                        </span>
                        <select className="text-sm bg-gray-700 text-white px-2 py-1 rounded border border-gray-600">
                          <option>512 tokens</option>
                          <option>1024 tokens</option>
                          <option>2048 tokens</option>
                        </select>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Overlap</span>
                        <select className="text-sm bg-gray-700 text-white px-2 py-1 rounded border border-gray-600">
                          <option>10%</option>
                          <option>20%</option>
                          <option>30%</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-md font-semibold text-white">
                    Recent Updates:
                  </h4>
                  <div className="space-y-2">
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-white">
                            nutrition_guide_2024.pdf
                          </p>
                          <p className="text-xs text-gray-400">
                            Added 2 hours ago
                          </p>
                        </div>
                        <span className="text-xs text-green-400">
                          ✓ Processed
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-white">
                            cooking_basics.txt
                          </p>
                          <p className="text-xs text-gray-400">
                            Updated 1 day ago
                          </p>
                        </div>
                        <span className="text-xs text-green-400">
                          ✓ Processed
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
