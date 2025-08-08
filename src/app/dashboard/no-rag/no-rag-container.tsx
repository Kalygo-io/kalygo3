"use client";

import { ChatContext, ChatDispatchContext } from "./chat-session-context";
import { chatReducer, initialState } from "./chat-session-reducer";
import { Chat as StreamingWithMemoryChat } from "@/components/no-rag/chat";
import { useReducer } from "react";

export function NoRagContainer() {
  const [chat, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={chat}>
      <ChatDispatchContext.Provider value={dispatch}>
        <StreamingWithMemoryChat />
      </ChatDispatchContext.Provider>
    </ChatContext.Provider>
  );
}
