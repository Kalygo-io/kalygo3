import { Action } from "@/app/dashboard/agentic-rag/chat-session-reducer";
import { nanoid } from "@/shared/utils";
import React from "react";

export async function callAgenticRagAgent(
  sessionId: string,
  prompt: string,
  dispatch: React.Dispatch<Action>
) {
  console.log(
    "Starting agentic RAG call with sessionId:",
    sessionId,
    "prompt:",
    prompt
  );

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_AI_API_URL}/api/agentic-rag-agent/completion`,
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

  if (!resp.ok) {
    const errorText = await resp.text();
    console.error("Response not OK:", resp.status, errorText);
    throw `Network response was not OK: ${resp.status} - ${errorText}`;
  }

  const reader = resp?.body?.getReader();
  if (!reader) {
    throw new Error("Failed to get response reader");
  }
  const decoder = new TextDecoder();

  const aiMessageId = nanoid();
  let accMessage = {
    content: "",
  };
  let retrievalCalls: any[] = [];

  console.log("Starting to read stream...");

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        console.log("Stream complete");
        break;
      }

      let chunk = decoder.decode(value);
      console.log("Raw chunk received:", chunk);

      try {
        const parsedChunk = JSON.parse(chunk);
        console.log("Parsed chunk:", parsedChunk);
        dispatchEventToState(
          parsedChunk,
          dispatch,
          aiMessageId,
          accMessage,
          retrievalCalls
        );
      } catch (e) {
        console.log(
          "Failed to parse as single JSON, trying multi-chunk parsing..."
        );
        let multiChunkAcc = "";
        let idx = 0;

        while (idx < chunk.length) {
          if (chunk[idx] === "}") {
            try {
              multiChunkAcc += chunk[idx];
              const parsedChunk = JSON.parse(multiChunkAcc);
              console.log("Parsed multi-chunk:", parsedChunk);

              dispatchEventToState(
                parsedChunk,
                dispatch,
                aiMessageId,
                accMessage,
                retrievalCalls
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
    if (reader) {
      reader.releaseLock();
    }
  }
}

function dispatchEventToState(
  parsedChunk: Record<string, any>,
  dispatch: React.Dispatch<Action>,
  aiMessageId: string,
  accMessage: { content: string },
  retrievalCalls: any[]
) {
  try {
    console.log("Processing event:", parsedChunk.event, parsedChunk);

    // Only handle essential events to isolate the issue
    if (parsedChunk.event === "on_chain_start") {
      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          id: aiMessageId,
          content: "",
          role: "ai",
          error: null,
        },
      });
    } else if (parsedChunk.event === "on_chat_model_stream") {
      accMessage.content += parsedChunk.data || "";
      dispatch({
        type: "EDIT_MESSAGE",
        payload: {
          id: aiMessageId,
          content: accMessage.content,
        },
      });
    } else if (parsedChunk.event === "on_chain_end") {
      const finalContent = parsedChunk.data || accMessage.content;
      dispatch({
        type: "EDIT_MESSAGE",
        payload: {
          id: aiMessageId,
          content: finalContent,
        },
      });

      // Handle retrieval calls if available
      if (parsedChunk.retrieval_calls) {
        try {
          const retrievalCallsData = Array.isArray(parsedChunk.retrieval_calls)
            ? parsedChunk.retrieval_calls
            : [];

          dispatch({
            type: "EDIT_MESSAGE",
            payload: {
              id: aiMessageId,
              retrievalCalls: retrievalCallsData,
            },
          });
        } catch (error) {
          console.error("Error processing retrieval calls:", error);
        }
      }
    } else if (parsedChunk.event === "on_tool_start") {
      try {
        console.log("Tool start event data:", parsedChunk);
        const toolMessage = parsedChunk.data || "Tool starting...";
        console.log("Setting current tool:", toolMessage);

        dispatch({
          type: "SET_CURRENT_TOOL",
          payload: toolMessage,
        });

        // Use a safer notification approach
        console.log("🔧 Tool started:", toolMessage);
        // You could also dispatch a custom notification action here if needed
        // dispatch({ type: "ADD_NOTIFICATION", payload: { message: toolMessage, type: "info" } });
      } catch (error) {
        console.error("Error handling tool start:", error, parsedChunk);
      }
    } else if (parsedChunk.event === "on_tool_end") {
      try {
        console.log("Tool end event data:", parsedChunk);
        console.log("Clearing current tool");

        dispatch({
          type: "SET_CURRENT_TOOL",
          payload: "",
        });

        console.log("✅ Tool completed successfully");
      } catch (error) {
        console.error("Error handling tool end:", error, parsedChunk);
      }
    } else if (parsedChunk.event === "on_chat_model_start") {
      console.log("Chat model started");
    } else {
      console.log("Unhandled event:", parsedChunk.event);
    }
  } catch (error) {
    console.error("Error in dispatchEventToState:", error, parsedChunk);
  }
}
