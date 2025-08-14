"use client";

import * as React from "react";

import { ChatDispatchContext } from "@/app/dashboard/agentic-rag/chat-session-context";
import { useEnterSubmit } from "@/shared/hooks/use-enter-submit";
import { nanoid } from "@/shared/utils";
import { callAgenticRagAgent } from "@/services/callAgenticRagAgent";
import { ResizableTextarea } from "@/components/shared/resizable-textarea";

export function PromptForm({
  input,
  setInput,
  sessionId,
}: {
  input: string;
  setInput: (value: string) => void;
  sessionId: string;
}) {
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const dispatch = React.useContext(ChatDispatchContext);

  return (
    <form
      ref={formRef}
      onSubmit={async (e: any) => {
        const humanMessageId = nanoid();
        const prompt = input.trim();
        try {
          e.preventDefault();

          setInput("");
          if (!prompt) return;

          dispatch({
            type: "ADD_MESSAGE",
            payload: {
              id: humanMessageId,
              content: prompt,
              role: "human",
              error: null,
            },
          });

          dispatch({
            type: "SET_COMPLETION_LOADING",
            payload: true,
          });

          await callAgenticRagAgent(sessionId, prompt, dispatch);

          dispatch({
            type: "SET_COMPLETION_LOADING",
            payload: false,
          });
        } catch (error) {
          dispatch({
            type: "SET_COMPLETION_LOADING",
            payload: false,
          });
          dispatch({
            type: "EDIT_MESSAGE",
            payload: {
              id: humanMessageId,
              error: error,
            },
          });
          console.error(error);
        }
      }}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background">
        <ResizableTextarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Send a message."
          className="bg-slate-50 block w-full rounded-md border-0 py-1.5 text-gray-200 bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          minHeight={80}
          maxHeight={240}
        />
      </div>
    </form>
  );
}
