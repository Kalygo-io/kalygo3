import { ChatBlock } from "@/components/hierarchical/chat-block";
import { Block } from "@/ts/types/Block";
import { BlocksUnion } from "@/ts/types/BlocksUnion";
import { ParallelGroupBlock } from "@/ts/types/ParallelGroupBlock";

export interface P {
  isCompletionLoading: boolean;
  blocks: BlocksUnion[];
}

export function ChatList(P: P) {
  if (!P.blocks.length) {
    return null;
  }

  return (
    <div>
      {P.blocks.map((block: BlocksUnion, index: number) => {
        return <ChatBlock key={block.id} index={index} block={block} />;
      })}

      {P.isCompletionLoading && (
        <div className="flex justify-center">
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
            className="size-5 animate-spin stroke-zinc-400 text-text_default_color"
          >
            <path d="M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12"></path>
          </svg>
        </div>
      )}
    </div>
  );
}
