import React from "react";

export interface ChatPanelProps {
  sessionId: string;
  input: string;
  setInput: (value: string) => void;
  promptForm: React.FC<{
    input: string;
    setInput: (value: string) => void;
    sessionId: string;
  }>;
  asideWidth: number; // New prop to dynamically adjust layout
}

export const ChatPanelForAsideLayout: React.FC<ChatPanelProps> = ({
  sessionId,
  input,
  setInput,
  promptForm: PromptForm,
  asideWidth,
}) => {
  return (
    <div className="fixed inset-x-0 bottom-0 w-full duration-300 ease-in-out animate-in peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <div className="mx-auto lg:pl-72 xl:pr-96">
        <div className="mx-8 space-y-4 border-t bg-black border-gray-700 px-4 py-2 shadow-lg rounded-t-xl sm:border md:py-4">
          <PromptForm input={input} setInput={setInput} sessionId={sessionId} />
          <p className="text-gray-200 px-2 text-center text-xs leading-normal hidden sm:block">
            Kalygo &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};
