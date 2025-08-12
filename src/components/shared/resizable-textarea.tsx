"use client";

import React, { useRef, useEffect, useState, forwardRef } from "react";

interface ResizableTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  minHeight?: number;
  maxHeight?: number;
}

export const ResizableTextarea = forwardRef<
  HTMLTextAreaElement,
  ResizableTextareaProps
>(({ minHeight = 80, maxHeight = 400, className = "", ...props }, ref) => {
  const [isResizing, setIsResizing] = useState(false);
  const [height, setHeight] = useState(minHeight);

  useEffect(() => {
    const textarea = ref as React.RefObject<HTMLTextAreaElement>;
    if (textarea?.current) {
      // Set initial height
      textarea.current.style.height = `${minHeight}px`;
      setHeight(minHeight);
    }
  }, [minHeight, ref]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;

    const textarea = ref as React.RefObject<HTMLTextAreaElement>;
    if (!textarea?.current) return;

    const rect = textarea.current.getBoundingClientRect();
    // Invert the logic: dragging up increases height, dragging down decreases height
    const newHeight = rect.bottom - e.clientY;

    // Constrain height
    const constrainedHeight = Math.max(
      minHeight,
      Math.min(maxHeight, newHeight)
    );

    textarea.current.style.height = `${constrainedHeight}px`;
    setHeight(constrainedHeight);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div className="relative">
      <textarea
        ref={ref}
        {...props}
        className={`${className} resize-none`}
        style={{ height: `${height}px` }}
      />
      {/* Native-style resize handle in top-right */}
      <div
        className="absolute top-0 right-0 w-4 h-4 cursor-nw-resize opacity-0 hover:opacity-100 transition-opacity"
        onMouseDown={handleMouseDown}
      >
        {/* Native-style diagonal lines - flipped for top-right */}
        <div className="absolute top-1 right-1 w-2 h-2">
          <div className="w-full h-full border-l-2 border-t-2 border-gray-400 rounded-tl-sm"></div>
        </div>
        {/* Additional smaller line for more native appearance - flipped */}
        <div className="absolute top-2 right-2 w-1 h-1">
          <div className="w-full h-full border-l border-t border-gray-400"></div>
        </div>
      </div>
    </div>
  );
});

ResizableTextarea.displayName = "ResizableTextarea";
