"use client";

import { ChatContext } from "@/app/dashboard/spreadsheet/chat-session-context";
import { ChatList } from "@/components/spreadsheet/chat-list";
import { ChatPanel } from "@/components/spreadsheet/chat-panel";
import { EmptyScreen } from "@/components/spreadsheet/empty-screen";
import { useScrollAnchor } from "@/shared/hooks/use-scroll-anchor";
import { cn } from "@/shared/utils";
import { useContext, useEffect, useState } from "react";
import Drawer from "@/components/spreadsheet/drawer";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import Aside from "./aside";

export interface ChatProps extends React.ComponentProps<"div"> {}

export function Chat({ className }: ChatProps) {
  const [input, setInput] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [topNavElClientHeight, setTopNavElClientHeight] = useState(0);
  const chatState = useContext(ChatContext);
  const { messagesRef, scrollRef, isAtBottom, scrollToBottom } =
    useScrollAnchor();

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
                <ChatList
                  blocks={chatState.blocks}
                  isCompletionLoading={chatState.completionLoading}
                />
              ) : (
                <EmptyScreen />
              )}
            </div>
            <ChatPanel
              sessionId={chatState.sessionId}
              input={input}
              setInput={setInput}
              isAtBottom={isAtBottom}
              scrollToBottom={scrollToBottom}
            />
          </div>
        </div>
      </div>

      <aside className="text-white pt-16 fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-gray-700 px-4 py-6 sm:px-6 lg:px-8 xl:block">
        <div className="pt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Customize Swarm</h2>
            <button
              className="text-gray-400 hover:text-gray-200"
              onClick={toggleDrawer}
            >
              <Cog6ToothIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="text-gray-400 mt-2">
            Customize the appearance and behavior of the AI chatbot.
            <Aside topNavHeight={topNavElClientHeight} />
          </div>
        </div>
      </aside>

      <div
        className={`fixed top-16 right-0 m-4 xl:hidden`}
        onClick={toggleDrawer}
      >
        <Cog6ToothIcon className="w-6 h-6 text-white cursor-pointer group-hover:text-gray-700" />
      </div>

      <Drawer
        topNavHeight={topNavElClientHeight}
        open={drawerOpen}
        setOpen={setDrawerOpen}
      />
    </>
  );
}
