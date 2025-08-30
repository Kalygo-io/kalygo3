"use client";

import { ChatContext, ChatDispatchContext } from "./chat-session-context";
import { chatReducer, initialState } from "./chat-session-reducer";
import { Chat as BasicMemoryChat } from "@/components/basic-memory/chat";
import { useReducer, useEffect } from "react";

export function BasicMemoryContainer() {
  const [chat, dispatch] = useReducer(chatReducer, initialState);

  useEffect(() => {
    return () => {
      if (chat.currentRequest) {
        dispatch({ type: "ABORT_CURRENT_REQUEST" });
      }
    };
  }, [chat.currentRequest]);

  return (
    <ChatContext.Provider value={chat}>
      <ChatDispatchContext.Provider value={dispatch}>
        <BasicMemoryChat />
      </ChatDispatchContext.Provider>
    </ChatContext.Provider>
  );
}
