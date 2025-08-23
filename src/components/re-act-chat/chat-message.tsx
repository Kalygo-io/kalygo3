import { cn } from "@/shared/utils";
import { Message } from "@/ts/types/Message";
import { BiUser } from "react-icons/bi";
import { GiArtificialIntelligence } from "react-icons/gi";
import { useCopyToClipboard } from "@/shared/hooks/use-copy-to-clipboard";
import { CheckIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";

import { Separator } from "@/components/shared/separator";
import { memo } from "react";
import { ChatMarkdown } from "@/components/shared/markdown/chat-markdown";

interface P {
  index: number;
  message: Message;
}

export const ChatMessage = memo(
  function ChatMessage(P: P) {
    const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

    const onCopy = () => {
      if (isCopied) return;
      copyToClipboard(P.message.content);
    };

    if (P.message.role === "ai" || P.message.role === "human") {
      return (
        <div key={P.message.id}>
          <div
            className={cn(
              "group relative mb-6 items-start p-6 rounded-xl transition-all duration-200",
              P.message.role === "human"
                ? "bg-white/10 backdrop-blur-sm border border-white/20"
                : "bg-gray-800/50 backdrop-blur-sm border border-gray-700/50",
              "flex hover:shadow-md hover:scale-[1.001]"
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
              <ChatMarkdown content={P.message.content} />
            </div>

            {/* Copy button - positioned at bottom right */}
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={onCopy}
                className={cn(
                  "p-2 rounded-lg transition-colors duration-200",
                  "bg-gray-800/80 hover:bg-gray-700/80 border border-gray-600/50",
                  "text-gray-300 hover:text-white"
                )}
                title="Copy message"
              >
                {isCopied ? (
                  <CheckIcon className="h-4 w-4 text-green-400" />
                ) : (
                  <ClipboardDocumentIcon className="h-4 w-4" />
                )}
              </button>
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
