"use client";

import { ChatContext } from "@/app/dashboard/chat-with-txt/chat-session-context";
import { ChatList } from "@/components/chat-with-txt/chat/chat-list";
import { ChatPanel } from "@/components/chat-with-txt/chat/chat-panel";
import { EmptyScreen } from "@/components/chat-with-txt/chat/empty-screen";
import { PromptForm } from "@/components/chat-with-txt/prompt-form";
import { useScrollAnchor } from "@/shared/hooks/use-scroll-anchor";
import { cn } from "@/shared/utils";
import { useContext, useEffect, useState } from "react";
import { ContextualAside } from "./contextual-aside";
import { ChunksDrawer } from "./chunks-drawer";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { DebugMessages } from "./chat/debug-messages";
import { RerankedMatch } from "@/ts/types/Message";
import { ChatDispatchContext } from "@/app/dashboard/chat-with-txt/chat-session-context";

export interface ChatProps extends React.ComponentProps<"div"> {}

export function Chat({ id, className }: ChatProps) {
  const [input, setInput] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isChunksDrawerOpen, setIsChunksDrawerOpen] = useState(false);
  const [currentChunks, setCurrentChunks] = useState<RerankedMatch[]>([]);
  const [currentKbQuery, setCurrentKbQuery] = useState<string>("");
  const [isPromptFocused, setIsPromptFocused] = useState(false);
  const chatState = useContext(ChatContext);
  const dispatch = useContext(ChatDispatchContext);
  const { messagesRef, scrollRef, scrollToBottom } = useScrollAnchor();

  useEffect(() => {
    // scrollToBottom();
  }, [chatState.messages, scrollToBottom]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleShowChunks = (
    rerankedMatches: RerankedMatch[],
    kb_search_query?: string
  ) => {
    setCurrentChunks(rerankedMatches);
    setCurrentKbQuery(kb_search_query || "");
    setIsChunksDrawerOpen(true);
  };

  const handlePromptFocus = () => {
    // Clear messages when focusing to emphasize stateless interaction
    if (chatState.messages.length > 0) {
      dispatch({
        type: "CLEAR_MESSAGES",
        payload: {},
      });
    }
    setIsPromptFocused(true);

    // Close right drawers when focusing the prompt input
    setIsDrawerOpen(false);
    setIsChunksDrawerOpen(false);
  };

  const handlePromptBlur = () => {
    setIsPromptFocused(false);
  };

  const handleSubmit = () => {
    // Only unfocus the input, don't clear messages
    // Messages will be cleared when the user focuses the input again
    setIsPromptFocused(false);
  };

  const shouldCenterPrompt = chatState.messages.length === 0 || isPromptFocused;

  return (
    <>
      {/* Toggle Button - Fixed positioned in top-right of viewport */}
      <button
        onClick={toggleDrawer}
        className="fixed top-20 right-4 z-50 flex items-center space-x-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-600 transition-colors text-white shadow-lg"
      >
        <InformationCircleIcon className="w-4 h-4 text-blue-400" />
      </button>

      <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
        <div
          className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px] scrollbar-hidden"
          ref={scrollRef}
        >
          <div
            className={cn(
              "pb-[200px] chat-messages-fade transition-all duration-300",
              isPromptFocused ? "blur-sm opacity-50" : "",
              className
            )}
            ref={messagesRef}
          >
            {chatState.messages.length ? (
              <>
                <ChatList
                  messages={chatState.messages}
                  isCompletionLoading={chatState.completionLoading}
                  onShowChunks={handleShowChunks}
                />
              </>
            ) : (
              <>
                <EmptyScreen
                  content={
                    <>
                      <h1 className="text-center text-5xl font-semibold leading-12 text-ellipsis overflow-hidden text-text_default_color p-1">
                        Chat with TXT 📃
                      </h1>
                    </>
                  }
                />
              </>
            )}
          </div>

          {/* Single prompt form container with dynamic positioning */}
          <div
            className={`fixed inset-x-0 w-full duration-300 ease-in-out animate-in peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px] ${
              shouldCenterPrompt ? "top-1/2 -translate-y-1/2" : "bottom-0"
            }`}
            style={{ zIndex: 10 }}
          >
            <div className="mx-auto lg:pl-72 lg:max-w-[calc(100%-18rem)]">
              <div
                className={`space-y-4 border-t bg-black border-gray-700 px-4 py-2 shadow-lg sm:border md:py-4 ${
                  shouldCenterPrompt ? "mx-4 rounded-xl" : "mx-8 rounded-t-xl"
                }`}
              >
                <PromptForm
                  input={input}
                  setInput={setInput}
                  sessionId={chatState.sessionId}
                  onFocus={handlePromptFocus}
                  onBlur={handlePromptBlur}
                  onSubmit={handleSubmit}
                />
                <p className="text-gray-200 text-muted-foreground px-2 text-center text-xs leading-normal hidden sm:block">
                  Made with ❤️ in Miami 🌴
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContextualAside
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
      <ChunksDrawer
        isOpen={isChunksDrawerOpen}
        onClose={() => setIsChunksDrawerOpen(false)}
        rerankedMatches={currentChunks}
        kb_search_query={currentKbQuery}
      />
    </>
  );
}
