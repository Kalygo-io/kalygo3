import { Message } from "@/ts/types/Message";
import { v4 as uuid } from "uuid";

export interface ChatAppSession {
  id: number;
  sessionId: string;
  chatAppId: string;
  accountId: number;
  chatHistory: Message[];
  createdAt: string;
  title?: string;
}

export interface ChatAppSessionCreate {
  chatAppId: string;
  title?: string;
}

class ChatAppSessionService {
  // private getSessions(): ChatAppSession[] {
  //   if (typeof window === "undefined") return [];

  //   try {
  //     const stored = localStorage.getItem(this.STORAGE_KEY);
  //     return stored ? JSON.parse(stored) : [];
  //   } catch (error) {
  //     console.error("Error loading chat sessions:", error);
  //     return [];
  //   }
  // }

  // private saveSessions(sessions: ChatAppSession[]): void {
  //   if (typeof window === "undefined") return;

  //   try {
  //     localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sessions));
  //   } catch (error) {
  //     console.error("Error saving chat sessions:", error);
  //   }
  // }

  // getRecentSessions(): ChatSession[] {
  //   const sessions = this.getSessions();
  //   return sessions
  //     .sort(
  //       (a, b) =>
  //         new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  //     )
  //     .slice(0, this.MAX_SESSIONS);
  // }

  getSession(id: string): ChatAppSession | null {
    // const sessions = this.getSessions();
    // return (
    //   sessions.find((session: ChatAppSession) => session.id === id) || null
    // );
    return {
      id: 1,
      sessionId: id,
      chatAppId: "persistent-memory",
      accountId: 1,
      createdAt: new Date().toISOString(),
      chatHistory: [],
      title: undefined,
    };
  }

  async createSession(appId: string, title?: string): Promise<ChatAppSession> {
    try {
      const sessionData: ChatAppSessionCreate = {
        chatAppId: appId,
        title: title,
      };

      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_AI_API_URL}/api/chat-app-sessions/sessions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sessionData),
          credentials: "include",
        }
      );

      if (!resp.ok) {
        const errorText = await resp.text();
        console.error("Failed to create session:", resp.status, errorText);
        throw new Error(
          `Failed to create session: ${resp.status} - ${errorText}`
        );
      }

      const session: ChatAppSession = await resp.json();
      return session;
    } catch (error) {
      console.error("Error creating chat app session:", error);
      throw error;
    }
  }

  // updateSession(id: string, messages: any[]): void {
  //   const sessions = this.getSessions();
  //   const sessionIndex = sessions.findIndex((session) => session.id === id);

  //   if (sessionIndex !== -1) {
  //     sessions[sessionIndex].messages = messages;
  //     sessions[sessionIndex].lastUpdated = new Date();
  //     sessions[sessionIndex].title = this.generateTitle(
  //       sessions[sessionIndex].levelName,
  //       messages
  //     );

  //     // Move to top of list
  //     const session = sessions.splice(sessionIndex, 1)[0];
  //     sessions.unshift(session);

  //     this.saveSessions(sessions);
  //   }
  // }

  // deleteSession(id: string): void {
  //   const sessions = this.getSessions();
  //   const filteredSessions = sessions.filter((session) => session.id !== id);
  //   this.saveSessions(filteredSessions);
  // }

  private generateId(): string {
    return uuid();
  }

  // private generateTitle(levelName: string, messages: any[]): string {
  //   if (messages.length === 0) {
  //     return `${levelName} - New Session`;
  //   }

  //   // Try to get the first user message as title
  //   const firstUserMessage = messages.find((msg) => msg.role === "human");
  //   if (firstUserMessage) {
  //     const content = firstUserMessage.content;
  //     return content.length > 50 ? content.substring(0, 50) + "..." : content;
  //   }

  //   return `${levelName} - ${messages.length} messages`;
  // }
}

export const chatAppSessionService = new ChatAppSessionService();
