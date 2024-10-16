import { v4 as uuid } from "uuid";
import { Message } from "@/ts/types/Message";

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
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: action.payload.id,
            content: action.payload.content,
            role: action.payload.role,
            error: action.payload.error,
          },
        ],
      };
    }
    case "EDIT_MESSAGE": {
      const index = state.messages.findIndex((m) => m.id === action.payload.id);

      return {
        ...state,
        messages: [
          ...state.messages.slice(0, index),
          {
            ...state.messages[index],
            ...action.payload,
          },
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
