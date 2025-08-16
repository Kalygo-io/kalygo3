"use client";

import {
  ChatContext,
  ChatDispatchContext,
} from "@/app/dashboard/chat-with-pdf/chat-session-context";
import {
  chatReducer,
  initialState,
} from "@/app/dashboard/chat-with-pdf/chat-session-reducer";
import { Chat as RerankingChat } from "@/components/chat-with-pdf/chat";
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
