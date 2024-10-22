"use client";

import * as React from "react";

import {
  ChatDispatchContext,
  useHierarchicalHaitianNewsCrewChatContext,
} from "@/app/dashboard/hierarchical-haitian-news-crew/chat-session-context";
import { useEnterSubmit } from "@/shared/hooks/use-enter-submit";
import { nanoid } from "@/shared/utils";
import { useRouter } from "next/navigation";
import { useHierarchicalHaitianNewsCrewContext } from "@/context/hierarchical-haitian-news-crew-context";
import { callHierarchicalHaitianNewsCrew } from "@/services/callHierarchicalHaitianNewsCrew";
import { StopIcon } from "@heroicons/react/24/outline";
import { Spinner } from "../shared/common/spinner";

export function PromptForm({
  task,
  sessionId,
}: {
  task: {
    description: string;
    expected_output: string;
  };
  sessionId: string;
}) {
  const router = useRouter();
  const { formRef, onKeyDown } = useEnterSubmit();
  const { context } = useHierarchicalHaitianNewsCrewContext();
  const chatContext = useHierarchicalHaitianNewsCrewChatContext();

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
        try {
          e.preventDefault();

          if (!prompt) return;

          dispatch({
            type: "ADD_DEFAULT_BLOCK",
            payload: {
              id: humanMessageId,
              content: "Running the task...",
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
          await callHierarchicalHaitianNewsCrew(
            sessionId,
            context,
            dispatch,
            signal
          );

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
      <div className="relative flex max-h-full w-full grow flex-col overflow-hidden bg-background space-y-2">
        <textarea
          ref={inputRef}
          onKeyDown={onKeyDown}
          placeholder="Send a prompt."
          className="block w-full rounded-md border-0 py-1.5 text-gray-200 bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          spellCheck={false}
          readOnly
          rows={4}
          value={task.description}
        />
        <textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Send a prompt."
          className="block w-full rounded-md border-0 py-1.5 text-gray-200 bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          spellCheck={false}
          readOnly
          rows={2}
          value={task.expected_output}
        />
        <div>
          {chatContext.completionLoading ? (
            <button
              onClick={() => {
                console.log("ABORT...");
                abortControllerRef.current?.abort();
              }}
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-blue-600"
            >
              <Spinner />
            </button>
          ) : (
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-blue-600"
            >
              Run Crew
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
