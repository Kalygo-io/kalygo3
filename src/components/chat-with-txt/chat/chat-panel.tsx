export interface P {
  sessionId: string;
  input: string;
  setInput: (value: string) => void;
  promptForm: React.FC<{
    input: string;
    setInput: (value: string) => void;
    sessionId: string;
  }>;
}

export function ChatPanel(P: P) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 w-full duration-300 ease-in-out animate-in peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]"
      style={{ zIndex: 10 }}
    >
      <div className="mx-auto lg:pl-72 lg:max-w-[calc(100%-18rem)]">
        <div className="mx-8 space-y-4 border-t bg-black border-gray-700 px-4 py-2 shadow-lg rounded-t-xl sm:border md:py-4">
          <P.promptForm
            input={P.input}
            setInput={P.setInput}
            sessionId={P.sessionId}
          />
          <p className="text-gray-200 text-muted-foreground px-2 text-center text-xs leading-normal hidden sm:block">
            Made with ❤️ in Miami 🌴
          </p>
        </div>
      </div>
    </div>
  );
}
