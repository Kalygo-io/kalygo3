"use client";

import { useState } from "react";
import { EmbeddingModelsContent } from "@/components/embedding-models/embedding-models-content";

export function EmbeddingModelsContainer() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen bg-black text-white">
      <EmbeddingModelsContent
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
    </div>
  );
}
