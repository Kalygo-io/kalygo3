"use client";

import React from "react";
import {
  WrenchScrewdriverIcon,
  LightBulbIcon,
  CogIcon,
  CommandLineIcon,
  MagnifyingGlassIcon,
  CalculatorIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  ChartBarIcon,
  BeakerIcon,
  SparklesIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/outline";

export function ToolsContainer() {
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">LLM Agent Tools</h1>
        <p className="text-gray-400">
          Extending AI capabilities through specialized functions and APIs
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* What are Tools? */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <WrenchScrewdriverIcon className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              What are Tools?
            </h2>
          </div>
          <p className="text-gray-300 leading-relaxed mb-4">
            Tools are specialized functions that allow LLM agents to interact
            with the real world beyond their training data. Think of them as{" "}
            <strong className="text-white">superpowers</strong> that give AI
            agents the ability to perform specific tasks, access external data,
            or execute actions.
          </p>
          <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">
              The Analogy
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Imagine an LLM agent as a brilliant consultant who can think and
              reason, but can&apos;t access the internet, use a calculator, or
              interact with databases. Tools are like giving this consultant a
              smartphone, calculator, and access to specialized software -
              suddenly they can do so much more!
            </p>
          </div>
        </div>

        {/* How Tools Work */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
              <CogIcon className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">How Tools Work</h2>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900/30 rounded-lg p-4 text-center">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <SparklesIcon
                    className="w-6 h-6 text-white"
                    strokeWidth={1.5}
                  />
                </div>
                <h4 className="font-semibold text-white mb-2">
                  1. Agent Decides
                </h4>
                <p className="text-gray-300 text-sm">
                  The LLM agent analyzes the task and decides which tool(s) to
                  use
                </p>
              </div>
              <div className="bg-gray-900/30 rounded-lg p-4 text-center">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <CommandLineIcon
                    className="w-6 h-6 text-white"
                    strokeWidth={1.5}
                  />
                </div>
                <h4 className="font-semibold text-white mb-2">
                  2. Tool Executes
                </h4>
                <p className="text-gray-300 text-sm">
                  The selected tool performs its specific function and returns
                  results
                </p>
              </div>
              <div className="bg-gray-900/30 rounded-lg p-4 text-center">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <LightBulbIcon
                    className="w-6 h-6 text-white"
                    strokeWidth={1.5}
                  />
                </div>
                <h4 className="font-semibold text-white mb-2">
                  3. Agent Responds
                </h4>
                <p className="text-gray-300 text-sm">
                  The agent processes the tool&apos;s output and provides a
                  comprehensive response
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Common Tool Categories */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <PuzzlePieceIcon className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              Common Tool Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search Tools */}
            <div className="bg-gray-900/30 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <MagnifyingGlassIcon className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-semibold text-white">🔍 Search Tools</h3>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Access to real-time information from the web, databases, or
                knowledge bases.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Web search engines</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Database queries</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Document retrieval</span>
                </div>
              </div>
            </div>

            {/* Calculation Tools */}
            <div className="bg-gray-900/30 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <CalculatorIcon className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-semibold text-white">
                  🧮 Calculation Tools
                </h3>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Mathematical operations, statistical analysis, and computational
                tasks.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Mathematical computations</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Statistical analysis</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Unit conversions</span>
                </div>
              </div>
            </div>

            {/* API Integration Tools */}
            <div className="bg-gray-900/30 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-orange-600/20 rounded-lg flex items-center justify-center">
                  <GlobeAltIcon className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-semibold text-white">
                  🌐 API Integration Tools
                </h3>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Connect to external services, APIs, and third-party platforms.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Weather APIs</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Payment processors</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Social media platforms</span>
                </div>
              </div>
            </div>

            {/* File & Document Tools */}
            <div className="bg-gray-900/30 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <DocumentTextIcon className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-semibold text-white">
                  📄 File & Document Tools
                </h3>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Read, write, and manipulate files and documents.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>File reading/writing</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>PDF processing</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Data parsing</span>
                </div>
              </div>
            </div>

            {/* Analysis Tools */}
            <div className="bg-gray-900/30 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-red-600/20 rounded-lg flex items-center justify-center">
                  <ChartBarIcon className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-semibold text-white">📊 Analysis Tools</h3>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Data analysis, visualization, and insights generation.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span>Data visualization</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span>Trend analysis</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span>Pattern recognition</span>
                </div>
              </div>
            </div>

            {/* Custom Tools */}
            <div className="bg-gray-900/30 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                  <BeakerIcon className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-semibold text-white">🧪 Custom Tools</h3>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Domain-specific functions tailored to your unique needs.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Business logic</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Domain expertise</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Proprietary systems</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-World Example */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-indigo-600/20 rounded-lg flex items-center justify-center">
              <LightBulbIcon className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              Real-World Example
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed">
              Imagine asking an AI agent:{" "}
              <strong className="text-white">
                &quot;What&apos;s the weather like in Tokyo, and should I pack
                an umbrella?&quot;
              </strong>
            </p>
            <div className="bg-indigo-900/20 border border-indigo-700/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">
                How Tools Make This Possible:
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-400 text-xs font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">
                      <strong>Weather API Tool:</strong> Fetches real-time
                      weather data for Tokyo
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-400 text-xs font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">
                      <strong>Reasoning:</strong> Agent analyzes the weather
                      data and precipitation probability
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-400 text-xs font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">
                      <strong>Response:</strong> Provides a comprehensive answer
                      with weather details and packing recommendation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
              <SparklesIcon className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              Benefits of Tools
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-900/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">
                🎯 Enhanced Capabilities
              </h4>
              <p className="text-gray-300 text-sm">
                Extend AI agents beyond their training data with real-time
                information and actions.
              </p>
            </div>
            <div className="bg-gray-900/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">
                🔧 Modular Design
              </h4>
              <p className="text-gray-300 text-sm">
                Mix and match tools to create specialized agents for different
                use cases.
              </p>
            </div>
            <div className="bg-gray-900/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">
                🔄 Real-Time Updates
              </h4>
              <p className="text-gray-300 text-sm">
                Access current information and perform actions in real-time.
              </p>
            </div>
            <div className="bg-gray-900/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">
                🎨 Customization
              </h4>
              <p className="text-gray-300 text-sm">
                Build domain-specific tools tailored to your unique
                requirements.
              </p>
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
              Now that you understand the power of tools, you&apos;ll learn how
              to:
            </p>
            <ul className="text-gray-300 space-y-2 ml-4">
              <li>
                • <strong>Design effective tools</strong> for your specific use
                cases
              </li>
              <li>
                • <strong>Integrate tools with LLM agents</strong> using
                frameworks like ReAct
              </li>
              <li>
                • <strong>Handle tool execution</strong> and error management
              </li>
              <li>
                • <strong>Optimize tool selection</strong> for better agent
                performance
              </li>
              <li>
                • <strong>Build custom tools</strong> for domain-specific tasks
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
