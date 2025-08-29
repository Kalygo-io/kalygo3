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

interface TokenizerType {
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  example: string;
  implementation: {
    name: string;
    url: string;
    description: string;
  };
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
    {
      text: "Image: 224×224 pixels",
      tokens: ["[IMG]", "patch_1", "patch_2", "...", "patch_196"],
      tokenCount: 197,
      explanation:
        "Images are divided into 16×16 pixel patches for vision transformers.",
    },
    {
      text: "Audio: 10 seconds",
      tokens: ["[AUDIO]", "mel_1", "mel_2", "...", "mel_431"],
      tokenCount: 432,
      explanation:
        "Audio is converted to mel-spectrogram tokens for processing.",
    },
  ];

  const tokenizerTypes: TokenizerType[] = [
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
      implementation: {
        name: "NLTK Word Tokenizer",
        url: "https://www.nltk.org/api/nltk.tokenize.html",
        description: "Natural Language Toolkit's word tokenizer implementation",
      },
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
      implementation: {
        name: "Hugging Face Tokenizers",
        url: "https://huggingface.co/docs/tokenizers/",
        description: "Fast and production-ready tokenizers library",
      },
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
      implementation: {
        name: "TensorFlow Text",
        url: "https://www.tensorflow.org/text",
        description:
          "TensorFlow's text processing library with character tokenization",
      },
    },
    {
      name: "Image Patch",
      description: "Divides images into fixed-size patches",
      pros: [
        "Enables vision transformers",
        "Preserves spatial information",
        "Scalable to different resolutions",
      ],
      cons: [
        "Loses fine-grained details",
        "Fixed patch size limitations",
        "Position encoding required",
      ],
      example: "224×224 image → 196 16×16 patches",
      implementation: {
        name: "Vision Transformer (ViT)",
        url: "https://github.com/google-research/vision_transformer",
        description:
          "Official Vision Transformer implementation with patch embedding",
      },
    },
    {
      name: "Audio Spectrogram",
      description: "Converts audio to frequency-time representations",
      pros: [
        "Captures frequency patterns",
        "Time-frequency localization",
        "Works with transformer architectures",
      ],
      cons: [
        "Loses phase information",
        "Computationally intensive",
        "Requires preprocessing",
      ],
      example: "Audio signal → Mel-spectrogram tokens",
      implementation: {
        name: "Librosa",
        url: "https://librosa.org/doc/latest/index.html",
        description: "Python library for audio and music signal processing",
      },
    },
    {
      name: "Video Frame",
      description: "Extracts frames and spatial-temporal tokens",
      pros: [
        "Handles temporal dynamics",
        "Spatial-temporal modeling",
        "Rich visual information",
      ],
      cons: [
        "High computational cost",
        "Memory intensive",
        "Temporal redundancy",
      ],
      example: "Video → Frame patches + temporal tokens",
      implementation: {
        name: "VideoMAE",
        url: "https://github.com/MCG-NJU/VideoMAE",
        description:
          "Video Masked Autoencoders for self-supervised video representation learning",
      },
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
            The fundamental building block of AI data processing
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
                Tokenizers are the first step in processing data for AI models.
                They break down data into smaller, manageable pieces called
                &quot;tokens&quot; that machines can understand and process.
                Think of them as the bridge between the outside world and the
                machine.
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

                <div className="bg-gray-800 p-2 rounded mb-3">
                  <span className="text-xs text-gray-400">Example:</span>
                  <div className="text-xs text-white font-mono mt-1">
                    {type.example}
                  </div>
                </div>

                <div className="bg-blue-900/20 border border-blue-700/30 rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-blue-400 font-medium">
                      Implementation:
                    </span>
                    <a
                      href={type.implementation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1"
                    >
                      <span>View</span>
                      <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="text-xs text-white font-medium mb-1">
                    {type.implementation.name}
                  </div>
                  <div className="text-xs text-gray-300">
                    {type.implementation.description}
                  </div>
                </div>
              </div>
            ))}
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
                  OpenAI&apos;s interactive tokenizer playground.
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
                  Learn about universal methods to &rsquo;unalign&rsquo; LLMs
                  and understand tokenization&apos;s role in model behavior from
                  the GenAI Guidebook.
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
