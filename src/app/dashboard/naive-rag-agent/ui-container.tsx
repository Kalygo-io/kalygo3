"use client";

import {
  ChatContext,
  ChatDispatchContext,
} from "@/app/dashboard/naive-rag-agent/chat-session-context";
import {
  chatReducer,
  initialState,
} from "@/app/dashboard/naive-rag-agent/chat-session-reducer";
import { Chat as NaiveRagChat } from "@/components/naive-rag-agent/chat";
import { useReducer } from "react";

export function RagAgentUiContainer() {
  const [chat, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={chat}>
      <ChatDispatchContext.Provider value={dispatch}>
        <NaiveRagChat />
      </ChatDispatchContext.Provider>
    </ChatContext.Provider>
  );
}
