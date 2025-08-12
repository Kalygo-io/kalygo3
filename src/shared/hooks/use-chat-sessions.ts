import { useState, useEffect, useCallback } from "react";
import { chatSessionService, ChatSession } from "@/services/chatSessionService";

export function useChatSessions() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = useCallback(() => {
    setLoading(true);
    const recentSessions = chatSessionService.getRecentSessions();
    setSessions(recentSessions);
    setLoading(false);
  }, []);

  const createSession = useCallback(
    (level: string, levelName: string, messages: any[] = []) => {
      const newSession = chatSessionService.createSession(
        level,
        levelName,
        messages
      );
      setSessions((prev) => [newSession, ...prev.slice(0, 9)]); // Keep only 10 sessions
      return newSession;
    },
    []
  );

  const updateSession = useCallback((id: string, messages: any[]) => {
    chatSessionService.updateSession(id, messages);
    setSessions((prev) => {
      const updated = prev.map((session) =>
        session.id === id
          ? { ...session, messages, lastUpdated: new Date() }
          : session
      );
      // Move updated session to top
      const session = updated.find((s) => s.id === id);
      if (session) {
        const filtered = updated.filter((s) => s.id !== id);
        return [session, ...filtered];
      }
      return updated;
    });
  }, []);

  const deleteSession = useCallback((id: string) => {
    chatSessionService.deleteSession(id);
    setSessions((prev) => prev.filter((session) => session.id !== id));
  }, []);

  const getSession = useCallback((id: string) => {
    return chatSessionService.getSession(id);
  }, []);

  return {
    sessions,
    loading,
    createSession,
    updateSession,
    deleteSession,
    getSession,
    refreshSessions: loadSessions,
  };
}
