"use client";

import { useCopyToClipboard } from "@/shared/hooks/use-copy-to-clipboard";
import { cn } from "@/shared/utils";
import { Block } from "@/ts/types/Block";
import { CheckIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";

interface MessageActionsProps extends React.ComponentProps<"div"> {
  message: Block;
}

export function MessageActions({
  message,
  className,
  ...props
}: MessageActionsProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(message.content);
  };

  return (
    <div
      className={cn(
        "flex items-center justify-end transition-opacity group-hover:opacity-100",
        className
      )}
      {...props}
    >
      <button className="bg-black rounded-full p-1" onClick={onCopy}>
        {isCopied ? (
          <CheckIcon className="h-4 w-4" />
        ) : (
          <ClipboardDocumentIcon className="h-4 w-4" />
        )}
        <span className="sr-only">Copy message</span>
      </button>
    </div>
  );
}
