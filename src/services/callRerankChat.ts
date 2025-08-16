import { Action } from "@/app/dashboard/reranking-chat/chat-session-reducer";
import { errorToast } from "@/shared/toasts";
import { nanoid } from "@/shared/utils";
import React from "react";

export async function callRerankChat(
  sessionId: string,
  prompt: string,
  dispatch: React.Dispatch<Action>
) {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_AI_API_URL}/api/reranking-chat/completion`,
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
  parsedChunk: Record<string, any>,
  dispatch: React.Dispatch<Action>,
  aiMessageId: string,
  accMessage: { content: string }
) {
  if (parsedChunk["event"] === "on_chat_model_start") {
    console.log("Received on_chat_model_start event:", parsedChunk);
    console.log("Reranked chunks data:", parsedChunk["reranked_chunks"]);

    // Handle both possible field names and ensure we have the right data structure
    let rerankedData =
      parsedChunk["reranked_chunks"] || parsedChunk["reranked_matches"] || [];

    // Log all possible fields to debug
    console.log("All parsedChunk fields:", Object.keys(parsedChunk));
    console.log("Raw reranked_chunks:", parsedChunk["reranked_chunks"]);
    console.log("Raw reranked_matches:", parsedChunk["reranked_matches"]);

    // Ensure rerankedData is an array and has the expected structure
    if (!Array.isArray(rerankedData)) {
      console.warn("Reranked data is not an array:", rerankedData);
      rerankedData = [];
    } else {
      // Validate the structure of each item
      rerankedData = rerankedData.filter((item) => {
        if (!item || typeof item !== "object") {
          console.warn("Invalid reranked item:", item);
          return false;
        }
        return true;
      });
    }

    console.log("Processed reranked data:", rerankedData);

    dispatch({
      type: "ADD_MESSAGE",
      payload: {
        id: aiMessageId,
        content: "",
        role: "ai",
        error: null,
        rerankedMatches: rerankedData,
      },
    });
  } else if (parsedChunk["event"] === "on_chat_model_stream") {
    accMessage.content += parsedChunk["data"];
    dispatch({
      type: "EDIT_MESSAGE",
      payload: {
        id: aiMessageId,
        content: accMessage.content,
        // Don't override rerankedMatches during streaming
      },
    });
  } else if (parsedChunk["event"] === "on_chat_model_end") {
  } else if (parsedChunk["event"] === "event_stream_error") {
    errorToast("Error in text/event-stream");
  } else {
    console.error("Unknown event:", parsedChunk["event"]);
  }
}
