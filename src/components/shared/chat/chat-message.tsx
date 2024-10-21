import { cn } from "@/shared/utils";
import { Message } from "@/ts/types/Message";
import { BiUser } from "react-icons/bi";
import { GiArtificialIntelligence } from "react-icons/gi";

import { Separator } from "@/components/shared/separator";
import { memo } from "react";
import ReactMarkdown from "react-markdown";

interface P {
  index: number;
  message: Message;
}

export const ChatMessage = memo(
  function ChatMessage(P: P) {
    if (P.message.role === "ai" || P.message.role === "human") {
      return (
        <div key={P.message.id}>
          <div
            className={cn(
              "group relative mb-4 items-start bg-white p-4 rounded-md",
              P.message.role === "human" ? "bg-white" : "bg-gray-50",
              "flex"
            )}
          >
            <div
              className={cn(
                "flex size-8 shrink-0 select-none items-center justify-center rounded-md border shadow",
                P.message.role === "human"
                  ? "bg-background"
                  : "bg-primary text-primary-foreground",
                `${P.message.error && "text-red-600"}`
              )}
            >
              {P.message.role === "human" ? (
                <BiUser />
              ) : (
                <GiArtificialIntelligence color="blue" />
              )}
            </div>
            <div
              className={cn(
                `px-1 space-y-2 overflow-scroll`,
                "ml-4",
                P.message.error && "text-red-600"
              )}
            >
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
                {P.message.content}
              </ReactMarkdown>
            </div>
          </div>
          <Separator className="my-4 bg-gray-100" />
        </div>
      );
    } else {
      return <div key={P.index}>UNSUPPORTED MESSAGE</div>;
    }
  },
  (prevProps, nextProps) => {
    return prevProps.message === nextProps.message;
  }
);
