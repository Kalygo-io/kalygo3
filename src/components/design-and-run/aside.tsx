"use client";

import { useState } from "react";
import { useSwarmDesignerContext } from "@/context/swarm-designer-context";
import { CustomizeSwarm } from "@/components/design-and-run/shared/customize-swarm";

interface P {
  topNavHeight: number;
}

export default function CustomizeSwarmAside(P: P) {
  console.log("Aside");

  return (
    <div>
      <div className="absolute inset-0 overflow-hidden pt-16">
        <CustomizeSwarm parent="aside" />
      </div>
    </div>
  );
}