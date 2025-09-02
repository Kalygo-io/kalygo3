import { cn } from "@/shared/utils";
import { Message } from "@/ts/types/Message";
import { BiUser } from "react-icons/bi";
import { GiArtificialIntelligence } from "react-icons/gi";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { CheckIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";

import { Separator } from "@/components/shared/separator";
import { memo, useState } from "react";
import { ChatMarkdown } from "@/components/shared/markdown/chat-markdown";
import { ChunksDrawer } from "../chunks-drawer";
import { useCopyToClipboard } from "@/shared/hooks/use-copy-to-clipboard";

interface P {
  index: number;
  message: Message;
}

// Simple message actions component for Message type
function MessageActions({ message }: { message: Message }) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => copyToClipboard(message.content)}
        className="opacity-100 transition-opacity duration-200 p-2 hover:bg-gray-700/50 rounded-lg"
        title="Copy message"
      >
        {isCopied ? (
          <CheckIcon className="w-4 h-4 text-green-400" />
        ) : (
          <ClipboardDocumentIcon className="w-4 h-4 text-gray-400 hover:text-gray-300" />
        )}
      </button>
    </div>
  );
}

export const ChatMessage = memo(
  function ChatMessage(P: P) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    if (P.message.role === "ai" || P.message.role === "human") {
      return (
        <>
          <div key={P.message.id}>
            <div
              className={cn(
                "group relative mb-6 items-start px-4 py-6 rounded-xl transition-all duration-200",
                P.message.role === "human"
                  ? "bg-white/10 backdrop-blur-sm border border-white/20"
                  : "bg-gray-800/50 backdrop-blur-sm border border-gray-700/50",
                "flex hover:shadow-lg hover:scale-[1.001]"
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

                {/* Chunks Button for AI messages */}
                {P.message.role === "ai" &&
                  P.message.rerankedMatches &&
                  P.message.rerankedMatches.length > 0 && (
                    <div className="mt-4">
                      <button
                        onClick={() => setIsDrawerOpen(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 rounded-lg transition-colors text-white"
                      >
                        <DocumentTextIcon className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-medium">
                          Chunks ({P.message.rerankedMatches.length})
                        </span>
                      </button>
                    </div>
                  )}
              </div>
              {/* MessageActions positioned on the right side */}
              <div className="flex-shrink-0 ml-2">
                <MessageActions message={P.message} />
              </div>
            </div>
            <Separator className="my-6 bg-gradient-to-r from-transparent via-gray-600/30 to-transparent" />
          </div>

          {/* Chunks Drawer */}
          <ChunksDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            rerankedMatches={P.message.rerankedMatches || []}
            kb_search_query={P.message.kb_search_query}
            messageContent={P.message.content}
          />
        </>
      );
    } else {
      return <div key={P.index}>UNSUPPORTED MESSAGE</div>;
    }
  },
  (prevProps, nextProps) => {
    return prevProps.message === nextProps.message;
  }
);
