"use client";

import { ChatContext } from "@/app/dashboard/hierarchical/chat-session-context";
import { ChatList } from "@/components/hierarchical/chat-list";
import { ChatPanelForAsideLayout } from "@/components/shared/chat/chat-panel-for-aside-layout";
import { EmptyScreen } from "@/components/shared/chat/empty-screen";
import { useScrollAnchor } from "@/shared/hooks/use-scroll-anchor";
import { cn } from "@/shared/utils";
import { useContext, useEffect, useState } from "react";
import Drawer from "@/components/hierarchical/drawer";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import Aside from "@/components/hierarchical/aside";
import { PromptForm } from "@/components/hierarchical/prompt-form";

export interface ChatProps extends React.ComponentProps<"div"> {}

export function Chat({ id, className }: ChatProps) {
  const [input, setInput] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [topNavElClientHeight, setTopNavElClientHeight] = useState(0);
  const [asideWidth, setAsideWidth] = useState(382); // Default width (96px = 384px)
  const [isResizing, setIsResizing] = useState(false);
  const chatState = useContext(ChatContext);
  const { messagesRef, scrollRef, scrollToBottom } = useScrollAnchor();

  useEffect(() => {
    scrollToBottom();
  }, [chatState.blocks, scrollToBottom]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      // Calculate new width and limit it to 50% of the screen
      const newWidth = Math.min(
        window.innerWidth - e.clientX,
        window.innerWidth / 2
      );
      if (newWidth >= 382) {
        // Set a minimum width of 300px
        setAsideWidth(newWidth);
      }
    }
  };

  const handleMouseUp = () => {
    if (isResizing) setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  useEffect(() => {
    const topNavEl = document?.getElementById("dashboard-sticky-top-nav");
    setTopNavElClientHeight(topNavEl?.clientHeight || 0);
  }, []);

  return (
    <>
      {/* <div className={cn("xl:pr-96", `xl:pr-[${asideWidth}px]`)}> */}
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
                <EmptyScreen
                  content={
                    <h1 className="text-text_default_color text-center text-5xl font-semibold leading-12 text-ellipsis overflow-hidden leading-normal">
                      Hierarchical Crew 🥇
                    </h1>
                  }
                />
              )}
            </div>
            <ChatPanelForAsideLayout
              sessionId={chatState.sessionId}
              input={input}
              setInput={setInput}
              promptForm={PromptForm}
              asideWidth={asideWidth}
            />
          </div>
        </div>
      </div>

      <aside
        className="text-white pt-16 fixed inset-y-0 right-0 overflow-y-auto border-l border-gray-700 px-4 py-6 sm:px-6 lg:px-8 hidden xl:block"
        style={{ width: `${asideWidth}px` }}
      >
        <div className="pt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Customize Crew</h2>
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

      {/* Draggable Handle */}
      <div
        className="fixed inset-y-0 right-0 z-10 w-0.5 cursor-ew-resize bg-gray-600 hidden xl:block"
        onMouseDown={handleMouseDown}
        style={{ right: `${asideWidth}px` }}
      />

      <div
        className="fixed top-16 right-0 m-4 xl:hidden"
        onClick={toggleDrawer}
      >
        <Cog6ToothIcon className="text-text_default_color w-6 h-6 cursor-pointer group-hover:text-gray-700" />
      </div>

      <Drawer
        topNavHeight={topNavElClientHeight}
        open={drawerOpen}
        setOpen={setDrawerOpen}
      />
    </>
  );
}
