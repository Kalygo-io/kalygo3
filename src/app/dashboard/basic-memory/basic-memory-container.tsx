"use client";

import { ChatContext, ChatDispatchContext } from "./chat-session-context";
import { chatReducer, initialState } from "./chat-session-reducer";
import { Chat as StreamingWithMemoryChat } from "@/components/basic-memory/chat";
import { useReducer, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useChatSessions } from "@/shared/hooks/use-chat-sessions";

export function BasicMemoryContainer() {
  const [chat, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={chat}>
      <ChatDispatchContext.Provider value={dispatch}>
        <StreamingWithMemoryChat />
      </ChatDispatchContext.Provider>
    </ChatContext.Provider>
  );
}
