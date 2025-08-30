import { useState, useCallback, useEffect } from "react";
import {
  chatAppSessionService,
  ChatAppSession,
} from "@/services/chatAppSessionService";

export function useChatSessions(onCurrentSessionDeleted?: () => void) {
  const [sessions, setSessions] = useState<ChatAppSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = useCallback(async () => {
    setLoading(true);
    try {
      const recent = await chatAppSessionService.getRecentSessions();
      setSessions(recent);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createSession = useCallback(async (appId: string) => {
    const newSession = await chatAppSessionService.createSession(appId);
    return newSession;
  }, []);

  // const updateSession = useCallback((id: string, messages: any[]) => {
  //   chatAppSessionService.updateSession(id, messages);
  //   setSessions((prev) => {
  //     const updated = prev.map((session) =>
  //       session.id === id
  //         ? { ...session, messages, lastUpdated: new Date() }
  //         : session
  //     );
  //     // Move updated session to top
  //     const session = updated.find((s) => s.id === id);
  //     if (session) {
  //       const filtered = updated.filter((s) => s.id !== id);
  //       return [session, ...filtered];
  //     }
  //     return updated;
  //   });
  // }, []);

  const deleteSession = useCallback(
    async (id: string) => {
      try {
        await chatAppSessionService.deleteSession(id);
        setSessions((prev) =>
          prev.filter((session) => session.sessionId !== id)
        );

        // Check if the deleted session was the current session
        const currentSessionId = new URLSearchParams(
          window.location.search
        ).get("session");
        if (currentSessionId === id && onCurrentSessionDeleted) {
          onCurrentSessionDeleted();
        }
      } catch (error) {
        console.error("Error deleting session:", error);
        throw error;
      }
    },
    [onCurrentSessionDeleted]
  );

  const getSession = useCallback((id: string) => {
    return chatAppSessionService.getSession(id);
  }, []);

  return {
    sessions,
    loading,
    createSession,
    // updateSession,
    deleteSession,
    getSession,
    // refreshSessions: loadSessions,
  };
}
