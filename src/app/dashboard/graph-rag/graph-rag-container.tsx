"use client";

import React, { useState } from "react";
import {
  AcademicCapIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
  BeakerIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

interface GraphNode {
  id: string;
  label: string;
  type: "entity" | "concept" | "relationship";
  x: number;
  y: number;
  connections: string[];
  properties?: Record<string, any>;
}

interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  weight: number;
}

interface QueryResult {
  query: string;
  traditionalRAG: string;
  graphRAG: string;
  reasoning: string;
  confidence: number;
}

export function GraphRAGDemoContainer() {
  const [activeTab, setActiveTab] = useState("basics");
  const [selectedQuery, setSelectedQuery] = useState("");
  const [showGraph, setShowGraph] = useState(false);

  // Sample knowledge graph data
  const graphNodes: GraphNode[] = [
    {
      id: "einstein",
      label: "Albert Einstein",
      type: "entity",
      x: 100,
      y: 100,
      connections: ["relativity", "nobel_physics"],
    },
    {
      id: "relativity",
      label: "Theory of Relativity",
      type: "concept",
      x: 300,
      y: 100,
      connections: ["einstein", "physics", "spacetime"],
    },
    {
      id: "physics",
      label: "Physics",
      type: "concept",
      x: 500,
      y: 100,
      connections: ["relativity", "quantum_mechanics", "nobel_physics"],
    },
    {
      id: "quantum_mechanics",
      label: "Quantum Mechanics",
      type: "concept",
      x: 500,
      y: 300,
      connections: ["physics", "heisenberg", "schrodinger"],
    },
    {
      id: "heisenberg",
      label: "Werner Heisenberg",
      type: "entity",
      x: 300,
      y: 300,
      connections: ["quantum_mechanics", "uncertainty_principle"],
    },
    {
      id: "uncertainty_principle",
      label: "Uncertainty Principle",
      type: "concept",
      x: 100,
      y: 300,
      connections: ["heisenberg", "quantum_mechanics"],
    },
    {
      id: "nobel_physics",
      label: "Nobel Prize in Physics",
      type: "concept",
      x: 300,
      y: 200,
      connections: ["einstein", "physics"],
    },
    {
      id: "spacetime",
      label: "Space-Time",
      type: "concept",
      x: 400,
      y: 50,
      connections: ["relativity"],
    },
    {
      id: "schrodinger",
      label: "Erwin Schrödinger",
      type: "entity",
      x: 600,
      y: 300,
      connections: ["quantum_mechanics", "schrodinger_cat"],
    },
    {
      id: "schrodinger_cat",
      label: "Schrödinger&apos;s Cat",
      type: "concept",
      x: 700,
      y: 300,
      connections: ["schrodinger", "quantum_mechanics"],
    },
  ];

  const graphEdges: GraphEdge[] = [
    {
      id: "e1",
      source: "einstein",
      target: "relativity",
      label: "developed",
      weight: 0.9,
    },
    {
      id: "e2",
      source: "relativity",
      target: "physics",
      label: "part_of",
      weight: 0.8,
    },
    {
      id: "e3",
      source: "physics",
      target: "quantum_mechanics",
      label: "includes",
      weight: 0.7,
    },
    {
      id: "e4",
      source: "heisenberg",
      target: "quantum_mechanics",
      label: "contributed_to",
      weight: 0.8,
    },
    {
      id: "e5",
      source: "heisenberg",
      target: "uncertainty_principle",
      label: "formulated",
      weight: 0.9,
    },
    {
      id: "e6",
      source: "einstein",
      target: "nobel_physics",
      label: "won",
      weight: 0.9,
    },
    {
      id: "e7",
      source: "relativity",
      target: "spacetime",
      label: "describes",
      weight: 0.8,
    },
    {
      id: "e8",
      source: "schrodinger",
      target: "quantum_mechanics",
      label: "contributed_to",
      weight: 0.8,
    },
    {
      id: "e9",
      source: "schrodinger",
      target: "schrodinger_cat",
      label: "proposed",
      weight: 0.9,
    },
  ];

  // Sample query results comparing traditional RAG vs Graph RAG
  const queryResults: QueryResult[] = [
    {
      query: "What did Einstein contribute to physics?",
      traditionalRAG:
        "Einstein developed the theory of relativity and won the Nobel Prize in Physics.",
      graphRAG:
        "Einstein developed the theory of relativity, which describes space-time and is part of physics. He also won the Nobel Prize in Physics for his contributions to theoretical physics.",
      reasoning:
        "Graph RAG can trace the connections: Einstein → relativity → physics, and Einstein → Nobel Prize → physics, providing more comprehensive context.",
      confidence: 0.95,
    },
    {
      query: "How are quantum mechanics and relativity related?",
      traditionalRAG:
        "Both are fundamental theories in physics, but they describe different aspects of the universe.",
      graphRAG:
        "Both quantum mechanics and relativity are part of physics, but they describe different scales: relativity for large-scale phenomena and quantum mechanics for atomic-scale phenomena. They have different contributors: Einstein for relativity, Heisenberg and Schrödinger for quantum mechanics.",
      reasoning:
        "Graph RAG can identify that both concepts are connected to physics and trace their different contributors and characteristics.",
      confidence: 0.88,
    },
    {
      query: "Who contributed to quantum mechanics?",
      traditionalRAG:
        "Heisenberg and Schrödinger are key contributors to quantum mechanics.",
      graphRAG:
        "Heisenberg formulated the uncertainty principle and contributed to quantum mechanics. Schrödinger also contributed to quantum mechanics and proposed the famous Schrödinger&apos;s cat thought experiment.",
      reasoning:
        "Graph RAG can trace multiple paths: Heisenberg → quantum mechanics + uncertainty principle, Schrödinger → quantum mechanics + Schrödinger&apos;s cat.",
      confidence: 0.92,
    },
  ];

  const selectedResult = queryResults.find((q) => q.query === selectedQuery);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          Graph RAG: Knowledge Graph Enhanced Retrieval
        </h1>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          Explore how knowledge graphs enhance RAG systems by capturing
          relationships and enabling multi-hop reasoning
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center mb-8">
        {[
          { id: "basics", name: "Basics", icon: AcademicCapIcon },
          { id: "graph", name: "Knowledge Graph", icon: Squares2X2Icon },
          { id: "comparison", name: "RAG Comparison", icon: ChartBarIcon },
          { id: "demo", name: "Interactive Demo", icon: BeakerIcon },
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
                What is Graph RAG?
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Graph RAG (Retrieval-Augmented Generation) enhances traditional
                RAG systems by incorporating knowledge graphs that capture
                relationships between entities, concepts, and facts. This
                enables more sophisticated reasoning and context-aware
                responses.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Traditional RAG Limitations
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Limited to direct text matching</li>
                    <li>• No understanding of relationships</li>
                    <li>• Cannot perform multi-hop reasoning</li>
                    <li>• Misses implicit connections</li>
                  </ul>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Graph RAG Advantages
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Captures entity relationships</li>
                    <li>• Enables multi-hop reasoning</li>
                    <li>• Provides richer context</li>
                    <li>• Improves answer accuracy</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-700/30 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">
                How Graph RAG Works
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-gray-800/50 rounded-lg p-6 mb-4">
                    <LightBulbIcon className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                      1. Knowledge Graph
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Build a graph of entities, concepts, and their
                      relationships from your knowledge base
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-gray-800/50 rounded-lg p-6 mb-4">
                    <Squares2X2Icon className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                      2. Graph Traversal
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Traverse the graph to find relevant entities and their
                      connections to the query
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-gray-800/50 rounded-lg p-6 mb-4">
                    <BeakerIcon className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                      3. Enhanced Generation
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Generate responses using both retrieved text and
                      graph-derived context
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Knowledge Graph Section */}
        {activeTab === "graph" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-700/30 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Sample Knowledge Graph
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                This knowledge graph represents relationships between
                physicists, theories, and concepts in physics.
              </p>

              <button
                onClick={() => setShowGraph(!showGraph)}
                className="mb-6 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                {showGraph ? "Hide Graph" : "Show Interactive Graph"}
              </button>

              {showGraph && (
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                  <div className="relative h-96 bg-gray-800 rounded-lg overflow-hidden">
                    {/* Simplified graph visualization */}
                    <svg className="w-full h-full" viewBox="0 0 800 400">
                      {/* Edges */}
                      {graphEdges.map((edge) => {
                        const source = graphNodes.find(
                          (n) => n.id === edge.source
                        );
                        const target = graphNodes.find(
                          (n) => n.id === edge.target
                        );
                        if (!source || !target) return null;

                        return (
                          <g key={edge.id}>
                            <line
                              x1={source.x}
                              y1={source.y}
                              x2={target.x}
                              y2={target.y}
                              stroke={
                                edge.weight > 0.8
                                  ? "#10B981"
                                  : edge.weight > 0.7
                                  ? "#F59E0B"
                                  : "#EF4444"
                              }
                              strokeWidth={edge.weight * 3}
                              opacity={0.6}
                            />
                            <text
                              x={(source.x + target.x) / 2}
                              y={(source.y + target.y) / 2}
                              textAnchor="middle"
                              fill="#9CA3AF"
                              fontSize="10"
                              className="pointer-events-none"
                            >
                              {edge.label}
                            </text>
                          </g>
                        );
                      })}

                      {/* Nodes */}
                      {graphNodes.map((node) => (
                        <g key={node.id}>
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r={node.type === "entity" ? 20 : 15}
                            fill={
                              node.type === "entity" ? "#3B82F6" : "#8B5CF6"
                            }
                            stroke="#1F2937"
                            strokeWidth="2"
                            className="cursor-pointer hover:stroke-white transition-colors"
                          />
                          <text
                            x={node.x}
                            y={node.y + 5}
                            textAnchor="middle"
                            fill="white"
                            fontSize="8"
                            className="pointer-events-none"
                          >
                            {node.label.split(" ").map((word, i) => (
                              <tspan key={i} x={node.x} dy={i === 0 ? 0 : 10}>
                                {word}
                              </tspan>
                            ))}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>

                  <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="text-white font-semibold mb-2">
                        Node Types:
                      </h4>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-300">
                            Entities (People)
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <span className="text-gray-300">Concepts</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">
                        Edge Weights:
                      </h4>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-gray-300">
                            Strong (0.8-1.0)
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span className="text-gray-300">
                            Medium (0.7-0.8)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* RAG Comparison Section */}
        {activeTab === "comparison" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-700/30 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Traditional RAG vs Graph RAG
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Compare how traditional RAG and Graph RAG handle the same
                queries differently.
              </p>

              <div className="space-y-4">
                {queryResults.map((result, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                  >
                    <button
                      onClick={() => setSelectedQuery(result.query)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedQuery === result.query
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      <h3 className="font-semibold mb-1">{result.query}</h3>
                      <div className="text-sm opacity-75">
                        Confidence: {(result.confidence * 100).toFixed(0)}%
                      </div>
                    </button>
                  </div>
                ))}
              </div>

              {selectedResult && (
                <div className="mt-6 bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Query: {selectedResult.query}
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-red-400 mb-2">
                        Traditional RAG
                      </h4>
                      <div className="bg-gray-900 rounded-lg p-4">
                        <p className="text-gray-300">
                          {selectedResult.traditionalRAG}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-green-400 mb-2">
                        Graph RAG
                      </h4>
                      <div className="bg-gray-900 rounded-lg p-4">
                        <p className="text-gray-300">
                          {selectedResult.graphRAG}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-lg font-semibold text-blue-400 mb-2">
                      Graph RAG Reasoning
                    </h4>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <p className="text-gray-300">
                        {selectedResult.reasoning}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Interactive Demo Section */}
        {activeTab === "demo" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-700/30 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Interactive Graph RAG Demo
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Experience how Graph RAG can answer complex questions by
                traversing the knowledge graph.
              </p>

              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Try These Questions:
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <button
                      onClick={() =>
                        setSelectedQuery(
                          "What did Einstein contribute to physics?"
                        )
                      }
                      className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition-colors"
                    >
                      What did Einstein contribute to physics?
                    </button>
                    <button
                      onClick={() =>
                        setSelectedQuery(
                          "How are quantum mechanics and relativity related?"
                        )
                      }
                      className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition-colors"
                    >
                      How are quantum mechanics and relativity related?
                    </button>
                    <button
                      onClick={() =>
                        setSelectedQuery(
                          "Who contributed to quantum mechanics?"
                        )
                      }
                      className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition-colors"
                    >
                      Who contributed to quantum mechanics?
                    </button>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">
                      Graph Traversal Path:
                    </h4>
                    {selectedQuery && (
                      <div className="text-sm text-gray-300">
                        {selectedQuery ===
                          "What did Einstein contribute to physics?" && (
                          <div>
                            <div className="text-blue-400">
                              Einstein → relativity → physics
                            </div>
                            <div className="text-blue-400">
                              Einstein → Nobel Prize → physics
                            </div>
                            <div className="text-green-400 mt-2">
                              Multi-hop reasoning enabled!
                            </div>
                          </div>
                        )}
                        {selectedQuery ===
                          "How are quantum mechanics and relativity related?" && (
                          <div>
                            <div className="text-blue-400">
                              quantum mechanics → physics ← relativity
                            </div>
                            <div className="text-blue-400">
                              heisenberg → quantum mechanics
                            </div>
                            <div className="text-blue-400">
                              einstein → relativity
                            </div>
                            <div className="text-green-400 mt-2">
                              Relationship discovery!
                            </div>
                          </div>
                        )}
                        {selectedQuery ===
                          "Who contributed to quantum mechanics?" && (
                          <div>
                            <div className="text-blue-400">
                              heisenberg → quantum mechanics
                            </div>
                            <div className="text-blue-400">
                              schrodinger → quantum mechanics
                            </div>
                            <div className="text-blue-400">
                              heisenberg → uncertainty principle
                            </div>
                            <div className="text-blue-400">
                              schrodinger → schrodinger&apos;s cat
                            </div>
                            <div className="text-green-400 mt-2">
                              Comprehensive contributor analysis!
                            </div>
                          </div>
                        )}
                      </div>
                    )}
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
