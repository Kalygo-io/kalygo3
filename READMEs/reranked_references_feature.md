# Reranked References Feature

## Overview

The reranked references feature displays the list of reranked chunks or "references" that were used to generate each AI response in the reranking chat. This provides transparency about what information the model is using and allows users to explore the source documents.

## Implementation Details

### Backend Integration

The backend sends reranked matches data in the `on_chat_model_start` event with the following structure:

```json
{
  "event": "on_chat_model_start",
  "reranked_matches": [
    {
      "chunk_id": "doc1_chunk2",
      "total_chunks": 5,
      "score": 0.95,
      "content": "This is a preview of the chunk content..."
    }
  ]
}
```

### Frontend Components

#### 1. Type Definitions (`src/ts/types/Message.ts`)

Added new interfaces to support reranked matches:

```typescript
export interface Message {
  // ... existing fields
  rerankedMatches?: RerankedMatch[];
}

export interface RerankedMatch {
  chunk_id: string;
  total_chunks: number;
  score: number;
  content: string;
}
```

#### 2. State Management (`src/app/dashboard/reranking-chat/chat-session-reducer.ts`)

Updated the reducer to handle reranked matches data in the `EDIT_MESSAGE` action.

#### 3. Service Layer (`src/services/callRerankChat.ts`)

Modified `dispatchEventToState` to extract and store reranked matches from the `on_chat_model_start` event.

#### 4. UI Components

- **RerankedReferences** (`src/components/reranking-chat/chat/reranked-references.tsx`): Collapsible component that displays the list of references
- **RerankingChatMessage** (`src/components/reranking-chat/chat/reranking-chat-message.tsx`): Custom chat message component that includes the reranked references
- **ChatList** (`src/components/reranking-chat/chat/chat-list.tsx`): Updated to use the new RerankingChatMessage component

### Features

1. **Collapsible Interface**: References are hidden by default and can be expanded by clicking the "References (N)" button
2. **Rich Information Display**: Shows chunk ID, total chunks, relevance score, and content preview
3. **Visual Hierarchy**: Clear separation between message content and references
4. **Score Visualization**: Relevance scores are displayed as percentages with color coding
5. **Responsive Design**: Works well on different screen sizes

### User Experience

- References appear only for AI messages that have reranked matches data
- The interface is non-intrusive and doesn't interfere with the main chat flow
- Users can easily identify which sources were used for each response
- The collapsible design keeps the chat interface clean while providing access to detailed reference information

### Benefits

1. **Transparency**: Users can see exactly what information the model used
2. **Source Exploration**: Users can explore the source documents referenced
3. **Confidence Indicators**: Relevance scores help users understand the quality of sources
4. **Debugging**: Developers can verify that the correct sources are being used
5. **Trust Building**: Clear reference display builds user trust in the system 