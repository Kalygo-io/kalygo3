"use client";

import { useState, useEffect } from "react";
import {
  ArrowRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export function InteractiveVectorDemo() {
  const [selectedWord, setSelectedWord] = useState("cat");
  const [similarity, setSimilarity] = useState(0.85);
  const [isAnimating, setIsAnimating] = useState(false);

  const words = [
    { word: "cat", vector: [0.8, 0.6, 0.3], color: "blue" },
    { word: "dog", vector: [0.7, 0.5, 0.4], color: "green" },
    { word: "pet", vector: [0.6, 0.4, 0.2], color: "purple" },
    { word: "animal", vector: [0.5, 0.3, 0.1], color: "orange" },
    { word: "computer", vector: [-0.8, -0.6, -0.3], color: "red" },
    { word: "technology", vector: [-0.7, -0.5, -0.4], color: "pink" },
  ];

  const selectedWordData = words.find((w) => w.word === selectedWord);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [selectedWord]);

  const calculateSimilarity = (word1: string, word2: string) => {
    const w1 = words.find((w) => w.word === word1);
    const w2 = words.find((w) => w.word === word2);
    if (!w1 || !w2) return 0;

    // Simple cosine similarity calculation
    const dotProduct = w1.vector.reduce(
      (sum, val, i) => sum + val * w2.vector[i],
      0
    );
    const mag1 = Math.sqrt(w1.vector.reduce((sum, val) => sum + val * val, 0));
    const mag2 = Math.sqrt(w2.vector.reduce((sum, val) => sum + val * val, 0));
    return Math.max(0, dotProduct / (mag1 * mag2));
  };

  return (
    <div className="space-y-8">
      {/* Vector Space Visualization */}
      <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <MagnifyingGlassIcon className="w-6 h-6 mr-3 text-blue-400" />
          3D Vector Space Visualization
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Interactive Vector Space
            </h4>
            <p className="text-gray-300 mb-6">
              Each word is represented as a point in 3D space. Similar words are
              positioned closer together, while different words are farther
              apart. Click on words to see their relationships!
            </p>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {words.map((wordData) => (
                  <button
                    key={wordData.word}
                    onClick={() => setSelectedWord(wordData.word)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedWord === wordData.word
                        ? `bg-${wordData.color}-500 text-white shadow-lg scale-105`
                        : `bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white`
                    }`}
                  >
                    {wordData.word}
                  </button>
                ))}
              </div>

              {selectedWordData && (
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">
                    Selected: {selectedWordData.word}
                  </h5>
                  <p className="text-sm text-gray-400 mb-2">
                    Vector coordinates:
                  </p>
                  <p className="text-xs font-mono text-blue-400">
                    [
                    {selectedWordData.vector
                      .map((v) => v.toFixed(2))
                      .join(", ")}
                    ]
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="w-full h-64 bg-gray-800/30 rounded-lg border border-gray-700 relative overflow-hidden">
              {/* 3D Grid Lines */}
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" viewBox="0 0 300 200">
                  {/* Grid lines */}
                  <line
                    x1="0"
                    y1="50"
                    x2="300"
                    y2="50"
                    stroke="gray"
                    strokeWidth="1"
                  />
                  <line
                    x1="0"
                    y1="100"
                    x2="300"
                    y2="100"
                    stroke="gray"
                    strokeWidth="1"
                  />
                  <line
                    x1="0"
                    y1="150"
                    x2="300"
                    y2="150"
                    stroke="gray"
                    strokeWidth="1"
                  />
                  <line
                    x1="50"
                    y1="0"
                    x2="50"
                    y2="200"
                    stroke="gray"
                    strokeWidth="1"
                  />
                  <line
                    x1="100"
                    y1="0"
                    x2="100"
                    y2="200"
                    stroke="gray"
                    strokeWidth="1"
                  />
                  <line
                    x1="150"
                    y1="0"
                    x2="150"
                    y2="200"
                    stroke="gray"
                    strokeWidth="1"
                  />
                  <line
                    x1="200"
                    y1="0"
                    x2="200"
                    y2="200"
                    stroke="gray"
                    strokeWidth="1"
                  />
                  <line
                    x1="250"
                    y1="0"
                    x2="250"
                    y2="200"
                    stroke="gray"
                    strokeWidth="1"
                  />
                </svg>
              </div>

              {/* Word Points */}
              {words.map((wordData, index) => {
                const [x, y, z] = wordData.vector;
                const screenX = 150 + x * 100;
                const screenY = 100 + y * 50;
                const isSelected = selectedWord === wordData.word;

                return (
                  <div
                    key={wordData.word}
                    className={`absolute w-4 h-4 rounded-full transition-all duration-500 ${
                      isSelected
                        ? `bg-${wordData.color}-500 shadow-lg shadow-${wordData.color}-500/50 scale-150`
                        : `bg-${wordData.color}-400`
                    }`}
                    style={{
                      left: `${screenX}px`,
                      top: `${screenY}px`,
                      transform: `translate(-50%, -50%) ${
                        isSelected ? "scale(1.5)" : "scale(1)"
                      }`,
                    }}
                  >
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-white font-medium">
                      {wordData.word}
                    </div>
                  </div>
                );
              })}

              {/* Connection Lines */}
              {selectedWordData &&
                words.map((wordData) => {
                  if (wordData.word === selectedWord) return null;

                  const [x1, y1] = selectedWordData.vector;
                  const [x2, y2] = wordData.vector;
                  const screenX1 = 150 + x1 * 100;
                  const screenY1 = 100 + y1 * 50;
                  const screenX2 = 150 + x2 * 100;
                  const screenY2 = 100 + y2 * 50;

                  const sim = calculateSimilarity(selectedWord, wordData.word);
                  const opacity = sim * 0.6;

                  return (
                    <svg
                      key={`line-${wordData.word}`}
                      className="absolute inset-0 pointer-events-none"
                      style={{ opacity }}
                    >
                      <line
                        x1={screenX1}
                        y1={screenY1}
                        x2={screenX2}
                        y2={screenY2}
                        stroke={wordData.color}
                        strokeWidth="2"
                        strokeDasharray={sim > 0.7 ? "none" : "5,5"}
                      />
                    </svg>
                  );
                })}
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-400">
                Similar words are connected with solid lines, different words
                with dashed lines
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Similarity Calculator */}
      <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
        <h3 className="text-2xl font-bold text-white mb-6">
          Similarity Calculator
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Word Comparison
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Word 1
                </label>
                <select
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                  value={selectedWord}
                  onChange={(e) => setSelectedWord(e.target.value)}
                >
                  {words.map((wordData) => (
                    <option key={wordData.word} value={wordData.word}>
                      {wordData.word}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Word 2
                </label>
                <select
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                  value={
                    words.find((w) => w.word !== selectedWord)?.word ||
                    words[1].word
                  }
                  onChange={(e) => {
                    const sim = calculateSimilarity(
                      selectedWord,
                      e.target.value
                    );
                    setSimilarity(sim);
                  }}
                >
                  {words
                    .filter((w) => w.word !== selectedWord)
                    .map((wordData) => (
                      <option key={wordData.word} value={wordData.word}>
                        {wordData.word}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Similarity Score
            </h4>
            <div className="bg-gray-800/50 rounded-lg p-6">
              <div className="text-center">
                <div
                  className={`text-4xl font-bold mb-2 ${
                    similarity > 0.7
                      ? "text-green-400"
                      : similarity > 0.4
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {(similarity * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-400 mb-4">
                  Cosine Similarity
                </div>

                <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      similarity > 0.7
                        ? "bg-green-500"
                        : similarity > 0.4
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${similarity * 100}%` }}
                  ></div>
                </div>

                <div className="text-xs text-gray-400">
                  {similarity > 0.7
                    ? "Very Similar"
                    : similarity > 0.4
                    ? "Somewhat Similar"
                    : "Very Different"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mathematical Foundation */}
      <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
        <h3 className="text-2xl font-bold text-white mb-6">
          Mathematical Foundation
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Vector Operations
            </h4>
            <div className="space-y-4 text-sm">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h5 className="font-semibold text-blue-400 mb-2">
                  Dot Product
                </h5>
                <p className="text-gray-300 mb-2">
                  Measures the similarity between two vectors by calculating
                  their dot product.
                </p>
                <p className="text-xs font-mono text-green-400">
                  A · B = Σ(Ai × Bi)
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4">
                <h5 className="font-semibold text-purple-400 mb-2">
                  Cosine Similarity
                </h5>
                <p className="text-gray-300 mb-2">
                  Normalizes the dot product by the magnitudes of both vectors.
                </p>
                <p className="text-xs font-mono text-green-400">
                  cos(θ) = (A · B) / (||A|| × ||B||)
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4">
                <h5 className="font-semibold text-orange-400 mb-2">
                  Euclidean Distance
                </h5>
                <p className="text-gray-300 mb-2">
                  Measures the straight-line distance between two points in
                  vector space.
                </p>
                <p className="text-xs font-mono text-green-400">
                  d = √(Σ(Ai - Bi)²)
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Why Vectors Work
            </h4>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-white">
                    Semantic Relationships
                  </p>
                  <p className="text-sm">
                    Words with similar meanings are positioned close together in
                    vector space.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-white">
                    Mathematical Operations
                  </p>
                  <p className="text-sm">
                    Vectors enable powerful operations like addition,
                    subtraction, and similarity calculations.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-white">Scalability</p>
                  <p className="text-sm">
                    Vector operations scale efficiently to handle millions of
                    words and documents.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-white">Dimensionality</p>
                  <p className="text-sm">
                    High-dimensional spaces can capture complex semantic
                    relationships that simple metrics cannot.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
