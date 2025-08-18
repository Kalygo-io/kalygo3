"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import {
  MagnifyingGlassIcon,
  InformationCircleIcon,
  ArrowRightIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
  StarIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import { ContextualAside } from "@/components/reranking/contextual-aside";

interface RerankingResult {
  metadata: {
    q: string;
    a: string;
    content: string;
    filename: string;
    row_number: number;
    upload_timestamp: string;
  };
  score: number;
}

export function RerankingDemoContainer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState<"first" | "second">("first");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [topK, setTopK] = useState(5);
  const [similarityThreshold, setSimilarityThreshold] = useState(0.1);
  const [appliedTopK, setAppliedTopK] = useState(5);
  const [appliedSimilarityThreshold, setAppliedSimilarityThreshold] =
    useState(0.1);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Click outside to close settings
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setIsSettingsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Mock data for demonstration - in real implementation, this would be API calls
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: [
      "reranking",
      searchQuery,
      appliedTopK,
      appliedSimilarityThreshold,
    ],
    queryFn: async () => {
      if (!searchQuery.trim()) {
        return {
          firstStage: [],
          reranked: [],
        };
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data - in real implementation, this would be actual API calls
      const mockFirstStage: RerankingResult[] = [
        {
          metadata: {
            q: "What is machine learning?",
            a: "Machine learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed.",
            content:
              "Machine learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed. It focuses on developing algorithms that can access data and use it to learn for themselves.",
            filename: "ml_concepts.txt",
            row_number: 1,
            upload_timestamp: "2024-01-15T10:30:00Z",
          },
          score: 0.89,
        },
        {
          metadata: {
            q: "How does neural networks work?",
            a: "Neural networks are computing systems inspired by biological neural networks that process information through interconnected nodes.",
            content:
              "Neural networks are computing systems inspired by biological neural networks that process information through interconnected nodes. They consist of layers of neurons that process input data and produce output based on learned patterns.",
            filename: "neural_networks.md",
            row_number: 3,
            upload_timestamp: "2024-01-15T11:45:00Z",
          },
          score: 0.76,
        },
        {
          metadata: {
            q: "What is deep learning?",
            a: "Deep learning is a subset of machine learning that uses neural networks with multiple layers to model and understand complex patterns.",
            content:
              "Deep learning is a subset of machine learning that uses neural networks with multiple layers to model and understand complex patterns. It has been particularly successful in image recognition, natural language processing, and speech recognition.",
            filename: "deep_learning.txt",
            row_number: 2,
            upload_timestamp: "2024-01-15T12:15:00Z",
          },
          score: 0.72,
        },
        {
          metadata: {
            q: "Explain supervised learning",
            a: "Supervised learning is a type of machine learning where the algorithm learns from labeled training data to make predictions on new, unseen data.",
            content:
              "Supervised learning is a type of machine learning where the algorithm learns from labeled training data to make predictions on new, unseen data. The training data includes both input features and their corresponding correct outputs.",
            filename: "supervised_learning.md",
            row_number: 5,
            upload_timestamp: "2024-01-15T13:20:00Z",
          },
          score: 0.68,
        },
        {
          metadata: {
            q: "What is unsupervised learning?",
            a: "Unsupervised learning finds hidden patterns in data without labeled outputs, using clustering and dimensionality reduction techniques.",
            content:
              "Unsupervised learning finds hidden patterns in data without labeled outputs, using clustering and dimensionality reduction techniques. It's useful for discovering structure in data where the correct output is unknown.",
            filename: "unsupervised_learning.txt",
            row_number: 4,
            upload_timestamp: "2024-01-15T14:10:00Z",
          },
          score: 0.65,
        },
        {
          metadata: {
            q: "How does reinforcement learning work?",
            a: "Reinforcement learning is learning through interaction with an environment, receiving rewards or penalties for actions taken.",
            content:
              "Reinforcement learning is learning through interaction with an environment, receiving rewards or penalties for actions taken. The agent learns to maximize cumulative reward by exploring different strategies.",
            filename: "reinforcement_learning.md",
            row_number: 6,
            upload_timestamp: "2024-01-15T15:30:00Z",
          },
          score: 0.62,
        },
      ];

      // Mock reranked results (different order and scores)
      const mockReranked: RerankingResult[] = [
        {
          metadata: {
            q: "What is machine learning?",
            a: "Machine learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed.",
            content:
              "Machine learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed. It focuses on developing algorithms that can access data and use it to learn for themselves.",
            filename: "ml_concepts.txt",
            row_number: 1,
            upload_timestamp: "2024-01-15T10:30:00Z",
          },
          score: 0.94,
        },
        {
          metadata: {
            q: "What is deep learning?",
            a: "Deep learning is a subset of machine learning that uses neural networks with multiple layers to model and understand complex patterns.",
            content:
              "Deep learning is a subset of machine learning that uses neural networks with multiple layers to model and understand complex patterns. It has been particularly successful in image recognition, natural language processing, and speech recognition.",
            filename: "deep_learning.txt",
            row_number: 2,
            upload_timestamp: "2024-01-15T12:15:00Z",
          },
          score: 0.91,
        },
        {
          metadata: {
            q: "Explain supervised learning",
            a: "Supervised learning is a type of machine learning where the algorithm learns from labeled training data to make predictions on new, unseen data.",
            content:
              "Supervised learning is a type of machine learning where the algorithm learns from labeled training data to make predictions on new, unseen data. The training data includes both input features and their corresponding correct outputs.",
            filename: "supervised_learning.md",
            row_number: 5,
            upload_timestamp: "2024-01-15T13:20:00Z",
          },
          score: 0.87,
        },
        {
          metadata: {
            q: "How does neural networks work?",
            a: "Neural networks are computing systems inspired by biological neural networks that process information through interconnected nodes.",
            content:
              "Neural networks are computing systems inspired by biological neural networks that process information through interconnected nodes. They consist of layers of neurons that process input data and produce output based on learned patterns.",
            filename: "neural_networks.md",
            row_number: 3,
            upload_timestamp: "2024-01-15T11:45:00Z",
          },
          score: 0.82,
        },
        {
          metadata: {
            q: "What is unsupervised learning?",
            a: "Unsupervised learning finds hidden patterns in data without labeled outputs, using clustering and dimensionality reduction techniques.",
            content:
              "Unsupervised learning finds hidden patterns in data without labeled outputs, using clustering and dimensionality reduction techniques. It's useful for discovering structure in data where the correct output is unknown.",
            filename: "unsupervised_learning.txt",
            row_number: 4,
            upload_timestamp: "2024-01-15T14:10:00Z",
          },
          score: 0.78,
        },
        {
          metadata: {
            q: "How does reinforcement learning work?",
            a: "Reinforcement learning is learning through interaction with an environment, receiving rewards or penalties for actions taken.",
            content:
              "Reinforcement learning is learning through interaction with an environment, receiving rewards or penalties for actions taken. The agent learns to maximize cumulative reward by exploring different strategies.",
            filename: "reinforcement_learning.md",
            row_number: 6,
            upload_timestamp: "2024-01-15T15:30:00Z",
          },
          score: 0.75,
        },
      ];

      return {
        firstStage: mockFirstStage,
        reranked: mockReranked,
      };
    },
    enabled: !!searchQuery.trim(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      // The query will automatically run when searchQuery changes
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleCardExpansion = (index: number, stage: "first" | "reranked") => {
    const key = `${stage}-${index}`;
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      // @ts-ignore
      if (newSet.has(key)) {
        // @ts-ignore
        newSet.delete(key);
      } else {
        // @ts-ignore
        newSet.add(key);
      }
      return newSet;
    });
  };

  const getScoreColor = (scorePercentage: number) => {
    if (scorePercentage >= 90) return "#10b981"; // green-500
    if (scorePercentage >= 80) return "#34d399"; // green-400
    if (scorePercentage >= 70) return "#6ee7b7"; // green-300
    if (scorePercentage >= 60) return "#fbbf24"; // yellow-400
    if (scorePercentage >= 50) return "#fb923c"; // orange-400
    if (scorePercentage >= 40) return "#f97316"; // orange-500
    if (scorePercentage >= 30) return "#f87171"; // red-400
    return "#ef4444"; // red-500
  };

  const RerankingCard = ({
    result,
    index,
    stage,
  }: {
    result: RerankingResult;
    index: number;
    stage: "first" | "reranked";
  }) => {
    const scorePercentage = Math.round(result.score * 100);
    // @ts-ignore
    const isExpanded = expandedCards.has(`${stage}-${index}`);

    return (
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 hover:border-gray-600 transition-colors">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center space-x-2 flex-1">
            <StarIcon className="w-4 h-4 text-yellow-400 flex-shrink-0" />
            <h3 className="text-md font-semibold text-white line-clamp-2">
              {result.metadata.q}
            </h3>
          </div>
          <div
            className="flex-shrink-0 ml-3 border rounded-md px-2.5 py-1 shadow-sm"
            style={{
              backgroundColor:
                scorePercentage >= 70
                  ? "rgba(34, 197, 94, 0.2)"
                  : scorePercentage >= 60
                  ? "rgba(234, 179, 8, 0.2)"
                  : scorePercentage >= 50
                  ? "rgba(249, 115, 22, 0.2)"
                  : scorePercentage >= 40
                  ? "rgba(239, 68, 68, 0.2)"
                  : "rgba(107, 114, 128, 0.2)",
              borderColor:
                scorePercentage >= 70
                  ? "rgba(34, 197, 94, 0.4)"
                  : scorePercentage >= 60
                  ? "rgba(234, 179, 8, 0.4)"
                  : scorePercentage >= 50
                  ? "rgba(249, 115, 22, 0.4)"
                  : scorePercentage >= 40
                  ? "rgba(239, 68, 68, 0.4)"
                  : "rgba(107, 114, 128, 0.4)",
            }}
          >
            <div className="flex items-center space-x-1">
              <span
                className="text-sm font-bold"
                style={{
                  color:
                    scorePercentage >= 70
                      ? "#4ade80"
                      : scorePercentage >= 60
                      ? "#facc15"
                      : scorePercentage >= 50
                      ? "#fb923c"
                      : scorePercentage >= 40
                      ? "#f87171"
                      : "#9ca3af",
                }}
              >
                {scorePercentage}%
              </span>
              <span className="text-xs text-gray-300 font-medium">
                similarity
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p
            className={`text-gray-300 text-sm ${
              isExpanded ? "" : "line-clamp-2"
            }`}
          >
            {result.metadata.a}
          </p>

          {isExpanded && (
            <div className="space-y-2 text-xs text-gray-300">
              <div className="border-t border-gray-700 pt-2">
                <div className="flex items-center space-x-2 mb-2">
                  <DocumentIcon className="w-3 h-3 text-gray-400" />
                  <span className="font-medium">File:</span>
                  <span>{result.metadata.filename}</span>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium">Row:</span>
                  <span>{result.metadata.row_number}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Uploaded:</span>
                  <span>
                    {new Date(
                      result.metadata.upload_timestamp
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-700">
          <div className="text-xs text-gray-500">
            <span className="font-medium">
              Result {index + 1} of{" "}
              {stage === "first" ? "similarity" : "reranked"}
            </span>
          </div>
          <button
            onClick={() => toggleCardExpansion(index, stage)}
            className="text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronUpIcon className="w-3 h-3 inline mr-1" />
                See less
              </>
            ) : (
              <>
                <ChevronDownIcon className="w-3 h-3 inline mr-1" />
                See more
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  if (error)
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-400 text-center">
          <p className="text-lg font-semibold mb-2">An error has occurred</p>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    );

  return (
    <>
      {/* Toggle Button - Fixed positioned in top-right of viewport */}
      <button
        onClick={toggleDrawer}
        className="fixed top-20 right-4 z-50 flex items-center space-x-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-600 transition-colors text-white shadow-lg"
      >
        <InformationCircleIcon className="w-4 h-4 text-blue-400" />
      </button>

      <div className="w-full max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Reranking Demo</h1>
          <p className="text-gray-400">
            Compare first-stage similarity search with re-ranked results
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full max-w-2xl mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What are you looking for?"
              className="block w-full pl-10 pr-12 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
                title="Search settings"
              >
                <Cog6ToothIcon className="w-5 h-5 text-gray-400 hover:text-gray-300" />
              </button>
            </div>
          </div>

          {/* Settings Dropdown */}
          {isSettingsOpen && (
            <div
              ref={settingsRef}
              className="absolute z-50 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4"
              style={{ left: "50%", transform: "translateX(-50%)" }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                Search Settings
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Top K Results: {topK}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={topK}
                    onChange={(e) => setTopK(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1</span>
                    <span>20</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Similarity Threshold: {similarityThreshold.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={similarityThreshold}
                    onChange={(e) =>
                      setSimilarityThreshold(parseFloat(e.target.value))
                    }
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0.00</span>
                    <span>1.00</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setAppliedTopK(topK);
                    setAppliedSimilarityThreshold(similarityThreshold);
                    setIsSettingsOpen(false);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Apply Settings
                </button>
              </div>
            </div>
          )}

          <p className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to search
          </p>
        </div>

        {/* Loading State */}
        {isPending && searchQuery.trim() && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-400">
              Searching and reranking...
            </span>
          </div>
        )}

        {/* Results - Two Column Layout */}
        {data && (data.firstStage.length > 0 || data.reranked.length > 0) && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white mb-2">
                Two-Stage Retrieval Results
              </h2>
            </div>

            {/* Mobile Tab Selector */}
            <div className="lg:hidden">
              <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab("first")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "first"
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  First Stage ({data.firstStage.length})
                </button>
                <button
                  onClick={() => setActiveTab("second")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "second"
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  Second Stage ({data.reranked.length})
                </button>
              </div>
            </div>

            {/* Desktop: Always Side-by-Side */}
            <div className="hidden lg:flex lg:gap-8">
              {/* First Stage - Similarity Search */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    First Stage: Similarity Search
                  </h3>
                  <span className="text-sm text-gray-400">
                    {data.firstStage.length} results
                  </span>
                </div>

                <div className="space-y-3">
                  {data.firstStage.map((result, index) => (
                    <RerankingCard
                      key={`first-${index}`}
                      result={result}
                      index={index}
                      stage="first"
                    />
                  ))}
                </div>
              </div>

              {/* Small Arrow Separator */}
              <div className="flex items-center justify-center px-2">
                <ArrowRightIcon className="w-4 h-4 text-blue-400" />
              </div>

              {/* Second Stage - Reranked Results */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    Second Stage: Reranked Results
                  </h3>
                  <span className="text-sm text-gray-400">
                    {data.reranked.length} results
                  </span>
                </div>

                <div className="space-y-3">
                  {data.reranked.map((result, index) => (
                    <RerankingCard
                      key={`reranked-${index}`}
                      result={result}
                      index={index}
                      stage="reranked"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile: Tab-based Layout */}
            <div className="lg:hidden space-y-6">
              {/* Active Tab Content */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    {activeTab === "first"
                      ? "First Stage: Similarity Search"
                      : "Second Stage: Reranked Results"}
                  </h3>
                  <span className="text-sm text-gray-400">
                    {activeTab === "first"
                      ? data.firstStage.length
                      : data.reranked.length}{" "}
                    results
                  </span>
                </div>

                <div className="space-y-3">
                  {(activeTab === "first"
                    ? data.firstStage
                    : data.reranked
                  ).map((result, index) => (
                    <RerankingCard
                      key={`${activeTab}-${index}`}
                      result={result}
                      index={index}
                      // @ts-ignore
                      stage={activeTab}
                    />
                  ))}
                </div>
              </div>

              {/* Preview of Other Tab */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-md font-medium text-gray-400">
                    {activeTab === "first"
                      ? "Second Stage Preview"
                      : "First Stage Preview"}
                  </h4>
                  <span className="text-xs text-gray-500">
                    {activeTab === "first"
                      ? data.reranked.length
                      : data.firstStage.length}{" "}
                    results
                  </span>
                </div>

                <div className="space-y-2">
                  {(activeTab === "first" ? data.reranked : data.firstStage)
                    .slice(0, 2)
                    .map((workout, index) => (
                      <div
                        key={`preview-${index}`}
                        className="bg-gray-800/50 border border-gray-700 rounded-lg p-3"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h5 className="text-sm font-medium text-white line-clamp-1">
                            {workout.metadata.q}
                          </h5>
                          <span
                            className="text-xs font-bold ml-2 flex-shrink-0"
                            style={{
                              color: getScoreColor(
                                Math.round(workout.score * 100)
                              ),
                            }}
                          >
                            {Math.round(workout.score * 100)}%
                          </span>
                        </div>
                        <p className="text-gray-400 text-xs line-clamp-2">
                          {workout.metadata.a}
                        </p>
                      </div>
                    ))}
                  {(activeTab === "first" ? data.reranked : data.firstStage)
                    .length > 2 && (
                    <div className="text-center py-2">
                      <span className="text-xs text-gray-500">
                        +
                        {(activeTab === "first"
                          ? data.reranked
                          : data.firstStage
                        ).length - 2}{" "}
                        more results
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!searchQuery.trim() && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <MagnifyingGlassIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Ready to compare retrieval stages
            </h3>
            <p className="text-gray-400 text-center max-w-md">
              Enter a search query above to see the difference between
              similarity search and reranked results
            </p>
          </div>
        )}

        {/* No Results */}
        {data &&
          data.firstStage.length === 0 &&
          data.reranked.length === 0 &&
          searchQuery.trim() &&
          !isPending && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <MagnifyingGlassIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                No results found
              </h3>
              <p className="text-gray-400 text-center max-w-md">
                Try adjusting your search terms or try a different query
              </p>
            </div>
          )}

        {/* Status */}
        {isFetching && searchQuery.trim() && (
          <div className="text-center mt-6">
            <div className="inline-flex items-center text-sm text-gray-400">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
              Updating results...
            </div>
          </div>
        )}
      </div>

      <ContextualAside
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}
