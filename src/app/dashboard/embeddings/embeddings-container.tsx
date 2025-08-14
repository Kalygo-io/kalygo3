"use client";

import React, { useState } from "react";
import {
  InformationCircleIcon,
  LightBulbIcon,
  BeakerIcon,
  ChartBarIcon,
  CubeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { ContextualAside } from "@/components/embeddings/contextual-aside";

interface Vector3D {
  x: number;
  y: number;
  z: number;
}

interface EmbeddingExample {
  text: string;
  vector: Vector3D;
  color: string;
}

export function EmbeddingsDemoContainer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("basics");

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const exampleEmbeddings: EmbeddingExample[] = [
    { text: "king", vector: { x: 0.8, y: 0.6, z: 0.9 }, color: "#3B82F6" },
    { text: "queen", vector: { x: 0.7, y: 0.8, z: 0.8 }, color: "#8B5CF6" },
    { text: "man", vector: { x: 0.9, y: 0.4, z: 0.7 }, color: "#10B981" },
    { text: "woman", vector: { x: 0.6, y: 0.9, z: 0.6 }, color: "#F59E0B" },
    { text: "cat", vector: { x: 0.3, y: 0.2, z: 0.4 }, color: "#EF4444" },
    { text: "dog", vector: { x: 0.4, y: 0.3, z: 0.5 }, color: "#EC4899" },
  ];

  const calculateSimilarity = (vec1: Vector3D, vec2: Vector3D): number => {
    const dotProduct = vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
    const magnitude1 = Math.sqrt(vec1.x ** 2 + vec1.y ** 2 + vec1.z ** 2);
    const magnitude2 = Math.sqrt(vec2.x ** 2 + vec2.y ** 2 + vec2.z ** 2);
    return dotProduct / (magnitude1 * magnitude2);
  };

  const VectorVisualization = ({
    vector,
    color,
    label,
  }: {
    vector: Vector3D;
    color: string;
    label: string;
  }) => (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <span className="text-white font-medium">{label}</span>
        <div className="flex space-x-2 text-sm">
          <span className="text-gray-400">x: {vector.x.toFixed(2)}</span>
          <span className="text-gray-400">y: {vector.y.toFixed(2)}</span>
          <span className="text-gray-400">z: {vector.z.toFixed(2)}</span>
        </div>
      </div>
      <div className="relative h-32 bg-gray-900 rounded-lg overflow-hidden">
        {/* 3D Vector Visualization */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Vector line */}
            <div
              className="absolute h-1 bg-gradient-to-r from-transparent to-current transform origin-left"
              style={{
                width: `${
                  Math.sqrt(vector.x ** 2 + vector.y ** 2 + vector.z ** 2) * 60
                }px`,
                backgroundColor: color,
                transform: `rotate(${
                  Math.atan2(vector.y, vector.x) * (180 / Math.PI)
                }deg)`,
              }}
            />
            {/* Vector arrow */}
            <div
              className="absolute w-0 h-0 border-l-4 border-l-current border-t-2 border-t-transparent border-b-2 border-b-transparent transform"
              style={{
                left: `${
                  Math.sqrt(vector.x ** 2 + vector.y ** 2 + vector.z ** 2) * 60
                }px`,
                borderLeftColor: color,
                transform: `rotate(${
                  Math.atan2(vector.y, vector.x) * (180 / Math.PI)
                }deg)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const SimilarityMatrix = () => (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">
        Similarity Matrix
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left text-gray-400 pb-2">Text</th>
              {exampleEmbeddings.map((item) => (
                <th
                  key={item.text}
                  className="text-center text-gray-400 pb-2 px-2"
                >
                  {item.text}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {exampleEmbeddings.map((item1) => (
              <tr key={item1.text}>
                <td className="text-white font-medium pr-4">{item1.text}</td>
                {exampleEmbeddings.map((item2) => {
                  const similarity = calculateSimilarity(
                    item1.vector,
                    item2.vector
                  );
                  const isSelf = item1.text === item2.text;
                  return (
                    <td
                      key={`${item1.text}-${item2.text}`}
                      className="text-center px-2 py-1"
                    >
                      <span
                        className={`inline-block w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                          isSelf
                            ? "bg-blue-600 text-white"
                            : similarity > 0.8
                            ? "bg-green-600 text-white"
                            : similarity > 0.6
                            ? "bg-yellow-600 text-white"
                            : "bg-gray-600 text-white"
                        }`}
                      >
                        {isSelf ? "1.0" : similarity.toFixed(2)}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleDrawer}
        className="fixed top-20 right-4 z-50 flex items-center space-x-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-600 transition-colors text-white shadow-lg"
      >
        <InformationCircleIcon className="w-4 h-4 text-blue-400" />
        <span className="hidden sm:inline text-sm">Context</span>
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
            { id: "similarity", name: "Similarity", icon: ChartBarIcon },
            { id: "applications", name: "Applications", icon: CubeIcon },
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
              <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-700/30 rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  3D Vector Visualization
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Here's a simplified 3D representation of word embeddings. In
                  reality, embeddings typically have hundreds of dimensions, but
                  we can visualize the concept in 3D space.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {exampleEmbeddings.map((item) => (
                    <VectorVisualization
                      key={item.text}
                      vector={item.vector}
                      color={item.color}
                      label={item.text}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Similarity Section */}
          {activeSection === "similarity" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-700/30 rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Cosine Similarity
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Similarity between vectors is calculated using cosine
                  similarity, which measures the angle between vectors. Values
                  range from -1 to 1, where 1 means identical, 0 means
                  orthogonal, and -1 means opposite.
                </p>
                <SimilarityMatrix />
                <div className="mt-6 grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">
                      0.8 - 1.0
                    </div>
                    <div className="text-gray-400">Very Similar</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-400">
                      0.6 - 0.8
                    </div>
                    <div className="text-gray-400">Somewhat Similar</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-gray-400">
                      0.0 - 0.6
                    </div>
                    <div className="text-gray-400">Not Similar</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Applications Section */}
          {activeSection === "applications" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-700/30 rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Real-World Applications
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Vector embeddings power many modern AI applications by
                  enabling semantic understanding and similarity-based
                  operations.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                        <MagnifyingGlassIcon className="w-5 h-5 mr-2 text-blue-400" />
                        Search & Recommendation
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Find similar content, recommend products, and power
                        semantic search engines.
                      </p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                        <BeakerIcon className="w-5 h-5 mr-2 text-green-400" />
                        Text Classification
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Categorize documents, detect sentiment, and classify
                        content automatically.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                        <ChartBarIcon className="w-5 h-5 mr-2 text-purple-400" />
                        Question Answering
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Find relevant passages and generate accurate answers to
                        questions.
                      </p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                        <CubeIcon className="w-5 h-5 mr-2 text-orange-400" />
                        Language Translation
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Bridge language barriers by mapping concepts across
                        different languages.
                      </p>
                    </div>
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
