"use client";

import { useState } from "react";
import { FineTuningContent } from "@/components/fine-tuning/fine-tuning-content";

export function FineTuningContainer() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <FineTuningContent
      activeSection={activeSection}
      setActiveSection={setActiveSection}
    />
  );
}
