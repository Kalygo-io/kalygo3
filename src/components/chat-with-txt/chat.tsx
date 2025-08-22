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

export interface ChatProps extends React.ComponentProps<"div"> {}

export function Chat({ id, className }: ChatProps) {
  const [input, setInput] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isChunksDrawerOpen, setIsChunksDrawerOpen] = useState(false);
  const [currentChunks, setCurrentChunks] = useState<RerankedMatch[]>([]);
  const [currentKbQuery, setCurrentKbQuery] = useState<string>("");
  const [isPromptFocused, setIsPromptFocused] = useState(false);
  const chatState = useContext(ChatContext);
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
    setIsPromptFocused(true);
  };

  const handlePromptBlur = () => {
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
            className={cn("pb-[200px] chat-messages-fade", className)}
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

          {/* Conditional rendering based on whether to center the prompt or not */}
          {shouldCenterPrompt ? (
            <div
              className="fixed inset-x-0 w-full duration-300 ease-in-out animate-in peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]"
              style={{ zIndex: 10, bottom: "10%" }}
            >
              <div className="mx-auto lg:pl-72 lg:max-w-[calc(100%-18rem)]">
                <div className="mx-4 space-y-4 border-t bg-black border-gray-700 px-4 py-2 shadow-lg rounded-xl sm:border md:py-4">
                  {/* <div className="flex justify-center">
                    <div className="w-full max-w-2xl"> */}
                  <PromptForm
                    input={input}
                    setInput={setInput}
                    sessionId={chatState.sessionId}
                    onFocus={handlePromptFocus}
                    onBlur={handlePromptBlur}
                  />
                  {/* </div>
                  </div> */}
                  <p className="text-gray-200 text-muted-foreground px-2 text-center text-xs leading-normal hidden sm:block">
                    Made with ❤️ in Miami 🌴
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <ChatPanel
              sessionId={chatState.sessionId}
              input={input}
              setInput={setInput}
              promptForm={PromptForm}
              onFocus={handlePromptFocus}
              onBlur={handlePromptBlur}
            />
          )}
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
