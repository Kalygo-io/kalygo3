"use client";

import { ChatContext } from "@/app/dashboard/raw-llm/chat-session-context";
import { ChatList } from "@/components/shared/chat/chat-list";
import { ChatPanel } from "@/components/shared/chat/chat-panel";
import { EmptyScreen } from "@/components/shared/chat/empty-screen";
import { PromptForm } from "@/components/raw-llm/prompt-form";
import { useScrollAnchor } from "@/shared/hooks/use-scroll-anchor";
import { cn } from "@/shared/utils";
import { useContext, useEffect, useState } from "react";

export interface ChatProps extends React.ComponentProps<"div"> {}

export function Chat({ id, className }: ChatProps) {
  const [input, setInput] = useState("");
  const chatState = useContext(ChatContext);
  const { messagesRef, scrollRef, scrollToBottom } = useScrollAnchor();

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages, scrollToBottom]);

  return (
    <div
      className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px] scrollbar-hidden"
      ref={scrollRef}
    >
      <div className={cn("pb-[200px]", className)} ref={messagesRef}>
        {chatState.messages.length ? (
          <ChatList
            messages={chatState.messages}
            isCompletionLoading={chatState.completionLoading}
          />
        ) : (
          <EmptyScreen
            content={
              <>
                <h1 className="text-center text-5xl font-semibold leading-12 text-ellipsis overflow-hidden text-text_default_color p-1">
                  Raw LLM 🍣
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
  );
}
