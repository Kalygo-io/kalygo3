import { cn } from "@/shared/utils";
import { BiUser } from "react-icons/bi";
import { GiArtificialIntelligence } from "react-icons/gi";

import { Separator } from "@/components/shared/separator";
import { memo } from "react";
import ReactMarkdown from "react-markdown";
import { stringToColor } from "@/shared/uuidToColorCode";
import { Block } from "@/ts/types/Block";
import { ParallelGroupBlock } from "@/ts/types/ParallelGroupBlock";
import { SubBlock } from "@/components/1-rearrange/sub-block";

interface P {
  index: number;
  block: Block | ParallelGroupBlock;
}

export const ChatBlock = memo(
  function ChatBlock(P: P) {
    // console.log("->->- P.Block -<-<-", P.block);

    if (P.block.type === "ai" || P.block.type === "prompt") {
      const hexCode = stringToColor(
        P.block.agentName ?? "76b6788c-3c50-4678-b2bf-a7a0b4da89a9"
      );

      return (
        <div key={P.block.id}>
          <div
            className={cn(
              "group relative mb-4 items-start p-4 rounded-md text-gray-200",
              P.block.type === "prompt" ? "bg-gray-800" : "bg-gray-900",
              "flex"
            )}
          >
            <div
              className={cn(
                "flex size-8 shrink-0 select-none items-center justify-center rounded-md border border-gray-700 shadow",
                P.block.error && "text-red-600"
              )}
            >
              {P.block.type === "prompt" ? (
                <BiUser />
              ) : (
                <GiArtificialIntelligence color={hexCode} />
              )}
            </div>
            <div
              className={cn(
                `px-1 space-y-2 overflow-hidden`,
                "ml-4",
                P.block.error && "text-red-600"
              )}
            >
              <b className="text-lg">{P.block.agentName}</b>
              <ReactMarkdown
                components={{
                  p({ className, children, ...props }) {
                    return (
                      <p
                        style={{
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {children}
                      </p>
                    );
                  },
                }}
              >
                {P.block.content}
              </ReactMarkdown>
            </div>
          </div>
          <Separator className="my-4 bg-gray-900" />
        </div>
      );
    } else if (P.block.type === "group") {
      const hexCode = stringToColor(P.block.parallelGroupId);

      return (
        <div key={P.block.id}>
          <div className="group relative mb-4 items-start bg-gray-900 p-4 rounded-md flex text-gray-200">
            <div className="px-1 space-y-2 overflow-hidden ml-4">
              <b className="text-lg">PARALLEL</b>
              <div className="flex flex-col space-y-2 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-2 mx-auto">
                {P.block.blocks?.map((block, index) => {
                  return (
                    <SubBlock key={block.id} index={index} block={block} />
                  );
                })}
              </div>
            </div>
          </div>
          <Separator className="my-4 bg-gray-900" />
        </div>
      );
    } else {
      debugger;
      return <div key={P.block.id}>UNSUPPORTED MESSAGE</div>;
    }
  },
  (prevProps, nextProps) => {
    return prevProps.block === nextProps.block;
  }
);
