import React, { useRef } from "react";

export interface ChatPanelProps {
  sessionId: string;
  task: {
    description: string;
    expected_output: string;
  };
  promptForm: React.FC<{
    task: {
      description: string;
      expected_output: string;
    };
    sessionId: string;
  }>;
}

const MIN_PANEL_HEIGHT = 16; // Minimum height for the panel

export const ChatPanelForHierarchicalNewsCrewsAsideLayout: React.FC<
  ChatPanelProps
> = ({ sessionId, task, promptForm: PromptForm }) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // Handler for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    document.body.style.userSelect = "none"; // Disable text selection during drag
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (panelRef.current) {
      const newHeight = Math.max(
        MIN_PANEL_HEIGHT,
        window.innerHeight - e.clientY
      );
      panelRef.current.style.height = `${newHeight}px`;
    }
  };

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    document.body.style.userSelect = ""; // Re-enable text selection after drag
  };

  return (
    <div
      ref={panelRef}
      style={{ height: "300px" }} // Initial height
      className="fixed inset-x-0 bottom-0 w-full peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px] bg-black border-t border-gray-700 shadow-lg rounded-t-xl"
    >
      {/* Draggable handle */}
      <div
        className="flex justify-center items-center cursor-row-resize lg:pl-72 xl:pr-96"
        onMouseDown={handleMouseDown}
      >
        <div className="w-16 h-1 bg-gray-500 rounded mt-1.5"></div>
      </div>

      <div className="mx-auto lg:pl-72 xl:pr-96">
        <div className="mx-8 space-y-4 px-4 py-2">
          <PromptForm task={task} sessionId={sessionId} />
          <p className="text-gray-200 px-2 text-center text-xs leading-normal hidden sm:block">
            Kalygo &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};
