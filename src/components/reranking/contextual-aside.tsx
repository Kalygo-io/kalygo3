"use client";

import { useState } from "react";
import {
  InformationCircleIcon,
  LightBulbIcon,
  XMarkIcon,
  ChartBarIcon,
  DocumentArrowUpIcon,
} from "@heroicons/react/24/outline";
import { ChooseFile } from "./choose-file";

interface ContextualAsideProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContextualAside({ isOpen, onClose }: ContextualAsideProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [files, setFiles] = useState<File[] | null>(null);

  const tabs = [
    { id: "overview", name: "Overview", icon: InformationCircleIcon },
    { id: "upload", name: "Upload Data", icon: DocumentArrowUpIcon },
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
        className={`fixed inset-y-0 right-0 w-96 bg-gray-900 border-l border-gray-700 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">Reranking</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
                title="Close panel"
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
                  <h3 className="text-lg font-semibold text-white mb-2">
                    What is RAG + Reranking?
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    RAG with reranking enhances retrieval quality by using a
                    second-stage reranker to improve the relevance of retrieved
                    documents. This significantly improves the accuracy of RAG
                    systems.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-md font-semibold text-white">
                    Key Characteristics:
                  </h4>
                  <ul className="space-y-2 text-sm text-white">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Two-stage retrieval: retrieval + reranking</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Improved document relevance and quality</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Better context for LLM generation</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Reduced hallucination and improved accuracy</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "upload" && (
              <div className="space-y-4">
                <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Upload Training Data
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    Upload .txt and .md files to train and improve the reranking
                    model. These files will be processed and added to the
                    reranking database.
                  </p>
                </div>

                <ChooseFile files={files} setFiles={setFiles} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
