import { Action } from "@/app/dashboard/re-act/chat-session-reducer";
import { infoToast } from "@/shared/toasts";
import { nanoid } from "@/shared/utils";
import React from "react";

export async function callReActAgent(
  sessionId: string,
  prompt: string,
  dispatch: React.Dispatch<Action>
) {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_AI_API_URL}/api/react-agent/completion`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId: sessionId,
        prompt: prompt,
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

  // Add timeout to prevent infinite hanging
  const timeout = setTimeout(() => {
    console.error("ReAct agent stream timeout - aborting");
    reader?.cancel();
  }, 300000); // 5 minutes timeout

  try {
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
  } finally {
    clearTimeout(timeout);
    reader?.cancel();
  }
}

function dispatchEventToState(
  parsedChunk: Record<string, string>,
  dispatch: React.Dispatch<Action>,
  aiMessageId: string,
  accMessage: { content: string }
) {
  console.log("EVENT", parsedChunk["event"]);

  if (parsedChunk["event"] === "on_chat_model_start") {
    // dispatch({
    //   type: "ADD_MESSAGE",
    //   payload: {
    //     id: aiMessageId,
    //     content: "",
    //     role: "ai",
    //     error: null,
    //   },
    // });
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
    // dispatch({
    //   type: "ADD_MESSAGE",
    //   payload: {
    //     id: aiMessageId,
    //     content: parsedChunk["data"],
    //     role: "ai",
    //     error: null,
    //   },
    // });
  } else if (parsedChunk["event"] === "on_chain_start") {
    dispatch({
      type: "ADD_MESSAGE",
      payload: {
        id: aiMessageId,
        content: "",
        role: "ai",
        error: null,
      },
    });
  } else if (parsedChunk["event"] === "on_chain_end") {
    // dispatch({
    //   type: "ADD_MESSAGE",
    //   payload: {
    //     id: aiMessageId,
    //     content: parsedChunk["data"],
    //     role: "ai",
    //     error: null,
    //   },
    // });
  } else if (parsedChunk["event"] === "on_tool_start") {
    // Only update tool status if it's different from current
    const toolData = parsedChunk["data"];
    if (toolData && toolData.trim()) {
      dispatch({
        type: "SET_CURRENT_TOOL",
        payload: toolData,
      });
      infoToast(`${toolData}`);
    }
  } else if (parsedChunk["event"] === "on_tool_end") {
    dispatch({
      type: "EDIT_MESSAGE",
      payload: {
        id: aiMessageId,
        content: (accMessage.content += "\n"),
      },
    });

    dispatch({
      type: "SET_CURRENT_TOOL",
      payload: "",
    });
  } else {
    console.error("Unknown event:", parsedChunk["event"]);
  }
}
