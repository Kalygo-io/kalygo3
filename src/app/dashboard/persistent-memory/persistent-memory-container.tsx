"use client";

import { ChatContext, ChatDispatchContext } from "./chat-session-context";
import { chatReducer, initialState } from "./chat-session-reducer";
import { Chat as PersistentMemoryChat } from "@/components/persistent-memory/chat";
import { useReducer, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useChatSessions } from "@/shared/hooks/use-chat-sessions";
import { errorToast } from "@/shared/toasts/errorToast";
import { PERSISTENT_MEMORY_CHAT_APP_ID } from "@/ts/types/ChatAppIds";

export function PersistentMemoryContainer() {
  const [chat, dispatch] = useReducer(chatReducer, initialState);
  const searchParams = useSearchParams();
  const { createSession, getSession } = useChatSessions();
  const sessionCreatedRef = useRef(false);

  const sessionId = searchParams.get("session");

  useEffect(() => {
    async function asyncCode() {
      try {
        if (sessionId) {
          dispatch({ type: "SET_SESSION_ID", payload: sessionId });
          // debugger;
          const session = await getSession(sessionId);

          if (session && session.chatHistory) {
            dispatch({ type: "SET_MESSAGES", payload: session.chatHistory });
          } else if (session) {
          } else {
            const newSession = await createSession(
              PERSISTENT_MEMORY_CHAT_APP_ID
            );
            const url = new URL(window.location.href);
            url.searchParams.set("session", newSession.sessionId);
            window.history.replaceState({}, "", url.toString());
          }
        } else if (!sessionCreatedRef.current) {
          sessionCreatedRef.current = true;
          const newSession = await createSession(PERSISTENT_MEMORY_CHAT_APP_ID);
          const url = new URL(window.location.href);
          url.searchParams.set("session", newSession.sessionId);
          window.history.replaceState({}, "", url.toString());
        }
      } catch (error) {
        // console.error("Error in persistent-memory container:", error);
        errorToast(`Error in persistent-memory container: ${error}`);
      }
    }

    asyncCode();
  }, [sessionId, createSession, getSession]);

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
        <PersistentMemoryChat />
      </ChatDispatchContext.Provider>
    </ChatContext.Provider>
  );
}
