"use client";

import * as React from "react";

import {
  ChatDispatchContext,
  ChatContext,
  useHierarchicalChatContext,
} from "@/app/dashboard/hierarchical/chat-session-context";
import { useEnterSubmit } from "@/shared/hooks/use-enter-submit";
import { nanoid } from "@/shared/utils";
import { useRouter } from "next/navigation";
import { useHierarchicalContext } from "@/context/hierarchical-context";
import { callDesignedSwarm } from "@/services/callDesignedSwarm";
import { StopCircleIcon, StopIcon } from "@heroicons/react/24/outline";

export function PromptForm({
  input,
  setInput,
  sessionId,
}: {
  input: string;
  setInput: (value: string) => void;
  sessionId: string;
}) {
  const router = useRouter();
  const { formRef, onKeyDown } = useEnterSubmit();
  const { context } = useHierarchicalContext();
  const chatContext = useHierarchicalChatContext();

  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const dispatch = React.useContext(ChatDispatchContext);

  const abortControllerRef = React.useRef<AbortController | null>(null);
  // const abortController = new AbortController();
  // const signal = abortController.signal;

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
            type: "ADD_DEFAULT_BLOCK",
            payload: {
              id: humanMessageId,
              content: prompt,
              type: "prompt",
              error: null,
            },
          });

          dispatch({
            type: "SET_COMPLETION_LOADING",
            payload: true,
          });

          // Initialize a new AbortController for each request
          abortControllerRef.current = new AbortController();
          const signal = abortControllerRef.current.signal;

          // Make the API call with the abort signal
          await callDesignedSwarm(sessionId, prompt, context, dispatch, signal);

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
            type: "EDIT_DEFAULT_BLOCK",
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
        <textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Send a prompt."
          className="block w-full rounded-md border-0 py-1.5 text-gray-200 bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </form>
  );
}
