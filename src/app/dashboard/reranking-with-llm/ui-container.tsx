"use client";

import {
  ChatContext,
  ChatDispatchContext,
} from "@/app/dashboard/reranking-with-llm/chat-session-context";
import {
  chatReducer,
  initialState,
} from "@/app/dashboard/reranking-with-llm/chat-session-reducer";
import { Chat as RerankingChat } from "@/components/reranking-with-llm/chat";
import { useReducer } from "react";

export function RerankingChatUiContainer() {
  const [chat, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={chat}>
      <ChatDispatchContext.Provider value={dispatch}>
        <RerankingChat />
      </ChatDispatchContext.Provider>
    </ChatContext.Provider>
  );
}
