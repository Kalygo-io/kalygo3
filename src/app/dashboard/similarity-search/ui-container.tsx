"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  MagnifyingGlassIcon,
  InformationCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { ContextualAside } from "@/components/similarity-search/contextual-aside";
import Image from "next/image";

export function SimilaritySearchDemoContainer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["similarity-search", searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) {
        return { results: [] };
      }

      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_AI_API_URL}/api/similarity-search/search`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: searchQuery,
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

      <div className="w-full max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            Similarity Search
          </h1>
          <p className="text-gray-400">
            Search through FAQs using semantic similarity
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full max-w-2xl mx-auto mb-6">
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
        {data?.results && searchQuery.trim() && !isPending && (
          <div className="space-y-3">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white mb-2">
                Found {data.results.length} similar results
              </h2>
            </div>

            {/* Compact Vertical List Layout */}
            <div className="space-y-2">
              {data.results.map(
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

                  // Enhanced color mapping with better contrast for legibility
                  let scoreColor;
                  let scoreBgColor;
                  let scoreBorderColor;
                  let scoreTextColor;

                  if (scorePercentage >= 90) {
                    scoreColor = "text-green-400";
                    scoreBgColor = "bg-green-900/30";
                    scoreBorderColor = "border-green-600/40";
                    scoreTextColor = "text-green-100";
                  } else if (scorePercentage >= 80) {
                    scoreColor = "text-green-300";
                    scoreBgColor = "bg-green-900/25";
                    scoreBorderColor = "border-green-600/35";
                    scoreTextColor = "text-green-100";
                  } else if (scorePercentage >= 70) {
                    scoreColor = "text-green-200";
                    scoreBgColor = "bg-green-900/20";
                    scoreBorderColor = "border-green-600/30";
                    scoreTextColor = "text-green-50";
                  } else if (scorePercentage >= 60) {
                    scoreColor = "text-yellow-300";
                    scoreBgColor = "bg-yellow-900/25";
                    scoreBorderColor = "border-yellow-600/35";
                    scoreTextColor = "text-yellow-100";
                  } else if (scorePercentage >= 50) {
                    scoreColor = "text-orange-300";
                    scoreBgColor = "bg-orange-900/25";
                    scoreBorderColor = "border-orange-600/35";
                    scoreTextColor = "text-orange-100";
                  } else if (scorePercentage >= 40) {
                    scoreColor = "text-orange-400";
                    scoreBgColor = "bg-orange-900/30";
                    scoreBorderColor = "border-orange-600/40";
                    scoreTextColor = "text-orange-100";
                  } else if (scorePercentage >= 30) {
                    scoreColor = "text-red-300";
                    scoreBgColor = "bg-red-900/25";
                    scoreBorderColor = "border-red-600/35";
                    scoreTextColor = "text-red-100";
                  } else {
                    scoreColor = "text-red-400";
                    scoreBgColor = "bg-red-900/30";
                    scoreBorderColor = "border-red-600/40";
                    scoreTextColor = "text-red-100";
                  }

                  const isExpanded = expandedCards.has(index);

                  return (
                    <div
                      key={index}
                      className={`bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 hover:border-gray-600/70 hover:bg-gray-800/70 transition-all duration-200 group ${
                        isExpanded ? "ring-2 ring-blue-500/20" : ""
                      }`}
                    >
                      {/* Compact Header Row */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="flex-shrink-0">
                              <div className="w-6 h-6 bg-blue-600/20 rounded-md flex items-center justify-center">
                                <StarIcon className="w-3 h-3 text-blue-400" />
                              </div>
                            </div>
                            <h3 className="text-base font-semibold text-white line-clamp-1 group-hover:text-blue-100 transition-colors">
                              {workout.metadata.title}
                            </h3>
                          </div>

                          {/* Compact Author Info */}
                          <div className="flex items-center space-x-1 text-xs text-gray-400 ml-8">
                            <UserIcon className="w-3 h-3" />
                            <span>{workout.metadata.created_by}</span>
                          </div>
                        </div>

                        {/* Enhanced Score Badge with better legibility */}
                        <div
                          className={`flex-shrink-0 ml-3 ${scoreBgColor} ${scoreBorderColor} border rounded-md px-2.5 py-1 shadow-sm`}
                        >
                          <div className="flex items-center space-x-1">
                            <span
                              className={`text-sm font-bold ${scoreTextColor}`}
                            >
                              {scorePercentage}%
                            </span>
                            <span className="text-xs text-gray-300 font-medium">
                              similarity
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Compact Description */}
                      <div className="space-y-2 ml-8">
                        <p
                          className={`text-gray-300 text-sm leading-relaxed ${
                            isExpanded ? "" : "line-clamp-2"
                          }`}
                        >
                          {workout.metadata.description}
                        </p>

                        {/* Expanded Details - More compact */}
                        {isExpanded && (
                          <div className="space-y-3 pt-3 border-t border-gray-700/50">
                            <div className="bg-gray-900/30 rounded-md p-3">
                              <h4 className="font-semibold text-white mb-2 flex items-center space-x-2 text-sm">
                                <div className="w-1 h-3 bg-blue-500 rounded-full"></div>
                                <span>Details</span>
                              </h4>
                              <div className="grid grid-cols-2 gap-3 text-xs">
                                <div className="space-y-1">
                                  <div className="flex justify-between">
                                    <span className="text-gray-400 font-medium">
                                      Similarity:
                                    </span>
                                    <span className={`font-bold ${scoreColor}`}>
                                      {scorePercentage}%
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400 font-medium">
                                      Result:
                                    </span>
                                    <span className="text-white">
                                      {index + 1}
                                    </span>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <div className="flex justify-between">
                                    <span className="text-gray-400 font-medium">
                                      Author:
                                    </span>
                                    <span className="text-white truncate">
                                      {workout.metadata.created_by}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400 font-medium">
                                      Total:
                                    </span>
                                    <span className="text-white">
                                      {data.results.length}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="bg-gray-900/20 rounded-md p-3">
                              <h5 className="font-medium text-white mb-2 text-sm">
                                Full Description:
                              </h5>
                              <p className="text-gray-300 text-sm leading-relaxed">
                                {workout.metadata.description}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Compact Action Bar */}
                      <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-700/50 ml-8">
                        <div className="text-xs text-gray-500">
                          <span className="font-medium">
                            Result {index + 1}
                          </span>{" "}
                          of {data.results.length}
                        </div>
                        <button
                          onClick={() => toggleCardExpansion(index)}
                          className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors px-2 py-1 rounded-md hover:bg-blue-500/10"
                        >
                          <span>
                            {isExpanded ? "Show less" : "Show details"}
                          </span>
                          {isExpanded ? (
                            <ChevronUpIcon className="w-3 h-3" />
                          ) : (
                            <ChevronDownIcon className="w-3 h-3" />
                          )}
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
              Enter a search query above to find results using similarity search
            </p>
          </div>
        )}

        {/* No Results */}
        {data?.results &&
          data.results.length === 0 &&
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
