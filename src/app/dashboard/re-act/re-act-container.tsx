"use client";

import {
  ChatContext,
  ChatDispatchContext,
} from "@/app/dashboard/re-act/chat-session-context";
import {
  chatReducer,
  initialState,
} from "@/app/dashboard/re-act/chat-session-reducer";
import { Chat as ReActChat } from "@/components/re-act-chat/chat";
import { useReducer } from "react";

export function ReActContainer() {
  const [chat, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={chat}>
      <ChatDispatchContext.Provider value={dispatch}>
        <ReActChat />
      </ChatDispatchContext.Provider>
    </ChatContext.Provider>
  );
}
