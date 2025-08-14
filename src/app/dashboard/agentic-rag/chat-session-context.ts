import { createContext } from "react";

export interface ChatState {
  messages: any[];
  completionLoading: boolean;
  sessionId: string;
}

export const ChatContext = createContext<ChatState>({
  messages: [],
  completionLoading: false,
  sessionId: "",
});

export const ChatDispatchContext = createContext<any>(null);
