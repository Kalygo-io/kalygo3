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
import { useReducer, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useChatSessions } from "@/shared/hooks/use-chat-sessions";
import { REACT_CHAT_APP_ID } from "@/ts/types/ChatAppIds";

export function ReActContainer() {
  const [chat, dispatch] = useReducer(chatReducer, initialState);
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionCreatedRef = useRef(false);

  const sessionId = searchParams.get("session");

  // Handle current session deletion
  const handleCurrentSessionDeleted = useCallback(() => {
    // Reset chat state to initial state
    dispatch({ type: "SET_MESSAGES", payload: [] });
    dispatch({ type: "SET_SESSION_ID", payload: "" });

    // Redirect to tokenizers page
    router.push("/dashboard/tokenizers");
  }, [router]);

  const { createSession, getSession } = useChatSessions(
    handleCurrentSessionDeleted
  );

  useEffect(() => {
    async function asyncCode() {
      if (sessionId) {
        dispatch({ type: "SET_SESSION_ID", payload: sessionId });
        const session = await getSession(sessionId);
        if (session && session.chatHistory.length > 0) {
          dispatch({ type: "SET_MESSAGES", payload: session.chatHistory });
        } else if (session) {
          // Session exists but has no messages, this is fine
        } else {
          const newSession = await createSession(REACT_CHAT_APP_ID);
          const url = new URL(window.location.href);
          url.searchParams.set("session", newSession.sessionId);
          window.history.replaceState({}, "", url.toString());
        }
      } else if (!sessionCreatedRef.current) {
        sessionCreatedRef.current = true;
        const newSession = await createSession(REACT_CHAT_APP_ID);
        const url = new URL(window.location.href);
        url.searchParams.set("session", newSession.sessionId);
        window.history.replaceState({}, "", url.toString());
      }
    }

    asyncCode();
  }, [sessionId, createSession, getSession]);

  return (
    <ChatContext.Provider value={chat}>
      <ChatDispatchContext.Provider value={dispatch}>
        <ReActChat />
      </ChatDispatchContext.Provider>
    </ChatContext.Provider>
  );
}
