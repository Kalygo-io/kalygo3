"use client";

import * as React from "react";

import { ChatDispatchContext } from "@/app/dashboard/chat-with-txt/chat-session-context";
import { useEnterSubmit } from "@/shared/hooks/use-enter-submit";
import { nanoid } from "@/shared/utils";
import { callChatWithTxt } from "@/services/callChatWithTxt";
import { ResizableTextarea } from "@/components/shared/resizable-textarea";
import { PaperAirplaneIcon, StopIcon } from "@heroicons/react/24/solid";

export function PromptForm({
  input,
  setInput,
  sessionId,
  onFocus,
  onBlur,
  onSubmit,
}: {
  input: string;
  setInput: (value: string) => void;
  sessionId: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onSubmit?: () => void;
}) {
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const dispatch = React.useContext(ChatDispatchContext);
  const [isFocused, setIsFocused] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const abortControllerRef = React.useRef<AbortController | null>(null);

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) {
      onFocus();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) {
      onBlur();
    }
  };

  // Auto-focus the input when the component mounts
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      handleFocus();
    }
  }, []);

  // Cleanup function to abort in-flight requests when component unmounts
  React.useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const prompt = input.trim();
    if (!prompt || isSubmitting) return;

    const humanMessageId = nanoid();

    try {
      setIsSubmitting(true);
      setInput("");

      // Create new abort controller for this request
      abortControllerRef.current = new AbortController();

      // Unfocus the input after submission
      if (inputRef.current) {
        inputRef.current.blur();
        handleBlur();
      }

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

      await callChatWithTxt(
        sessionId,
        prompt,
        dispatch,
        abortControllerRef.current.signal
      );

      dispatch({
        type: "SET_COMPLETION_LOADING",
        payload: false,
      });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.log("Request was aborted");
        return;
      }

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
    } finally {
      setIsSubmitting(false);
      abortControllerRef.current = null;
    }
  };

  const handleAbort = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return (
    <form
      ref={formRef}
      onClick={() => {
        // Focus the input when the form container is clicked
        if (inputRef.current) {
          inputRef.current.focus();
          handleFocus();
        }
      }}
      onSubmit={handleSubmit}
    >
      <div
        className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background"
        onClick={() => {
          // Focus the input when the container is clicked
          if (inputRef.current) {
            inputRef.current.focus();
            handleFocus();
          }
        }}
      >
        <ResizableTextarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Send a message."
          className="bg-slate-50 block w-full rounded-md border-0 py-1.5 text-gray-200 bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 pr-12"
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          minHeight={80}
          maxHeight={240}
          disabled={isSubmitting}
        />
        <div className="absolute bottom-2 right-2 flex items-center space-x-2">
          {isSubmitting ? (
            <button
              type="button"
              onClick={handleAbort}
              className="flex items-center justify-center w-8 h-8 rounded-md bg-red-600 hover:bg-red-700 text-white transition-colors"
              title="Stop request"
            >
              <StopIcon className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim() || isSubmitting}
              className="flex items-center justify-center w-8 h-8 rounded-md bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white transition-colors"
              title="Send message"
            >
              <PaperAirplaneIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
