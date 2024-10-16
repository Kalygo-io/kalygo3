import { PromptForm } from "@/components/rag-agent/prompt-form";

export interface ChatPanelProps {
  sessionId: string;
  title?: string;
  input: string;
  setInput: (value: string) => void;
  isAtBottom: boolean;
  scrollToBottom: () => void;
}

export function ChatPanel({ input, setInput, sessionId }: ChatPanelProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 w-full duration-300 ease-in-out animate-in peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <div className="mx-auto lg:pl-72 lg:max-w-[calc(100%-18rem)]">
        <div className="mx-8 space-y-4 border-t bg-gray-800 border-gray-700 px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm input={input} setInput={setInput} sessionId={sessionId} />
          <p className="text-gray-200 text-muted-foreground px-2 text-center text-xs leading-normal hidden sm:block">
            Made with ❤️ for AiSalon Miami 🌴
          </p>
        </div>
      </div>
    </div>
  );
}
