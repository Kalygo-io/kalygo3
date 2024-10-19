import { Action } from "@/app/dashboard/spreadsheet/chat-session-reducer";
import { nanoid } from "@/shared/utils";
import { v4 as uuid } from "uuid";
import React from "react";

export async function callSpreadsheetSwarm(
  sessionId: string,
  prompt: string,
  context: {
    agents: Record<string, { name: string; system_prompt: string }>;
  },
  dispatch: React.Dispatch<Action>
) {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_AI_API_URL}/api/spreadsheet-swarm/stream`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId: sessionId,
        content: prompt,
        agentsConfig: context.agents,
      }),
      credentials: "include",
    }
  );

  if (!resp.ok) {
    if (resp.status === 401) {
      // Unauthorized
      window.location.href = "/";
    }

    throw "Network response was not OK";
  }

  const reader = resp?.body?.getReader();

  const decoder = new TextDecoder();

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
      dispatchEventToState(parsedChunk, dispatch, accMessage);
    } catch (e) {
      let multiChunkAcc = "";

      let idx = 0;
      while (0 < chunk.length) {
        if (chunk[idx] === "}") {
          try {
            multiChunkAcc += chunk[idx];
            const parsedChunk = JSON.parse(multiChunkAcc);

            dispatchEventToState(parsedChunk, dispatch, accMessage);

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
  accMessage: { content: string }
) {
  // console.log('dispatchEventToState', parsedChunk)
  // console.log('accMessage.content', accMessage.content)

  const runId = parsedChunk["run_id"];
  const agentName = parsedChunk["agent_name"];
  const parallelGroupId = parsedChunk["parallel_group_id"];

  if (parsedChunk["event"] === "on_chat_model_start" && parallelGroupId) {
    dispatch({
      type: "ADD_PARALLEL_GROUP_BLOCK",
      payload: {
        id: parallelGroupId,
        parallelGroupId: parallelGroupId,
        runId: runId,
        agentName: agentName,
        content: "",
        blocks: [],
        type: "group",
        error: null,
      },
    });
  } else if (
    parsedChunk["event"] === "on_chat_model_stream" &&
    parallelGroupId
  ) {
    accMessage.content += parsedChunk["data"];

    dispatch({
      type: "EDIT_PARALLEL_GROUP_BLOCK",
      payload: {
        parallelGroupId: parallelGroupId,
        runId: runId,
        agentName: agentName,
        content: accMessage.content,
      } as {
        parallelGroupId: string;
        runId: string;
        content: string;
        error: any;
        agentName: string;
      },
    });
  } else if (parsedChunk["event"] === "on_chat_model_start") {
    dispatch({
      type: "ADD_DEFAULT_BLOCK",
      payload: {
        id: runId,
        agentName: agentName,
        content: "",
        type: "ai",
        error: null,
      },
    });
  } else if (parsedChunk["event"] === "on_chat_model_stream") {
    accMessage.content += parsedChunk["data"];
    dispatch({
      type: "EDIT_DEFAULT_BLOCK",
      payload: {
        id: runId,
        content: accMessage.content,
      },
    });
  } else if (parsedChunk["event"] === "on_chat_model_end") {
    console.log("LLM END");
    accMessage.content = "";
  } else if (parsedChunk["event"] === "add_download_link_button") {
    dispatch({
      type: "ADD_DOWNLOAD_LINK_BUTTON_BLOCK",
      payload: {
        id: uuid(),
        link: parsedChunk["link"],
        type: "download-link",
        error: null,
      },
    });
  } else {
    console.error("Unknown event:", parsedChunk["event"]);
  }
}
