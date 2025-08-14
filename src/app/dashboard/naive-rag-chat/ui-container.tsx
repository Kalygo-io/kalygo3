"use client";

import {
  ChatContext,
  ChatDispatchContext,
} from "@/app/dashboard/naive-rag-chat/chat-session-context";
import {
  chatReducer,
  initialState,
} from "@/app/dashboard/naive-rag-chat/chat-session-reducer";
import { Chat as NaiveRagChat } from "@/components/naive-rag-agent/chat";
import { useReducer } from "react";

export function NaiveRagChatUiContainer() {
  const [chat, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={chat}>
      <ChatDispatchContext.Provider value={dispatch}>
        <NaiveRagChat />
      </ChatDispatchContext.Provider>
    </ChatContext.Provider>
  );
}
