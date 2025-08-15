import { cn } from "@/shared/utils";
import { BiUser } from "react-icons/bi";
import { GiArtificialIntelligence } from "react-icons/gi";

import { Separator } from "@/components/shared/separator";
import { memo } from "react";
import ReactMarkdown from "react-markdown";
import { stringToColor } from "@/shared/uuidToColorCode";
import { ParallelGroupBlock } from "@/ts/types/ParallelGroupBlock";
import { SubBlock } from "@/components/shared/chat/sub-block";
import { BlocksUnion } from "@/ts/types/BlocksUnion";
import { MessageActions } from "@/components/shared/chat/message-actions";
import { DownloadLinkButtonBlock } from "@/ts/types/DownloadLinkButtonBlock";
import { TableCellsIcon } from "@heroicons/react/16/solid";

interface P {
  index: number;
  block: BlocksUnion;
}

export const ChatBlock = memo(
  function ChatBlock(P: P) {
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
                `w-full px-1 space-y-2 overflow-hidden`,
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
                  ul({ className, children, ...props }) {
                    return (
                      <ul className="text-gray-200 leading-relaxed list-disc list-inside space-y-1 my-4">
                        {children}
                      </ul>
                    );
                  },
                  ol({ className, children, ...props }) {
                    return (
                      <ol className="text-gray-200 leading-relaxed list-decimal list-inside space-y-1 my-4">
                        {children}
                      </ol>
                    );
                  },
                  li({ className, children, ...props }) {
                    return (
                      <li className="text-gray-200 leading-relaxed">
                        {children}
                      </li>
                    );
                  },
                }}
              >
                {P.block.content}
              </ReactMarkdown>
            </div>
            <MessageActions message={P.block} />
          </div>

          <Separator className="my-4 bg-gray-900" />
        </div>
      );
    } else if (P.block.type === "group") {
      const hexCode = stringToColor(
        (P.block as ParallelGroupBlock).parallelGroupId
      );

      return (
        <div key={P.block.id}>
          <div className="group relative mb-4 items-start bg-gray-900 p-4 rounded-md flex text-gray-200">
            <div className="px-1 space-y-2 overflow-hidden ml-4">
              <b className="text-lg">PARALLEL</b>
              <div className="flex flex-col space-y-2 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-2 mx-auto">
                {(P.block as ParallelGroupBlock).blocks?.map((block, index) => {
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
    } else if (P.block.type === "download-link") {
      return (
        <div key={P.block.id}>
          <div className="group relative mb-4 items-start justify-center bg-gray-900 p-4 rounded-md flex text-gray-200">
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={() =>
                window.open((P.block as DownloadLinkButtonBlock).link, "_blank")
              }
            >
              Download Spreadsheet
              <TableCellsIcon aria-hidden="true" className="-mr-0.5 h-5 w-5" />
            </button>
          </div>
          <Separator className="my-4 bg-gray-900" />
        </div>
      );
    } else {
      return <div key={P.block.id}>UNSUPPORTED MESSAGE</div>;
    }
  },
  (prevProps, nextProps) => {
    return prevProps.block === nextProps.block;
  }
);
