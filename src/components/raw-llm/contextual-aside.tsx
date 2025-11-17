"use client";

import { useState } from "react";
import {
  InformationCircleIcon,
  LightBulbIcon,
  ChartBarIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";
import { DrawerCloseButton } from "@/components/shared/drawer-close-button";

interface ContextualAsideProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContextualAside({ isOpen, onClose }: ContextualAsideProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", name: "Overview", icon: InformationCircleIcon },
    { id: "popular-llms", name: "Popular LLMs", icon: CpuChipIcon },
  ];

  const popularLLMs = [
    {
      name: "GPT-5",
      contextLimit: "128K tokens",
      wordEstimate: "~96K words",
      pageEstimate: "~384 pages",
      link: "https://platform.openai.com/docs/models/gpt-5",
      provider: "OpenAI",
    },
    {
      name: "GPT-4o",
      contextLimit: "128K tokens",
      wordEstimate: "~96K words",
      pageEstimate: "~384 pages",
      link: "https://platform.openai.com/docs/models/gpt-4o",
      provider: "OpenAI",
    },
    {
      name: "GPT-4o Mini",
      contextLimit: "128K tokens",
      wordEstimate: "~96K words",
      pageEstimate: "~384 pages",
      link: "https://platform.openai.com/docs/models/gpt-4o-mini",
      provider: "OpenAI",
    },
    {
      name: "Claude 3.5 Sonnet",
      contextLimit: "200K tokens",
      wordEstimate: "~150K words",
      pageEstimate: "~600 pages",
      link: "https://docs.anthropic.com/en/docs/models-overview",
      provider: "Anthropic",
    },
    {
      name: "Claude 3.5 Haiku",
      contextLimit: "200K tokens",
      wordEstimate: "~150K words",
      pageEstimate: "~600 pages",
      link: "https://docs.anthropic.com/en/docs/models-overview",
      provider: "Anthropic",
    },
    {
      name: "Gemini 1.5 Pro",
      contextLimit: "1M tokens",
      wordEstimate: "~750K words",
      pageEstimate: "~3,000 pages",
      link: "https://ai.google.dev/models/gemini",
      provider: "Google",
    },
    {
      name: "Gemini 1.5 Flash",
      contextLimit: "1M tokens",
      wordEstimate: "~750K words",
      pageEstimate: "~3,000 pages",
      link: "https://ai.google.dev/models/gemini",
      provider: "Google",
    },
    {
      name: "Llama 3.1 405B",
      contextLimit: "128K tokens",
      wordEstimate: "~96K words",
      pageEstimate: "~384 pages",
      link: "https://llama.meta.com/llama3/",
      provider: "Meta",
    },
    {
      name: "Llama 3.1 8B",
      contextLimit: "128K tokens",
      wordEstimate: "~96K words",
      pageEstimate: "~384 pages",
      link: "https://llama.meta.com/llama3/",
      provider: "Meta",
    },
    {
      name: "Mistral Large",
      contextLimit: "32K tokens",
      wordEstimate: "~24K words",
      pageEstimate: "~96 pages",
      link: "https://docs.mistral.ai/models/",
      provider: "Mistral AI",
    },
    {
      name: "Mistral Medium",
      contextLimit: "32K tokens",
      wordEstimate: "~24K words",
      pageEstimate: "~96 pages",
      link: "https://docs.mistral.ai/models/",
      provider: "Mistral AI",
    },
    {
      name: "Cohere Command R+",
      contextLimit: "128K tokens",
      wordEstimate: "~96K words",
      pageEstimate: "~384 pages",
      link: "https://docs.cohere.com/docs/models",
      provider: "Cohere",
    },
    {
      name: "Cohere Command R",
      contextLimit: "128K tokens",
      wordEstimate: "~96K words",
      pageEstimate: "~384 pages",
      link: "https://docs.cohere.com/docs/models",
      provider: "Cohere",
    },
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
        className={`fixed inset-y-0 right-0 w-96 bg-gray-900 border-l border-gray-700 z-[70] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-gray-100">Raw LLMs</h2>
            <DrawerCloseButton onClose={onClose} />
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
                        ? "text-blue-300 border-b-2 border-blue-300 bg-gray-800"
                        : "text-gray-300 hover:text-gray-100 hover:bg-gray-800"
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
                    What is an LLM?
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    A Large Language Model (LLM) is a foundational pillar of
                    modern AI systems. It processes text input in parallel and
                    autoregressively predicts tokens until a stop token is
                    predicted OR its context is exhausted.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-md font-semibold text-white">
                    Key Characteristics:
                  </h4>
                  <ul className="space-y-2 text-sm text-white">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>No memory of previous conversations</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Each response is independent of previous ones</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Limited to training data knowledge</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>No external data access</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "flowchart" && (
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-8 text-center">
                  <ChartBarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-white text-lg font-medium">Coming Soon</p>
                </div>
              </div>
            )}

            {activeTab === "popular-llms" && (
              <div className="space-y-4">
                <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">
                    Popular LLM/LMM Models
                  </h3>
                  <p className="text-gray-100 text-sm leading-relaxed">
                    Here are some of the most popular Large Language Models
                    currently available, along with their context limits and
                    links to official documentation.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-md font-semibold text-gray-100">
                    Model Comparison:
                  </h4>
                  <div className="space-y-3">
                    {popularLLMs.map((model, index) => (
                      <div
                        key={index}
                        className="bg-gray-800 rounded-lg p-3 border border-gray-600"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="text-gray-100 font-medium text-sm">
                            {model.name}
                          </h5>
                          <span className="text-xs text-gray-300 bg-gray-600 px-2 py-1 rounded">
                            {model.provider}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-blue-300 font-medium">
                            {model.contextLimit}
                          </span>
                          <a
                            href={model.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-300 hover:text-green-200 underline transition-colors"
                          >
                            Official Docs →
                          </a>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-xs text-gray-400">
                            {model.wordEstimate}
                          </span>
                          <span className="text-xs text-gray-400">
                            {model.pageEstimate}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-3">
                  <p className="text-yellow-100 text-xs leading-relaxed">
                    <strong>Note:</strong> Context limits and model availability
                    may change over time. Always refer to the official
                    documentation for the most up-to-date information.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
