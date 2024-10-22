import { v4 as uuid } from "uuid";
import { Block } from "@/ts/types/Block";
import { ParallelGroupBlock } from "@/ts/types/ParallelGroupBlock";
import { BlocksUnion } from "@/ts/types/BlocksUnion";

export type Action =
  | {
      type: "ADD_DEFAULT_BLOCK";
      payload: Block;
    }
  | {
      type: "ADD_PARALLEL_GROUP_BLOCK";
      payload: ParallelGroupBlock;
    }
  | {
      type: "SET_COMPLETION_LOADING";
      payload: boolean;
    }
  | {
      type: "EDIT_DEFAULT_BLOCK";
      payload: {
        id: string;
        type?: "prompt" | "ai";
        content?: string;
        error?: any;
      };
    }
  | {
      type: "EDIT_PARALLEL_GROUP_BLOCK";
      payload: {
        parallelGroupId: string;
        runId: string;
        content: string;
        error: any;
        agentName: string;
      };
    };

export function chatReducer(
  state: {
    blocks: BlocksUnion[];
    completionLoading: boolean;
    sessionId: string;
  },
  action: Action
) {
  switch (action.type) {
    case "ADD_DEFAULT_BLOCK": {
      return {
        ...state,
        blocks: [
          ...state.blocks,
          {
            id: action.payload.id,
            content: action.payload.content,
            type: action.payload.type,
            agentName: action.payload.agentName,
            error: action.payload.error,
          } as Block,
        ],
      };
    }

    case "ADD_PARALLEL_GROUP_BLOCK": {
      const index = state.blocks.findIndex(
        (b) =>
          b.type === "group" &&
          (b as ParallelGroupBlock).parallelGroupId ===
            action.payload.parallelGroupId
      );

      if (index === -1) {
        return {
          ...state,
          blocks: [
            ...state.blocks,
            {
              id: action.payload.id,
              parallelGroupId: action.payload.parallelGroupId,
              type: action.payload.type,
              blocks: [
                {
                  id: action.payload.runId,
                  content: "",
                  type: "ai",
                  agentName: action.payload.agentName,
                  error: action.payload.error,
                } as Block,
              ],
            } as ParallelGroupBlock,
          ],
        };
      } else {
        const groupMemberIndex = (
          state.blocks[index] as ParallelGroupBlock
        )?.blocks.findIndex((ib) => ib.id === action.payload.runId);

        return {
          ...state,
          blocks: [
            ...state.blocks.slice(0, index),
            {
              ...state.blocks[index],
              blocks: [
                // ...(state.blocks[index] as ParallelGroupBlock)?.blocks.slice(0, groupMemberIndex) || [],
                ...(state.blocks[index] as ParallelGroupBlock)?.blocks.slice(
                  groupMemberIndex + 1
                ),
                {
                  id: action.payload.runId,
                  content: action.payload.content,
                  type: "ai",
                  agentName: action.payload.agentName,
                  error: action.payload.error,
                } as Block,
              ],
            },
            ...state.blocks.slice(index + 1),
          ],
        };
      }
    }

    case "EDIT_PARALLEL_GROUP_BLOCK": {
      const index = state.blocks.findIndex(
        (b) =>
          b.type === "group" &&
          (b as ParallelGroupBlock).parallelGroupId ===
            action.payload.parallelGroupId
      );
      const groupMemberIndex = (
        state.blocks[index] as ParallelGroupBlock
      )?.blocks.findIndex((ib) => ib.id === action.payload.runId);

      return {
        ...state,
        blocks: [
          ...state.blocks.slice(0, index),
          {
            ...state.blocks[index],
            blocks: [
              ...((state.blocks[index] as ParallelGroupBlock)?.blocks.slice(
                0,
                groupMemberIndex
              ) || []),
              {
                id: action.payload.runId,
                content: action.payload.content,
                type: "ai",
                agentName: action.payload.agentName,
                error: action.payload.error,
              } as Block,
              ...(state.blocks[index] as ParallelGroupBlock)?.blocks.slice(
                groupMemberIndex + 1
              ),
            ],
          },
          ...state.blocks.slice(index + 1),
        ],
      };
    }

    case "EDIT_DEFAULT_BLOCK": {
      const index = state.blocks.findIndex((b) => b.id === action.payload.id);

      return {
        ...state,
        blocks: [
          ...state.blocks.slice(0, index),
          {
            ...state.blocks[index],
            ...action.payload,
          } as Block,
          ...state.blocks.slice(index + 1),
        ],
      };
    }

    case "SET_COMPLETION_LOADING": {
      return {
        ...state,
        completionLoading: action.payload,
      };
    }

    default: {
      throw Error("Unknown action type");
    }
  }
}

export const initialState: {
  blocks: BlocksUnion[];
  completionLoading: boolean;
  sessionId: string;
} = {
  blocks: [],
  completionLoading: false,
  sessionId: uuid(),
};
