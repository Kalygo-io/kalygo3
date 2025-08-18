"use client";

import React from "react";
import {
  DocumentTextIcon,
  LinkIcon,
  PlayIcon,
  CodeBracketIcon,
  LightBulbIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export function ChunkingContainer() {
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Chunking</h1>
        <p className="text-gray-400">
          Breaking down data into optimal chunks for retrieval
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Overview Section */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <LightBulbIcon className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              What is Chunking?
            </h2>
          </div>
          <p className="text-gray-300 leading-relaxed">
            Chunking is the process of breaking down large data into smaller,
            manageable pieces that can be effectively processed by retrieval
            systems. While commonly associated with text, chunking techniques
            are applicable across multiple data modalities. The goal is to
            create chunks that are semantically meaningful while being
            appropriately sized for embedding and retrieval.
          </p>
        </div>

        {/* Our Approach Section */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
              <ChartBarIcon className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              Our Chunking Approach
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed">
              For this tutorial, we'll use a simple but effective approach:
              breaking up our search data into chunks of approximately{" "}
              <strong className="text-white">200 consecutive tokens</strong>.
            </p>
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">
                Why 200 Tokens?
              </h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>
                  • <strong>Optimal Size:</strong> Large enough to maintain
                  context, small enough for efficient processing
                </li>
                <li>
                  • <strong>Semantic Coherence:</strong> Preserves meaningful
                  relationships between concepts
                </li>
                <li>
                  • <strong>Retrieval Efficiency:</strong> Balances precision
                  and recall in search results
                </li>
                <li>
                  • <strong>Embedding Quality:</strong> Works well with modern
                  embedding models
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Multi-Modal Chunking Section */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <DocumentTextIcon className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              Multi-Modal Chunking Strategies
            </h2>
          </div>
          <p className="text-gray-300 leading-relaxed mb-4">
            Chunking techniques vary significantly across different data
            modalities. Here are the key approaches for various data types:
          </p>

          {/* Text Chunking */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              📝 Text Data
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">
                  Semantic Chunking
                </h4>
                <p className="text-gray-300 text-sm">
                  Breaking at natural boundaries like paragraphs, sections, or
                  topics.
                </p>
              </div>
              <div className="bg-gray-900/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">
                  Token-Based Chunking
                </h4>
                <p className="text-gray-300 text-sm">
                  Fixed token counts (like our 200-token approach) for
                  consistent processing.
                </p>
              </div>
            </div>
          </div>

          {/* Image Chunking */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              🖼️ Image Data
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">
                  Spatial Chunking
                </h4>
                <p className="text-gray-300 text-sm">
                  Dividing images into grid-based patches or regions of
                  interest.
                </p>
              </div>
              <div className="bg-gray-900/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">
                  Object-Based Chunking
                </h4>
                <p className="text-gray-300 text-sm">
                  Chunking based on detected objects, faces, or semantic
                  regions.
                </p>
              </div>
            </div>
          </div>

          {/* Audio Chunking */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              🎵 Audio Data
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">
                  Temporal Chunking
                </h4>
                <p className="text-gray-300 text-sm">
                  Fixed time windows (e.g., 10-second segments) or silence-based
                  splitting.
                </p>
              </div>
              <div className="bg-gray-900/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">
                  Phoneme-Based Chunking
                </h4>
                <p className="text-gray-300 text-sm">
                  Chunking at natural speech boundaries, words, or phoneme
                  transitions.
                </p>
              </div>
            </div>
          </div>

          {/* Video Chunking */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              🎬 Video Data
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">
                  Frame-Based Chunking
                </h4>
                <p className="text-gray-300 text-sm">
                  Fixed frame counts or keyframe extraction for scene changes.
                </p>
              </div>
              <div className="bg-gray-900/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">
                  Scene-Based Chunking
                </h4>
                <p className="text-gray-300 text-sm">
                  Chunking based on scene detection, shot boundaries, or
                  semantic events.
                </p>
              </div>
            </div>
          </div>

          {/* Code Chunking */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              💻 Code Data
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">
                  Function-Based Chunking
                </h4>
                <p className="text-gray-300 text-sm">
                  Chunking at function boundaries, classes, or logical code
                  blocks.
                </p>
              </div>
              <div className="bg-gray-900/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">
                  AST-Based Chunking
                </h4>
                <p className="text-gray-300 text-sm">
                  Using Abstract Syntax Trees to chunk at meaningful code
                  structures.
                </p>
              </div>
            </div>
          </div>

          {/* Tabular Data */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              📊 Tabular Data
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">
                  Row-Based Chunking
                </h4>
                <p className="text-gray-300 text-sm">
                  Fixed row counts or semantic grouping of related records.
                </p>
              </div>
              <div className="bg-gray-900/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">
                  Column-Based Chunking
                </h4>
                <p className="text-gray-300 text-sm">
                  Chunking based on column relationships or feature groups.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-orange-600/20 rounded-lg flex items-center justify-center">
              <LinkIcon className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              Learning Resources
            </h2>
          </div>

          <div className="space-y-4">
            {/* ChunkViz */}
            <div className="bg-gray-900/30 rounded-lg p-4 hover:bg-gray-900/50 transition-colors">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600/20 rounded flex items-center justify-center flex-shrink-0 mt-1">
                  <LinkIcon className="w-3 h-3 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">
                    ChunkViz - Interactive Chunking Visualization
                  </h3>
                  <p className="text-gray-300 text-sm mb-2">
                    An interactive tool to visualize and experiment with
                    different chunking strategies.
                  </p>
                  <a
                    href="https://chunkviz.up.railway.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                  >
                    Visit ChunkViz →
                  </a>
                </div>
              </div>
            </div>

            {/* Chroma Research */}
            <div className="bg-gray-900/30 rounded-lg p-4 hover:bg-gray-900/50 transition-colors">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-600/20 rounded flex items-center justify-center flex-shrink-0 mt-1">
                  <DocumentTextIcon className="w-3 h-3 text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">
                    Evaluating Chunking Strategies
                  </h3>
                  <p className="text-gray-300 text-sm mb-2">
                    Research paper from Chroma on how to evaluate and compare
                    different chunking approaches.
                  </p>
                  <a
                    href="https://research.trychroma.com/evaluating-chunking"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                  >
                    Read Research Paper →
                  </a>
                </div>
              </div>
            </div>

            {/* YouTube Video */}
            <div className="bg-gray-900/30 rounded-lg p-4 hover:bg-gray-900/50 transition-colors">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-600/20 rounded flex items-center justify-center flex-shrink-0 mt-1">
                  <PlayIcon className="w-3 h-3 text-red-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">
                    The 5 Levels Of Text Splitting For Retrieval
                  </h3>
                  <p className="text-gray-300 text-sm mb-2">
                    A comprehensive video tutorial covering different levels of
                    text splitting strategies.
                  </p>
                  <a
                    href="https://www.youtube.com/watch?v=8OJC21T2SL4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                  >
                    Watch Video →
                  </a>
                </div>
              </div>
            </div>

            {/* GitHub Tutorial */}
            <div className="bg-gray-900/30 rounded-lg p-4 hover:bg-gray-900/50 transition-colors">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-600/20 rounded flex items-center justify-center flex-shrink-0 mt-1">
                  <CodeBracketIcon className="w-3 h-3 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">
                    5 Levels of Text Splitting - Jupyter Notebook
                  </h3>
                  <p className="text-gray-300 text-sm mb-2">
                    Hands-on tutorial with code examples and practical
                    implementations.
                  </p>
                  <a
                    href="https://github.com/FullStackRetrieval-com/RetrievalTutorials/blob/main/tutorials/LevelsOfTextSplitting/5_Levels_Of_Text_Splitting.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                  >
                    View Notebook →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-yellow-600/20 rounded-lg flex items-center justify-center">
              <LightBulbIcon className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Next Steps</h2>
          </div>
          <div className="space-y-3">
            <p className="text-gray-300 leading-relaxed">
              Now that you understand chunking across multiple data modalities,
              you'll learn how to:
            </p>
            <ul className="text-gray-300 space-y-2 ml-4">
              <li>
                • <strong>Choose appropriate chunking strategies</strong> for
                different data types
              </li>
              <li>
                • <strong>Implement modality-specific chunking</strong> in your
                retrieval pipeline
              </li>
              <li>
                • <strong>Evaluate chunk quality</strong> using different
                metrics per modality
              </li>
              <li>
                • <strong>Optimize chunk parameters</strong> for your specific
                use case and data type
              </li>
              <li>
                • <strong>Combine multi-modal chunking with reranking</strong>{" "}
                for better results
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
