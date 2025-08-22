"use client";

import React, { useState } from "react";
import {
  InformationCircleIcon,
  DocumentTextIcon,
  PuzzlePieceIcon,
  MagnifyingGlassIcon,
  ArrowRightIcon,
  CodeBracketIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { TokenizersContextualAside } from "@/components/tokenizers/contextual-aside";

interface TokenExample {
  text: string;
  tokens: string[];
  tokenCount: number;
  explanation: string;
}

export function TokenizersContainer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeExample, setActiveExample] = useState(0);

  const tokenExamples: TokenExample[] = [
    {
      text: "Hello world!",
      tokens: ["Hello", " world", "!"],
      tokenCount: 3,
      explanation: "Simple words and punctuation are often split naturally.",
    },
    {
      text: "artificial intelligence",
      tokens: ["artificial", " intelligence"],
      tokenCount: 2,
      explanation: "Compound terms may be split into meaningful subwords.",
    },
    {
      text: "machine learning",
      tokens: ["machine", " learning"],
      tokenCount: 2,
      explanation: "Technical terms are typically tokenized as separate words.",
    },
    {
      text: "supercalifragilisticexpialidocious",
      tokens: ["super", "cali", "fragil", "istic", "expiali", "docious"],
      tokenCount: 6,
      explanation:
        "Long words are broken down into smaller, reusable subword units.",
    },
    {
      text: "I love technology! 🚀",
      tokens: ["I", " love", " tech", "nology", "!", " 🚀"],
      tokenCount: 6,
      explanation:
        "Emojis and special characters are treated as separate tokens.",
    },
  ];

  const tokenizerTypes = [
    {
      name: "Word-based",
      description: "Splits text by spaces and punctuation",
      pros: ["Simple to understand", "Fast processing", "Good for English"],
      cons: [
        "Poor for languages without spaces",
        "Large vocabulary",
        "No subword information",
      ],
      example: "Hello world → ['Hello', 'world']",
    },
    {
      name: "Subword",
      description: "Breaks words into smaller meaningful units",
      pros: [
        "Handles unknown words",
        "Smaller vocabulary",
        "Better for many languages",
      ],
      cons: ["More complex", "Longer sequences", "Harder to interpret"],
      example: "learning → ['learn', 'ing']",
    },
    {
      name: "Character-based",
      description: "Treats each character as a token",
      pros: ["Very small vocabulary", "Handles any text", "No unknown tokens"],
      cons: [
        "Very long sequences",
        "Loses word meaning",
        "Computationally expensive",
      ],
      example: "Hello → ['H', 'e', 'l', 'l', 'o']",
    },
  ];

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      {/* Toggle Button - Fixed positioned in top-right of viewport */}
      <button
        onClick={toggleDrawer}
        className="fixed top-20 right-4 z-50 flex items-center space-x-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-600 transition-colors text-white shadow-lg"
      >
        <InformationCircleIcon className="w-4 h-4 text-blue-400" />
      </button>

      <div className="w-full max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Tokenizers</h1>
          <p className="text-gray-400">
            The fundamental building blocks of language processing and reranking
          </p>
        </div>

        {/* Introduction Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <PuzzlePieceIcon className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                What are Tokenizers?
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Tokenizers are the first step in processing text for AI models.
                They break down human-readable text into smaller, manageable
                pieces called &quot;tokens&quot; that machines can understand
                and process. Think of them as the bridge between human language
                and machine language.
              </p>
              <p className="text-gray-300 leading-relaxed">
                In the context of reranking, tokenization is crucial because it
                determines how text is represented and compared. The quality of
                tokenization directly impacts the accuracy of similarity
                searches and the effectiveness of reranking algorithms.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Tokenization Examples */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <DocumentTextIcon className="w-6 h-6 text-green-400 mr-2" />
            Interactive Tokenization Examples
          </h2>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Example Selector */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-white">
                Choose an example:
              </h3>
              <div className="space-y-2">
                {tokenExamples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveExample(index)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      activeExample === index
                        ? "border-blue-500 bg-blue-900/20 text-white"
                        : "border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500"
                    }`}
                  >
                    <div className="font-medium">
                      &quot;{example.text}&quot;
                    </div>
                    <div className="text-sm opacity-75">
                      {example.tokenCount} tokens
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Token Display */}
            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-3">
                Tokenization Result:
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400 text-sm">Original text:</span>
                  <div className="text-white font-mono bg-gray-800 p-2 rounded mt-1">
                    &quot;{tokenExamples[activeExample].text}&quot;
                  </div>
                </div>

                <div>
                  <span className="text-gray-400 text-sm">
                    Tokens ({tokenExamples[activeExample].tokenCount}):
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {tokenExamples[activeExample].tokens.map((token, index) => (
                      <span
                        key={index}
                        className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-mono"
                      >
                        {token}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-gray-400 text-sm">Explanation:</span>
                  <div className="text-gray-300 text-sm mt-1">
                    {tokenExamples[activeExample].explanation}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tokenizer Types */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <CodeBracketIcon className="w-6 h-6 text-purple-400 mr-2" />
            Types of Tokenizers
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {tokenizerTypes.map((type, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-600 rounded-lg p-4"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {type.name}
                </h3>
                <p className="text-gray-300 text-sm mb-4">{type.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-white mb-2">Pros:</h4>
                  <ul className="space-y-1">
                    {type.pros.map((pro, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-white flex items-start"
                      >
                        <span className="text-green-400 mr-1">✓</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-red-400 mb-2">
                    Cons:
                  </h4>
                  <ul className="space-y-1">
                    {type.cons.map((con, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-white flex items-start"
                      >
                        <span className="text-red-400 mr-1">✗</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-800 p-2 rounded">
                  <span className="text-xs text-gray-400">Example:</span>
                  <div className="text-xs text-white font-mono mt-1">
                    {type.example}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Tokenization Matters for Re-ranking */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <MagnifyingGlassIcon className="w-6 h-6 text-yellow-400 mr-2" />
            Why Tokenization Matters for Reranking
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4 min-h-[8rem] md:min-h-[8rem] flex flex-col">
              <h3 className="text-lg font-semibold text-white mb-2">
                Similarity Matching
              </h3>
              <p className="text-gray-300 text-sm flex-1">
                Tokenization determines how text is compared. The same text
                tokenized differently can produce very different similarity
                scores, affecting which documents are retrieved.
              </p>
            </div>

            <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4 min-h-[8rem] md:min-h-[8rem] flex flex-col">
              <h3 className="text-lg font-semibold text-white mb-2">
                Context Understanding
              </h3>
              <p className="text-gray-300 text-sm flex-1">
                Good tokenization preserves semantic meaning while breaking text
                into manageable pieces. This helps reranking models understand
                the true relevance of content.
              </p>
            </div>

            <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4 min-h-[8rem] md:min-h-[8rem] flex flex-col">
              <h3 className="text-lg font-semibold text-white mb-2">
                Computational Efficiency
              </h3>
              <p className="text-gray-300 text-sm flex-1">
                Tokenization affects processing speed and memory usage. More
                tokens mean more computation, but too few tokens can lose
                important information.
              </p>
            </div>

            <div className="bg-orange-900/20 border border-orange-700/30 rounded-lg p-4 min-h-[8rem] md:min-h-[8rem] flex flex-col">
              <h3 className="text-lg font-semibold text-white mb-2">
                Cross-Language Support
              </h3>
              <p className="text-gray-300 text-sm flex-1">
                Different languages require different tokenization strategies.
                Subword tokenizers are particularly effective for multilingual
                applications.
              </p>
            </div>
          </div>
        </div>

        {/* Practical Impact */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Practical Impact on Reranking
          </h2>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <ArrowRightIcon className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-white font-medium">
                  Better Query Understanding
                </h3>
                <p className="text-gray-300 text-sm">
                  Proper tokenization helps the system understand user queries
                  more accurately, leading to better initial retrieval and more
                  relevant reranking.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <ArrowRightIcon className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-white font-medium">
                  Improved Document Matching
                </h3>
                <p className="text-gray-300 text-sm">
                  When documents and queries are tokenized consistently, the
                  reranking model can better identify semantic similarities and
                  differences.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <ArrowRightIcon className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-white font-medium">Reduced Noise</h3>
                <p className="text-gray-300 text-sm">
                  Good tokenization filters out irrelevant variations (like
                  different spellings or punctuation) while preserving important
                  semantic distinctions.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <ArrowRightIcon className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-white font-medium">
                  Consistent Performance
                </h3>
                <p className="text-gray-300 text-sm">
                  Standardized tokenization ensures that reranking performance
                  is consistent across different types of content and user
                  queries.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* External Resources */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Additional Resources
          </h2>

          <div className="space-y-4">
            {/* OpenAI Tokenizer Playground */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium mb-1">
                  OpenAI Tokenizer Playground
                </h3>
                <p className="text-gray-300 text-sm">
                  Experiment with different tokenization strategies using
                  OpenAI's interactive tokenizer playground.
                </p>
              </div>
              <a
                href="https://platform.openai.com/tokenizer"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <span>Try It</span>
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Universal LLM Hacks */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium mb-1">
                  Universal LLM Hacks
                </h3>
                <p className="text-gray-300 text-sm">
                  Learn about universal methods to "unalign" LLMs and understand
                  tokenization's role in model behavior from the GenAI
                  Guidebook.
                </p>
              </div>
              <a
                href="https://ravinkumar.com/GenAiGuidebook/deepdive/universalattack.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                <span>Read More</span>
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Image Tokenization */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium mb-1">
                  Image Tokenization
                </h3>
                <p className="text-gray-300 text-sm">
                  Explore how images are converted into tokens for AI
                  processing, including visual transformers and patch-based
                  approaches.
                </p>
              </div>
              <a
                href="https://ravinkumar.com/GenAiGuidebook/image/image_tokenization.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <span>Learn More</span>
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Audio Tokenization */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium mb-1">
                  Audio Tokenization
                </h3>
                <p className="text-gray-300 text-sm">
                  Discover how audio signals are tokenized for speech
                  recognition and audio generation models, including spectrogram
                  processing.
                </p>
              </div>
              <a
                href="https://ravinkumar.com/GenAiGuidebook/audio/audio_tokenization.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
              >
                <span>Explore</span>
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <TokenizersContextualAside
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}
