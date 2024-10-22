import { createContext, useContext, Dispatch } from "react";
import { Action, initialState } from "./chat-session-reducer";

export const ChatContext = createContext(initialState);
export const ChatDispatchContext = createContext<Dispatch<Action>>(() => null);

export const useHierarchicalHaitianNewsCrewChatContext = () => {
  const context = useContext(ChatContext);

  if (context === undefined) {
    throw new Error("Custom Hook must be used within the relevant Provider");
  }
  return context;
};
