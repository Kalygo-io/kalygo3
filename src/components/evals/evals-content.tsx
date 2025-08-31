"use client";

import { useState } from "react";
import { ContextualAside } from "./contextual-aside";
import {
  AcademicCapIcon,
  BookOpenIcon,
  ChartBarIcon,
  LightBulbIcon,
  BeakerIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

interface EvalsContentProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function EvalsContent({
  activeSection,
  setActiveSection,
}: EvalsContentProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const sections = [
    {
      id: "overview",
      name: "Overview",
      icon: AcademicCapIcon,
      description: "Understanding evaluation concepts",
    },
    {
      id: "tools",
      name: "Evaluation Tools",
      icon: CogIcon,
      description: "Popular evaluation platforms",
    },
    {
      id: "best-practices",
      name: "Best Practices",
      icon: LightBulbIcon,
      description: "Tips and best practices",
    },
  ];

  const evaluationTools = [
    {
      name: "LangSmith",
      description:
        "LangChain's comprehensive evaluation platform for LLM applications",
      url: "https://smith.langchain.com/",
      type: "Platform",
      category: "LangChain",
      features: [
        "Trajectory tracking and debugging",
        "A/B testing and comparison",
        "Custom evaluation metrics",
        "Dataset management",
        "Production monitoring",
      ],
    },
    {
      name: "promptfoo",
      description: "Open-source prompt testing and evaluation framework",
      url: "https://www.promptfoo.dev/",
      type: "Framework",
      category: "Open Source",
      features: [
        "Prompt testing and optimization",
        "Multiple LLM provider support",
        "Custom evaluation functions",
        "CI/CD integration",
        "Cost tracking and analysis",
      ],
    },
    {
      name: "Weights & Biases",
      description: "ML experiment tracking with LLM evaluation capabilities",
      url: "https://wandb.ai/",
      type: "Platform",
      category: "MLOps",
      features: [
        "Experiment tracking",
        "Model performance monitoring",
        "Collaborative evaluation",
        "Custom dashboards",
        "Production deployment tracking",
      ],
    },
    {
      name: "Humanloop",
      description: "Platform for building and evaluating LLM applications",
      url: "https://humanloop.com/",
      type: "Platform",
      category: "Enterprise",
      features: [
        "Prompt engineering tools",
        "Human feedback collection",
        "Performance analytics",
        "Team collaboration",
        "Production deployment",
      ],
    },
  ];

  const evaluationMetrics = [
    {
      name: "Accuracy",
      description: "Measures how often the model produces correct outputs",
      formula: "Correct Predictions / Total Predictions",
      useCase: "Classification tasks, factual questions",
    },
    {
      name: "Precision",
      description:
        "Measures the proportion of positive identifications that were actually correct",
      formula: "True Positives / (True Positives + False Positives)",
      useCase: "Classification tasks where false positives are costly",
    },
    {
      name: "Human Evaluation",
      description: "Direct assessment of output quality by human evaluators",
      formula: "Subjective quality scores",
      useCase: "Creative tasks, subjective quality",
    },
  ];

  const renderOverview = () => (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          What are Evaluations?
        </h2>
        <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Evaluations (evals) are systematic methods to assess the performance,
          quality, and reliability of AI models and applications. They help
          ensure that your AI systems work correctly, safely, and effectively in
          real-world scenarios.
        </p>
      </div>

      {/* Why Evaluations Matter */}
      <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
        <h3 className="text-2xl font-bold text-white mb-6">
          Why Evaluations Matter
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">
                  Quality Assurance
                </h4>
                <p className="text-gray-300 text-sm">
                  Ensure your AI models produce high-quality, accurate outputs
                  consistently
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">
                  Performance Monitoring
                </h4>
                <p className="text-gray-300 text-sm">
                  Track model performance over time and identify degradation or
                  improvements
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">
                  Risk Mitigation
                </h4>
                <p className="text-gray-300 text-sm">
                  Identify potential issues before they affect users or business
                  operations
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">
                  Iterative Improvement
                </h4>
                <p className="text-gray-300 text-sm">
                  Use evaluation results to guide model improvements and
                  optimizations
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                5
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">
                  Stakeholder Confidence
                </h4>
                <p className="text-gray-300 text-sm">
                  Build trust with stakeholders through transparent performance
                  metrics
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                6
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">
                  Compliance & Safety
                </h4>
                <p className="text-gray-300 text-sm">
                  Ensure AI systems meet regulatory requirements and safety
                  standards
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Evaluation Metrics */}
      <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
        <h3 className="text-2xl font-bold text-white mb-8">
          Common Evaluation Metrics
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {evaluationMetrics.map((metric, index) => (
            <div
              key={index}
              className="bg-gray-800/50 p-6 rounded-xl border border-gray-700"
            >
              <h4 className="text-lg font-semibold text-white mb-3">
                {metric.name}
              </h4>
              <p className="text-gray-300 text-sm mb-4">{metric.description}</p>
              <div className="bg-gray-900 p-3 rounded mb-3">
                <span className="text-xs text-gray-400">Formula:</span>
                <div className="text-xs text-white font-mono mt-1">
                  {metric.formula}
                </div>
              </div>
              <div>
                <span className="text-xs text-gray-400">Use Case:</span>
                <div className="text-xs text-gray-300 mt-1">
                  {metric.useCase}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTools = () => (
    <div className="space-y-12">
      {/* Evaluation Tools */}
      <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-6">
          Popular Evaluation Tools
        </h2>
        <p className="text-gray-300 mb-8 text-lg">
          Choose from these comprehensive evaluation platforms and frameworks:
        </p>

        <div className="space-y-6">
          {evaluationTools.map((tool, index) => (
            <div
              key={index}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="px-3 py-1 bg-blue-600 text-sm rounded-full font-medium">
                      {tool.category}
                    </span>
                    <span className="px-3 py-1 bg-gray-700 text-sm rounded-full">
                      {tool.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {tool.name}
                  </h3>
                  <p className="text-gray-300 mb-4 text-lg">
                    {tool.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-white mb-2">
                      Key Features:
                    </h4>
                    <ul className="space-y-1">
                      {tool.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-300 text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
                  >
                    <span>Visit Platform</span>
                    <svg
                      className="w-5 h-5"
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
          ))}
        </div>
      </div>

      {/* Evaluation Workflow */}
      <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-8">
          Evaluation Workflow
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold text-white mx-auto mb-4">
              1
            </div>
            <h4 className="font-semibold text-white mb-2">Define Metrics</h4>
            <p className="text-gray-300 text-sm">
              Choose appropriate evaluation metrics for your use case
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold text-white mx-auto mb-4">
              2
            </div>
            <h4 className="font-semibold text-white mb-2">Create Dataset</h4>
            <p className="text-gray-300 text-sm">
              Build test datasets with ground truth or reference outputs
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold text-white mx-auto mb-4">
              3
            </div>
            <h4 className="font-semibold text-white mb-2">Run Evaluations</h4>
            <p className="text-gray-300 text-sm">
              Execute evaluations using your chosen tools and metrics
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold text-white mx-auto mb-4">
              4
            </div>
            <h4 className="font-semibold text-white mb-2">Analyze Results</h4>
            <p className="text-gray-300 text-sm">
              Interpret results and identify areas for improvement
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBestPractices = () => (
    <div className="space-y-12">
      {/* Best Practices */}
      <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-8">
          Evaluation Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">
                Dataset Design
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-sm">
                    Use diverse, representative test data
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-sm">
                    Include edge cases and failure scenarios
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-sm">
                    Ensure ground truth quality and consistency
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-sm">
                    Regularly update test datasets
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">
                Metric Selection
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-sm">
                    Choose metrics aligned with business goals
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-sm">
                    Use multiple complementary metrics
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-sm">
                    Consider both automated and human evaluation
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-sm">
                    Validate metrics against real-world performance
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">
                Continuous Evaluation
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-sm">
                    Set up automated evaluation pipelines
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-sm">
                    Monitor performance in production
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-sm">
                    Establish evaluation baselines
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-sm">
                    Regular evaluation reviews and updates
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">
                Common Pitfalls
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-sm">
                    Over-relying on automated metrics
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-sm">
                    Ignoring edge cases and failure modes
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-sm">
                    Not updating evaluation criteria
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-sm">
                    Lack of stakeholder involvement
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return renderOverview();
      case "tools":
        return renderTools();
      case "best-practices":
        return renderBestPractices();
      default:
        return renderOverview();
    }
  };

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
                  Evaluations
                </h1>
                <p className="mt-6 text-xl leading-8 text-gray-300 max-w-3xl mx-auto">
                  Systematic assessment of AI model performance and quality
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-800">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <nav
              className="-mb-px flex justify-center space-x-8"
              aria-label="Tabs"
            >
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
          {renderContent()}
        </div>
      </div>

      {/* Contextual Aside */}
      <ContextualAside
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}
