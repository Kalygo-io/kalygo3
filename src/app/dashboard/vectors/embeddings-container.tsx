"use client";

import React, { useState } from "react";
import {
  InformationCircleIcon,
  LightBulbIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";
import { ContextualAside } from "@/components/embeddings/contextual-aside";

export function EmbeddingsDemoContainer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("basics");

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleDrawer}
        className="fixed top-20 right-4 z-50 flex items-center space-x-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-600 transition-colors text-white shadow-lg"
      >
        <InformationCircleIcon className="w-4 h-4 text-blue-400" />
      </button>

      <div className="w-full max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Understanding Vector Embeddings
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Explore the fundamental building blocks of how AI represents and
            understands text through high-dimensional vectors
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center mb-8">
          {[
            { id: "basics", name: "Basics", icon: LightBulbIcon },
            { id: "visualization", name: "Visualization", icon: BeakerIcon },
          ].map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-2 mx-2 mb-2 rounded-lg transition-colors ${
                  activeSection === section.id
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
          {activeSection === "basics" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700/30 rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  What are Vector Embeddings?
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Vector embeddings are numerical representations of text that
                  capture semantic meaning. Words with similar meanings are
                  mapped to nearby points in high-dimensional space, allowing AI
                  systems to understand relationships between concepts.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Key Properties
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Similar words have similar vectors</li>
                      <li>• Mathematical operations preserve meaning</li>
                      <li>
                        • High-dimensional (typically 100-1000+ dimensions)
                      </li>
                      <li>• Learned from large text corpora</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Example Relationships
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• king - man + woman ≈ queen</li>
                      <li>• paris - france + italy ≈ rome</li>
                      <li>• happy - sad ≈ opposite meanings</li>
                      <li>• cat - dog ≈ similar animals</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Visualization Section */}
          {activeSection === "visualization" && (
            <div className="space-y-6">
              {/* TensorFlow Projector Section */}
              <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-700/30 rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Interactive Visualization Tools
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Explore and visualize vector embeddings in high-dimensional
                  space using powerful interactive tools.
                </p>

                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <BeakerIcon className="w-8 h-8 text-indigo-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">
                        TensorFlow Projector
                      </h3>
                      <p className="text-gray-300 mb-4">
                        Interactive visualization tool for exploring
                        high-dimensional embeddings using dimensionality
                        reduction techniques like t-SNE, UMAP, and PCA.
                      </p>
                      <a
                        href="https://projector.tensorflow.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                      >
                        Open TensorFlow Projector
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-3">
                      Key Features
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Upload your own embedding data</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>
                          Multiple dimensionality reduction algorithms
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Interactive 2D and 3D visualizations</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Nearest neighbor analysis</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Metadata filtering and coloring</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-3">
                      Use Cases
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Explore word embeddings and relationships</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Analyze document embeddings and clusters</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Visualize model training progress</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Debug embedding quality issues</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Share visualizations with stakeholders</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ContextualAside
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}
