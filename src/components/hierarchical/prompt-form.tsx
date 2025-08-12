"use client";

import * as React from "react";

import { ChatDispatchContext } from "@/app/dashboard/hierarchical/chat-session-context";
import { useEnterSubmit } from "@/shared/hooks/use-enter-submit";
import { nanoid } from "@/shared/utils";
import { callHierarchicalCrew } from "@/services/callHierarchicalCrew";
import { ResizableTextarea } from "@/components/shared/resizable-textarea";
import { StopIcon } from "@heroicons/react/24/solid";

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
  const abortControllerRef = React.useRef<AbortController | null>(null);

  const chatContext = React.useContext(ChatDispatchContext);

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

          chatContext.dispatch({
            type: "ADD_MESSAGE",
            payload: {
              id: humanMessageId,
              content: prompt,
              role: "human",
              error: null,
            },
          });

          chatContext.dispatch({
            type: "SET_COMPLETION_LOADING",
            payload: true,
          });

          abortControllerRef.current = new AbortController();

          await callHierarchicalCrew(
            sessionId,
            prompt,
            chatContext.dispatch,
            abortControllerRef.current.signal
          );

          chatContext.dispatch({
            type: "SET_COMPLETION_LOADING",
            payload: false,
          });
        } catch (error) {
          chatContext.dispatch({
            type: "SET_COMPLETION_LOADING",
            payload: false,
          });
          chatContext.dispatch({
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
        {chatContext.completionLoading && (
          <button
            onClick={() => {
              console.log("ABORT...");
              abortControllerRef.current?.abort();
            }}
            className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white"
          >
            <StopIcon className="h-6 w-6" />
          </button>
        )}
        <ResizableTextarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Send a prompt."
          className="block w-full rounded-md border-0 py-1.5 text-gray-200 bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
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
