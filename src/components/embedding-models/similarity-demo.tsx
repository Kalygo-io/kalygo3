"use client";

import { useState } from "react";
import {
  MagnifyingGlassIcon,
  SparklesIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export function SimilarityDemo() {
  const [searchQuery, setSearchQuery] = useState("machine learning");
  const [selectedApplication, setSelectedApplication] = useState("search");

  const searchResults = [
    {
      title: "Introduction to Machine Learning",
      similarity: 0.95,
      category: "Tutorial",
    },
    {
      title: "Deep Learning Fundamentals",
      similarity: 0.87,
      category: "Course",
    },
    { title: "AI and Neural Networks", similarity: 0.82, category: "Article" },
    { title: "Data Science Basics", similarity: 0.76, category: "Guide" },
    {
      title: "Programming with Python",
      similarity: 0.68,
      category: "Tutorial",
    },
    { title: "Web Development", similarity: 0.45, category: "Course" },
  ];

  const recommendationExamples = [
    {
      user: "Alice",
      interests: ["machine learning", "python", "data science"],
      recommendations: [
        "Deep Learning Course",
        "Python for ML",
        "Statistics Fundamentals",
      ],
    },
    {
      user: "Bob",
      interests: ["web development", "javascript", "react"],
      recommendations: [
        "Advanced React",
        "Node.js Backend",
        "Full Stack Development",
      ],
    },
    {
      user: "Carol",
      interests: ["mobile development", "swift", "ios"],
      recommendations: [
        "iOS App Development",
        "SwiftUI Mastery",
        "Mobile UI/UX",
      ],
    },
  ];

  const moderationExamples = [
    { text: "I love this product!", category: "Positive", confidence: 0.98 },
    {
      text: "This is terrible, I hate it",
      category: "Negative",
      confidence: 0.94,
    },
    {
      text: "How do I reset my password?",
      category: "Neutral",
      confidence: 0.89,
    },
    {
      text: "This is absolutely amazing!",
      category: "Positive",
      confidence: 0.96,
    },
  ];

  const renderSearchDemo = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Search Query
        </label>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Enter your search query..."
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-white">
          Search Results (Ranked by Similarity)
        </h4>
        {searchResults.map((result, index) => (
          <div
            key={index}
            className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-medium text-white">{result.title}</h5>
              <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded">
                {result.category}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${result.similarity * 100}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-sm text-gray-400">
                {(result.similarity * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRecommendationDemo = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h4 className="text-lg font-semibold text-white mb-2">
          Personalized Recommendations
        </h4>
        <p className="text-gray-400 text-sm">
          Based on user interests and content embeddings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendationExamples.map((user, index) => (
          <div
            key={index}
            className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
          >
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                {user.user[0]}
              </div>
              <div>
                <h5 className="font-medium text-white">{user.user}</h5>
                <p className="text-xs text-gray-400">User</p>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-xs text-gray-400 mb-1">Interests:</p>
              <div className="flex flex-wrap gap-1">
                {user.interests.map((interest, i) => (
                  <span
                    key={i}
                    className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-400 mb-1">Recommended:</p>
              <div className="space-y-1">
                {user.recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="text-xs text-gray-300 bg-gray-700/50 px-2 py-1 rounded"
                  >
                    {rec}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderModerationDemo = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h4 className="text-lg font-semibold text-white mb-2">
          Content Moderation
        </h4>
        <p className="text-gray-400 text-sm">
          Automatic sentiment analysis using embeddings
        </p>
      </div>

      <div className="space-y-4">
        {moderationExamples.map((example, index) => (
          <div
            key={index}
            className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <p className="text-white text-sm mb-2">"{example.text}"</p>
                <div className="flex items-center space-x-3">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      example.category === "Positive"
                        ? "bg-green-600/20 text-green-400"
                        : example.category === "Negative"
                        ? "bg-red-600/20 text-red-400"
                        : "bg-gray-600/20 text-gray-400"
                    }`}
                  >
                    {example.category}
                  </span>
                  <span className="text-xs text-gray-400">
                    Confidence: {(example.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              <div className="ml-4">
                <div className="w-16 h-16 rounded-full border-4 border-gray-700 flex items-center justify-center">
                  <div
                    className={`w-12 h-12 rounded-full ${
                      example.category === "Positive"
                        ? "bg-green-500"
                        : example.category === "Negative"
                        ? "bg-red-500"
                        : "bg-gray-500"
                    }`}
                    style={{ opacity: example.confidence }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
        <SparklesIcon className="w-6 h-6 mr-3 text-blue-400" />
        Real-World Applications Demo
      </h3>

      <div className="mb-6">
        <div className="flex space-x-2">
          {[
            {
              id: "search",
              name: "Semantic Search",
              icon: MagnifyingGlassIcon,
            },
            {
              id: "recommendations",
              name: "Recommendations",
              icon: ChartBarIcon,
            },
            {
              id: "moderation",
              name: "Content Moderation",
              icon: SparklesIcon,
            },
          ].map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => setSelectedApplication(app.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedApplication === app.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{app.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="min-h-[400px]">
        {selectedApplication === "search" && renderSearchDemo()}
        {selectedApplication === "recommendations" &&
          renderRecommendationDemo()}
        {selectedApplication === "moderation" && renderModerationDemo()}
      </div>

      <div className="mt-8 p-4 bg-blue-600/10 border border-blue-500/20 rounded-lg">
        <h4 className="text-lg font-semibold text-white mb-2">How It Works</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
          <div>
            <p className="font-medium text-blue-400 mb-1">
              1. Embedding Generation
            </p>
            <p>
              Content is converted to high-dimensional vectors that capture
              semantic meaning.
            </p>
          </div>
          <div>
            <p className="font-medium text-blue-400 mb-1">
              2. Similarity Calculation
            </p>
            <p>
              Mathematical operations compute how similar different pieces of
              content are.
            </p>
          </div>
          <div>
            <p className="font-medium text-blue-400 mb-1">
              3. Intelligent Ranking
            </p>
            <p>
              Results are ranked by relevance, enabling powerful AI
              applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
