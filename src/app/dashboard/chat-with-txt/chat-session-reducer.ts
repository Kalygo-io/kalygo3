import { v4 as uuid } from "uuid";
import { Message, RerankedMatch } from "@/ts/types/Message";

export type Action =
  | {
      type: "ADD_MESSAGE";
      payload: Message;
    }
  | {
      type: "SET_COMPLETION_LOADING";
      payload: boolean;
    }
  | {
      type: "EDIT_MESSAGE";
      payload: {
        id: string;
        role?: "human" | "ai";
        content?: string;
        error?: any;
        rerankedMatches?: RerankedMatch[];
      };
    };

export function chatReducer(
  state: {
    messages: Message[];
    completionLoading: boolean;
    sessionId: string;
  },
  action: Action
) {
  switch (action.type) {
    case "ADD_MESSAGE": {
      console.log("ADD_MESSAGE reducer called with:", action.payload);
      console.log(
        "Reranked matches in payload:",
        action.payload.rerankedMatches
      );

      const newMessage = {
        id: action.payload.id,
        content: action.payload.content,
        role: action.payload.role,
        error: action.payload.error,
        rerankedMatches: action.payload.rerankedMatches,
      };

      console.log("New message object:", newMessage);

      return {
        ...state,
        messages: [...state.messages, newMessage],
      };
    }
    case "EDIT_MESSAGE": {
      const index = state.messages.findIndex((m) => m.id === action.payload.id);

      console.log("EDIT_MESSAGE reducer called with:", action.payload);
      console.log("Existing message at index:", index, state.messages[index]);

      const updatedMessage = {
        ...state.messages[index],
        ...action.payload,
      };

      console.log("Updated message:", updatedMessage);

      return {
        ...state,
        messages: [
          ...state.messages.slice(0, index),
          updatedMessage,
          ...state.messages.slice(index + 1),
        ],
      };
    }
    case "SET_COMPLETION_LOADING": {
      return {
        ...state,
        completionLoading: action.payload,
      };
    }
    default: {
      throw Error("Unknown action type");
    }
  }
}

export const initialState: {
  messages: Message[];
  completionLoading: boolean;
  sessionId: string;
} = {
  messages: [],
  completionLoading: false,
  sessionId: uuid(),
};
