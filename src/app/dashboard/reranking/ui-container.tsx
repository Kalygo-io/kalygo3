"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  MagnifyingGlassIcon,
  InformationCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { ContextualAside } from "@/components/reranking/contextual-aside";

interface WorkoutResult {
  metadata: {
    title: string;
    description: string;
    created_by: string;
  };
  score: number;
}

export function RerankingDemoContainer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState<"first" | "second">("first");

  // Mock data for demonstration - in real implementation, this would be API calls
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["reranking/workouts", searchQuery],
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
      const mockFirstStage: WorkoutResult[] = [
        {
          metadata: {
            title: "Skaters",
            description:
              "A dynamic cardio exercise that involves lateral movement, improving agility and cardiovascular fitness. Great for warming up and building endurance.",
            created_by: "arnold@fit.ai",
          },
          score: 0.89,
        },
        {
          metadata: {
            title: "Supermans",
            description:
              "A back strengthening exercise that targets the lower back, glutes, and hamstrings. Helps improve posture and core stability.",
            created_by: "arnold@fit.ai",
          },
          score: 0.76,
        },
        {
          metadata: {
            title: "Jump Rope",
            description:
              "High-intensity cardio exercise that improves coordination, timing, and cardiovascular endurance. Excellent for burning calories.",
            created_by: "arnold@fit.ai",
          },
          score: 0.72,
        },
        {
          metadata: {
            title: "High Knees",
            description:
              "A running exercise performed in place with exaggerated knee lifts. Great for cardio and leg strength development.",
            created_by: "arnold@fit.ai",
          },
          score: 0.68,
        },
        {
          metadata: {
            title: "Mountain Climbers",
            description:
              "A full-body exercise that combines cardio with core strengthening. Improves coordination and overall fitness.",
            created_by: "arnold@fit.ai",
          },
          score: 0.65,
        },
        {
          metadata: {
            title: "Burpees",
            description:
              "A compound exercise that combines squat, push-up, and jump. Excellent for full-body conditioning and cardio.",
            created_by: "arnold@fit.ai",
          },
          score: 0.62,
        },
      ];

      // Mock reranked results (different order and scores)
      const mockReranked: WorkoutResult[] = [
        {
          metadata: {
            title: "Skaters",
            description:
              "A dynamic cardio exercise that involves lateral movement, improving agility and cardiovascular fitness. Great for warming up and building endurance.",
            created_by: "arnold@fit.ai",
          },
          score: 0.94,
        },
        {
          metadata: {
            title: "Jump Rope",
            description:
              "High-intensity cardio exercise that improves coordination, timing, and cardiovascular endurance. Excellent for burning calories.",
            created_by: "arnold@fit.ai",
          },
          score: 0.91,
        },
        {
          metadata: {
            title: "High Knees",
            description:
              "A running exercise performed in place with exaggerated knee lifts. Great for cardio and leg strength development.",
            created_by: "arnold@fit.ai",
          },
          score: 0.87,
        },
        {
          metadata: {
            title: "Supermans",
            description:
              "A back strengthening exercise that targets the lower back, glutes, and hamstrings. Helps improve posture and core stability.",
            created_by: "arnold@fit.ai",
          },
          score: 0.82,
        },
        {
          metadata: {
            title: "Mountain Climbers",
            description:
              "A full-body exercise that combines cardio with core strengthening. Improves coordination and overall fitness.",
            created_by: "arnold@fit.ai",
          },
          score: 0.78,
        },
        {
          metadata: {
            title: "Burpees",
            description:
              "A compound exercise that combines squat, push-up, and jump. Excellent for full-body conditioning and cardio.",
            created_by: "arnold@fit.ai",
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
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
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

  const WorkoutCard = ({
    workout,
    index,
    stage,
  }: {
    workout: WorkoutResult;
    index: number;
    stage: "first" | "reranked";
  }) => {
    const scorePercentage = Math.round(workout.score * 100);
    const isExpanded = expandedCards.has(`${stage}-${index}`);

    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-md font-semibold text-white line-clamp-2">
            {workout.metadata.title}
          </h3>
          <span
            className="text-sm font-bold ml-2 flex-shrink-0"
            style={{ color: getScoreColor(scorePercentage) }}
          >
            {scorePercentage}%
          </span>
        </div>

        <div className="space-y-2">
          <p
            className={`text-gray-300 text-xs ${
              isExpanded ? "" : "line-clamp-2"
            }`}
          >
            {workout.metadata.description}
          </p>

          {isExpanded && (
            <div className="space-y-1 text-xs text-gray-300">
              <div className="border-t border-gray-700 pt-2">
                <div>
                  <span className="font-medium">Score:</span> {scorePercentage}%
                </div>
                <div>
                  <span className="font-medium">Created by:</span>{" "}
                  {workout.metadata.created_by}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-700">
          <div className="text-xs text-gray-500">
            <span className="font-medium">Created by:</span>{" "}
            {workout.metadata.created_by}
          </div>
          <button
            onClick={() => toggleCardExpansion(index, stage)}
            className="text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors"
          >
            {isExpanded ? "See less..." : "See more..."}
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
        <span className="hidden sm:inline text-sm">Context</span>
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
              className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
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
                  {data.firstStage.map((workout, index) => (
                    <WorkoutCard
                      key={`first-${index}`}
                      workout={workout}
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
                  {data.reranked.map((workout, index) => (
                    <WorkoutCard
                      key={`reranked-${index}`}
                      workout={workout}
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
                  ).map((workout, index) => (
                    <WorkoutCard
                      key={`${activeTab}-${index}`}
                      workout={workout}
                      index={index}
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
                            {workout.metadata.title}
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
                          {workout.metadata.description}
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
