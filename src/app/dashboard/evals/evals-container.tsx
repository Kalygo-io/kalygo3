"use client";

import { useState } from "react";
import { EvalsContent } from "@/components/evals/evals-content";

export function EvalsContainer() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <EvalsContent
      activeSection={activeSection}
      setActiveSection={setActiveSection}
    />
  );
}
