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
import { useReducer, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useChatSessions } from "@/shared/hooks/use-chat-sessions";

export function RawLLMContainer() {
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
        <RawLLMChat />
      </ChatDispatchContext.Provider>
    </ChatContext.Provider>
  );
}
