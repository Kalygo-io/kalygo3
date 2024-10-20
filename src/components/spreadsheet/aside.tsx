"use client";

import { CustomizeSwarm } from "./shared/customize-swarm";

interface P {
  topNavHeight: number;
}

export default function Aside(P: P) {
  return (
    <div>
      <div className="absolute inset-0 overflow-hidden pt-16">
        <CustomizeSwarm title="Aside" />
      </div>
    </div>
  );
}
