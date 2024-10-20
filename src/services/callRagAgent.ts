import { Action } from "@/app/dashboard/rag-agent/chat-session-reducer";
import { errorToast } from "@/shared/toasts";
import { nanoid } from "@/shared/utils";
import React from "react";

export async function callRagAgent(
  sessionId: string,
  prompt: string,
  dispatch: React.Dispatch<Action>
) {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_AI_API_URL}/api/rag-agent/completion`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId: sessionId,
        content: prompt,
      }),
      credentials: "include",
    }
  );

  if (!resp.ok) throw "Network response was not OK";

  const reader = resp?.body?.getReader();

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
            multiChunkAcc += chunk.substring(0, idx);
          }
        } else {
          multiChunkAcc += chunk[idx];
          idx++;
        }
      }
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
  } else if (parsedChunk["event"] === "event_stream_error") {
    errorToast("Error in text/event-stream");
  } else {
    console.error("Unknown event:", parsedChunk["event"]);
  }
}
