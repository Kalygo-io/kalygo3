import { cn } from "@/shared/utils";
import { GiArtificialIntelligence } from "react-icons/gi";

import { memo } from "react";
import ReactMarkdown from "react-markdown";
import { stringToColor } from "@/shared/uuidToColorCode";
import { BlocksUnion } from "@/ts/types/BlocksUnion";

interface P {
  index: number;
  block: BlocksUnion;
}

export const SubBlock = memo(
  function SubBlock(P: P) {
    // console.log("->->- P.Block -<-<-", P.block);

    if (P.block.type === "ai" || P.block.type === "prompt") {
      const hexCode = stringToColor(
        P.block.agentName ?? "76b6788c-3c50-4678-b2bf-a7a0b4da89a9"
      );

      return (
        <div key={P.block.id}>
          <div
            className={cn(
              "bg-gray-900 p-4 rounded-md border border-gray-800 text-gray-200",
              `${P.block.error && "text-red-600"}`
            )}
          >
            <div>
              <GiArtificialIntelligence color={hexCode} />
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
        </div>
      );
    } else {
      // debugger;
      return <div key={P.block.id}>UNSUPPORTED MESSAGE</div>;
    }
  },
  (prevProps, nextProps) => {
    return prevProps.block === nextProps.block;
  }
);
