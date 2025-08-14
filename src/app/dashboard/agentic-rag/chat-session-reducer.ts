export interface ChatState {
  messages: any[];
  completionLoading: boolean;
  sessionId: string;
}

export const initialState: ChatState = {
  messages: [],
  completionLoading: false,
  sessionId: "",
};

export type ChatAction =
  | { type: "SET_MESSAGES"; payload: any[] }
  | { type: "ADD_MESSAGE"; payload: any }
  | { type: "SET_COMPLETION_LOADING"; payload: boolean }
  | { type: "SET_SESSION_ID"; payload: string };

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "SET_MESSAGES":
      return { ...state, messages: action.payload };
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    case "SET_COMPLETION_LOADING":
      return { ...state, completionLoading: action.payload };
    case "SET_SESSION_ID":
      return { ...state, sessionId: action.payload };
    default:
      return state;
  }
}
