import { cn } from "@/shared/utils";
import { Message } from "@/ts/types/Message";
import { BiUser } from "react-icons/bi";
import { GiArtificialIntelligence } from "react-icons/gi";
import { Separator } from "@/components/shared/separator";
import { memo } from "react";
import { ChatMarkdown } from "@/components/shared/markdown/chat-markdown";
import {
  DocumentTextIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

interface P {
  index: number;
  message: Message;
  onShowChunks?: (rerankedMatches: any[], kb_search_query?: string) => void;
}

export const RerankingChatMessage = memo(
  function RerankingChatMessage(P: P) {
    // Debug logging
    if (P.message.role === "ai") {
      console.log("AI message rerankedMatches:", P.message.rerankedMatches);
    }

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
              <ChatMarkdown content={P.message.content} />

              {/* Display chunks button for AI messages */}
              {P.message.role === "ai" &&
                P.message.rerankedMatches &&
                P.message.rerankedMatches.length > 0 && (
                  <div className="mt-4">
                    <button
                      onClick={() =>
                        P.onShowChunks?.(
                          P.message.rerankedMatches || [],
                          P.message.kb_search_query
                        )
                      }
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 rounded-lg transition-colors text-white"
                    >
                      <DocumentTextIcon className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium">
                        Chunks ({P.message.rerankedMatches.length})
                      </span>
                      <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                )}
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
    // More detailed comparison to ensure re-renders when rerankedMatches change
    const prevMessage = prevProps.message;
    const nextMessage = nextProps.message;

    // Always re-render if rerankedMatches are different
    if (prevMessage.rerankedMatches !== nextMessage.rerankedMatches) {
      return false;
    }

    // Re-render if other important properties change
    if (
      prevMessage.content !== nextMessage.content ||
      prevMessage.role !== nextMessage.role ||
      prevMessage.error !== nextMessage.error
    ) {
      return false;
    }

    return true;
  }
);
