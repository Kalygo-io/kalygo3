"use client";

import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  CalculatorIcon,
  DocumentTextIcon,
  ChartBarIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

interface Document {
  id: string;
  title: string;
  content: string;
  length: number;
  wordCount: number;
}

interface SearchResult {
  document: Document;
  score: number;
  tf: number;
  idf: number;
  bm25Score: number;
  breakdown: {
    term: string;
    tf: number;
    idf: number;
    score: number;
  }[];
}

export function BM25DemoContainer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [k1, setK1] = useState(1.2);
  const [b, setB] = useState(0.75);
  const [activeTab, setActiveTab] = useState("basics");

  // Sample document collection
  const documents: Document[] = [
    {
      id: "doc1",
      title: "Machine Learning Basics",
      content:
        "Machine learning is a subset of artificial intelligence that enables computers to learn and make decisions without being explicitly programmed. It uses algorithms to identify patterns in data and make predictions.",
      length: 25,
      wordCount: 25,
    },
    {
      id: "doc2",
      title: "Deep Learning Fundamentals",
      content:
        "Deep learning is a subset of machine learning that uses neural networks with multiple layers to model complex patterns. It has revolutionized computer vision and natural language processing.",
      length: 28,
      wordCount: 28,
    },
    {
      id: "doc3",
      title: "Information Retrieval Systems",
      content:
        "Information retrieval systems help users find relevant documents from large collections. They use various ranking algorithms like BM25 to score and rank documents based on relevance to user queries.",
      length: 30,
      wordCount: 30,
    },
    {
      id: "doc4",
      title: "Search Engine Optimization",
      content:
        "Search engine optimization involves optimizing websites to rank higher in search engine results. It includes keyword research, content optimization, and technical improvements.",
      length: 22,
      wordCount: 22,
    },
    {
      id: "doc5",
      title: "Natural Language Processing",
      content:
        "Natural language processing is a field of artificial intelligence that focuses on enabling computers to understand, interpret, and generate human language. It combines linguistics and machine learning.",
      length: 26,
      wordCount: 26,
    },
  ];

  // Calculate average document length
  const avgdl =
    documents.reduce((sum, doc) => sum + doc.wordCount, 0) / documents.length;

  // Calculate IDF for a term
  const calculateIDF = (term: string): number => {
    const N = documents.length;
    const n = documents.filter((doc) =>
      doc.content.toLowerCase().includes(term.toLowerCase())
    ).length;
    return Math.log((N - n + 0.5) / (n + 0.5) + 1);
  };

  // Calculate term frequency in a document
  const calculateTF = (term: string, document: Document): number => {
    const words = document.content.toLowerCase().split(/\s+/);
    return words.filter((word) => word === term.toLowerCase()).length;
  };

  // Calculate BM25 score for a document
  const calculateBM25Score = (
    query: string,
    document: Document
  ): SearchResult => {
    const terms = query
      .toLowerCase()
      .split(/\s+/)
      .filter((term) => term.length > 0);
    let totalScore = 0;
    const breakdown: {
      term: string;
      tf: number;
      idf: number;
      score: number;
    }[] = [];

    terms.forEach((term) => {
      const tf = calculateTF(term, document);
      const idf = calculateIDF(term);

      // BM25 formula
      const numerator = tf * (k1 + 1);
      const denominator = tf + k1 * (1 - b + b * (document.wordCount / avgdl));
      const termScore = idf * (numerator / denominator);

      totalScore += termScore;
      breakdown.push({ term, tf, idf, score: termScore });
    });

    return {
      document,
      score: totalScore,
      tf: terms.reduce((sum, term) => sum + calculateTF(term, document), 0),
      idf: terms.reduce((sum, term) => sum + calculateIDF(term), 0),
      bm25Score: totalScore,
      breakdown,
    };
  };

  // Get search results
  const getSearchResults = (): SearchResult[] => {
    if (!searchQuery.trim()) return [];

    return documents
      .map((doc) => calculateBM25Score(searchQuery, doc))
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score);
  };

  const searchResults = getSearchResults();

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          BM25 Information Retrieval
        </h1>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          Explore the Okapi BM25 ranking function used by search engines to
          estimate document relevance
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center mb-8">
        {[
          { id: "basics", name: "Basics", icon: AcademicCapIcon },
          { id: "formula", name: "Formula", icon: CalculatorIcon },
          { id: "demo", name: "Demo", icon: MagnifyingGlassIcon },
          { id: "parameters", name: "Parameters", icon: ChartBarIcon },
        ].map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`flex items-center space-x-2 px-4 py-2 mx-2 mb-2 rounded-lg transition-colors ${
                activeTab === section.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{section.name}</span>
            </button>
          );
        })}
      </div>

      {/* Content Sections */}
      <div className="space-y-8">
        {/* Basics Section */}
        {activeTab === "basics" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700/30 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">
                What is BM25?
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                BM25 (Best Matching 25) is a ranking function used by search
                engines to estimate the relevance of documents to a given search
                query. It&quot;s based on the probabilistic retrieval framework
                developed by Stephen E. Robertson, Karen Spärck Jones, and
                others.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Key Components
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>
                      • <strong>Term Frequency (TF):</strong> How often a term
                      appears in a document
                    </li>
                    <li>
                      • <strong>Inverse Document Frequency (IDF):</strong> How
                      rare a term is across all documents
                    </li>
                    <li>
                      • <strong>Document Length Normalization:</strong> Accounts
                      for document length bias
                    </li>
                    <li>
                      • <strong>Parameter Tuning:</strong> k1 and b parameters
                      for fine-tuning
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Advantages
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Handles document length variations</li>
                    <li>• Balances term frequency and rarity</li>
                    <li>• Proven effectiveness in search engines</li>
                    <li>• Tunable parameters for different domains</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Formula Section */}
        {activeTab === "formula" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-700/30 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">
                BM25 Formula
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                The BM25 scoring function combines term frequency, inverse
                document frequency, and document length normalization.
              </p>

              <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Main Formula
                </h3>
                <div className="text-center">
                  <div className="text-gray-300 text-lg font-mono bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    score(D,Q) = Σ IDF(qi) × (f(qi,D) × (k1 + 1)) / (f(qi,D) +
                    k1 × (1 - b + b × |D|/avgdl))
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3">
                    IDF Component
                  </h4>
                  <div className="text-gray-300 text-sm font-mono bg-gray-900 p-3 rounded mb-3">
                    IDF(qi) = ln((N - n(qi) + 0.5) / (n(qi) + 0.5) + 1)
                  </div>
                  <p className="text-gray-400 text-sm">
                    Where N is total documents, n(qi) is documents containing
                    term qi
                  </p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3">
                    Parameters
                  </h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>
                      • <strong>k1:</strong> Term frequency saturation (1.2-2.0)
                    </li>
                    <li>
                      • <strong>b:</strong> Length normalization (0.75 default)
                    </li>
                    <li>
                      • <strong>|D|:</strong> Document length in words
                    </li>
                    <li>
                      • <strong>avgdl:</strong> Average document length
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Demo Section */}
        {activeTab === "demo" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-700/30 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Interactive BM25 Demo
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Search through a sample document collection and see how BM25
                calculates relevance scores.
              </p>

              {/* Search Input */}
              <div className="mb-6">
                <div className="flex items-center space-x-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Enter search terms (e.g., 'machine learning', 'artificial intelligence')"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Results */}
              {searchQuery && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white">
                      Search Results ({searchResults.length} documents)
                    </h3>
                    <div className="text-sm text-gray-400">
                      Avg document length: {avgdl.toFixed(1)} words
                    </div>
                  </div>

                  {searchResults.map((result, index) => (
                    <div
                      key={result.document.id}
                      className="bg-gray-800/50 border border-gray-700 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-1">
                            {result.document.title}
                          </h4>
                          <p className="text-gray-300 text-sm mb-2">
                            {result.document.content}
                          </p>
                          <div className="text-xs text-gray-400">
                            Document length: {result.document.wordCount} words
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-400">
                            {result.score.toFixed(3)}
                          </div>
                          <div className="text-xs text-gray-400">
                            BM25 Score
                          </div>
                        </div>
                      </div>

                      {/* Score Breakdown */}
                      <div className="mt-4">
                        <h5 className="text-sm font-semibold text-white mb-2">
                          Score Breakdown:
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {result.breakdown.map((term, idx) => (
                            <div
                              key={idx}
                              className="bg-gray-900 rounded p-2 text-xs"
                            >
                              <div className="text-white font-medium">
                                {term.term}
                              </div>
                              <div className="text-gray-400">
                                TF: {term.tf} | IDF: {term.idf.toFixed(3)} |
                                Score: {term.score.toFixed(3)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                  {searchResults.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      No documents match your search query.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Parameters Section */}
        {activeTab === "parameters" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-700/30 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">
                BM25 Parameters
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Adjust the k1 and b parameters to see how they affect the BM25
                scoring.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    k1 Parameter (Term Frequency Saturation)
                  </h3>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      k1: {k1}
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="3.0"
                      step="0.1"
                      value={k1}
                      onChange={(e) => setK1(parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>0.5</span>
                      <span>1.2 (default)</span>
                      <span>3.0</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Controls how much additional weight is given to each
                    additional occurrence of a term. Higher values mean more
                    weight for repeated terms.
                  </p>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    b Parameter (Length Normalization)
                  </h3>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      b: {b}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={b}
                      onChange={(e) => setB(parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>0 (BM15)</span>
                      <span>0.75 (default)</span>
                      <span>1 (BM11)</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Controls document length normalization. b=0 means no
                    normalization, b=1 means full normalization.
                  </p>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Parameter Effects
                </h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      k1 Effects:
                    </h4>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Low k1: Less weight for repeated terms</li>
                      <li>• High k1: More weight for repeated terms</li>
                      <li>• Default: 1.2 (good balance)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      b Effects:
                    </h4>
                    <ul className="text-gray-300 space-y-1">
                      <li>• b=0: No length normalization</li>
                      <li>• b=1: Full length normalization</li>
                      <li>• Default: 0.75 (moderate normalization)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Special Cases:
                    </h4>
                    <ul className="text-gray-300 space-y-1">
                      <li>• b=0: BM15 algorithm</li>
                      <li>• b=1: BM11 algorithm</li>
                      <li>• k1=0: Binary relevance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
