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
              "group relative mb-6 items-start p-6 rounded-xl transition-all duration-200",
              P.message.role === "human"
                ? "bg-white/10 backdrop-blur-sm border border-white/20"
                : "bg-gray-800/50 backdrop-blur-sm border border-gray-700/50",
              "flex hover:shadow-lg hover:scale-[1.01]"
            )}
          >
            <div
              className={cn(
                "flex size-10 shrink-0 select-none items-center justify-center rounded-full border-2 shadow-lg transition-all duration-200",
                P.message.role === "human"
                  ? "bg-gradient-to-br from-blue-500 to-blue-600 border-blue-400/30 text-white"
                  : "bg-gradient-to-br from-purple-500 to-purple-600 border-purple-400/30 text-white",
                `${
                  P.message.error &&
                  "border-red-500/50 bg-gradient-to-br from-red-500 to-red-600"
                }`
              )}
            >
              {P.message.role === "human" ? (
                <BiUser className="text-lg" />
              ) : (
                <GiArtificialIntelligence className="text-lg" />
              )}
            </div>
            <div
              className={cn(
                `px-4 space-y-3 overflow-hidden`,
                "ml-4 flex-1",
                P.message.error && "text-red-400"
              )}
            >
              <ReactMarkdown
                components={{
                  p({ className, children, ...props }) {
                    return (
                      <p
                        className="text-gray-100 leading-relaxed mb-4"
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
                      <ul className="text-gray-100 leading-relaxed list-disc list-inside my-4 ml-6">
                        {children}
                      </ul>
                    );
                  },
                  ol({ className, children, ...props }) {
                    return (
                      <ol className="text-gray-100 leading-relaxed list-decimal my-4 ml-6">
                        {children}
                      </ol>
                    );
                  },
                  li({ className, children, ...props }) {
                    return (
                      <li className="text-gray-100 leading-relaxed mb-2">
                        {children}
                      </li>
                    );
                  },
                  code({ className, children, ...props }) {
                    return (
                      <code className="bg-gray-800/50 px-2 py-1 rounded-md text-sm font-mono text-blue-300">
                        {children}
                      </code>
                    );
                  },
                  pre({ className, children, ...props }) {
                    return (
                      <pre className="bg-gray-800/50 p-4 rounded-lg overflow-x-auto custom-scrollbar">
                        {children}
                      </pre>
                    );
                  },
                }}
              >
                {P.message.content}
              </ReactMarkdown>
            </div>
          </div>
          <Separator className="my-6 bg-gradient-to-r from-transparent via-gray-600/30 to-transparent" />
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
