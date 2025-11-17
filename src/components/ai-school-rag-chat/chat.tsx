"use client";

import { ChatContext } from "@/app/dashboard/ai-school-agent/chat-session-context";
import { ChatList } from "@/components/ai-school-rag-chat/chat-list";
import { ChatPanel } from "@/components/shared/chat/chat-panel";
import { EmptyScreen } from "@/components/shared/chat/empty-screen";
import { PromptForm } from "@/components/ai-school-rag-chat/prompt-form";
import { useScrollAnchor } from "@/shared/hooks/use-scroll-anchor";
import { cn } from "@/shared/utils";
import { useContext, useEffect, useState } from "react";
import { ContextualAside } from "./contextual-aside";
import {
  InformationCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

export interface ChatProps extends React.ComponentProps<"div"> {}

export function Chat({ id, className }: ChatProps) {
  const [input, setInput] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const chatState = useContext(ChatContext);
  const { messagesRef, scrollRef, scrollToBottom } = useScrollAnchor();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Check scroll position and update button visibility
  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const hasScrollableContent = scrollHeight > clientHeight;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

      setShowScrollButton(hasScrollableContent && !isNearBottom);
    }
  };

  // Check if we need to show the scroll button
  useEffect(() => {
    const handleScroll = () => {
      checkScrollPosition();
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      checkScrollPosition();
      return () => scrollElement.removeEventListener("scroll", handleScroll);
    }
  }, [scrollRef]);

  // Also check when messages change to catch new content
  useEffect(() => {
    const timer = setTimeout(checkScrollPosition, 100);
    return () => clearTimeout(timer);
  }, [chatState?.messages]);

  const handleScrollToBottom = () => {
    scrollToBottom();
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

      {/* Floating Scroll to Bottom Button - Integrated with input area */}
      <button
        onClick={handleScrollToBottom}
        className={cn(
          "fixed bottom-6 z-40 p-2 rounded-full bg-gray-700/90 hover:bg-gray-600/90 border border-white/20 hover:border-white/30 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm",
          "text-gray-300 hover:text-white",
          // Responsive positioning - further from edge on mobile, closer on desktop
          "right-4 sm:right-6",
          // Temporarily always visible for testing
          "opacity-100 translate-y-0 scale-100"
          // showScrollButton
          //   ? "opacity-100 translate-y-0 scale-100"
          //   : "opacity-0 translate-y-2 scale-95 pointer-events-none"
        )}
        title="Scroll to bottom"
      >
        <ChevronDownIcon className="w-4 h-4" />
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
              <ChatList
                messages={chatState.messages}
                isCompletionLoading={chatState.completionLoading}
                // @ts-ignore
                currentTool={chatState.currentTool}
              />
            ) : (
              <EmptyScreen
                content={
                  <>
                    <h1 className="text-center text-5xl font-semibold leading-12 text-ellipsis overflow-hidden text-text_default_color p-1">
                      AI School Agent 🤖
                    </h1>
                  </>
                }
              />
            )}
          </div>
          <ChatPanel
            sessionId={chatState.sessionId}
            input={input}
            setInput={setInput}
            promptForm={PromptForm}
          />
        </div>
      </div>
      <ContextualAside
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}
