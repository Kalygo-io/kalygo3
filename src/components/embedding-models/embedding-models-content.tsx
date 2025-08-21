"use client";

import { useState, useEffect } from "react";
import {
  BeakerIcon,
  CubeIcon,
  ChartBarIcon,
  LightBulbIcon,
  PlayIcon,
  PauseIcon,
  ArrowPathIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import { InteractiveVectorDemo } from "./interactive-vector-demo";
import { EmbeddingVisualization } from "./embedding-visualization";
import { SimilarityDemo } from "./similarity-demo";
import { ContextualAside } from "./contextual-aside";

interface EmbeddingModelsContentProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function EmbeddingModelsContent({
  activeSection,
  setActiveSection,
}: EmbeddingModelsContentProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const sections = [
    { id: "overview", name: "Overview", icon: BeakerIcon },
    { id: "vectors", name: "Understanding Vectors", icon: CubeIcon },
    { id: "models", name: "Embedding Models", icon: ChartBarIcon },
    { id: "applications", name: "Real Applications", icon: LightBulbIcon },
  ];

  const steps = [
    {
      title: "Input",
      description: "Raw data enters the embedding model",
      content: "The cat sat on the mat",
    },
    {
      title: "Tokenization",
      description: "Data is broken into tokens",
      content: "['The', 'cat', 'sat', 'on', 'the', 'mat']",
    },
    {
      title: "Neural Processing",
      description: "Tokens are processed through neural layers",
      content: "Hidden representations are learned",
    },
    {
      title: "Vector Output",
      description: "Final embedding vector is generated",
      content: "[0.2, -0.5, 0.8, ...] (n dimensions)",
    },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  return (
    <>
      {/* Toggle Button - Fixed positioned in top-right of viewport */}
      <button
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        className="fixed top-20 right-4 z-50 flex items-center space-x-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-600 transition-colors text-white shadow-lg"
      >
        <BookOpenIcon className="w-4 h-4 text-blue-400" />
        <span className="text-sm">Resources</span>
      </button>

      <div className="min-h-screen bg-black">
        {/* Header */}
        <div className="relative overflow-hidden">
          <div className="relative px-6 py-12 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  Embedding Models
                </h1>
                <p className="mt-6 text-xl leading-8 text-gray-300 max-w-3xl mx-auto">
                  Discover how AI transforms words, images, and data into
                  powerful numerical representations that capture meaning and
                  enable intelligent applications.
                </p>
                <div className="mt-8 flex justify-center">
                  <div className="inline-flex items-center rounded-full bg-blue-600/10 px-4 py-2 text-sm font-medium text-blue-400 ring-1 ring-inset ring-blue-600/20">
                    <BeakerIcon className="w-4 h-4 mr-2" />
                    Level 4: Vector Foundations
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-800">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                      activeSection === section.id
                        ? "border-blue-500 text-blue-400"
                        : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{section.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content Sections */}
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
          {activeSection === "overview" && (
            <div className="space-y-12">
              {/* Hero Section */}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-6">
                  The Magic of Embeddings
                </h2>
                <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Embeddings are the secret sauce that makes AI understand
                  meaning. They convert complex data like text, images, and
                  sounds into numerical vectors that capture semantic
                  relationships and enable powerful machine learning
                  applications.
                </p>
              </div>

              {/* Interactive Demo */}
              <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <PlayIcon className="w-6 h-6 mr-3 text-blue-400" />
                  Interactive Embedding Process
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-white">
                        Step-by-Step Process
                      </h4>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
                        >
                          {isPlaying ? (
                            <PauseIcon className="w-4 h-4 text-white" />
                          ) : (
                            <PlayIcon className="w-4 h-4 text-white" />
                          )}
                        </button>
                        <button
                          onClick={() => setCurrentStep(0)}
                          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                        >
                          <ArrowPathIcon className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {steps.map((step, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border transition-all duration-500 ${
                            currentStep === index
                              ? "border-blue-500 bg-blue-500/10"
                              : "border-gray-700 bg-gray-800/50"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                currentStep === index
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-600 text-gray-300"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <div>
                              <h5 className="font-semibold text-white">
                                {step.title}
                              </h5>
                              <p className="text-sm text-gray-400">
                                {step.description}
                              </p>
                              <p className="text-xs text-blue-400 mt-1 font-mono">
                                {step.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="w-full max-w-md">
                      <EmbeddingVisualization currentStep={currentStep} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Concepts */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                    <CubeIcon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Vector Space
                  </h3>
                  <p className="text-gray-300">
                    Embeddings create a mathematical space where similar
                    concepts are positioned close together, enabling semantic
                    search and similarity calculations.
                  </p>
                </div>

                <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                    <ChartBarIcon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Dimensionality
                  </h3>
                  <p className="text-gray-300">
                    Modern embedding models typically use 384-1536 dimensions to
                    capture rich semantic information while maintaining
                    computational efficiency.
                  </p>
                </div>

                <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                    <LightBulbIcon className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Semantic Understanding
                  </h3>
                  <p className="text-gray-300">
                    Embeddings capture meaning beyond just words, understanding
                    context, relationships, and even cultural nuances in
                    language.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "vectors" && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Understanding Vector Representations
                </h2>
                <p className="text-lg text-gray-300 max-w-4xl mx-auto">
                  Vectors are the mathematical foundation of embeddings.
                  Let&apos;s explore how they work and why they&apos;re so
                  powerful for representing meaning.
                </p>
              </div>

              <InteractiveVectorDemo />
            </div>
          )}

          {activeSection === "models" && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Popular Embedding Models
                </h2>
                <p className="text-lg text-gray-300 max-w-4xl mx-auto">
                  Explore the most widely used embedding models and understand
                  their strengths, use cases, and performance characteristics.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                  <h3 className="text-xl font-bold text-white mb-4">
                    OpenAI Embeddings
                  </h3>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Model:</span>
                      <span className="text-blue-400">
                        text-embedding-ada-002
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dimensions:</span>
                      <span className="text-blue-400">1536</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Context Length:</span>
                      <span className="text-blue-400">8192 tokens</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Performance:</span>
                      <span className="text-green-400">Excellent</span>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-400 text-sm">
                    OpenAI&apos;s flagship embedding model, optimized for
                    semantic search and text similarity tasks.
                  </p>
                </div>

                <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Sentence Transformers
                  </h3>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Model:</span>
                      <span className="text-blue-400">all-MiniLM-L6-v2</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dimensions:</span>
                      <span className="text-blue-400">384</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Context Length:</span>
                      <span className="text-blue-400">256 tokens</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Performance:</span>
                      <span className="text-green-400">Very Good</span>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-400 text-sm">
                    Lightweight model perfect for resource-constrained
                    applications and real-time processing.
                  </p>
                </div>

                <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Cohere Embeddings
                  </h3>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Model:</span>
                      <span className="text-blue-400">embed-english-v3.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dimensions:</span>
                      <span className="text-blue-400">1024</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Context Length:</span>
                      <span className="text-blue-400">512 tokens</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Performance:</span>
                      <span className="text-green-400">Excellent</span>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-400 text-sm">
                    Multilingual model with strong performance across different
                    languages and domains.
                  </p>
                </div>

                <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                  <h3 className="text-xl font-bold text-white mb-4">
                    BGE Embeddings
                  </h3>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Model:</span>
                      <span className="text-blue-400">
                        BAAI/bge-large-en-v1.5
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dimensions:</span>
                      <span className="text-blue-400">1024</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Context Length:</span>
                      <span className="text-blue-400">512 tokens</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Performance:</span>
                      <span className="text-green-400">Excellent</span>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-400 text-sm">
                    Open-source model with state-of-the-art performance on
                    retrieval tasks.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "applications" && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Real-World Applications
                </h2>
                <p className="text-lg text-gray-300 max-w-4xl mx-auto">
                  Discover how embeddings power the AI applications you use
                  every day, from search engines to recommendation systems and
                  beyond.
                </p>
              </div>

              <SimilarityDemo />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Semantic Search
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Transform traditional keyword search into intelligent
                    semantic search that understands user intent and context.
                  </p>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div>• Google Search</div>
                    <div>• E-commerce product search</div>
                    <div>• Document retrieval systems</div>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Recommendation Systems
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Power personalized recommendations by understanding user
                    preferences and content similarity.
                  </p>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div>• Netflix movie recommendations</div>
                    <div>• Spotify music suggestions</div>
                    <div>• Amazon product recommendations</div>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Content Moderation
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Automatically detect inappropriate content by understanding
                    semantic meaning beyond simple keyword matching.
                  </p>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div>• Social media platforms</div>
                    <div>• Online communities</div>
                    <div>• Customer support systems</div>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Chatbots & Assistants
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Enable conversational AI that understands context and can
                    retrieve relevant information from knowledge bases.
                  </p>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div>• Customer service bots</div>
                    <div>• Virtual assistants</div>
                    <div>• Knowledge base Q&A</div>
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
