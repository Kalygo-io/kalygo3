"use client";

import { ChatContext } from "@/app/dashboard/design-and-run/chat-session-context";
import { SwarmChatList } from "@/components/shared/chat/swarm-chat-list";
import { ChatPanelForAsideLayout } from "@/components/shared/chat/chat-panel-for-aside-layout";
import { EmptyScreen } from "@/components/shared/chat/empty-screen";
import { useScrollAnchor } from "@/shared/hooks/use-scroll-anchor";
import { cn } from "@/shared/utils";
import { useContext, useEffect, useState } from "react";
import Drawer from "@/components/design-and-run/drawer";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import Aside from "@/components/design-and-run/aside";
import { PromptForm } from "@/components/design-and-run/prompt-form";

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
            <div className={cn("pb-[200px]", className)} ref={messagesRef}>
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
                      <div className="text-text_default_color">
                        Designed by Swarms 🔴
                      </div>
                    </>
                  }
                />
              )}
            </div>
            <ChatPanelForAsideLayout
              sessionId={chatState.sessionId}
              input={input}
              setInput={setInput}
              promptForm={PromptForm}
            />
          </div>
        </div>
      </div>

      <aside className="text-white pt-16 fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-gray-700 px-4 py-6 sm:px-6 lg:px-8 xl:block">
        <div className="pt-8">
          <Aside topNavHeight={topNavElClientHeight} />
        </div>
      </aside>

      <div
        className={`fixed top-16 right-0 m-4 xl:hidden`}
        onClick={toggleDrawer}
      >
        <Cog6ToothIcon className="w-6 h-6 cursor-pointer group-hover:text-gray-700" />
      </div>

      <Drawer
        topNavHeight={topNavElClientHeight}
        open={drawerOpen}
        setOpen={setDrawerOpen}
      />
    </>
  );
}
