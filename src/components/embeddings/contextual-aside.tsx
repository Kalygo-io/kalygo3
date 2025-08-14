"use client";

import { useState } from "react";
import {
  InformationCircleIcon,
  LightBulbIcon,
  XMarkIcon,
  ChartBarIcon,
  BeakerIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

interface ContextualAsideProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContextualAside({ isOpen, onClose }: ContextualAsideProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", name: "Overview", icon: InformationCircleIcon },
    { id: "math", name: "Mathematics", icon: AcademicCapIcon },
    { id: "examples", name: "Examples", icon: BeakerIcon },
    { id: "flowchart", name: "Flow Chart", icon: ChartBarIcon },
  ];

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
            <h2 className="text-lg font-semibold text-white">
              Vector Embeddings
            </h2>
            <div className="flex items-center space-x-2">
              <LightBulbIcon className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-400">Foundation</span>
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
            {activeTab === "overview" && (
              <div className="space-y-4">
                <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">
                    The Foundation of AI Understanding
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    Vector embeddings are the mathematical foundation that
                    enables AI systems to understand and work with text. They
                    transform words into numbers while preserving semantic
                    relationships.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-md font-semibold text-white">
                    Why Vector Embeddings Matter:
                  </h4>
                  <ul className="space-y-2 text-sm text-white">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Enable semantic search and similarity</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Power modern NLP applications</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Bridge human language and AI computation</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Enable mathematical operations on meaning</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "math" && (
              <div className="space-y-4">
                <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-400 mb-2">
                    Mathematical Foundation
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    Vector embeddings rely on linear algebra and geometry to
                    represent semantic relationships in high-dimensional space.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-md font-semibold text-white">
                    Key Mathematical Concepts:
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <h5 className="font-semibold text-white mb-1">
                        Cosine Similarity
                      </h5>
                      <p className="text-gray-300 text-xs">
                        cos(θ) = (A·B) / (||A|| × ||B||)
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        Measures angle between vectors, range: -1 to 1
                      </p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <h5 className="font-semibold text-white mb-1">
                        Vector Operations
                      </h5>
                      <p className="text-gray-300 text-xs">
                        king - man + woman ≈ queen
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        Mathematical operations preserve semantic relationships
                      </p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <h5 className="font-semibold text-white mb-1">
                        Dimensionality
                      </h5>
                      <p className="text-gray-300 text-xs">
                        Typically 100-1000+ dimensions
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        Higher dimensions capture more nuanced relationships
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "examples" && (
              <div className="space-y-4">
                <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">
                    Famous Examples
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    These classic examples demonstrate how vector embeddings
                    capture semantic relationships through mathematical
                    operations.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-md font-semibold text-white">
                    Word2Vec Examples:
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <div className="text-white font-medium">
                        Gender Relationships
                      </div>
                      <div className="text-gray-300 text-xs mt-1">
                        king - man + woman ≈ queen
                      </div>
                      <div className="text-gray-300 text-xs">
                        uncle - man + woman ≈ aunt
                      </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <div className="text-white font-medium">
                        Geographic Relationships
                      </div>
                      <div className="text-gray-300 text-xs mt-1">
                        paris - france + italy ≈ rome
                      </div>
                      <div className="text-gray-300 text-xs">
                        tokyo - japan + china ≈ beijing
                      </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <div className="text-white font-medium">
                        Semantic Similarity
                      </div>
                      <div className="text-gray-300 text-xs mt-1">
                        happy ≈ joyful, delighted, pleased
                      </div>
                      <div className="text-gray-300 text-xs">
                        sad ≈ unhappy, depressed, gloomy
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "flowchart" && (
              <div className="space-y-4">
                <div className="bg-orange-900/20 border border-orange-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-orange-400 mb-2">
                    Embedding Process Flow
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    The journey from raw text to meaningful vector
                    representations.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-md font-semibold text-white">
                    Processing Steps:
                  </h4>
                  <ol className="space-y-2 text-sm text-white list-decimal list-inside">
                    <li>Text preprocessing and tokenization</li>
                    <li>Context window analysis</li>
                    <li>Neural network training</li>
                    <li>Vector space mapping</li>
                    <li>Similarity calculation</li>
                    <li>Application-specific usage</li>
                  </ol>
                </div>

                <div className="bg-gray-800 rounded-lg p-8 text-center">
                  <ChartBarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-white text-lg font-medium">
                    Interactive Flow Chart
                  </p>
                  <p className="text-gray-400 text-sm mt-2">Coming Soon</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
