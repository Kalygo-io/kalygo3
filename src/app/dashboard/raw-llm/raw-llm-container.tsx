"use client";

import {
  ChatContext,
  ChatDispatchContext,
} from "@/app/dashboard/raw-llm/chat-session-context";
import {
  chatReducer,
  initialState,
} from "@/app/dashboard/raw-llm/chat-session-reducer";
import { Chat as RawLLMChat } from "@/components/raw-llm/chat";
import { useReducer } from "react";

export function RawLLMContainer() {
  const [chat, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={chat}>
      <ChatDispatchContext.Provider value={dispatch}>
        <RawLLMChat />
      </ChatDispatchContext.Provider>
    </ChatContext.Provider>
  );
}
