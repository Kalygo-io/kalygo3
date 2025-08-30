"use client";

import {
  ChatContext,
  ChatDispatchContext,
} from "@/app/dashboard/agentic-rag/chat-session-context";
import {
  chatReducer,
  initialState,
} from "@/app/dashboard/agentic-rag/chat-session-reducer";
import { Chat as AgenticRagChat } from "@/components/agentic-rag-chat/chat";
import { useReducer, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useChatSessions } from "@/shared/hooks/use-chat-sessions";

export function AgenticRagContainer() {
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
      console.log("Session loading effect triggered", { sessionId });
      if (sessionId) {
        // Update the chat state with the actual session ID from URL
        dispatch({ type: "SET_SESSION_ID", payload: sessionId });

        // Load existing session
        const session = await getSession(sessionId);
        console.log("Retrieved session", { session });
        if (session && session.chatHistory.length > 0) {
          console.log("Loading messages from session", {
            messages: session.chatHistory,
          });
          dispatch({ type: "SET_MESSAGES", payload: session.chatHistory });
        } else if (session) {
          console.log("Session found but no messages", { session });
          // Session exists but has no messages, this is fine
        } else {
          console.log("No session found for ID", { sessionId });
          // Session doesn't exist, create a new one
          const newSession = await createSession("/dashboard/agentic-rag");
          console.log("Created new session for missing ID", { newSession });
          // Update URL with new session ID
          const url = new URL(window.location.href);
          url.searchParams.set("session", newSession.sessionId);
          window.history.replaceState({}, "", url.toString());
        }
      } else if (!sessionCreatedRef.current) {
        // Create new session if no session ID and we haven't created one yet
        sessionCreatedRef.current = true;
        const newSession = await createSession("/dashboard/agentic-rag");
        console.log("Created new session", { newSession });
        // Update URL with session ID
        const url = new URL(window.location.href);
        url.searchParams.set("session", newSession.sessionId);
        window.history.replaceState({}, "", url.toString());
      }
    }

    asyncCode();
  }, [sessionId, createSession, getSession]);

  // useEffect(() => {
  //   if (chat.messages.length > 0 && sessionId) {
  //     // Update session when messages change
  //     updateSession(sessionId, chat.messages);
  //   }
  // }, [chat.messages, sessionId, updateSession]);

  return (
    <ChatContext.Provider value={chat}>
      <ChatDispatchContext.Provider value={dispatch}>
        <AgenticRagChat />
      </ChatDispatchContext.Provider>
    </ChatContext.Provider>
  );
}
