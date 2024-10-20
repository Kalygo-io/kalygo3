"use client";

import {
  ChatContext,
  ChatDispatchContext,
} from "@/app/dashboard/spreadsheet/chat-session-context";
import {
  Action,
  chatReducer,
  initialState,
} from "@/app/dashboard/spreadsheet/chat-session-reducer";
import { Chat as SpreadsheetChat } from "@/components/spreadsheet/chat";
import { BlocksUnion } from "@/ts/types/BlocksUnion";
import { useReducer } from "react";

export function SpreadsheetContainer() {
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

  console.log("--- SpreadsheetContainer ---");

  return (
    <ChatContext.Provider value={chat}>
      <ChatDispatchContext.Provider value={dispatch}>
        <SpreadsheetChat />
      </ChatDispatchContext.Provider>
    </ChatContext.Provider>
  );
}
