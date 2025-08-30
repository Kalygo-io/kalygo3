import { Action } from "@/app/dashboard/raw-llm/chat-session-reducer";
import { nanoid } from "@/shared/utils";
import { Message } from "@/ts/types/Message";
import React from "react";

export async function callRawLLMAgent(
  messages: Message[],
  dispatch: React.Dispatch<Action>,
  abortController?: AbortController
) {
  let reader:
    | ReadableStreamDefaultReader<Uint8Array<ArrayBufferLike>>
    | undefined
    | null = null;
  try {
    console.log("Starting raw LLM call with messages:", messages);

    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_AI_API_URL}/api/raw-llm/completion`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages,
        }),
        credentials: "include",
        signal: abortController?.signal,
      }
    );

    console.log("Response from raw LLM call:", resp);

    if (!resp.ok) {
      const errorText = await resp.text();
      console.error("Response not OK:", resp.status, errorText);
      throw `Network response was not OK: ${resp.status} - ${errorText}`;
    }

    reader = resp?.body?.getReader();

    const decoder = new TextDecoder();

    const aiMessageId = nanoid();
    let accMessage = {
      content: "",
    };

    while (true) {
      // @ts-ignore
      const { done, value } = await reader.read();
      if (done) break;
      let chunk = decoder.decode(value);

      try {
        const parsedChunk = JSON.parse(chunk);
        dispatchEventToState(parsedChunk, dispatch, aiMessageId, accMessage);
      } catch (e) {
        let multiChunkAcc = "";

        let idx = 0;
        while (0 < chunk.length) {
          if (chunk[idx] === "}") {
            try {
              multiChunkAcc += chunk[idx];
              const parsedChunk = JSON.parse(multiChunkAcc);

              dispatchEventToState(
                parsedChunk,
                dispatch,
                aiMessageId,
                accMessage
              );

              chunk = chunk.substring(idx + 1);
              idx = 0;
              multiChunkAcc = "";
            } catch (e) {
              multiChunkAcc += chunk[idx];
              idx++;
            }
          } else {
            multiChunkAcc += chunk[idx];
            idx++;
          }
        }
      }
    }
  } catch (error) {
    console.error("Error in streaming response:", error);
    throw error;
  } finally {
    console.log("! finally !");
    if (reader) {
      reader.releaseLock();
    }
  }
}

function dispatchEventToState(
  parsedChunk: Record<string, string>,
  dispatch: React.Dispatch<Action>,
  aiMessageId: string,
  accMessage: { content: string }
) {
  if (parsedChunk["event"] === "on_chat_model_start") {
    dispatch({
      type: "ADD_MESSAGE",
      payload: {
        id: aiMessageId,
        content: "",
        role: "ai",
        error: null,
      },
    });
  } else if (parsedChunk["event"] === "on_chat_model_stream") {
    accMessage.content += parsedChunk["data"];
    dispatch({
      type: "EDIT_MESSAGE",
      payload: {
        id: aiMessageId,
        content: accMessage.content,
      },
    });
  } else if (parsedChunk["event"] === "on_chat_model_end") {
  } else {
    console.error("Unknown event:", parsedChunk["event"]);
  }
}
