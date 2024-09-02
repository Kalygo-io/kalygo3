import { ChatBlock } from "@/components/1-rearrange/chat-block";
import { Block } from "@/ts/types/Block";
import { ParallelGroupBlock } from "@/ts/types/ParallelGroupBlock";

export interface P {
  isCompletionLoading: boolean;
  blocks: (Block | ParallelGroupBlock)[];
}

export function ChatList(P: P) {
  if (!P.blocks.length) {
    return null;
  }

  return (
    // <div className="relative mx-auto lg:max-w-[calc(100%-18rem)] px-4">
    // <div className="relative mx-auto px-4 lg:pr-8">
    // <div className="mx-auto lg:pl-72 lg:pr-96">
    <div>
      {P.blocks.map((block: Block | ParallelGroupBlock, index: number) => {
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
            className="size-5 animate-spin stroke-zinc-400"
          >
            <path d="M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12"></path>
          </svg>
        </div>
      )}
    </div>
  );
}
