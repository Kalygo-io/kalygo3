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
import { useReducer, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useChatSessions } from "@/shared/hooks/use-chat-sessions";

export function RawLLMContainer() {
  const [chat, dispatch] = useReducer(chatReducer, initialState);
  const searchParams = useSearchParams();
  const { createSession, updateSession, getSession } = useChatSessions();
  const sessionCreatedRef = useRef(false);

  const sessionId = searchParams.get("session");

  useEffect(() => {
    if (sessionId) {
      dispatch({ type: "SET_SESSION_ID", payload: sessionId });
      const session = getSession(sessionId);
      if (session && session.messages.length > 0) {
        dispatch({ type: "SET_MESSAGES", payload: session.messages });
      } else if (session) {
      } else {
        const newSession = createSession("/dashboard/raw-llm", "Raw LLM", []);
        const url = new URL(window.location.href);
        url.searchParams.set("session", newSession.id);
        window.history.replaceState({}, "", url.toString());
      }
    } else if (!sessionCreatedRef.current) {
      sessionCreatedRef.current = true;
      const newSession = createSession("/dashboard/raw-llm", "Raw LLM", []);
      const url = new URL(window.location.href);
      url.searchParams.set("session", newSession.id);
      window.history.replaceState({}, "", url.toString());
    }
  }, [sessionId, createSession, getSession]);

  // useEffect(() => {
  //   if (chat.messages.length > 0 && sessionId) {
  //     updateSession(sessionId, chat.messages);
  //   }
  // }, [chat.messages, sessionId, updateSession]);

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
