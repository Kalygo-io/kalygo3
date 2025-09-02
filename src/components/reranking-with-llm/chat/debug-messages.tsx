import { Message } from "@/ts/types/Message";

interface DebugMessagesProps {
  messages: Message[];
}

export function DebugMessages({ messages }: DebugMessagesProps) {
  return (
    <div className="mt-4 p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
      <h3 className="text-red-400 font-semibold mb-2">Debug: Messages State</h3>
      <div className="text-xs text-red-300 space-y-2">
        <p>Total messages: {messages.length}</p>
        {messages.map((message, index) => (
          <div
            key={message.id}
            className="border border-red-500/30 p-2 rounded"
          >
            <p>Message {index + 1}:</p>
            <p>ID: {message.id}</p>
            <p>Role: {message.role}</p>
            <p>Content length: {message.content.length}</p>
            <p>Has rerankedMatches: {message.rerankedMatches ? "Yes" : "No"}</p>
            {message.rerankedMatches && (
              <div>
                <p>RerankedMatches count: {message.rerankedMatches.length}</p>
                <pre className="text-xs overflow-auto">
                  {JSON.stringify(message.rerankedMatches, null, 2)}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
