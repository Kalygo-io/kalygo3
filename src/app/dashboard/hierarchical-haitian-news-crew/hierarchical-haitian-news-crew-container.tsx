"use client";

import {
  ChatContext,
  ChatDispatchContext,
} from "@/app/dashboard/hierarchical-haitian-news-crew/chat-session-context";
import {
  Action,
  chatReducer,
  initialState,
} from "@/app/dashboard/hierarchical-haitian-news-crew/chat-session-reducer";
import { Chat as HierarchicalCrewChat } from "@/components/hierarchical-haitian-news-crew/chat";
import { BlocksUnion } from "@/ts/types/BlocksUnion";
import { useReducer } from "react";

export function HierarchicalContainer() {
  const [chat, dispatch] = useReducer<
    (
      state: {
        blocks: BlocksUnion[];
        completionLoading: boolean;
        sessionId: string;
      },
      action: Action
    ) => {
      blocks: BlocksUnion[];
      completionLoading: boolean;
      sessionId: string;
    }
  >(chatReducer, initialState);

  return (
    <ChatContext.Provider value={chat}>
      <ChatDispatchContext.Provider value={dispatch}>
        <HierarchicalCrewChat />
      </ChatDispatchContext.Provider>
    </ChatContext.Provider>
  );
}
