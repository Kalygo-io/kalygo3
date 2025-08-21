import { v4 as uuid } from "uuid";

export interface ChatSession {
  id: string;
  level: string;
  levelName: string;
  messages: any[];
  lastUpdated: Date;
  title: string;
}

class ChatSessionService {
  private readonly STORAGE_KEY = "chat_sessions";
  private readonly MAX_SESSIONS = 10;

  private getSessions(): ChatSession[] {
    if (typeof window === "undefined") return [];

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading chat sessions:", error);
      return [];
    }
  }

  private saveSessions(sessions: ChatSession[]): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sessions));
    } catch (error) {
      console.error("Error saving chat sessions:", error);
    }
  }

  getRecentSessions(): ChatSession[] {
    const sessions = this.getSessions();
    return sessions
      .sort(
        (a, b) =>
          new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      )
      .slice(0, this.MAX_SESSIONS);
  }

  getSession(id: string): ChatSession | null {
    const sessions = this.getSessions();
    return sessions.find((session) => session.id === id) || null;
  }

  createSession(
    level: string,
    levelName: string,
    messages: any[] = []
  ): ChatSession {
    const session: ChatSession = {
      id: this.generateId(),
      level,
      levelName,
      messages,
      lastUpdated: new Date(),
      title: this.generateTitle(levelName, messages),
    };

    const sessions = this.getSessions();
    sessions.unshift(session);

    // Keep only the most recent sessions
    if (sessions.length > this.MAX_SESSIONS) {
      sessions.splice(this.MAX_SESSIONS);
    }

    this.saveSessions(sessions);
    return session;
  }

  updateSession(id: string, messages: any[]): void {
    const sessions = this.getSessions();
    const sessionIndex = sessions.findIndex((session) => session.id === id);

    if (sessionIndex !== -1) {
      sessions[sessionIndex].messages = messages;
      sessions[sessionIndex].lastUpdated = new Date();
      sessions[sessionIndex].title = this.generateTitle(
        sessions[sessionIndex].levelName,
        messages
      );

      // Move to top of list
      const session = sessions.splice(sessionIndex, 1)[0];
      sessions.unshift(session);

      this.saveSessions(sessions);
    }
  }

  deleteSession(id: string): void {
    const sessions = this.getSessions();
    const filteredSessions = sessions.filter((session) => session.id !== id);
    this.saveSessions(filteredSessions);
  }

  private generateId(): string {
    return uuid();
  }

  private generateTitle(levelName: string, messages: any[]): string {
    if (messages.length === 0) {
      return `${levelName} - New Session`;
    }

    // Try to get the first user message as title
    const firstUserMessage = messages.find((msg) => msg.role === "human");
    if (firstUserMessage) {
      const content = firstUserMessage.content;
      return content.length > 50 ? content.substring(0, 50) + "..." : content;
    }

    return `${levelName} - ${messages.length} messages`;
  }
}

export const chatSessionService = new ChatSessionService();
