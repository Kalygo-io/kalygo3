"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  CameraIcon,
  MusicalNoteIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export function MultiModalContainer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const { isPending, error, data, isFetching, refetch } = useQuery({
    queryKey: ["media-assets/query", searchQuery],
    queryFn: async () => {
      // Create a new AbortController for this request
      abortControllerRef.current = new AbortController();
      setIsSearching(true);

      try {
        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_AI_API_URL}/api/multi-modal/media-assets/query`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: searchQuery,
            }),
            signal: abortControllerRef.current.signal,
          }
        );

        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`);
        }

        return await resp.json();
      } finally {
        setIsSearching(false);
        abortControllerRef.current = null;
      }
    },
    enabled: false, // Don't auto-trigger, only manual triggers
    retry: false, // Don't retry on abort
  });

  const handleSearch = useCallback(() => {
    if (searchQuery.trim() && !isSearching) {
      refetch();
    }
  }, [searchQuery, refetch, isSearching]);

  const handleCancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsSearching(false);
  }, []);

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter" && searchQuery.trim() && !isSearching) {
      handleSearch();
    }
  };

  const isRequestInFlight = isSearching || isFetching;

  if (error)
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-red-400 mb-4">
            Error Occurred
          </h2>
          <p className="text-gray-300">
            An error has occurred: {error.message}
          </p>
          <button
            onClick={() => {
              setIsQueryEnabled(false);
              setSearchQuery("");
            }}
            className="mt-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    );

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          Multimodal Embeddings Search
        </h1>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          Search across images and audio files using natural language queries
          powered by multimodal AI
        </p>
      </div>

      {/* Search Section */}
      <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-700/30 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Search Media Assets
        </h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          Enter a natural language description to find relevant images and audio
          files. The AI will understand your query and return the most
          semantically similar media.
        </p>

        <div className="relative">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="What are you looking for? (e.g., 'a cat playing with a ball', 'upbeat music')"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={isRequestInFlight}
              />
              <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {isRequestInFlight ? (
              <button
                onClick={handleCancel}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
              >
                <XMarkIcon className="w-5 h-5" />
                <span>Cancel</span>
              </button>
            ) : (
              <button
                onClick={handleSearch}
                disabled={!searchQuery.trim()}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
                <span>Search</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-4 mt-4 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <CameraIcon className="w-4 h-4" />
              <span>Images</span>
            </div>
            <div className="flex items-center space-x-2">
              <MusicalNoteIcon className="w-4 h-4" />
              <span>Audio</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {data?.results && data.results.length > 0 && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-700/30 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Search Results
            </h2>
            <p className="text-gray-300 mb-6">
              Found {data.results.length} media assets matching your query
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.results.map((result: any, index: number) => {
                const scoreColor =
                  Math.round(result.score * 100) > 80
                    ? "text-green-400"
                    : Math.round(result.score * 100) > 60
                    ? "text-yellow-400"
                    : Math.round(result.score * 100) > 40
                    ? "text-orange-400"
                    : "text-red-400";

                return (
                  <div
                    key={index}
                    className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-2">
                        {result?.metadata?.modality === "vision" ? (
                          <CameraIcon className="w-5 h-5 text-blue-400" />
                        ) : (
                          <MusicalNoteIcon className="w-5 h-5 text-green-400" />
                        )}
                        <h5 className="text-lg font-semibold text-white capitalize">
                          {result.metadata.modality}
                        </h5>
                      </div>
                      <span className={`text-sm font-bold ${scoreColor}`}>
                        {Math.round(result.score * 100)}%
                      </span>
                    </div>

                    <div className="mb-3">
                      {result?.metadata?.modality === "vision" ? (
                        <div className="relative">
                          <img
                            width="100%"
                            height="auto"
                            src={`https://media.kalygo.io/multi-modal/images/${result.metadata.filename}`}
                            alt={result.metadata.filename}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                      ) : (
                        <div className="bg-gray-900 rounded-lg p-4">
                          <audio controls className="w-full">
                            <source
                              src={`https://media.kalygo.io/multi-modal/audio/${result.metadata.filename}`}
                              type="audio/wav"
                            />
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-gray-300 font-medium">
                        {result?.metadata?.filename}
                      </p>
                      <div className="text-xs text-gray-400">
                        <span className="font-medium">Created by:</span>{" "}
                        fairuse@fairuse.com
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isRequestInFlight && (
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-2 text-gray-400">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
            <span>Searching media assets...</span>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!data?.results && !isRequestInFlight && searchQuery && (
        <div className="text-center py-8">
          <div className="text-gray-400">
            <CameraIcon className="w-12 h-12 mx-auto mb-4 text-gray-600" />
            <p className="text-lg">No media assets found</p>
            <p className="text-sm">Try adjusting your search query</p>
          </div>
        </div>
      )}

      {/* Initial State */}
      {!data?.results && !isRequestInFlight && !searchQuery && (
        <div className="text-center py-12">
          <div className="text-gray-400">
            <div className="flex justify-center space-x-4 mb-4">
              <CameraIcon className="w-12 h-12 text-blue-400" />
              <MusicalNoteIcon className="w-12 h-12 text-green-400" />
            </div>
            <p className="text-lg mb-2">Ready to search</p>
            <p className="text-sm">
              Enter a query above to find images and audio files
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
