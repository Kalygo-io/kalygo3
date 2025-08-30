"use client";

import { useState, useContext } from "react";
import {
  InformationCircleIcon,
  XMarkIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  ChatContext,
  ChatDispatchContext,
} from "@/app/dashboard/persistent-memory/chat-session-context";

interface ContextualAsideProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContextualAside({ isOpen, onClose }: ContextualAsideProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const chatState = useContext(ChatContext);
  const dispatch = useContext(ChatDispatchContext);

  const tabs = [
    { id: "overview", name: "Overview", icon: InformationCircleIcon },
    { id: "actions", name: "Actions", icon: Cog6ToothIcon },
  ];

  const handleClearChat = () => {
    if (dispatch) {
      dispatch({ type: "SET_MESSAGES", payload: [] });
    }
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
              Persistent Memory
            </h2>
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
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">
                    Persistent &quot;Memory&quot; Trick
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    The trick for adding the illusion of persistentmemory to an
                    LLM is to store all messages associated with a chat session
                    into a database like Postgres.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-md font-semibold text-white">
                    Key Characteristics:
                  </h4>
                  <ul className="space-y-2 text-sm text-white">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Uses last N messages for context</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Creates illusion of memory</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Simple session-based approach</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>No external data or tools</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "actions" && (
              <div className="space-y-4">
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Chat Management
                  </h3>

                  <div className="space-y-4">
                    {/* Message Count */}
                    <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <ChartBarIcon className="w-5 h-5 text-blue-400" />
                        <span className="text-white font-medium">
                          Total Messages
                        </span>
                      </div>
                      <span className="text-2xl font-bold text-blue-400">
                        {chatState?.messages?.length || 0}
                      </span>
                    </div>

                    {/* Clear Chat Button */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-300">
                        Chat Actions
                      </h4>
                      <button
                        onClick={handleClearChat}
                        disabled={!chatState?.messages?.length}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                        title="Clear all messages from chat history"
                      >
                        <TrashIcon className="w-5 h-5" />
                        <span>Clear Chat History</span>
                      </button>
                    </div>

                    {/* Info */}
                    <div className="text-xs text-gray-400 bg-gray-800/50 p-3 rounded-lg">
                      <p className="mb-2">
                        <strong>Note:</strong> Messages are automatically
                        limited to 8 total messages.
                      </p>
                      <p>
                        When the limit is exceeded, the oldest messages are
                        automatically removed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
