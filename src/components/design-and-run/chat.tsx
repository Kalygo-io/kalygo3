"use client";

import { ChatContext } from "@/app/dashboard/design-and-run/chat-session-context";
import { SwarmChatList } from "@/components/shared/chat/swarm-chat-list";
import { ChatPanel } from "@/components/design-and-run/chat-panel";
import { EmptyScreen } from "@/components/shared/chat/empty-screen";
import { useScrollAnchor } from "@/shared/hooks/use-scroll-anchor";
import { cn } from "@/shared/utils";
import { useContext, useEffect, useState } from "react";
import { PromptForm } from "@/components/design-and-run/prompt-form";
import { Drawer } from "@/components/design-and-run/drawer";
import { Aside } from "@/components/design-and-run/aside";

export interface ChatProps extends React.ComponentProps<"div"> {}

export function Chat({ className }: ChatProps) {
  const [input, setInput] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [topNavElClientHeight, setTopNavElClientHeight] = useState(0);
  const chatState = useContext(ChatContext);
  const { messagesRef, scrollRef, scrollToBottom } = useScrollAnchor();

  useEffect(() => {
    scrollToBottom();
  }, [chatState.blocks, scrollToBottom]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    const topNavEl = document?.getElementById("dashboard-sticky-top-nav");
    setTopNavElClientHeight(topNavEl?.clientHeight || 0);
  }, []);

  return (
    <>
      <div className="xl:pr-96">
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
          <div
            className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
            ref={scrollRef}
          >
            <div
              className={cn("pb-[200px] chat-messages-fade", className)}
              ref={messagesRef}
            >
              {chatState.blocks.length ? (
                <SwarmChatList
                  blocks={chatState.blocks}
                  isCompletionLoading={chatState.completionLoading}
                />
              ) : (
                <EmptyScreen
                  content={
                    <>
                      <h1 className="text-center text-text_default_color text-5xl font-semibold leading-12 text-ellipsis overflow-hidden leading-normal">
                        Design & Run Swarm 🖼️
                      </h1>
                      {/* <div className="text-text_default_color">
                        Designed by Swarms 🔴
                      </div> */}
                    </>
                  }
                />
              )}
            </div>
            <ChatPanel
              sessionId={chatState.sessionId}
              input={input}
              setInput={setInput}
              isAtBottom={false}
              scrollToBottom={scrollToBottom}
            />
          </div>
        </div>
      </div>
      <Aside />
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  );
}
