"use client";

import {
  ChatContext,
  ChatDispatchContext,
} from "@/app/dashboard/basic-memory/chat-session-context";
import {
  chatReducer,
  initialState,
} from "@/app/dashboard/basic-memory/chat-session-reducer";
import { Chat as PersistentMemoryChat } from "@/components/basic-memory/chat";
import { useReducer } from "react";

export function NoRagUiContainer() {
  const [chat, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={chat}>
      <ChatDispatchContext.Provider value={dispatch}>
        <PersistentMemoryChat />
      </ChatDispatchContext.Provider>
    </ChatContext.Provider>
  );
}
