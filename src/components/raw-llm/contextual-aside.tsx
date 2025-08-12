"use client";

import { useState } from "react";
import {
  InformationCircleIcon,
  CpuChipIcon,
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
  LightBulbIcon,
  PlayIcon,
  StopIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface ContextualAsideProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContextualAside({ isOpen, onClose }: ContextualAsideProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isDemoRunning, setIsDemoRunning] = useState(false);

  const tabs = [
    { id: "overview", name: "Overview", icon: InformationCircleIcon },
    { id: "architecture", name: "Architecture", icon: CpuChipIcon },
    { id: "interaction", name: "Interaction", icon: ChatBubbleLeftRightIcon },
    { id: "code", name: "Code", icon: CodeBracketIcon },
    { id: "demo", name: "Demo", icon: PlayIcon },
  ];

  const handleDemoToggle = () => {
    setIsDemoRunning(!isDemoRunning);
  };

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
              Raw LLM Context
            </h2>
            <div className="flex items-center space-x-2">
              <LightBulbIcon className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-400">Level 1</span>
              <button
                onClick={onClose}
                className="lg:hidden p-1 hover:bg-gray-700 rounded transition-colors"
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
                    What is a Raw LLM?
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    A Raw Large Language Model (LLM) is the foundation of modern
                    AI conversation systems. It processes text input and
                    generates human-like responses based on patterns learned
                    from vast amounts of training data.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-md font-semibold text-white">
                    Key Characteristics:
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>No memory of previous conversations</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Each response is independent</span>
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

            {activeTab === "architecture" && (
              <div className="space-y-4">
                <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">
                    LLM Architecture
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Modern LLMs use transformer architecture with attention
                    mechanisms to process and generate text. They consist of
                    multiple layers that can understand context and
                    relationships in language.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-md font-semibold text-white">
                    Core Components:
                  </h4>
                  <div className="space-y-2">
                    <div className="bg-gray-800 rounded p-3">
                      <h5 className="text-sm font-medium text-purple-400">
                        Tokenization
                      </h5>
                      <p className="text-xs text-gray-400 mt-1">
                        Converts text to numerical tokens
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded p-3">
                      <h5 className="text-sm font-medium text-purple-400">
                        Embeddings
                      </h5>
                      <p className="text-xs text-gray-400 mt-1">
                        Represents tokens as vectors
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded p-3">
                      <h5 className="text-sm font-medium text-purple-400">
                        Attention Layers
                      </h5>
                      <p className="text-xs text-gray-400 mt-1">
                        Processes relationships between tokens
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded p-3">
                      <h5 className="text-sm font-medium text-purple-400">
                        Output Layer
                      </h5>
                      <p className="text-xs text-gray-400 mt-1">
                        Generates probability distribution for next token
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "interaction" && (
              <div className="space-y-4">
                <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-400 mb-2">
                    How Interaction Works
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    When you send a message, the LLM processes your input
                    through its neural network and generates a response token by
                    token, predicting the most likely next word based on the
                    context.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-md font-semibold text-white">
                    Interaction Flow:
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                        1
                      </div>
                      <span className="text-sm text-gray-300">
                        User sends message
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                        2
                      </div>
                      <span className="text-sm text-gray-300">
                        LLM tokenizes input
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                        3
                      </div>
                      <span className="text-sm text-gray-300">
                        Processes through neural network
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                        4
                      </div>
                      <span className="text-sm text-gray-300">
                        Generates response tokens
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                        5
                      </div>
                      <span className="text-sm text-gray-300">
                        Returns response to user
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "code" && (
              <div className="space-y-4">
                <div className="bg-orange-900/20 border border-orange-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-orange-400 mb-2">
                    Implementation Example
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Here's a simplified example of how you might interact with a
                    raw LLM API.
                  </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-4">
                  <pre className="text-xs text-gray-300 overflow-x-auto">
                    {`// Simple LLM API call
const response = await fetch('/api/llm', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: userMessage,
    max_tokens: 100,
    temperature: 0.7
  })
});

const result = await response.json();
console.log(result.text);`}
                  </pre>
                </div>

                <div className="space-y-2">
                  <h4 className="text-md font-semibold text-white">
                    Parameters:
                  </h4>
                  <div className="space-y-1 text-sm text-gray-300">
                    <div>
                      <span className="text-orange-400">prompt:</span> The input
                      text
                    </div>
                    <div>
                      <span className="text-orange-400">max_tokens:</span>{" "}
                      Maximum response length
                    </div>
                    <div>
                      <span className="text-orange-400">temperature:</span>{" "}
                      Creativity level (0-1)
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "demo" && (
              <div className="space-y-4">
                <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-red-400 mb-2">
                    Interactive Demo
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Watch how the LLM processes your input in real-time. This
                    demo shows the token-by-token generation process.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleDemoToggle}
                    className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      isDemoRunning
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {isDemoRunning ? (
                      <>
                        <StopIcon className="w-4 h-4" />
                        <span>Stop Demo</span>
                      </>
                    ) : (
                      <>
                        <PlayIcon className="w-4 h-4" />
                        <span>Start Demo</span>
                      </>
                    )}
                  </button>

                  {isDemoRunning && (
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="text-sm text-gray-300 mb-2">
                        Processing: "Hello, how are you?"
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-green-400">→ "Hello"</div>
                        <div className="text-xs text-green-400">
                          → "Hello, how"
                        </div>
                        <div className="text-xs text-green-400">
                          → "Hello, how are"
                        </div>
                        <div className="text-xs text-green-400">
                          → "Hello, how are you"
                        </div>
                        <div className="text-xs text-green-400">
                          → "Hello, how are you?"
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
