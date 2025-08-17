"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  MagnifyingGlassIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { ContextualAside } from "@/components/similarity-search/contextual-aside";
import Image from "next/image";

export function SimilaritySearchDemoContainer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["recommendations/workouts", searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) {
        return { recommendations: [] };
      }

      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_AI_API_URL}/api/recommendations/workouts`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: searchQuery,
          }),
        }
      );

      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }

      return await resp.json();
    },
    enabled: !!searchQuery.trim(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      // The query will automatically run when searchQuery changes
      // due to the query key including searchQuery
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleCardExpansion = (index: number) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
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

      <div className="w-full max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Similarity Search
          </h1>
          <p className="text-gray-400">
            Search through workout recommendations using semantic similarity
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

        {/* Loading State - Single loader for all loading states */}
        {(isPending || isFetching) && searchQuery.trim() && (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center space-y-4">
              <Image
                src="/loader.svg"
                alt="Loading..."
                width={48}
                height={48}
                className="w-12 h-12"
              />
              <span className="text-gray-400">
                {isPending ? "Searching..." : "Updating results..."}
              </span>
            </div>
          </div>
        )}

        {/* Results */}
        {data?.recommendations && searchQuery.trim() && !isPending && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white mb-2">
                Found {data.recommendations.length} recommendations
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.recommendations.map(
                (
                  workout: {
                    metadata: {
                      title: string;
                      description: string;
                      created_by: string;
                    };
                    score: number;
                  },
                  index: number
                ) => {
                  const scorePercentage = Math.round(workout.score * 100);

                  // More explicit color mapping with fallback
                  let scoreColor;
                  if (scorePercentage >= 90) {
                    scoreColor = "text-green-500";
                  } else if (scorePercentage >= 80) {
                    scoreColor = "text-green-400";
                  } else if (scorePercentage >= 70) {
                    scoreColor = "text-green-300";
                  } else if (scorePercentage >= 60) {
                    scoreColor = "text-yellow-400";
                  } else if (scorePercentage >= 50) {
                    scoreColor = "text-orange-400";
                  } else if (scorePercentage >= 40) {
                    scoreColor = "text-orange-500";
                  } else if (scorePercentage >= 30) {
                    scoreColor = "text-red-400";
                  } else {
                    scoreColor = "text-red-500";
                  }

                  const isExpanded = expandedCards.has(index);

                  return (
                    <div
                      key={index}
                      className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-white line-clamp-2">
                          {workout.metadata.title}
                        </h3>
                        <span
                          className={`text-sm font-bold ${scoreColor} ml-2 flex-shrink-0 !important`}
                          style={{
                            color:
                              scorePercentage >= 90
                                ? "#10b981" // green-500
                                : scorePercentage >= 80
                                ? "#34d399" // green-400
                                : scorePercentage >= 70
                                ? "#6ee7b7" // green-300
                                : scorePercentage >= 60
                                ? "#fbbf24" // yellow-400
                                : scorePercentage >= 50
                                ? "#fb923c" // orange-400
                                : scorePercentage >= 40
                                ? "#f97316" // orange-500
                                : scorePercentage >= 30
                                ? "#f87171" // red-400
                                : "#ef4444", // red-500
                          }}
                        >
                          {scorePercentage}%
                        </span>
                      </div>

                      <div className="space-y-3">
                        <p
                          className={`text-gray-300 text-sm ${
                            isExpanded ? "" : "line-clamp-3"
                          }`}
                        >
                          {workout.metadata.description}
                        </p>

                        {isExpanded && (
                          <div className="space-y-2 text-sm text-gray-300">
                            <div className="border-t border-gray-700 pt-3">
                              <h4 className="font-semibold text-white mb-2">
                                Workout Details:
                              </h4>
                              <div className="space-y-1">
                                <div>
                                  <span className="font-medium">Title:</span>{" "}
                                  {workout.metadata.title}
                                </div>
                                <div>
                                  <span className="font-medium">
                                    Similarity Score:
                                  </span>{" "}
                                  {scorePercentage}%
                                </div>
                                <div>
                                  <span className="font-medium">
                                    Created by:
                                  </span>{" "}
                                  {workout.metadata.created_by}
                                </div>
                                <div>
                                  <span className="font-medium">
                                    Full Description:
                                  </span>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                  {workout.metadata.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-700">
                        <div className="text-xs text-gray-500">
                          <span className="font-medium">Created by:</span>{" "}
                          {workout.metadata.created_by}
                        </div>
                        <button
                          onClick={() => toggleCardExpansion(index)}
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                        >
                          {isExpanded ? "See less..." : "See more..."}
                        </button>
                      </div>
                    </div>
                  );
                }
              )}
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
              Ready to search
            </h3>
            <p className="text-gray-400 text-center max-w-md">
              Enter a search query above to find workout recommendations using
              similarity search
            </p>
          </div>
        )}

        {/* No Results */}
        {data?.recommendations &&
          data.recommendations.length === 0 &&
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
      </div>

      <ContextualAside
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}
