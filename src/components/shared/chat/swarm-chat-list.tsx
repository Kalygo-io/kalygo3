import { ChatBlock } from "@/components/shared/chat/swarm-chat-block";
import { BlocksUnion } from "@/ts/types/BlocksUnion";
import { AltSpinner } from "@/components/shared/common/alt-spinner";

export interface P {
  isCompletionLoading: boolean;
  blocks: BlocksUnion[];
}

export function SwarmChatList(P: P) {
  if (!P.blocks.length) {
    return null;
  }

  return (
    <div>
      {P.blocks.map((block: BlocksUnion, index: number) => {
        return <ChatBlock key={block.id} index={index} block={block} />;
      })}

      {P.isCompletionLoading && <AltSpinner />}
    </div>
  );
}
