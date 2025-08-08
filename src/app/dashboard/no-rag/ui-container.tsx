"use client";

import {
  ChatContext,
  ChatDispatchContext,
} from "@/app/dashboard/no-rag/chat-session-context";
import {
  chatReducer,
  initialState,
} from "@/app/dashboard/no-rag/chat-session-reducer";
import { Chat as NoRagChat } from "@/components/no-rag/chat";
import { useReducer } from "react";

export function NoRagUiContainer() {
  const [chat, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={chat}>
      <ChatDispatchContext.Provider value={dispatch}>
        <NoRagChat />
      </ChatDispatchContext.Provider>
    </ChatContext.Provider>
  );
}
