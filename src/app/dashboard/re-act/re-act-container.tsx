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
import { useReducer, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useChatSessions } from "@/shared/hooks/use-chat-sessions";
import { chatSessionService } from "@/services/chatSessionService";

export function ReActContainer() {
  const [chat, dispatch] = useReducer(chatReducer, initialState);
  const searchParams = useSearchParams();
  const { createSession, updateSession, getSession } = useChatSessions();
  const sessionCreatedRef = useRef(false);

  const sessionId = searchParams.get("session");

  useEffect(() => {
    console.log("Session loading effect triggered", { sessionId });
    if (sessionId) {
      // Load existing session
      const session = getSession(sessionId);
      console.log("Retrieved session", { session });
      if (session && session.messages.length > 0) {
        console.log("Loading messages from session", {
          messages: session.messages,
        });
        dispatch({ type: "SET_MESSAGES", payload: session.messages });
      } else if (session) {
        console.log("Session found but no messages", { session });
        // Session exists but has no messages, this is fine
      } else {
        console.log("No session found for ID", { sessionId });
        // Session doesn't exist, create a new one
        const newSession = createSession(
          "/dashboard/re-act",
          "Agentic RAG",
          []
        );
        console.log("Created new session for missing ID", { newSession });
        // Update URL with new session ID
        const url = new URL(window.location.href);
        url.searchParams.set("session", newSession.id);
        window.history.replaceState({}, "", url.toString());
      }
    } else if (!sessionCreatedRef.current) {
      // Create new session if no session ID and we haven't created one yet
      sessionCreatedRef.current = true;
      const newSession = createSession("/dashboard/re-act", "Agentic RAG", []);
      console.log("Created new session", { newSession });
      // Update URL with session ID
      const url = new URL(window.location.href);
      url.searchParams.set("session", newSession.id);
      window.history.replaceState({}, "", url.toString());
    }
  }, [sessionId, createSession, getSession]);

  useEffect(() => {
    if (chat.messages.length > 0 && sessionId) {
      // Update session when messages change
      updateSession(sessionId, chat.messages);
    }
  }, [chat.messages, sessionId, updateSession]);

  return (
    <ChatContext.Provider value={chat}>
      <ChatDispatchContext.Provider value={dispatch}>
        <ReActChat />
      </ChatDispatchContext.Provider>
    </ChatContext.Provider>
  );
}
