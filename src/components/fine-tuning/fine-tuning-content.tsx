"use client";

import { useState } from "react";
import { ContextualAside } from "./contextual-aside";
import {
  AcademicCapIcon,
  BookOpenIcon,
  CodeBracketIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

interface FineTuningContentProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function FineTuningContent({
  activeSection,
  setActiveSection,
}: FineTuningContentProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const sections = [
    {
      id: "overview",
      name: "Overview",
      icon: AcademicCapIcon,
      description: "Understanding fine-tuning concepts",
    },
    {
      id: "implementation",
      name: "Implementation",
      icon: CodeBracketIcon,
      description: "Practical implementation guides",
    },
    {
      id: "best-practices",
      name: "Best Practices",
      icon: LightBulbIcon,
      description: "Tips and best practices",
    },
  ];

  const referenceLinks = [
    {
      title: "NVIDIA NeMo Embedding Models Guide",
      description:
        "Comprehensive guide to fine-tuning embedding models with NeMo framework",
      url: "https://docs.nvidia.com/nemo-framework/user-guide/latest/embeddingmodels/index.html",
      type: "Documentation",
      category: "NeMo Framework",
    },
    {
      title: "NeMo BERT/SBERT Fine-tuning",
      description:
        "Specific guide for fine-tuning BERT and Sentence-BERT models",
      url: "https://docs.nvidia.com/nemo-framework/user-guide/latest/embeddingmodels/bert/sbert.html",
      type: "Tutorial",
      category: "NeMo Framework",
    },
    {
      title: "Hugging Face Sentence Transformers Training",
      description:
        "Complete guide to training sentence transformers with Hugging Face",
      url: "https://huggingface.co/blog/train-sentence-transformers",
      type: "Tutorial",
      category: "Hugging Face",
    },
  ];

  const renderOverview = () => (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          What is Fine-tuning?
        </h2>
        <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Fine-tuning is the process of taking a pre-trained embedding model and
          adapting it to your specific domain or use case. This involves
          training the model on your own data to improve its performance for
          your particular application.
        </p>
      </div>

      {/* Benefits and Use Cases */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-4">Benefits</h3>
          <ul className="space-y-3">
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-300">
                Better domain-specific performance
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-300">
                Improved semantic understanding
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-300">
                Reduced computational requirements
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-300">Customized to your data</span>
            </li>
          </ul>
        </div>
        <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-4">Use Cases</h3>
          <ul className="space-y-3">
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-300">Domain-specific search</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-300">Specialized chatbots</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-300">
                Industry-specific applications
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-300">Multilingual fine-tuning</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Fine-tuning Process */}
      <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
        <h3 className="text-2xl font-bold text-white mb-8">
          Fine-tuning Process
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold text-white mx-auto mb-4">
              1
            </div>
            <h4 className="font-semibold text-white mb-2">Data Preparation</h4>
            <p className="text-gray-300 text-sm">
              Collect and prepare domain-specific training data
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold text-white mx-auto mb-4">
              2
            </div>
            <h4 className="font-semibold text-white mb-2">Model Selection</h4>
            <p className="text-gray-300 text-sm">
              Choose appropriate base model for your task
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold text-white mx-auto mb-4">
              3
            </div>
            <h4 className="font-semibold text-white mb-2">Training</h4>
            <p className="text-gray-300 text-sm">
              Fine-tune the model with your data
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold text-white mx-auto mb-4">
              4
            </div>
            <h4 className="font-semibold text-white mb-2">Evaluation</h4>
            <p className="text-gray-300 text-sm">
              Test and validate the fine-tuned model
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderImplementation = () => (
    <div className="space-y-12">
      {/* Implementation Guides */}
      <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-6">
          Implementation Guides
        </h2>
        <p className="text-gray-300 mb-8 text-lg">
          Choose from these comprehensive guides to implement fine-tuning for
          your embedding models:
        </p>

        <div className="space-y-6">
          {referenceLinks.map((link, index) => (
            <div
              key={index}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="px-3 py-1 bg-blue-600 text-sm rounded-full font-medium">
                      {link.category}
                    </span>
                    <span className="px-3 py-1 bg-gray-700 text-sm rounded-full">
                      {link.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {link.title}
                  </h3>
                  <p className="text-gray-300 mb-4 text-lg">
                    {link.description}
                  </p>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
                  >
                    <span>View Guide</span>
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

      {/* Quick Start Options */}
      <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-8">
          Quick Start Options
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <RocketLaunchIcon className="w-6 h-6 mr-3 text-blue-400" />
              NeMo Framework
            </h3>
            <p className="text-gray-300 mb-4 text-lg">
              NVIDIA&apos;s NeMo framework provides optimized tools for
              fine-tuning embedding models with enterprise-grade performance.
            </p>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span>Optimized for GPU training</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span>Enterprise-grade scaling</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span>Built-in model architectures</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <WrenchScrewdriverIcon className="w-6 h-6 mr-3 text-green-400" />
              Hugging Face
            </h3>
            <p className="text-gray-300 mb-4 text-lg">
              Hugging Face provides easy-to-use tools and pre-trained models for
              fine-tuning sentence transformers.
            </p>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>Extensive model library</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>Simple API</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>Active community</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBestPractices = () => (
    <div className="space-y-12">
      {/* Best Practices */}
      <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-8">Best Practices</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">
              Data Quality
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300 text-sm">
                  Use high-quality, domain-specific training data
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300 text-sm">
                  Ensure balanced representation across categories
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300 text-sm">
                  Clean and preprocess your data thoroughly
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300 text-sm">
                  Use appropriate data augmentation techniques
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">
              Training Strategy
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300 text-sm">
                  Start with a lower learning rate (1e-5 to 1e-4)
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300 text-sm">
                  Use learning rate scheduling
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300 text-sm">
                  Implement early stopping to prevent overfitting
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300 text-sm">
                  Monitor validation metrics closely
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">
              Evaluation
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300 text-sm">
                  Use domain-specific evaluation datasets
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300 text-sm">
                  Test on real-world scenarios
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300 text-sm">
                  Compare against baseline models
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300 text-sm">
                  Monitor performance over time
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Common Pitfalls */}
      <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-8">Common Pitfalls</h2>
        <div className="space-y-6">
          <div className="flex items-start space-x-4 bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <div className="bg-red-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-1">
              ⚠
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Overfitting
              </h3>
              <p className="text-gray-300">
                Training too long or with insufficient data can lead to poor
                generalization
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4 bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <div className="bg-red-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-1">
              ⚠
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Data Leakage
              </h3>
              <p className="text-gray-300">
                Ensure test data is completely separate from training data
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4 bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <div className="bg-red-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-1">
              ⚠
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Insufficient Data
              </h3>
              <p className="text-gray-300">
                Fine-tuning requires adequate domain-specific data for
                meaningful improvements
              </p>
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
      case "implementation":
        return renderImplementation();
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
                  Fine-tuning
                </h1>
                <p className="mt-6 text-xl leading-8 text-gray-300 max-w-3xl mx-auto">
                  Learn how to fine-tune embedding models for your specific use
                  case
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
